import React, { useEffect, useRef } from 'react';
import { Layout, Row, Col } from 'antd';

export default function AuthLayout({ children }) {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current && window.VANTA && window.VANTA.NET) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,   
        color: 0x8cac,
        backgroundColor: 0x7071d,
        points: 18.00,
        maxDistance: 18.00,
        spacing: 12.00
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Vanta Animation Background directly covering the entire screen behind content */}
      <div 
        id="vanta-bg"
        ref={vantaRef} 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 0 
        }} 
      />

      {/* Main Grid Content positioned layered above */}
      <Row style={{ minHeight: '100vh', width: '100%', position: 'relative', zIndex: 10 }}>
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
              background: '#c4e8f6ff',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '8px',
              boxShadow: '0 0 12px rgba(255,255,255,0.8)',
              height:'67%',
            }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
