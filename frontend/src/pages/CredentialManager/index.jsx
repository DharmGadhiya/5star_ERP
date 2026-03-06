import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import request from '@/request/request';

export default function CredentialManager() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await request.get({ entity: 'credential-manager' });
            if (res && res.success) {
                setData(res.result);
            }
        } catch (e) {
            message.error('Failed to load credentials');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateOrUpdate = async (values) => {
        setLoading(true);
        try {
            if (editingId) {
                const res = await request.patch({ entity: `credential-manager/${editingId}`, jsonData: values });
                if (res.success) {
                    message.success('User updated successfully');
                    setModalVisible(false);
                    fetchData();
                } else {
                    message.error(res.message);
                }
            } else {
                const res = await request.post({ entity: 'credential-manager', jsonData: values });
                if (res.success) {
                    message.success('User created successfully');
                    setModalVisible(false);
                    fetchData();
                } else {
                    message.error(res.message);
                }
            }
        } catch (error) {
            message.error('An error occurred');
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            const res = await request.delete({ entity: `credential-manager/${id}` });
            if (res.success) {
                message.success('User deleted');
                fetchData();
            } else {
                message.error(res.message);
            }
        } catch (e) {
            message.error('Failed to delete user');
        }
        setLoading(false);
    };

    const openCreateModal = () => {
        setEditingId(null);
        form.resetFields();
        setModalVisible(true);
    };

    const openEditModal = (record) => {
        setEditingId(record._id);
        form.setFieldsValue({
            name: record.name,
            email: record.email,
            role: record.role,
            password: '', // Leave blank unless they want to update
        });
        setModalVisible(true);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => role.charAt(0).toUpperCase() + role.slice(1)
        },
        { title: 'Enabled', dataIndex: 'enabled', key: 'enabled', render: (en) => en ? 'Yes' : 'No' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => openEditModal(record)}>Edit</Button>
                    <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record._id)}>
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2>Credential Manager</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                    Create New User
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
                loading={loading}
                bordered
            />

            <Modal
                title={editingId ? "Edit User" : "Create New User"}
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleCreateOrUpdate}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="product">Product Person</Select.Option>
                            <Select.Option value="finance">Finance Person</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={editingId ? "New Password (leave blank to keep current)" : "Password"}
                        rules={[{ required: !editingId }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            {editingId ? "Update User" : "Create User"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
