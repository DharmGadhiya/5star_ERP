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
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color:0xcc7d37,
        backgroundColor: 0x0000,
        points: 4.0,
        maxDistance: 26.0,
        spacing: 15.0,
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
        width:'100%',
        overflow: 'hidden', // BACKGROUND (lowest layer)
        
      }}
    >
      {/* Vanta Animation */}
      <div
        ref={vantaRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          bottom:0,
          height: '100%',
          zIndex: 1, // middle layer
        }}
      />

      {/* Page Content */}
      <Row
        style={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative', // top layer
          backgroundColor:'#000000',
        }}
      >
        {/* Left Side */}
        <Col
          xs={0}
          sm={0}
          md={12}
          lg={12}
          style={{
            backgroundColor: '#0A0F2C',
            
          }}
        ></Col>

        {/* Right Side (Login Form) */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0px',
            paddingTop : '0px',
          }}
        >
          <div
            style={{
              background: '#352f2bff',
              width: '100%',
              maxWidth: '450px',
              borderRadius: '8px',
              boxShadow: '0 0 16px rgba(94, 93, 91, 0.9)',
              minHeight: '400px',
              height: 'auto',
              zIndex: 20,
              position: 'relative',
              margin: '0 auto',
              padding: '40px 30px',
              // opacity:0.7,
              color: '#f0ae77' // 👈 TEXT COLOR
            }}
          >
            {children}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}