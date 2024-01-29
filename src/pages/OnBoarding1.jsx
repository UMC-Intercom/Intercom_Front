import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function OnBoarding1() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const handleCheckBoxClick = (value) => {
    setSelected(value);
  };

  const navigateToOnBoarding2 = () => navigate('/onboarding2');

  return (
    <Container>
      <Text>관심있는 기업 형태를 모두 선택해주세요</Text>
      <ButtonBoxContainer>
        <CheckBox onClick={() => handleCheckBoxClick('startup')} selected={selected === 'startup'}>
          스타트업
        </CheckBox>
        <CheckBox onClick={() => handleCheckBoxClick('large')} selected={selected === 'large'}>
          대기업
        </CheckBox>
        <CheckBox onClick={() => handleCheckBoxClick('foreign')} selected={selected === 'foreign'}>
          외국계
        </CheckBox>
      </ButtonBoxContainer>
      <CheckButton onClick={navigateToOnBoarding2} disabled={!selected}>
        다음
      </CheckButton>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;

  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
`;

const ButtonBoxContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem; /* 버튼 간의 간격 조절 */
`;

const CheckBox = styled.button`
  width: 26.5rem;
  height: 4.5rem;
  border-radius: 0.625rem;
  border: 2px solid ${(props) => (props.selected ? '#636363' : 'transparent')};
  background-color: ${(props) => (props.selected ? '#636363' : 'none')};
  color: ${(props) => (props.selected ? '#fff' : '#636363')};
  text-align: center;
  font-family: SUITE;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? '#636363' : '#f0f0f0')};
    color: ${(props) => (props.selected ? '#fff' : '#000')};
  }
`;

const Text = styled.p`
  color: #000;

  text-align: center;
  /* T0 */
  font-family: SUITE;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 14rem;
  margin-bottom: 3.81rem;
`;

export const CheckButton = styled.button`
width: 36.75rem;
height: 4.5rem;
  background-color: ${(props) => (props.disabled ? '#A1A1A1' : '#5b00ef')};
  border: none;
  border-radius: 10px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  margin-top: 12.81rem;
  margin-bottom: 17.37rem;
  color: #fff;
  font-family: SUITE;
  font-size: 1.5625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#A1A1A1' : '#4c00cc')};
  }
`;
