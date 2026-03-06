import { useState } from 'react';
import CrudModule from '@/modules/CrudModule/CrudModule';
import ClientForm from '@/forms/ClientForm';
import { Modal, Form, Select, InputNumber, Button, Row, Col, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import request from '@/request/request';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { crud } from '@/redux/crud/actions';

import useLanguage from '@/locale/useLanguage';

export default function Customer() {
  const translate = useLanguage();
  const dispatch = useDispatch();
  const entity = 'client';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [orderCustomer, setOrderCustomer] = useState(null);
  const [products, setProducts] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderForm] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await request.listAll({ entity: 'product' });
      if (data && data.result) {
        setProducts(data.result);
      }
    };
    fetchProducts();
  }, []);

  const handleNewOrder = (record) => {
    setOrderCustomer(record);
    orderForm.resetFields();
    setOrderModalOpen(true);
  };

  const handleOrderSubmit = async () => {
    try {
      const values = await orderForm.validateFields();
      if (!values.purchases || values.purchases.length === 0) {
        message.warning('Please add at least one product');
        return;
      }
      setOrderLoading(true);
      const response = await request.post({
        entity: `client/neworder/${orderCustomer._id}`,
        jsonData: { purchases: values.purchases },
      });
      if (response && response.success) {
        message.success('New order placed successfully!');
        setOrderModalOpen(false);
        orderForm.resetFields();
        // Refresh the list
        dispatch(crud.list({ entity }));
      } else {
        message.error(response?.message || 'Failed to place order');
      }
      setOrderLoading(false);
    } catch (err) {
      setOrderLoading(false);
    }
  };

  const Labels = {
    PANEL_TITLE: translate('customer_master') || 'Customer Master',
    DATATABLE_TITLE: translate('customer_master_list') || 'Customer Master List',
    ADD_NEW_ENTITY: translate('add_new_client'),
    ENTITY_NAME: translate('customer_master') || 'Customer Master',
  };
  const configPage = {
    entity,
    ...Labels,
  };

  const dataTableColumns = [
    {
      title: 'Customer ID',
      dataIndex: 'customerId',
    },
    {
      title: translate('name') || 'Name',
      dataIndex: 'name',
    },
    {
      title: translate('country') || 'Country',
      dataIndex: 'country',
    },
    {
      title: translate('address') || 'Address',
      dataIndex: 'address',
    },
    {
      title: translate('phone') || 'Phone',
      dataIndex: 'phone',
    },
    {
      title: translate('email') || 'Email',
      dataIndex: 'email',
    },
    {
      title: '',
      key: 'newOrder',
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          icon={<ShoppingCartOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleNewOrder(record);
          }}
        >
          New Order
        </Button>
      ),
    },
  ];

  const readColumns = [
    { title: 'Customer ID', dataIndex: 'customerId' },
    { title: translate('name') || 'Name', dataIndex: 'name' },
    { title: translate('country') || 'Country', dataIndex: 'country' },
    { title: translate('address') || 'Address', dataIndex: 'address' },
    { title: translate('phone') || 'Phone', dataIndex: 'phone' },
    { title: translate('email') || 'Email', dataIndex: 'email' },
    { title: 'Last Inquiry No.', dataIndex: 'lastInquiryNo' },
    { title: 'Last Quote ID', dataIndex: 'lastQuoteId' },
  ];

  const config = {
    ...configPage,
    readColumns,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return (
    <>
      <CrudModule
        createForm={<ClientForm />}
        updateForm={<ClientForm isUpdateForm={true} />}
        config={config}
      />
      <Modal
        title={`New Order for ${orderCustomer?.name || ''} (ID: ${orderCustomer?.customerId || ''})`}
        open={orderModalOpen}
        onCancel={() => {
          setOrderModalOpen(false);
          orderForm.resetFields();
        }}
        onOk={handleOrderSubmit}
        confirmLoading={orderLoading}
        okText="Place Order"
        width={600}
      >
        <Form form={orderForm} layout="vertical">
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
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Product
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Modal>
    </>
  );
}
