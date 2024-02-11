//비밀번호 찾기
import React, {useState} from 'react'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import fakeUsersData from '../data/fakeUsersData';

export default function FindingPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        findPassword();
    }
  };

  const findPassword = () => {
    const foundUser = fakeUsersData.find(user => user.email === email);

    if (foundUser) {
        navigate('/settingPwd', { state: { user: foundUser } });
    } else {
        setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
    <Text1>비밀번호 찾기</Text1>
    <Text2>이메일</Text2>
    <InputField
        type="text"  
        placeholder="이메일 입력하기"
        value={email}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      {isModalOpen && (
        <ModalBackdrop onClick={closeModal}>
          <ModalView onClick={e => e.stopPropagation()}>
            이메일에 일치하는 비밀번호가 없습니다.
          </ModalView>
        </ModalBackdrop>
      )}
    </Container>
  )
}

const Container = styled.div`
text-align: center;
margin-top: -7rem;
`;

const Text1 = styled.p`
color: #000;

font-family: SUITE;
font-size: 3.125rem;
font-style: normal;
font-weight: 700;
line-height: normal;

margin-top:18.13rem;
margin-bottom:0.62rem;
`;

const Text2 = styled.p`
color: #000;

font-family: SUITE;
font-size: 1.5625rem;
font-style: normal;
font-weight: 600;


margin: 0;
margin-top: 2.34375rem; 
margin-left: -27rem;
`;

export const InputField = styled.input`
width: 30.375rem;
height: 4rem;
border-radius: 0.625rem;
border: 3px solid #E2E2E2;

color: #A1A1A1;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;

margin-top:1rem;
margin-bottom:42.81rem;
padding-left: 1.44rem;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2; 
`;

const ModalView = styled.div`
  width: 18.75rem;
  background-color: white;
  padding: 1.25rem;
  border-radius: 0.625rem;
  text-align: center;
  box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
`;
