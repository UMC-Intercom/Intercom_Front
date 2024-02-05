//이메일 찾기(실패)
import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function UnfindedEmail() {
  const navigate = useNavigate();
  const navigateToFindingEmail = () => navigate('/findingemail'); // 다시 이메일 찾기로
  const navigateToSignUp= () => navigate('/signup'); //회원가입

  return (
    <Container>
    <Text1>미등록 회원</Text1>
    <Text2>입력하신 휴대폰으로 가입된 회원정보가 없습니다</Text2>

    <ButtonContainer>
    <SignUpBtn onClick={navigateToSignUp}>회원가입</SignUpBtn>
    <ReturnBtn onClick={navigateToFindingEmail}>돌아가기</ReturnBtn>
    </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
margin-top:18.13rem;
margin-bottom:34.06rem;

* {
    margin: 0;
    padding: 0;
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

margin-top:0.62rem;
margin-bottom:4.81rem;
`;

export const SignUpBtn = styled.button`
cursor: pointer;
width: 36.75rem;
height: 4.5rem;
border-radius: 0.625rem;
background: #5B00EF;
border: #5B00EF;

color: #FFF;

text-align: center;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;

margin-bottom:1rem;
`;

export const ReturnBtn = styled.button`
cursor: pointer;
width: 36.75rem;
height: 4.5rem;
border-radius: 0.625rem;
border: 3px solid #A1A1A1;
background: none;

color: #636363;
text-align: center;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;