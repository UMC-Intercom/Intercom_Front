import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

function countOccurrences(str, char) {
  // 문자열에서 특정 문자가 몇 개 있는지 세는 함수
  return str.split(char).length - 1;
}

export default function TypeTestQuestion8() {
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

    const filteringResult1Num = newChoice.split('').filter(char => char !== '1' && char !== '2').join('');
    const filteringResult2_1Num = newChoice.split('').filter(char => char !== '2' && char !== '3').join('');
    const filteringResult2_2Num = newChoice.split('').filter(char => char !== '4' && char !== '5').join('');
    const filteringResult3Num = newChoice.split('').filter(char => char !== '2' && char !== '3').join('');
    
    if (filteringResult1Num === '04674' && countOccurrences(newChoice, '2') >= 2) { //느티(안정)
      navigate('/type-test-result1');
    } 
    else if (filteringResult2_1Num === '15585' && countOccurrences(newChoice, '3') >= 2) { //자작(도전)
      navigate('/type-test-result2');
    }
    else if (filteringResult2_2Num === '13338' && countOccurrences(newChoice, '5') >= 2) { //자작(연봉)
      navigate('/type-test-result2');
    }
    else if (filteringResult3Num === '04684' && countOccurrences(newChoice, '3') >= 2) { //버드(도전)
      navigate('/type-test-result3');
    }
    else if (filteringResult2_1Num === '15575' && countOccurrences(newChoice, '2') >= 2) { //선인장(안정)
      navigate('/type-test-result4');
    }
    else if (filteringResult2_2Num === '12227' && countOccurrences(newChoice, '5') >= 2) { //선인장(연봉)
      navigate('/type-test-result4');
    }
    else {
      navigate('/type-test-result5'); // 그 외는 대나무
    }
    
  }
  return (
    <Container>
      <TestWrap>
        <Text1>연봉 인상과 주4일 근무, <br /> 나의 선택은? 
        </Text1>
        <Image1 src='assets/money.png' />
        <Button onClick={() => handleChange('5')}>연봉 인상을 선택한다.<Arrow>&gt;</Arrow></Button>
        <Button onClick={() => handleChange('4')}>주4일 근무를 선택한다.<Arrow>&gt;</Arrow></Button>
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