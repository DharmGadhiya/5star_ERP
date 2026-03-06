import React, { useState, useEffect } from 'react';
import { Table, Spin, Space, Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import request from '@/request/request';
import useLanguage from '@/locale/useLanguage';
import dayjs from 'dayjs';

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
                <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => showDetails(record)}
                >
                    View Products
                </Button>
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
