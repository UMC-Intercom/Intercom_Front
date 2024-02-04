import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeUserData from '../data/fakeUserData';

const Deactivate1 = () => {
  const navigate = useNavigate();
  const { name } = fakeUserData;

  const handleNextDeactivate = () => {
    navigate('/deactivate-account2');
  };

  return (
    <DeactivateContainer>
      <Title>계정 탈퇴</Title>
      <Content>
        <Message>
            공동의 인터넷과 함께했던 모든 기록이 삭제됩니다.<br />
            여러분의 성장에 있어 인터폰이 많은 도움이 되었기를 바라요.<br />
            {name} 님이 느꼈던 바를 인터폰 팀에게 공유해주시면<br />
            더욱 좋은 서비스를 만들 수 있도록 노력할게요.<br />
        </Message>
        <DeactivateImg src="./assets/Deactivate1.png" />
        <NextButton onClick={handleNextDeactivate}>다음</NextButton>
      </Content>
    </DeactivateContainer>
  );
};

export default Deactivate1;

const DeactivateContainer = styled.div`
    font-family: SUITE;
    padding: 2rem;
    max-width: 43rem;
    margin: auto;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 3.125rem;
    color: #000;
    font-weight: 700;
    margin-top: 8rem;
    margin-bottom: 3.12rem;
`;

const Content = styled.div`
  margin-top: 2rem;
`;

const Message = styled.p`
    color: #636363;
    margin-bottom: 3.75rem;
    font-size: 1.5625rem;
    font-weight: 600;
    line-height: 2.34375rem;
`;

const DeactivateImg = styled.img `
    width: 23.75rem;
    height: 27rem;
    margin-bottom: 5.12rem;
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
    margin-top: 5rem;

    &:hover {
    background-color: #4a00d1;
    }
`;