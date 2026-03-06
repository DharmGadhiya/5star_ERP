import React from 'react';
import { Form, Input, InputNumber, Divider, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function ProductForm({ isUpdateForm = false }) {
    const translate = useLanguage();

    return (
        <>
            <Form.Item
                label={translate('name') || "Name"}
                name="name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={translate('price') || "Price"}
                name="price"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label={translate('Duration (in days)') || "Duration (in days)"}
                name="duration"
                rules={[{ required: true }]}
            >
                <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Divider orientation="left">{translate('Materials Required') || "Materials Required"}</Divider>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={translate('Steel') || "Steel"} name={['materials', 'steel']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={translate('Alloy') || "Alloy"} name={['materials', 'alloy']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={translate('Rubber') || "Rubber"} name={['materials', 'rubber']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={translate('Glass') || "Glass"} name={['materials', 'glass']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={translate('Fibre') || "Fibre"} name={['materials', 'fibre']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={translate('Assembly Kits') || "Assembly Kits"} name={['materials', 'assemblyKits']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item label={translate('Fluid Kits') || "Fluid Kits"} name={['materials', 'fluidKits']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label={translate('Paint') || "Paint"} name={['materials', 'paint']} initialValue={0}>
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
}
