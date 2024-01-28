import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function SignUp3() {
  const navigate = useNavigate();
  const navigateToHome = () => navigate('/home');

  return (
    <Container>
      <Image src='assets/SignUpSuccess.png'></Image>
      <Text>가입이 완료되었습니다!</Text>
      <CheckButton onClick={navigateToHome}>확인</CheckButton>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
`

const Image = styled.img`
margin-top: 333px;
margin-bottom: 37px;
width: 152px;
height: 152px;
`

const Text = styled.p`
color: #000;

text-align: center;

font-family: SUITE;
font-size: 50px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

export const CheckButton = styled.button`
  width: 588px;
  height: 72px;
  background-color: #5B00EF;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top:92px;
  margin-bottom:434px;
  color: #FFF;

  font-family: SUITE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;