import React, { useState, useEffect } from 'react';
import { Table, Spin, Space, Button, Modal } from 'antd';
import { EyeOutlined, DownloadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { message } from 'antd';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { generatePDF } from '@/utils/pdfGenerator';

export default function SalesOrder() {
    const translate = useLanguage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedSO, setSelectedSO] = useState(null);

    const fetchOrders = async () => {
        setLoading(true);
        const response = await request.get({ entity: 'sales-orders' });
        if (response && response.success) {
            setData(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const showDetails = (record) => {
        setSelectedSO(record);
        setDetailModalOpen(true);
    };

    const handleProduce = async (record) => {
        setLoading(true);
        try {
            const response = await request.post({ entity: `sales-orders/${record._id}/produce` });
            if (response && response.success) {
                message.success('Invoice generated! Materials have been subtracted from Inventory.');
                fetchOrders();
            } else {
                message.error(response?.message || 'Failed to produce order');
                setLoading(false);
            }
        } catch (err) {
            message.error(err.message || 'An error occurred');
            setLoading(false);
        }
    };

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

        const pdfData = {
            id: record.salesId,
            customerId: record.customerId,
            quoteId: record.quoteId,
            createdDate: dayjs(record.created).format('YYYY-MM-DD HH:mm'),
            deliveryTime: `${record.deliveryTime} Days`
        };

        const columns = ['Product Name', 'Quantity'];
        const rows = record.products.map((item) => {
            return [
                item.productName,
                item.quantity
            ];
        });

        await generatePDF('SalesOrder', pdfData, columns, rows, settings);
    };

    const columns = [
        {
            title: 'Sales ID',
            dataIndex: 'salesId',
            key: 'salesId',
        },
        {
            title: 'Customer ID',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Quote ID',
            dataIndex: 'quoteId',
            key: 'quoteId',
        },
        {
            title: 'Delivery Time (Days)',
            dataIndex: 'deliveryTime',
            key: 'deliveryTime',
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Details',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => showDetails(record)}
                    >
                        View Products
                    </Button>
                    <Button
                        size="small"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(record)}
                    >
                        Download
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleProduce(record)}
                        disabled={record.isProduced}
                    >
                        {record.isProduced ? 'Locked' : 'Produced'}
                    </Button>
                </Space>
            ),
        },
    ];

    const productColumns = [
        { title: 'Product Name', dataIndex: 'productName', key: 'productName' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: 24 }}>Sales Orders</h2>

            <Table
                dataSource={data}
                columns={columns}
                rowKey={(item) => item._id}
                loading={loading}
                bordered
            />

            <Modal
                title={`Sales Order #${selectedSO?.salesId || ''} Details`}
                open={detailModalOpen}
                onCancel={() => setDetailModalOpen(false)}
                footer={null}
                width={500}
            >
                {selectedSO && (
                    <>
                        <div style={{ marginBottom: 16 }}>
                            <strong>Quote ID:</strong> {selectedSO.quoteId} <br />
                            <strong>Delivery Time:</strong> {selectedSO.deliveryTime} Days
                        </div>
                        <Table
                            size="small"
                            dataSource={selectedSO.products || []}
                            columns={productColumns}
                            rowKey={(item, idx) => idx}
                            pagination={false}
                            bordered
                        />
                    </>
                )}
            </Modal>
        </div>
    );
}
