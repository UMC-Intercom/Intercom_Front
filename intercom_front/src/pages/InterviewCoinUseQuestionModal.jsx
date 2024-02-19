import React, { useState } from 'react';
import styled from 'styled-components';
import InterviewCoinUseModal from './InterviewCoinUseModal';

const InterviewCoinUseQuestionModal = ({ isOpen, onClose, selectedItem }) => {
  const [coinUseModalOpen, setCoinUseModalOpen] = useState(false);

  const handleConfirm = () => {
      setCoinUseModalOpen(true);
  };

  const handleClose = () => {
      onClose();
      setCoinUseModalOpen(false);
  };

  return (
      <>
          {isOpen && (
              <>
                  <ModalOverlay>
                      <ModalContainer>
                          <ModalContent>
                              <ModalText>20코인을 사용하여<br/>글을 열람 할까요?</ModalText>
                              <ModalButtons>
                                  <CancelButton onClick={onClose}>취소</CancelButton>
                                  <ConfirmButton onClick={handleConfirm}>사용하기</ConfirmButton>
                              </ModalButtons>
                          </ModalContent>
                      </ModalContainer>
                  </ModalOverlay>
                  <InterviewCoinUseModal isOpen={coinUseModalOpen} onClose={handleClose} selectedItem={selectedItem}/>
              </>
          )}
      </>
  );
};


// 나머지 코드는 동일합니다.


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); /* 배경색 투명하게 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 834px;
  height: 581px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #A1A1A1;
`;

const ModalContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const ModalText = styled.p`
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 62px;
text-align: center;

color: #000000;
margin-bottom:135px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled(Button)`
  /* 추가된 스타일 */
  width: 200px;
  height: 64px;
  background: #A1A1A1;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #FFFFFF;
`;

const ConfirmButton = styled(Button)`
  /* 추가된 스타일 */
  width: 200px;
  height: 64px;
  background: #5B00EF;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  color: #FFFFFF;
`;


export default InterviewCoinUseQuestionModal;
