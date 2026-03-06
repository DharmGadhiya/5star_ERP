import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '50px', color: 'white', backgroundColor: '#07071d', minHeight: '100vh' }}>
      <h1>About the Company</h1>
      <p>Provides details about the company, the hackathon challenge, and the platform vision.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Back to Home</button>
    </div>



  );
}
