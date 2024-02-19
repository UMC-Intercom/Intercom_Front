import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Deactivate3 = () => {
    const navigate = useNavigate();

    const handleNextDeactivate = () => {
        navigate('/deactivate-account4');
    };

  return (
    <DeactivateContainer>
      <Title>회원 탈퇴하기 전에 확인해주세요</Title>
      <InstructionsList>
        <li>내 커리어에 입력해 둔 이력서 및 자기소개는 더 이상 열람 및 수정이 어려워요 </li>
        <li>탈퇴 후 정보를 열람할 수 없지만 저장해 둔 이력서를 PDF 파일로 내려 받을 수 있어요</li>
        <li>다시 가입하더라도 이전에 저장해둔 기록를 불러올 수 없어요</li>
        <li>확인했죠?</li>
        <li>진짜 탈퇴해요?</li>
      </InstructionsList>
      <NextButton onClick={handleNextDeactivate}>다음</NextButton>
    </DeactivateContainer>
  );
};

export default Deactivate3;

const DeactivateContainer = styled.div`
    font-family: SUITE;
    padding: 2rem;
    max-width: 50rem;
    margin: auto;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 2rem;
    color: #000;
    font-weight: 700;
    margin-top: 11rem;
    margin-bottom: 4rem;
`;

const InstructionsList = styled.ul`
    color: #636363;
    font-size: 1.25rem;
    list-style-type: none;
    line-height: 1.875rem;
    text-align: left;
    margin-left: 3rem;

    li {
        position: relative; 
        padding-left: 2rem; 
        margin-bottom: 2.19rem;

        &::before {
            content: ''; 
            position: absolute;
            left: 0; 
            top: 50%;
            transform: translateY(-50%);
            width: 1.2rem;
            height: 1.2rem; 
            background-image: url('./assets/Caution.png');
            background-size: cover;
        }
    }

    li:last-child {
        margin-bottom: 6.88rem; /* 마지막 리스트 항목의 하단 간격을 제거합니다. */
    }
`;


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

    &:hover {
    background-color: #4a00d1;
    }
`;
