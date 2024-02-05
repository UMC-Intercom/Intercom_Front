import React, { useState } from 'react';
import { useNavigate ,useLocation  } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';


export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FormContent = styled.div`
  background: white;
  padding: 20px;
  width: 408px;
  height: 674px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 30px; 
  color: #A1A1A1; 
  cursor: pointer;
`;

export const Logo = styled.img`
  width: 200px;
  margin-top: 90px;
  margin-bottom: 30px;
  margin-left: 60px;
`;

export const Title = styled.h1`
  font-family: 'Suite-Bold', sans-serif;
  font-size: 20px;
  color: #333; 
  margin-top: -10px;
  margin-bottom: 30px;
`;


export const InputField = styled.input`
  width: 80%;
  margin-bottom: 15px;
  padding: 10px;
  border: none;
  outline: 2.5px solid #EFF0F4;
  border-radius: 0; 
  font-family: 'SUITE-Medium', sans-serif;
  height: 25px; 
  font-size: 14px; 
  &::placeholder {
    color: #A1A1A1; 
  }
`;

export const LoginButton = styled.button`
  width: 350px;
  height: 52px;
  padding: 10px;
  background-color: #5B00EF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'SUITE-Semibold', sans-serif;
  margin-top:20px;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto; 
`;

export const CheckboxLabel = styled.label`
  color: #ABABAB; 
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 15px;
  font-family: 'SUITE-Semibold', sans-serif;
`;

export const Checkbox = styled.input`
  appearance: none; 
  width: 20px;
  height: 20px;
  border: 2px solid #EFF0F4;
  border-radius: 50%;
  margin-right: 8px;
  position: relative;
  background-color: transparent; 

  &:checked {
    background-color: #5B00EF;
    border: 2px solid #5B00EF; 
  }

  &:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); 
    width: 10px; 
    height: 10px; 
    background: white; 
    border-radius: 50%; 
  }
`;

export const Link = styled.a`
  cursor: pointer;
  font-family: 'SUITE-Semibold', sans-serif;
  font-size: 15px;
`;

export const BlackLink = styled(Link)`
  color: #000; 
  text-decoration: none;
`;

export const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 26px;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 89%;
  margin-top: 8px;
`;

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, toggleLogin, stayLoggedIn, toggleStayLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/"; //이전경로 저장

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleStayLoggedInChange = (e) => toggleStayLoggedIn(e.target.checked);
  
  //모든 페이지에서 로그인 상태 유지할 수 있도록 useAuth 훅 사용해서 수정함
  //로그인시 사용자가 로그인화면 이전 진행중이던 페이지로 돌아갈 수 있도록 useLocation 훅 사용
  const handleLogin = () => {
  // 사용자 인증 처리 로직 구현 필요 (예: API 요청)
  // 예를 들어, 사용자 인증이 성공했다고 가정
  const isAuthSuccess = true; // 실제 로그인 성공 여부는 API 요청 등에 의해 결정됨 나중에 바꺼야댐

  if (isAuthSuccess) {
    toggleLogin(); 
    if (stayLoggedIn) { //로그인유지 선택시 로그인 상태를 로컬 스토리지에 저장 (창 닫았다가 다시 켜도 로그인상태 유지)
      localStorage.setItem('isLoggedIn', true);
    } 
    else {
      localStorage.removeItem('isLoggedIn');
    }
    navigate(from, { replace: true }); //로그인하면 이전으로돌아가깅
  } 
  else {
    alert('로그인에 실패했습니다.');
  }
};


const navigateToSignUp = () => navigate('/signup');
const navigateToFindingEmail = () => navigate('/findingemail');


  return (
    <PageContainer>
      <FormContent>
        <Logo src="./assets/Logo.png" alt="logo" />
        <Title>로그인</Title>
        <InputField type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} />
        <InputField type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} />
        <FlexRow>
          <CheckboxContainer>
            <Checkbox id="stayLoggedIn" type="checkbox" checked={stayLoggedIn} onChange={handleStayLoggedInChange} />
            <CheckboxLabel htmlFor="stayLoggedIn">로그인 유지</CheckboxLabel>
          </CheckboxContainer>
          <Link style={{ color: '#636363', textDecoration: 'underline', fontSize: '15px', marginRight: '8px'}} onClick={() => console.log('비밀번호 찾기')}>
            비밀번호 찾기
          </Link>
        </FlexRow>
        <LoginButton onClick={handleLogin}>로그인</LoginButton>
        <LinksContainer>
        <BlackLink onClick={navigateToSignUp}>회원가입</BlackLink>
          <span style={{ color: '#000', margin: '0 10px' }}>|</span>
          <BlackLink onClick={navigateToFindingEmail}>이메일 찾기</BlackLink>        </LinksContainer>
      </FormContent>
    </PageContainer>
  );
};

export default Join;
