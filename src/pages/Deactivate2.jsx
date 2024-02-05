import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeUserData from '../data/fakeUserData'; // 경로는 실제 경로에 맞게 조정해주세요.

const reasons = [
  "자주 이용하지 않아요",
  "다른 사이트가 더 유용해요",
  "커뮤니티 기능이 불만족스러워요",
  "공고 업데이트가 느려요",
  "원하는 내용이 없어요",
  "취업했어요",
  "기타 이유"
];

const Deactivate2 = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState('');

  const handleReasonChange = (e) => {
    setSelectedReason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedReason) {
      console.log(selectedReason); // 선택된 이유를 콘솔에 출력하거나 처리
      navigate('/deactivate-account3');// 다음 페이지로 이동
    } else {
      alert('탈퇴 이유를 선택해주세요.');
    }
  };

  return (
    <DeactivateContainer>
      <Title>회원 탈퇴를 결정하신 이유를 선택해주세요</Title>
      <Form onSubmit={handleSubmit}>
        {reasons.map((reason, index) => (
          <Label key={index}>
            <RadioInput 
              type="radio" 
              name="reason" 
              value={reason} 
              onChange={handleReasonChange} 
              checked={selectedReason === reason}
            />
            {reason}
          </Label>
        ))}
        <NextButton type="submit">다음</NextButton>
      </Form>
    </DeactivateContainer>
  );
};

export default Deactivate2;

const DeactivateContainer = styled.div`
  font-family: SUITE;
  padding: 2rem;
  max-width: 43rem;
  text-align: center;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: #333;
  margin-top: 13rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const Form = styled.form`
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    margin-left: 5rem;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    color: #333;
    cursor: pointer;
`;

const RadioLabel = styled.label`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    margin-left: 5rem;
    margin-right: 2rem; // 각 라디오 버튼 사이 간격

    & input {
        appearance: none; // 기본 스타일 제거
        -webkit-appearance: none; // Safari를 위한 기본 스타일 제거
        border: 1rem solid #E2E2E2;
        border-radius: 50%; // 원형 테두리
        width: 1em; // 너비
        height: 1em; // 높이
        margin-right: 0.4em; // 텍스트와의 간격

        &:checked {
            background-color: #5B00EF; // 선택 시 보라색으로 채움
            border: 1rem solid #5B00EF; // 선택 시 보라색 테두리
            position: relative; // 가상 요소를 위한 포지셔닝 컨텍스트
        }
  
      &:checked::after {
        content: ''; // 가상 요소에는 내용이 없음
        position: absolute; // 부모 요소(input) 기준으로 절대 위치
        top: 50%; // 상위 요소의 정중앙
        left: 50%; // 상위 요소의 정중앙
        transform: translate(-50%, -50%); // 정확한 중앙에 위치
        width: 1rem; // 내부 원의 너비
        height: 1rem; // 내부 원의 높이
        border-radius: 50%; // 원형
        background: #fff; // 내부 원의 배경색은 흰색
      }
  }
  
`;

const RadioInput = ({ className, label, ...props }) => (
  <RadioLabel className={className}>
    <input type="radio" {...props} />
    {label}
  </RadioLabel>
);

const NextButton = styled.button`
  background-color: #5B00EF;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  width: 36.75rem;
  height: 4.5rem;
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 5rem;

  &:hover {
    background-color: #4a00d1;
  }
`;
