// CurrentEmployCheckingModal.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 20rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
background-color: #4caf50; /* 짙은 초록색 */
color: white;
font-size: 1rem;
border: none;
border-radius: 0.5rem;
padding: 0.5rem 1rem;
cursor: pointer;
margin-top:1rem;
transition: background-color 0.2s; /* 버튼 누를 때 색상 변경 효과 */
font-family: Arial, sans-serif; /* 원하는 폰트 스타일로 변경 */
&:hover {
  background-color: #45a049; /* 눌렀을 때 색상 변경 */
}
`;

const ButtonWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const NextButton = styled.button`
  background-color: #4caf50; /* 짙은 초록색 */
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top:1rem;
  transition: background-color 0.2s; /* 버튼 누를 때 색상 변경 효과 */
  font-family: Arial, sans-serif; /* 원하는 폰트 스타일로 변경 */
  &:hover {
    background-color: #45a049; /* 눌렀을 때 색상 변경 */
  }
`;

const Note = styled.p`
  font-size: 0.8rem;
  color: #ff6666;
  text-align: left;
  margin-top: 1rem;
  font-family: Arial, sans-serif; /* 원하는 폰트 스타일로 변경 */
`;

const CurrentEmployCheckingModal = ({ isOpen, onClose, onCheck }) => {

    
const navigate = useNavigate();
  const handleNext = (e) => {
    navigate("");
  };

  return isOpen ? (
    <ModalWrapper>
      <ModalContent>
        <ModalHeader>
          <h1>잠시만요, 현직자이신가요?</h1>
          <p>현직자로 설정하면 멘토로 활동할 수 있어요.
            지금 인증할까요?</p>
        </ModalHeader>
        <ButtonWrapper>
          <CloseButton onClick={onClose}>나중에 하기</CloseButton>   {/*onClose 함수 호출*/}
          <NextButton onClick={handleNext}>인증하기</NextButton>
        </ButtonWrapper>
        </ModalContent>
    </ModalWrapper>
  ) : null;
};

export default CurrentEmployCheckingModal;
