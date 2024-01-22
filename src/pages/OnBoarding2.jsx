import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function OnBoarding2() {
  const navigate = useNavigate();
  const navigateToSignUp4 = () => navigate('/signup4');

  return (
    <Container>
      <Text>관심있는 분야를 모두 선택해 주세요</Text>
      <CheckButton onClick={navigateToSignUp4}>다음</CheckButton>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
`

const Text = styled.p`
color: #000;

text-align: center;
/* T0 */
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
  margin-top:67px;
  margin-bottom:463px;
  color: #FFF;

  font-family: SUITE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;