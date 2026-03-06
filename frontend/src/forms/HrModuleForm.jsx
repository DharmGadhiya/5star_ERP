import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import useLanguage from '@/locale/useLanguage';

export default function HrModuleForm({ isUpdateForm = false }) {
    const translate = useLanguage();

    return (
        <>
            <Form.Item
                name="employeeType"
                label={translate('Employee Type')}
                rules={[
                    {
                        required: true,
                        message: translate('Please input Employee Type'),
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="numberOfEmployees"
                label={translate('Number of Employees')}
                rules={[
                    {
                        required: true,
                        message: translate('Please input Number of Employees'),
                    },
                ]}
            >
                <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item
                name="averageSalary"
                label={translate('Average Monthly Salary (INR)')}
                rules={[
                    {
                        required: true,
                        message: translate('Please input average salary'),
                    },
                ]}
            >
                <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
        </>
    );
}
