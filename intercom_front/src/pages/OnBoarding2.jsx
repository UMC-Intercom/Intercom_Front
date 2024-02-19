import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function OnBoarding2() {
  const navigate = useNavigate();
  const userNickname = localStorage.getItem('userNickname');

  const navigateToSignUp4 = () => {
    // 서버
    axios.post(`${process.env.REACT_APP_API_URL}/users/interests?nickname=${userNickname}`, selectedStr)
        .then(response => {
          alert('관심분야가 저장되었습니다.');
          navigate('/signup4');
        })
        .catch(error => {
          console.error('관심분야 저장 실패:', error);
          alert('관심분야 저장에 실패하였습니다.');
        });
  }

  const [selected, setSelected] = useState([]);

  const handleChooseClick = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(item => item !== index));
    } else {
      setSelected([...selected, index]);
    }
    
    // console.log(selected);
    console.log(selectedStr);
  };
  
  // 선택된 버튼의 텍스트를 리스트로 변환
  const selectedStr = selected.map(index => {
    switch (index) {
      case 0: return "기획·전략";
      case 1: return "마케팅·홍보·조사";
      case 2: return "회계·세부·재무";
      case 3: return "인사·노무·HRD";
      case 4: return "총무·법무·사무";
      case 5: return "IT개발·데이터";
      case 6: return "디자인";
      case 7: return "영업·판매·무역";
      case 8: return "고객상담·TM";
      case 9: return "구매·자재·물류";
      case 10: return "상품기획·MD";
      case 11: return "운전·운송·배송";
      case 12: return "서비스";
      case 13: return "생산";
      case 14: return "건설·건축";
      case 15: return "의료";
      case 16: return "연구·R&D";
      case 17: return "교육";
      case 18: return "미디어·문화·스포츠";
      case 19: return "금융·보험";
      case 20: return "공공·복지";
      default: return "";
    }
  });

  return (
    <Container>
      <Text>관심있는 분야를 모두 선택해 주세요</Text>
      <OnboardingWrap>

        <Line1>
          <Choose2 selected={selected.includes(0)} onClick={() => handleChooseClick(0)}>기획·전략</Choose2>
          <Choose3 selected={selected.includes(1)} onClick={() => handleChooseClick(1)}>마케팅·홍보·조사</Choose3>
          <Choose3 selected={selected.includes(2)} onClick={() => handleChooseClick(2)}>회계·세부·재무</Choose3>
          <Choose3 selected={selected.includes(3)} onClick={() => handleChooseClick(3)}>인사·노무·HRD</Choose3>
        </Line1>

        <Line2>
          <Choose3 selected={selected.includes(4)} onClick={() => handleChooseClick(4)}>총무·법무·사무</Choose3>
          <Choose3 selected={selected.includes(5)} onClick={() => handleChooseClick(5)}>IT개발·데이터</Choose3>
          <Choose1 selected={selected.includes(6)} onClick={() => handleChooseClick(6)}>디자인</Choose1>
          <Choose3 selected={selected.includes(7)} onClick={() => handleChooseClick(7)}>영업·판매·무역</Choose3>
        </Line2>

        <Line3>
          <Choose3 selected={selected.includes(8)} onClick={() => handleChooseClick(8)}>고객상담·TM</Choose3>
          <Choose3 selected={selected.includes(9)} onClick={() => handleChooseClick(9)}>구매·자재·물류</Choose3>
          <Choose3 selected={selected.includes(10)} onClick={() => handleChooseClick(10)}>상품기획·MD</Choose3>
          <Choose3 selected={selected.includes(11)} onClick={() => handleChooseClick(11)}>운전·운송·배송</Choose3>
        </Line3>

        <Line4>
          <Choose1 selected={selected.includes(12)} onClick={() => handleChooseClick(12)}>서비스</Choose1>
          <Choose1 selected={selected.includes(13)} onClick={() => handleChooseClick(13)}>생산</Choose1>
          <Choose2 selected={selected.includes(14)} onClick={() => handleChooseClick(14)}>건설·건축</Choose2>
          <Choose1 selected={selected.includes(15)} onClick={() => handleChooseClick(15)}>의료</Choose1>
          <Choose1 selected={selected.includes(16)} onClick={() => handleChooseClick(16)}>연구·R&D</Choose1>
        </Line4>

        <Line5>
          <Choose1 selected={selected.includes(17)} onClick={() => handleChooseClick(17)}>교육</Choose1>
          <Choose3 selected={selected.includes(18)} onClick={() => handleChooseClick(18)}>미디어·문화·스포츠</Choose3>
          <Choose2 selected={selected.includes(19)} onClick={() => handleChooseClick(19)}>금융·보험</Choose2>
          <Choose2 selected={selected.includes(20)} onClick={() => handleChooseClick(20)}>공공·복지</Choose2>
        </Line5>

      </OnboardingWrap>
      <CheckButton onClick={navigateToSignUp4}>다음</CheckButton>
      
    </Container>
  )
}

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OnboardingWrap = styled.div`
`;

const Line = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Line1 = styled(Line)`
  height: 58px;
`;

const Line2 = styled(Line)`
  height: 58px;
`;

const Line3 = styled(Line)`
  height: 58px;
`;

const Line4 = styled(Line)`
  height: 58px;
`;

const Line5 = styled(Line)`
  height: 58px;
`;

const Choose = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 23.1068px;
  line-height: 29px;
  text-align: center;
  color: ${props => props.selected ? '#FFF' : '#636363'};
  background-color: ${props => props.selected ? '#636363' : '#FFF'};
  border: 2px solid #636363;
  border-radius: 30.046px;
  width: 197.72px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 16px 0 0;
`;

const Choose1 = styled(Choose)`
  width: 129.13px;
`;

const Choose2 = styled(Choose)`
  width: 177.27px;
`;

const Choose3 = styled(Choose)`
  width: 197.72px;
`;

const Text = styled.p`
  color: #000;
  text-align: center;
  font-family: SUITE;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 224px 0 57px 0;
`;

export const CheckButton = styled.button`
  width: 588px;
  height: 72px;
  background-color: #5B00EF;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 67px;
  margin-bottom: 463px;
  color: #FFF;
  font-family: SUITE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
