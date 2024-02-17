import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Deactivate5 = () => {
  const navigate = useNavigate();
  const { toggleLogin } = useAuth();

  const handleDeactivation = async () => {
    try {
      // 인증 토큰을 로컬 스토리지에서 가져옵니다.
      const token = localStorage.getItem('accessToken');

      // 회원 탈퇴 요청 보내기
      await axios.delete('/users/withdraw', {
        headers: {
          // 요청 헤더에 인증 토큰 포함
          Authorization: `Bearer ${token}`,
        },
      });

      // 로컬 스토리지에서 사용자 정보 및 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userName');
      localStorage.removeItem('userNickname');
      localStorage.removeItem('userGender');
      localStorage.removeItem('userBirthday');
      localStorage.removeItem('userProfile');
      localStorage.setItem('isLoggedIn', 'false'); // 로그인 상태를 false로 설정

      toggleLogin();
      // 홈으로 리디렉션
      navigate('/');
    } catch (error) {
      // 오류 처리
      console.error('회원 탈퇴 처리 중 오류 발생:', error);
      alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <DeactivateContainer>
      <Title>인터콤은 여러분을 응원합니다.</Title>
      <Content>
        <DeactivateImg src="./assets/Deactivate5.png" />
        <NextButton onClick={handleDeactivation}>홈으로</NextButton>
      </Content>
    </DeactivateContainer>
  );
};

export default Deactivate5;

const DeactivateContainer = styled.div`
    font-family: SUITE;
    max-width: 43rem;
    margin: auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3.125rem;
    color: #000;
    font-weight: 700;
    margin-top: 10rem;
    margin-bottom: 5.88rem;
`;

const Content = styled.div`
`;

const DeactivateImg = styled.img `
    width: 15rem;
    height: 15rem;
    margin-bottom: 5.88rem;
`;

const NextButton = styled.button`
    background-color: #5B00EF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    width: 36.75rem;
    height: 4.5rem;
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;

    &:hover {
    background-color: #4a00d1;
    }
`;