import { Layout, Typography, Divider } from 'antd';

import AuthLayout from '@/layout/AuthLayout';
import useLanguage from '@/locale/useLanguage';

const { Content } = Layout;
const { Title } = Typography;

const AuthModule = ({ authContent, AUTH_TITLE }) => {
  const translate = useLanguage();
  return (
    <AuthLayout>
      <Content
        style={{
          padding: '40px 30px 30px',
          maxWidth: '440px',
          margin: '0 auto',
        }}
      >
        <Title level={1} style={{ textAlign: 'center', fontSize: '32px' }}>
          {translate(AUTH_TITLE)}
        </Title>
        <Divider />
        <div className="site-layout-content">{authContent}</div>
      </Content>
    </AuthLayout>
  );
};

export default AuthModule;

