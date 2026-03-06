import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';
import { Form, Button, Card, Typography, Space } from 'antd';
import { UserOutlined, SettingOutlined, BankOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { login } from '@/redux/auth/actions';
import { selectAuth } from '@/redux/auth/selectors';
import LoginForm from '@/forms/LoginForm';
import Loading from '@/components/Loading';
import AuthModule from '@/modules/AuthModule';

const { Title } = Typography;

const LoginPage = () => {
  const translate = useLanguage();
  const { isLoading, isSuccess } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState(null);

  const onFinish = (values) => {
    dispatch(login({ loginData: values }));
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  const RoleSelection = () => (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Title level={3} style={{ marginBottom: 30 }}>Select Your Role</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Button
          type="primary"
          size="large"
          block
          icon={<SettingOutlined />}
          style={{ height: 60, fontSize: '18px' }}
          onClick={() => setSelectedRole('admin')}
        >
          Login as Admin
        </Button>
        <Button
          type="default"
          size="large"
          block
          icon={<UserOutlined />}
          style={{ height: 60, fontSize: '18px', backgroundColor: '#f0f5ff', borderColor: '#adc6ff', color: '#1d39c4' }}
          onClick={() => setSelectedRole('product')}
        >
          Login as Product Person
        </Button>
        <Button
          type="default"
          size="large"
          block
          icon={<BankOutlined />}
          style={{ height: 60, fontSize: '18px', backgroundColor: '#f6ffed', borderColor: '#b7eb8f', color: '#389e0d' }}
          onClick={() => setSelectedRole('finance')}
        >
          Login as Finance Person
        </Button>
      </Space>
    </div>
  );

  const FormContainer = () => {
    let defaultEmail = '';
    if (selectedRole === 'admin') defaultEmail = 'admin@admin.com';
    // Let custom users type their emails if they are product/finance

    return (
      <Loading isLoading={isLoading}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => setSelectedRole(null)}
          style={{ marginBottom: 20, padding: 0 }}
        >
          Back to Role Selection
        </Button>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
            email: defaultEmail,
            password: selectedRole === 'admin' ? 'admin123' : '',
          }}
          onFinish={onFinish}
        >
          <LoginForm />
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
              size="large"
              block
            >
              {translate('Log in')}
            </Button>
          </Form.Item>
        </Form>
      </Loading>
    );
  };

  return (
    <AuthModule
      authContent={!selectedRole ? <RoleSelection /> : <FormContainer />}
      AUTH_TITLE={!selectedRole ? "Welcome" : `Sign in as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
    />
  );
};

export default LoginPage;
