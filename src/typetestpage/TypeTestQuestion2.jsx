import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TypeTestQuestion2() {
    const navigate = useNavigate();
    const location = useLocation();

    const [choice, setChoice] = useState('');

    useEffect(() => {
        const receivedChoice = location.state?.choice || '';
        setChoice(receivedChoice);
    }, [location.state]);

    const handleChange = (input) => {
        const newChoice = choice + input;
        setChoice(newChoice);
        navigateToQuestion(newChoice);
    }

    const navigateToQuestion = (newChoice) => {
        navigate('/type-test-question3', { state: { choice: newChoice } });
    }
  
  return (
    <Container>
        <TestWrap>
            <Text1>회사에서 새로운 사업 아이디어 제안의 기회가 생겼다.<br/>이럴 때 나는...
            </Text1>
            <Image1 src='assets/bulb.png'/>
            <Button onClick={() => handleChange('0')}>기존의 안정적인 업무를 유지하는 것을 선택한다.{'>'}</Button>
        <Button onClick={() => handleChange('1')}>새로운 사업 아이디어를 제안하고 이를 주도한다. {'>'}</Button>
        </TestWrap>
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
    margin-bottom: 296px;
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

const Button = styled.button`
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
margin-bottom: 24px;

&:hover {
    background-color: #5B00EF;
  }
`;