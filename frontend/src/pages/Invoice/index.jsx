import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { generatePDF } from '@/utils/pdfGenerator';

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

  const handleDownload = async (record) => {
    // Fetch settings to get company logo
    let settings = {};
    try {
      const settingsStr = window.localStorage.getItem('settings');
      if (settingsStr) {
        const parsed = JSON.parse(settingsStr);
        const appSettings = parsed['company_settings'] || {};
        settings.company_logo = appSettings.company_logo;
        settings.company_name = appSettings.company_name;
      }
    } catch (err) {
      console.error('Failed to fetch settings for PDF', err);
    }

    let fallbackGrandTotal = 0;
    const rows = (record.products || []).map((item) => {
      const price = item.price || 0;
      const total = item.total || (price * item.quantity);
      fallbackGrandTotal += total;
      return [
        item.productName,
        `Rs. ${price}`,
        item.quantity,
        `Rs. ${total}`
      ];
    });

    const pdfData = {
      id: record.invoiceId,
      salesOrderId: record.salesId,
      customerId: record.customerId,
      quoteId: record.quoteId,
      createdDate: dayjs(record.created).format('YYYY-MM-DD HH:mm'),
      deliveryTime: `${record.deliveryTime} Days`,
      grandTotal: record.grandTotal || fallbackGrandTotal
    };

    const columns = ['Product Name', 'Price', 'Quantity', 'Total'];

    await generatePDF('Invoice', pdfData, columns, rows, settings);
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
