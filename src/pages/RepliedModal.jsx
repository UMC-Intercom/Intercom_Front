import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RepliedModal = ({ isOpen, onClose}) => {
  const handleClose = () => {
    onClose(); // 모달 닫기 함수를 호출
    window.location.reload(); // 페이지 새로고침
  };
    return (
        <>
            {isOpen && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalContent>
                            <ModalText>+2 코인</ModalText>
                            <Coin>답변을 작성하고 2코인을 받았어요!</Coin> 
                            <CoinImg src="/assets/coinTalk.png"/>
                            <ModalButtons>
                                <CancelButton onClick={handleClose}>확인</CancelButton>
                            </ModalButtons>
                        </ModalContent>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </>
    );
};
const CoinImg = styled.img`
width: 106px;
height: 106px;
margin-bottom: 20px;
margin-top: -80px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); 
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  
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
margin-top:100px;
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
margin-bottom:138px;
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


export default RepliedModal;
