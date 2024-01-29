//PrivateRoute - 보호된 경로에 대한 접근을 제어함
// 로그인 여부 판단해서 접근 가능한 페이지 제한하는 기능
// PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to="/join" state={{ from: location }} replace />;
};

export default PrivateRoute;
