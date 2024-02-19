//비밀번호 찾기
import React, {useState} from 'react'
import styled, {css} from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../path/config';

export default function FindingPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setIsValidEmail(validateEmail(inputEmail));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValidEmail) {
        findPassword();
    }
  };

  const findPassword = () => {
    if (!isValidEmail) {
      setIsModalOpen(true); // 유효하지 않은 이메일 형식으로 모달 표시
      return;
    }

    axios.post(`${process.env.REACT_APP_API_URL}/users/check-email`, { email })
      .then(response => {
        navigate('/settingPwd', { state: { email: email } });
      })
      .catch(error => {
        console.error('비밀번호 찾기 실패:', error);
        setIsModalOpen(true); // 서버 측 오류로 모달 표시
      });
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
      <CheckButton onClick={findPassword} disabled={!isValidEmail}>다음</CheckButton>
        {isModalOpen && (
          <ModalBackdrop onClick={() => setIsModalOpen(false)}>
            <ModalView onClick={(e) => e.stopPropagation()}>
              존재하지 않은 이메일입니다.<br/>
              <CloseButton onClick={() => setIsModalOpen(false)}>닫기</CloseButton>
            </ModalView>
          </ModalBackdrop>
        )}
    </Container>
  )
}

const Container = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
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
margin-bottom:3.19rem;
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

const CloseButton = styled.button`
    font-family:SUITE;
    background-color: #5B00EF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
`;

export const CheckButton = styled.button`
  width: 36.75rem;
  height: 4.5rem;
  background-color: #5B00EF;
  ${props => props.disabled && css`
    background-color: #A1A1A1; // 비활성화 상태일 때의 색상
    cursor: not-allowed;
  `}
  border: none;
  border-radius: 0.625rem;
  cursor: pointer;
  color: #FFF;

  text-align: center;
  /* B2 */
  font-family: SUITE;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
