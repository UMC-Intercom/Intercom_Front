import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function TypeTestHome() {
    const navigate = useNavigate();
    const navigateToHome = () => navigate('/type-test-question1');

  return (
    <Container>
        <TestWrap>
            <Text1>직장인 유형 테스트</Text1>
            <Text2>나는 어떤 나무로 성장할까?</Text2>
            <Image1 src='assets/questionIcon.png'/>
            <Image2 src='assets/onion.png'/>
        </TestWrap>
        <Button onClick={navigateToHome}>테스트 시작하기</Button>
    </Container>
  )
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TestWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Text1 = styled.div`
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 800;
    font-size: 25px;
    line-height: 31px;
    text-align: center;
    color: #636363;

    margin-top: 199px;
    margin-bottom: 16px;
`;

const Text2 = styled.div`
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 50px;
    line-height: 62px;
    text-align: center;
    color: #000000;
`;

const Image1 = styled.img`
    width: 50px;
    height: 90px;
    margin-top:38px;
    margin-bottom:15px;
`;

const Image2 = styled.img`
    width: 217px;
    height: 310px;
`;

const Button = styled.button`
    width: 332px;
    height: 72px;
    background: #5B00EF;
    border: none; /* 테두리 없애기 */
    border-radius: 10px;
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;

    margin-top:72px;
    margin-bottom:248px;
`;
