import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeUserData from '../data/fakeUserData'; // fakeUserData의 경로를 확인해주세요.

const Deactivate0 = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
    setIsPasswordCorrect(inputPassword === fakeUserData.newPassword);
  };


  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordCorrect) {
      navigate('/deactivate-account1'); // 비밀번호가 맞으면 다음 페이지로 이동합니다.
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <DeactivateContainer>
      <Title>계정 탈퇴</Title>
      <Message>계정 확인을 위해 비밀번호를 입력해주세요</Message>
      <Form onSubmit={handleSubmit}>
      <InputWrapper>
        <Input
          type={passwordShown ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하기"
        />
        <EyeIcon src="./assets/Eyeicon.png" onClick={togglePasswordVisibility} />
        </InputWrapper>
        <NextButton type="submit" disabled={!isPasswordCorrect}>다음</NextButton>
      </Form>
      
    </DeactivateContainer>
  );
};

export default Deactivate0;

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
  margin-top: 16rem;
  margin-bottom: 0.6rem;
`;

const Message = styled.h2`
    font-size: 1.5625rem;
    font-weight: 600;
    margin-bottom: 2.0rem;
`;

const Form = styled.form`  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  width: 30.375rem;
  align-items: center;
`;

const Input = styled.input`
    color: black; // 입력된 텍스트의 색상
    font-size: 1.25rem;
    font-weight: 700;
    width: 30.375rem;
    height: 4rem;
    padding-right: 3rem; // 눈동자 아이콘을 위한 여백
    padding: 0 45px 0 10px; // 오른쪽에 아이콘을 위한 공간을 더 확보
    border: 3px solid #e2e2e2;
    border-radius: 0.625rem;
    &::placeholder {
    color: #A1A1A1; // 플레이스홀더의 색상
    }
`;

const EyeIcon = styled.img`
  position: absolute;
  right: 15px; // 입력란에서 오른쪽에 위치
  width: 1.5rem; // 눈동자 아이콘 크기 조정
  height: auto;
  cursor: pointer;
`;

const NextButton = styled.button`
  background-color: ${props => props.disabled ? '#A1A1A1' : '#5B00EF'};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 6.38rem;
  width: 36.75rem;
  height: 4.5rem;

  &:hover {
    background-color: ${props => props.disabled ? '#A1A1A1' : '#4a00d1'};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
