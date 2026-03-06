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

import VantaBackground from '@/components/Home/VantaBackground';
import Hero from '@/components/Home/Hero';
import LoginCards from '@/components/Home/LoginCards';
import About from '@/components/Home/About';
import Footer from '@/components/Home/Footer';
import '@/style/home.css';
import '@/style/partials/auth-custom.css';

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

  const HomeDesign = () => (
    <div className="home-design-root" style={{ color: '#ffffff', minHeight: '100vh', fontFamily: 'var(--font-primary)' }}>
      <div style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: -1 }}>
        <VantaBackground />
      </div>
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <LoginCards onRoleSelect={(role) => setSelectedRole(role)} />
        <About />
        <Footer />
      </main>
    </div>
  );

  const FormContainer = () => {
    let defaultEmail = '';
    if (selectedRole === 'admin') defaultEmail = 'admin@admin.com';

    return (
      <Loading isLoading={isLoading}>
        <Button
          type="link"
          icon={<ArrowLeftOutlined />}
          onClick={() => setSelectedRole(null)}
          style={{ marginBottom: 20, padding: 0 }}
          className="custom-back-btn"
        >
          Back to Home
        </Button>
        <Form
          layout="vertical"
          name="normal_login"
          className="login-form custom-auth-form"
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
              className="login-form-button custom-auth-button"
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

  return !selectedRole ? <HomeDesign /> : (
    <AuthModule
      authContent={<FormContainer />}
      AUTH_TITLE="Sign In"
    />
  );
};

export default LoginPage;
