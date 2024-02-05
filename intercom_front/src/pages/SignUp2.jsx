import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function SignUp2() {
  const navigate = useNavigate();
  const navigateToOnBoarding1 = () => navigate('/onboarding1');
  const navigateToSignUp3 = () => navigate('/signup3');

  const handleLaterButtonClick = () => {
    console.log('나중에 하기');
    // 로직 추가
  };

  const handleSettingButtonClick = () => {
    console.log('설정하기');
    // 로직추가
  };
  return (
    <Container>
        <Text1>거의 다 왔어요!</Text1>
        <Text2>보다 더 정확한 추천을 위해<br /> <Strong>두가지만</Strong> 더 알려주세요</Text2>
        <Image><img src='./assets/emptybox.png'></img></Image>
        <ButtonWrap>
          <LaterButton onClick={navigateToSignUp3}>나중에 하기</LaterButton>
          <SettingButton onClick={navigateToOnBoarding1}>설정하기</SettingButton>
        </ButtonWrap>
    </Container>
  )
}

const Container = styled.div`
`;

const Text1 = styled.p`
color: #000;
text-align: center;

font-family: SUITE;
font-size: 25px;
font-style: normal;
font-weight: 800;
line-height: normal;

margin-top: 163px;
`;

const Text2 = styled.p`
color: #000;

text-align: center;
/* T4 */
font-family: SUITE;
font-size: 50px;
font-style: normal;
font-weight: 400;
line-height: normal;

margin-top: 23px;
`;

const Strong = styled.span`
color: #000;
font-family: SUITE;
font-size: 50px;
font-style: normal;
font-weight: 800;
line-height: normal;
`;

const Image = styled.div`
text-align: center;
`;

const ButtonWrap = styled.div`
text-align: center;
margin-top: 77px;
margin-bottom: 261px;
`;

const LaterButton = styled.button`
color: #FFF;

margin-right: 24px;
text-align: center;

font-family: SUITE;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;

width: 294px;
height: 72px;
border-radius: 10px;
background: #A1A1A1;
border: none;
cursor: pointer;
`;

const SettingButton = styled.button`
color: #FFF;

text-align: center;

font-family: SUITE;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;

width: 294px;
height: 72px;
border-radius: 10px;
background: #5B00EF;
border: none;
cursor: pointer;
`;