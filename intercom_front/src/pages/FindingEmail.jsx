//이메일 찾기
import React, {useState} from 'react'
import styled, {css} from "styled-components";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../path/config';
//import fakeUsersData from '../data/fakeUsersData';

export default function FindingEmail() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);

  const validatePhoneNumber = (number) => {
    const regex = /^010\d{8}$/;
    return regex.test(number);
  };

  const handleInputChange = (e) => {
    const inputNumber = e.target.value;
    setPhoneNumber(inputNumber);
    setIsValidNumber(validatePhoneNumber(inputNumber));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValidNumber) {
      findEmail();
    }
  };

  const findEmail = () => {
    if (!isValidNumber) return;

    axios.post(`${process.env.REACT_APP_API_URL}/users/find-email`, { phone: phoneNumber })
      .then(response => {
        // 서버에서 응답으로 사용자 정보를 받았다고 가정
        navigate('/findedemail', { state: { user: response.data } });
      })
      .catch(error => {
        console.error('이메일 찾기 실패:', error);
        navigate('/unfindedemail');
      });
  };

  return (
    <Container>
    <Text1>이메일 찾기</Text1>
    <Text2>가입시 기재했던 휴대폰 번호를 입력해주세요</Text2>
    <InputField
        type="text"  
        placeholder="휴대폰 번호 입력하기"
        value={phoneNumber}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
    <CheckButton onClick={findEmail} disabled={!isValidNumber}>다음</CheckButton>
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
line-height: 2.34375rem; 

margin: 0;
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

margin-top:2.06rem;
margin-bottom:3.19rem;
padding-left: 1.44rem;
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