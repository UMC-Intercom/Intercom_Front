import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TypeTestQuestion7() {
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
    // console.log(newChoice);
  }

  const navigateToQuestion = (newChoice) => {
    navigate('/type-test-question8', { state: { choice: newChoice } });
  }
  return (
    <Container>
      <TestWrap>
        <Text1>새로운 프로젝트를 시작하는데, 프로젝트의 방향성에 대해 의견이 분분하다. <br />이럴 때 나는...
        </Text1>
        <Image1 src='assets/handsup.png' />
        <Button onClick={() => handleChange('7')}>대다수의 의견을 따른다.<Arrow>&gt;</Arrow></Button>
        <Button onClick={() => handleChange('8')}>자신의 의견을 표현하며,
          다른 사람들의 의견도 존중한다. <Arrow>&gt;</Arrow></Button>
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
  display: flex;
  justify-content: space-between; /* 화살표와 텍스트를 오른쪽으로 정렬 */
  align-items: center; /* 버튼 내의 요소들을 수직으로 가운데 정렬 */

  &:hover {
    background-color: #5B00EF;
  }
  padding: 31px;
`;

const Arrow = styled.span`
  margin-left: 20px; /* 화살표와 텍스트 사이의 간격 조절 */
`;