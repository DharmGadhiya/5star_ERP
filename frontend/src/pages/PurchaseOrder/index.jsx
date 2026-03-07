import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, Tag, Switch, Space, message, Modal } from 'antd';
import { CheckCircleOutlined, HistoryOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';
import { generatePDF } from '@/utils/pdfGenerator';

export default function PurchaseOrder() {
    const translate = useLanguage();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewHistory, setViewHistory] = useState(false);

    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedPO, setSelectedPO] = useState(null);

    const fetchOrders = async (isHistory) => {
        setLoading(true);
        const endpoint = isHistory ? 'purchase-orders/history' : 'purchase-orders/pending';
        const response = await request.get({ entity: endpoint });
        if (response && response.success) {
            setData(response.result);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders(viewHistory);
    }, [viewHistory]);

    const handleArrive = async (record) => {
        setLoading(true);
        try {
            const response = await request.post({ entity: `purchase-orders/${record._id}/arrive` });
            if (response && response.success) {
                message.success(`Purchase Order #${record.purchaseId} marked as Arrived. Inventory updated!`);
                fetchOrders(viewHistory);
            } else {
                message.error(response?.message || 'Failed to mark as arrived');
                setLoading(false);
            }
        } catch (err) {
            message.error(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    const showDetails = (record) => {
        setSelectedPO(record);
        setDetailModalOpen(true);
    };

    const handleDownload = async (record) => {
        // Fetch settings from local storage
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
            id: record.purchaseId,
            quoteId: record.quoteId,
            status: record.status,
            createdDate: dayjs(record.created).format('YYYY-MM-DD HH:mm'),
            grandTotal: record.grandTotal
        };

        const columns = ['Material', 'Quantity', 'Unit Price', 'Total Price'];
        const rows = record.items.map((item) => {
            const matName = item.material.charAt(0).toUpperCase() + item.material.slice(1);
            return [
                matName,
                item.quantity,
                `Rs. ${item.price}`,
                `Rs. ${item.totalPrice}`
            ];
        });

        await generatePDF('PurchaseOrder', pdfData, columns, rows, settings);
    };

    const columns = [
        {
            title: 'Purchase ID',
            dataIndex: 'purchaseId',
            key: 'purchaseId',
        },
        {
            title: 'Quote ID',
            dataIndex: 'quoteId',
            key: 'quoteId',
        },
        {
            title: 'Grand Total',
            dataIndex: 'grandTotal',
            key: 'grandTotal',
            render: (val) => `₹${val}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === 'Arrived' ? 'green' : 'orange'}>{status}</Tag>
            ),
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'created',
            render: (date) => dayjs(date).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => showDetails(record)}
                    >
                        Details
                    </Button>
                    <Button
                        size="small"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(record)}
                    >
                        Download
                    </Button>
                    {!viewHistory && (
                        <Button
                            type="primary"
                            size="small"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleArrive(record)}
                        >
                            Arrived
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    const itemColumns = [
        { title: 'Material', dataIndex: 'material', key: 'material', render: (val) => val.charAt(0).toUpperCase() + val.slice(1) },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Unit Price', dataIndex: 'price', key: 'price', render: (val) => `₹${val}` },
        { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice', render: (val) => `₹${val}` },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h2>{viewHistory ? 'Purchase Order History' : 'Pending Purchase Orders'}</h2>
                <Space>
                    <span><HistoryOutlined /> View History</span>
                    <Switch
                        checked={viewHistory}
                        onChange={(checked) => setViewHistory(checked)}
                    />
                </Space>
            </div>

            <Table
                dataSource={data}
                columns={columns}
                rowKey={(item) => item._id}
                loading={loading}
                bordered
            />

            <Modal
                title={`Purchase Order #${selectedPO?.purchaseId || ''} Details`}
                open={detailModalOpen}
                onCancel={() => setDetailModalOpen(false)}
                footer={null}
                width={600}
            >
                {selectedPO && (
                    <>
                        <div style={{ marginBottom: 16 }}>
                            <strong>Quote ID:</strong> {selectedPO.quoteId} <br />
                            <strong>Status:</strong> <Tag color={selectedPO.status === 'Arrived' ? 'green' : 'orange'}>{selectedPO.status}</Tag>
                        </div>
                        <Table
                            size="small"
                            dataSource={selectedPO.items || []}
                            columns={itemColumns}
                            rowKey={(item, idx) => idx}
                            pagination={false}
                            bordered
                        />
                        <div style={{ textAlign: 'right', marginTop: 16, fontWeight: 'bold' }}>
                            Grand Total: ₹{selectedPO.grandTotal}
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
}
