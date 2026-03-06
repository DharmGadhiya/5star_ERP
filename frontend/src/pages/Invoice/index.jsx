import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

export default function Invoice() {
  const translate = useLanguage();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await request.get({ entity: 'app-invoices' });
      if (response && response.success) {
        setData(response.result);
      }
    } catch (error) {
      console.error('Failed to fetch invoices', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDownload = (record) => {
    let content = `=======================================================\n`;
    content += `                    INVOICE RECEIPT                    \n`;
    content += `=======================================================\n\n`;
    content += `Invoice ID: ${record.invoiceId}\n`;
    content += `Sales Order ID: ${record.salesId}\n`;
    content += `Customer ID: ${record.customerId}\n`;
    content += `Quote ID: ${record.quoteId}\n`;
    content += `Created: ${dayjs(record.created).format('YYYY-MM-DD HH:mm')}\n\n`;

    content += `-------------------------------------------------------\n`;
    content += `Product Name\t\tQuantity\n`;
    content += `-------------------------------------------------------\n`;

    (record.products || []).forEach((item) => {
      content += `${item.productName}\t\t${item.quantity}\n`;
    });

    content += `-------------------------------------------------------\n`;
    content += `\nDelivery Time: ${record.deliveryTime} Days\n`;
    content += `=======================================================\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${record.invoiceId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
    },
    {
      title: 'Sales Order ID',
      dataIndex: 'salesId',
      key: 'salesId',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_, record) => (
        <Button
          size="small"
          icon={<DownloadOutlined />}
          onClick={() => handleDownload(record)}
        >
          Download Invoice
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: 24 }}>Invoices</h2>

      <Table
        dataSource={data}
        columns={columns}
        rowKey={(item) => item._id}
        loading={loading}
        bordered
      />
    </div>
  );
}
