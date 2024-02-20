import React, { useState } from 'react';
import styled from 'styled-components';

const AdoptModal = ({ isOpen, onClose, onConfirm }) => {

    return (
        <>
            {isOpen && (
                <>
                    <ModalOverlay>
                        <ModalContainer>
                            <ModalContent>
                                <ModalText>채택하시겠어요?</ModalText>
                                <Coin>한번 채택하시면 변경이 어려워요</Coin> 
                                <ModalButtons>
                                    <CancelButton onClick={onClose}>취소</CancelButton>
                                    <ConfirmButton onClick={onConfirm }>확인</ConfirmButton>
                                </ModalButtons>
                            </ModalContent>
                        </ModalContainer>
                    </ModalOverlay>
                </>
            )}
        </>
    );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 834px;
  height: 581px;
  border: 1px solid #A1A1A1;
  background-color: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
margin-bottom: 21px;
`;

const Coin = styled.p`
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 25px;
line-height: 38px;
/* identical to box height, or 150% */
text-align: center;

color: #636363;
margin-bottom: 138px;
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


export default AdoptModal;
