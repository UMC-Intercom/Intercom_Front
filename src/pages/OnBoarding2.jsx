import React from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

export default function OnBoarding2() {
  const navigate = useNavigate();
  const navigateToSignUp4 = () => navigate('/signup4');

  return (
    <Container>
      <Text>관심있는 분야를 모두 선택해 주세요</Text>
      <CheckButton onClick={navigateToSignUp4}>다음</CheckButton>
      <OnboardingWrap>

        <Line1>
          <Choose2>기획·전략</Choose2>
          <Choose3>마케팅·홍보·조사</Choose3>
          <Choose3>회계·세부·재무</Choose3>
          <Choose3>인사·노무·HRD</Choose3>
        </Line1>

        <Line2>
          <Choose3>총무·법무·사무</Choose3>
          <Choose3>IT개발·데이터</Choose3>
          <Choose1>디자인</Choose1>
          <Choose3>영업·판매·무역</Choose3>
        </Line2>

        <Line3>
          <Choose3>고객상담·TM</Choose3>
          <Choose3>구매·자재·물류</Choose3>
          <Choose3>상품기획·MD</Choose3>
          <Choose3>운전·운송·배송</Choose3>
        </Line3>

        <Line4>
          <Choose1>서비스</Choose1>
          <Choose1>생산</Choose1>
          <Choose2>건설·건축</Choose2>
          <Choose1>의료</Choose1>
          <Choose1>연구·R&D</Choose1>
        </Line4>

        <Line5>
          <Choose1>교육</Choose1>
          <Choose3>미디어·문화·스포츠</Choose3>
          <Choose2>금융·보험</Choose2>
          <Choose2>공공·복지</Choose2>
        </Line5>

      </OnboardingWrap>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
`

const OnboardingWrap = styled.div`
`

const Line1 = styled.div`
width: 803;
hegiht: 58;
`

const Line2 = styled.div`
width: 803;
hegiht: 58;
`

const Line3 = styled.div`
width: 838.89;
hegiht: 58;
`

const Line4 = styled.div`
width: 811;
hegiht: 58;
`
const Line5 = styled.div`
width: 811;
hegiht: 58;
`
const Choose1 = styled.div`
width: 129.13;
hegiht: 58;
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 23.1068px;
line-height: 29px;
text-align: center;

color: #636363;

border: 2px solid #636363;
border-radius: 30.046px;

`

const Choose2 = styled.div`
width: 177.27;
hegiht: 58;
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 23.1068px;
line-height: 29px;
text-align: center;

color: #636363;

border: 2px solid #636363;
border-radius: 30.046px;

`

const Choose3 = styled.div`
width: 197.72;
hegiht: 58;
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 23.1068px;
line-height: 29px;
text-align: center;

color: #636363;

border: 2px solid #636363;
border-radius: 30.046px;

`

const Text = styled.p`
color: #000;

text-align: center;
/* T0 */
font-family: SUITE;
font-size: 50px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

export const CheckButton = styled.button`
  width: 588px;
  height: 72px;
  background-color: #5B00EF;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top:67px;
  margin-bottom:463px;
  color: #FFF;

  font-family: SUITE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

