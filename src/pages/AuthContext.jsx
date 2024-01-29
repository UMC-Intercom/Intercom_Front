// AuthContext.js - 로그인 상태 전역에서 처리하는 기능
// 모든 페이지에서 로그인 상태 & 로그인 유지상태 조회랑 변경가능
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // 로그인 유지 상태 추가

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleStayLoggedIn = (value) => {
    setStayLoggedIn(value);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleLogin, stayLoggedIn, toggleStayLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
