//이메일 찾기(성공)
import React from 'react'
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';

export default function FindedEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateToJoin = () => navigate('/join');
  const { user } = location.state;

  const maskedName = user.name.charAt(0) + '*'.repeat(user.name.length - 1);

  return (
    <Container>
    <Text1>이메일 찾기</Text1>
    <Text2>{maskedName}님</Text2>
    <Text3>{user.email}</Text3>
    <CheckButton onClick={navigateToJoin}>로그인</CheckButton>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
margin-top:18.13rem;
margin-bottom:37.75rem;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Text1 = styled.p`
color: #000;

/* T0 */
font-family: SUITE;
font-size: 3.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Text2 = styled.p`
color: #000;

text-align: center;
/* T3 */
font-family: SUITE;
font-size: 1.5625rem;
font-style: normal;
font-weight: 600;
line-height: 2.34375rem; /* 150% */

margin-top:1.94rem;
margin-bottom:0.56rem;
`;

const Text3 = styled.p`
color: #000;

text-align: center;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;

margin-bottom:3.19rem;
`;

export const CheckButton = styled.button`
  width: 36.75rem;
  height: 4.5rem;
  background-color: #5B00EF;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  color: #FFF;

  text-align: center;
  /* B2 */
  font-family: SUITE;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;