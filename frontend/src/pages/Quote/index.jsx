import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, Modal, Collapse, Tag } from 'antd';
import { EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import request from '@/request/request';

export default function Quote() {
  const translate = useLanguage();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async () => {
    setLoading(true);
    const data = await request.get({ entity: 'quotes/customers' });
    if (data && data.result) {
      setCustomers(data.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleShow = (record) => {
    setSelectedCustomer(record);
    setDetailModalOpen(true);
  };

  // Get the price of a purchase item from the populated product
  const getItemPrice = (item) => {
    if (item.product && typeof item.product === 'object' && item.product.price) {
      return item.product.price;
    }
    return 0;
  };

  // Group purchases of a customer by quoteId and calculate total price
  const getQuoteGroups = (purchases) => {
    const groups = {};
    (purchases || []).forEach((p) => {
      const qid = p.quoteId || 'N/A';
      if (!groups[qid]) {
        groups[qid] = { items: [], totalPrice: 0 };
      }
      groups[qid].items.push(p);
      groups[qid].totalPrice += getItemPrice(p) * (p.quantity || 0);
    });
    return groups;
  };

  const handleDownload = (customer, quoteId, items, totalPrice) => {
    let content = `Quote ID: ${quoteId}\n`;
    content += `Customer ID: ${customer.customerId}\n`;
    content += `Customer Name: ${customer.name}\n\n`;
    content += `Inquiry No.\tProduct\t\tQuantity\tPrice\n`;
    content += `-------------------------------------------------------\n`;
    items.forEach((item) => {
      const price = getItemPrice(item);
      content += `${item.inquiryNo}\t${item.productName || 'N/A'}\t\t${item.quantity}\t\t${price}\n`;
    });
    content += `-------------------------------------------------------\n`;
    content += `\nTotal Price: ${totalPrice}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Quote_${quoteId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
      key: 'customerId',
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => handleShow(record)}
        >
          Show
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const quoteGroups = selectedCustomer ? getQuoteGroups(selectedCustomer.purchases) : {};

  // Build a summary table of Quote ID + Total Price
  const quoteSummaryData = Object.keys(quoteGroups)
    .sort((a, b) => {
      const numA = parseFloat(a.split('.')[1] || 0);
      const numB = parseFloat(b.split('.')[1] || 0);
      return numA - numB;
    })
    .map((quoteId) => ({
      key: quoteId,
      quoteId,
      totalPrice: quoteGroups[quoteId].totalPrice,
      items: quoteGroups[quoteId].items,
    }));

  const collapseItems = quoteSummaryData.map(({ quoteId, totalPrice, items }) => ({
    key: quoteId,
    label: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <span>
          <Tag color="blue">Quote ID: {quoteId}</Tag>
          <Tag color="green">Total: ₹{totalPrice}</Tag>
          <Tag color="gray">{items.length} product(s)</Tag>
        </span>
        <Button
          size="small"
          icon={<DownloadOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(selectedCustomer, quoteId, items, totalPrice);
          }}
        >
          Download
        </Button>
      </div>
    ),
    children: (
      <>
        <Table
          size="small"
          pagination={false}
          dataSource={items.map((item, idx) => ({
            ...item,
            key: idx,
            price: getItemPrice(item),
            lineTotal: getItemPrice(item) * (item.quantity || 0),
          }))}
          columns={[
            { title: 'Inquiry No.', dataIndex: 'inquiryNo', key: 'inquiryNo' },
            { title: 'Product', dataIndex: 'productName', key: 'productName' },
            { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
            { title: 'Unit Price', dataIndex: 'price', key: 'price', render: (v) => `₹${v}` },
            { title: 'Line Total', dataIndex: 'lineTotal', key: 'lineTotal', render: (v) => `₹${v}` },
          ]}
        />
        <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 8 }}>
          Total Price: ₹{totalPrice}
        </div>
      </>
    ),
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: 24 }}>{translate('quote') || 'Quote'}</h2>
      <Table
        dataSource={customers}
        columns={columns}
        rowKey={(item) => item._id}
        pagination={false}
        bordered
      />
      <Modal
        title={`Quotes for ${selectedCustomer?.name || ''} (Customer ID: ${selectedCustomer?.customerId || ''})`}
        open={detailModalOpen}
        onCancel={() => {
          setDetailModalOpen(false);
          setSelectedCustomer(null);
        }}
        footer={null}
        width={800}
      >
        {quoteSummaryData.length > 0 ? (
          <>
            <Table
              size="small"
              pagination={false}
              bordered
              style={{ marginBottom: 16 }}
              dataSource={quoteSummaryData}
              columns={[
                { title: 'Quote ID', dataIndex: 'quoteId', key: 'quoteId' },
                {
                  title: 'Total Price',
                  dataIndex: 'totalPrice',
                  key: 'totalPrice',
                  render: (v) => `₹${v}`,
                },
              ]}
            />
            <Collapse items={collapseItems} />
          </>
        ) : (
          <p>No quotes found for this customer.</p>
        )}
      </Modal>
    </div>
  );
}
