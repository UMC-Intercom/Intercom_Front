import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function TypeTestQuestion3() {
  const navigate = useNavigate();
  const navigateToQuestion = () => navigate('/type-test-question4');

  return (
    <Container>
      <TestWrap>
        <Text1>새로운 프로젝트를 맡게 되었다.<br />이럴 때 나는...
        </Text1>
        <Image1 src='assets/notebookperson.png' />
        <Button onClick={navigateToQuestion}>자유롭게 아이디어를 제안하고 이를 실현하는 방향을 선호한다. <Arrow>&gt;</Arrow></Button>
        <Button onClick={navigateToQuestion}>상사의 지시를 따르면서 프로젝트를 진행하는 것을 선호한다. <Arrow>&gt;</Arrow></Button>
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
