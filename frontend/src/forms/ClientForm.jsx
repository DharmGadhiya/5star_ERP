import React, { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, Divider, Row, Col, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';
import { countryList } from '@/utils/countryList';
import request from '@/request/request';

export default function ClientForm({ isUpdateForm = false }) {
    const translate = useLanguage();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await request.listAll({ entity: 'product' });
            if (data && data.result) {
                setProducts(data.result);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Form.Item
                label={translate('name') || 'Name'}
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={translate('country') || 'Country'}
                name="country"
            >
                <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    style={{ width: '100%' }}
                >
                    {countryList.map((c) => (
                        <Select.Option key={c.value} value={c.value} label={c.label}>
                            {c.icon && c.icon + ' '}
                            {c.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={translate('address') || 'Address'}
                name="address"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={translate('phone') || 'Phone'}
                name="phone"
            >
                <Input placeholder="+1 123 456 789" />
            </Form.Item>

            <Form.Item
                label={translate('email') || 'Email'}
                name="email"
                rules={[{ type: 'email' }]}
            >
                <Input placeholder="email@example.com" />
            </Form.Item>

            {!isUpdateForm && (
                <>
                    <Divider orientation="left">Products to Purchase</Divider>
                    <Form.List name="purchases">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Row key={key} gutter={16} align="middle" style={{ marginBottom: 8 }}>
                                        <Col span={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'product']}
                                                label="Product"
                                                rules={[{ required: true, message: 'Select a product' }]}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Select
                                                    showSearch
                                                    placeholder="Select Product"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) =>
                                                        (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                                                    }
                                                >
                                                    {products.map((p) => (
                                                        <Select.Option key={p._id} value={p._id}>
                                                            {p.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'quantity']}
                                                label="Qty"
                                                initialValue={1}
                                                rules={[{ required: true, message: 'Enter quantity' }]}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <InputNumber min={1} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4} style={{ display: 'flex', alignItems: 'center', paddingTop: 30 }}>
                                            <MinusCircleOutlined
                                                onClick={() => remove(name)}
                                                style={{ color: 'red', fontSize: 18 }}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                    >
                                        Add Product
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </>
            )}
        </>
    );
}
