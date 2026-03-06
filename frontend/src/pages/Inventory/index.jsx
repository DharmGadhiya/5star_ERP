import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, Spin, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import request from '@/request/request';

const MATERIAL_LABELS = [
    { key: 'steel', label: 'Steel' },
    { key: 'alloy', label: 'Alloy' },
    { key: 'rubber', label: 'Rubber' },
    { key: 'glass', label: 'Glass' },
    { key: 'fibre', label: 'Fibre' },
    { key: 'assemblyKits', label: 'Assembly Kits (Nuts, bolts, etc.)' },
    { key: 'fluidKits', label: 'Fluid Kits' },
    { key: 'paint', label: 'Paint' },
];

export default function Inventory() {
    const translate = useLanguage();
    const [inventory, setInventory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [updates, setUpdates] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const fetchInventory = async () => {
        setLoading(true);
        const { result } = await request.get({ entity: 'inventory' });
        if (result) {
            setInventory(result);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    const handleEdit = () => {
        const initialUpdates = {};
        MATERIAL_LABELS.forEach(({ key }) => {
            initialUpdates[key] = 0;
        });
        setUpdates(initialUpdates);
        setEditing(true);
    };

    const handleCancel = () => {
        setEditing(false);
        setUpdates({});
    };

    const handleUpdateChange = (key, value) => {
        setUpdates((prev) => ({ ...prev, [key]: value || 0 }));
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        const { result } = await request.patch({ entity: 'inventory/update', jsonData: updates });
        if (result) {
            setInventory(result);
            message.success('Inventory updated successfully');
        }
        setEditing(false);
        setUpdates({});
        setSubmitting(false);
    };

    const viewColumns = [
        {
            title: 'Material',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
    ];

    const editColumns = [
        {
            title: 'Material',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Update',
            dataIndex: 'updateValue',
            key: 'updateValue',
            render: (_, record) => (
                <InputNumber
                    value={updates[record.key]}
                    onChange={(val) => handleUpdateChange(record.key, val)}
                    style={{ width: '100%' }}
                />
            ),
        },
    ];

    const dataSource = inventory
        ? MATERIAL_LABELS.map(({ key, label }) => ({
            key,
            label,
            quantity: inventory[key] || 0,
        }))
        : [];

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div style={{ padding: '20px 20px' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 24,
                }}
            >
                <h2 style={{ margin: 0 }}>{translate('Inventory') || 'Inventory'}</h2>
                {!editing ? (
                    <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>
                        {translate('edit') || 'Edit'}
                    </Button>
                ) : (
                    <div>
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            {translate('cancel') || 'Cancel'}
                        </Button>
                        <Button type="primary" onClick={handleSubmit} loading={submitting}>
                            {translate('submit') || 'Submit'}
                        </Button>
                    </div>
                )}
            </div>
            <Table
                dataSource={dataSource}
                columns={editing ? editColumns : viewColumns}
                pagination={false}
                bordered
                size="middle"
            />
        </div>
    );
}
