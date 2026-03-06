import React from 'react';
import { Layout, Row, Col } from 'antd';

export default function AuthLayout({ children }) {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: '#fafafa',
      }}
    >
      <Row style={{ minHeight: '100vh', width: '100%' }}>
        {/* Left Spacing/Background Section */}
        <Col xs={0} sm={0} md={12} lg={12}></Col>

        {/* Right Section containing the Form */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#FFF',
              width: '100%',
              maxWidth: '500px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
