import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function TypeTestHome() {
    const navigate = useNavigate();
    const navigateToHome = () => navigate('/home');

  return (
    <Container>
        <TestWrap>
            <Text1>직장인 유형 테스트</Text1>
            <Text2>나는 어떤 나무로 성장할까?</Text2>
            <img src='./assets/양파.png' alt='양파' />
            <Button>테스트 시작하기</Button>
        </TestWrap>
    </Container>
  )
}

const Container = styled.div`

`
const TestWrap = styled.div`

`
const Text1 = styled.div`
/* 직장인 유형 테스트 */

/* T2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 800;
font-size: 25px;
line-height: 31px;
text-align: center;

color: #636363;
`
const Text2 = styled.div`
/* 나는 어떤 나무로 성장할까? */

font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 62px;
text-align: center;

color: #000000;
`
const Image = styled.img`

`
const Button = styled.button`
/* Rectangle 141 */
width: 332px;
height: 72px;
background: #5B00EF;
border-radius: 10px;

/* 테스트 시작하기 */
width: 145px;
height: 25px;

/* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */
text-align: center;

color: #FFFFFF;


`
