import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function TypeTestQuestion1() {
    const navigate = useNavigate();
    const navigateToQuestion2 = () => navigate('/type-test-question2');

  return (
    <Container>
        <TestWrap>
            <Text1>프로젝트의 마감이 코 앞인데 아직 해결해야 할 문제가 있다.<br/>이럴 때 나는...
            </Text1>
            <Image1 src='assets/golddol.png'/>
        </TestWrap>
        <Button1 onClick={navigateToQuestion2}>팀원들과 회의를 통해 해결 방안을 모색한다. &nbsp; &nbsp; {'>'}</Button1>
        <Button2 onClick={navigateToQuestion2}>혼자 문제를 분석하고 해결 방안을 찾는다. &nbsp; &nbsp; {'>'}</Button2>
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
font-weight: 700;
font-size: 30px;
line-height: 42px;
/* or 140% */
text-align: center;

color: #000000;

margin-top: 199px;
margin-bottom: 16px;
`;


const Image1 = styled.img`
    margin-top:30px;
    margin-bottom:50px;
`;

const Button1 = styled.button`
cursor: pointer;
width: 555px;
height: 137px;

background: #A1A1A1;
border-radius: 10px;
border: none;

font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 25px;
line-height: 38px;
/* identical to box height, or 150% */

color: #FFFFFF;
\
margin-bottom: 24px;
`;

const Button2 = styled.button`
cursor: pointer;
width: 555px;
height: 137px;

background: #5B00EF;
border-radius: 10px;
border: none;

font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 25px;
line-height: 38px;
/* identical to box height, or 150% */

color: #FFFFFF;

margin-bottom: 296px;
`;
