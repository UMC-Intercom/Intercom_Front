// CurrentEmployCheckingModal.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ActionButtons from "./ActionButtons";
import RepliedModal from "./RepliedModal"; // RepliedModal 컴포넌트를 불러옵니다.

const ReplyInput = styled.textarea`
margin: 20px auto;
  width: 613px;
  height: 269px;
  margin-bottom: 43px;
  padding: 28px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-family: SUITE;
  resize: none;
  outline: none;
  &:focus {
    border: 1px solid #ccc;
  }
`;
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

position: relative; 
background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 834px;
  height: 581px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ModalHeader = styled.div`
  align-items: center;

`;

const CloseButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #A1A1A1;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: SUITE;
  &:hover {
    background-color: #848484;
  }
  &:active {
    background-color: #6a6a6a;
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  top: 20px;
  left: 31px;
 
  cursor: pointer;
  font-size: 40px;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center; // 버튼을 중앙에 배치합니다.
  align-items: center;
`;




const NextButton = styled.button`
  background-color: #5B00EF;
  width: 200px;
  height: 64px;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: SUITE;
  &:hover {
    background-color: #3e0089;
  }
  &:active {
    background-color: #2d0066;
  }
`;
const Note = styled.div`
  font-size: 30px;
  color: black;

  margin-top: 70px;
  font-family:SUITE;
  font-weight: 700;
`;




const ReplyModal = ({ isOpen, onClose, postId }) => {
  const [reply, setReply] = useState("");
  const [isRepliedModalOpen, setIsRepliedModalOpen] = useState(false); // RepliedModal 표시 여부 상태
  const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const submitReply = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/comments`, {
        talkId: postId,
        content: reply
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log("답변 제출 성공:", response.data);
        setIsRepliedModalOpen(true); // RepliedModal을 표시하도록 상태 업데이트
      
      }
    } catch (error) {
      console.error("답변 제출 실패:", error);
    }
    
  };

  return (
    <>
      {isOpen && !isRepliedModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <CloseIcon onClick={onClose}>&times;</CloseIcon>
            <ModalHeader>
              <Note>톡톡 답변 작성하기</Note>
              <ReplyInput value={reply} onChange={handleReplyChange} placeholder="글을 입력해주세요" />
            </ModalHeader>
            <ButtonWrapper>
              <NextButton onClick={submitReply}>등록하기</NextButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalWrapper>
      )}
      {isRepliedModalOpen && (
        <RepliedModal
          isOpen={isRepliedModalOpen}
          onClose={() => {
            setIsRepliedModalOpen(false);
            onClose(); // 원래의 ReplyModal도 닫기
          }}
        />
      )}
    </>
  );
};

export default ReplyModal;