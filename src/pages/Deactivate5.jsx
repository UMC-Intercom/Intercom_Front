import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Deactivate5 = () => {
  const navigate = useNavigate();
  const { toggleLogin } = useAuth();

  const handleNavigation = () => {
    toggleLogin();
    navigate('/');
  };

  return (
    <DeactivateContainer>
      <Title>인터콤은 여러분을 응원합니다.</Title>
      <Content>
        <DeactivateImg src="./assets/Deactivate5.png" />
        <NextButton onClick={handleNavigation}>홈으로</NextButton>
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