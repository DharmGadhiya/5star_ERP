import useLanguage from '@/locale/useLanguage';

import { Layout, Col, Divider, Typography } from 'antd';

import AuthLayout from '@/layout/AuthLayout';

import logo from '@/style/images/custom-logo.png';

const { Content } = Layout;
const { Title } = Typography;

const AuthModule = ({ authContent, AUTH_TITLE, isForRegistre = false }) => {
  const translate = useLanguage();
  return (
    <AuthLayout>
      <Content
        style={{
          padding: '0',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 0 }} span={0}>
          <img
            src={logo}
            alt="Logo"
            style={{
              margin: '0px auto 20px',
              display: 'block',
            }}
            height={63}
            width={220}
          />
          <div className="space10" />
        </Col>
        <Title level={1} style={{ textAlign: 'center', color: '#f0ae77', fontWeight: 600 }}>{translate(AUTH_TITLE)}</Title>

        <Divider style={{ borderColor: 'rgba(240, 174, 119, 0.5)' }} />
        <div className="site-layout-content">{authContent}</div>
      </Content>
    </AuthLayout>
  );
};

export default AuthModule;
