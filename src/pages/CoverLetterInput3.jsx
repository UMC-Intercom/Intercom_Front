import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function CoverLetterInput3() {

  return (
    <SettingTitle>
      <Container>
      <Title>합격 자소서 입력하기</Title>
        <Form>
        <Text>Step 3</Text>
        <SubtitleWrap>
          <SubTitle>자소서 문항과 답변을 입력해주세요</SubTitle>
          <AddContentWrap>
            문항 추가하기
            <PlusImage src='./assets/plus.png' />
          </AddContentWrap>
          </SubtitleWrap>
        </Form>
        <SubmitButton type="submit">등록하기</SubmitButton>
      </Container>
    </SettingTitle>
  )
}

const SettingTitle = styled.div``;

const SubtitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: left;
  margin-left: 43px;
  margin-bottom: 42px;

  font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #636363;
`;

const AddContentWrap = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center; /* 가로 가운데 정렬 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #A1A1A1;
`;


const PlusImage = styled.img`
margin-left: 20.69px;
margin-right: 49.59px;
`;


const Title = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem; 
  font-weight: 600;
  margin-left: 43px; /* 왼쪽 정렬 */
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: #636363;
  max-width: 80%; 
  transition: all 0.3s ease-in-out; 

  @media (max-width: 768px) {
    font-size: 1.25rem; 
    margin-top: 2rem; 
  }

  @media (max-width: 480px) {
    font-size: 1rem; 
    margin-top: 1.5rem; 
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    width: 80%; 
    padding: 4rem; 
  }
  
  @media (max-width: 768px) {
    width: 90%; 
    padding: 3rem; 
  }
  
  @media (max-width: 480px) {
    width: 95%; 
    padding: 2rem; 
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 669px;
  background: none;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
`;

const SubTitle = styled.div`;
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #636363;
`;

const SubmitButton = styled.button`
  width: 588px;
  height: 72px;
  background: #5B00EF;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */
  text-align: center;
  color: #FFFFFF;
  margin-top: 108px;
  cursor: pointer;
`;

const Text = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
  color: #5B00EF;
  margin-top: 50px;
  margin-left: 45px;
`;