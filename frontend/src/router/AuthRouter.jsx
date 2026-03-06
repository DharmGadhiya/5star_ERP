import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

import { useDispatch } from 'react-redux';


import AboutPage from '@/pages/AboutPage';

export default function AuthRouter() {
  const dispatch = useDispatch();

  return (
    <Routes>
      <Route element={<Navigate to="/login" replace />} path="/" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<Login />} path="/login" />
      <Route element={<Navigate to="/login" replace />} path="/logout" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
