import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SettingPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkPwd1, setCheckPwd1] = useState(false);
  const [checkPwd2, setCheckPwd2] = useState(false);
  const [checkPwd3, setCheckPwd3] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      // 비밀번호 업데이트 로직
      navigate('/');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

//비밀번호 유효성 체크 세개를 위한 함수
// 1) 소문자포함여부, 글자수는 8~20자   
    const hasLowerCaseAndValidLength = (password) => {
        return /^(?=.*[a-z]).{8,20}$/.test(password);
    };
    // 2) 대문자 포함 여부
    const hasUpperCase = (password) => {
        return /[A-Z]/.test(password);
    };
  // 3) 특수문자(!@#$%^*+=-) 포함여부
    const hasSpecialCharacter = (password) => {
        return /[!@#$%^*+=-]/.test(password);
    };

    //비밀번호 조건 1~3
    const onChangePassword = (e) => {
        const currPwd = e.target.value;
        setPassword(currPwd);
        setCheckPwd1(hasLowerCaseAndValidLength(currPwd));
        setCheckPwd2(hasUpperCase(currPwd));
        setCheckPwd3(hasSpecialCharacter(currPwd));
    };
  

  return (
    <Container>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handleSubmit}>
        <InputLabel>새 비밀번호 등록</InputLabel>
        <Input
          type="password"
          value={password}
          placeholder="새 비밀번호 입력하기"
          onChange={onChangePassword}
          required
        />
        <Check>
        {checkPwd1 !== null && (
          <img
            className='check'
            src={checkPwd1 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="비밀번호수 제한 확인"
            style={{ width: '17px', height: '11px', marginRight: '5px',  marginLeft:'10px'}} // 변경필요
          />
        )} 영문 8~20자
                {checkPwd2 !== null && (
          <img
            src={checkPwd2 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="대문자 포함 확인"
            style={{width: '17px', height: '11px', marginRight: '5px', marginLeft:'70px' }} // 변경필요
          />
        )} 대문자 포함
                {checkPwd3 !== null && (
          <img
            src={checkPwd3 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="특수문자 포함 확인"
            style={{ width: '17px', height: '11px', marginRight: '5px',  marginLeft:'70px'}} // 변경필요
          />
        )} 특수문자
        </Check>
        <InputLabel>새 비밀번호 확인</InputLabel>
        <Input
          type="password"
          value={confirmPassword}
          placeholder="새 비밀번호 확인하기"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <SubmitButton type="submit">비밀번호 재설정</SubmitButton>
      </Form>
    </Container>
  );
};

export default SettingPassword;

// 스타일 컴포넌트
const Container = styled.div`
    margin-top: -7rem;
  font-family: SUITE;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
    color: #000;

    font-family: SUITE;
    font-size: 3.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top:18.13rem;
    margin-bottom:0.62rem;
`;

const Form = styled.form`
  width : 30.375rem;
  max-width: 400px;
  margin-left: -7rem;
  margin-top: 2rem;
`;

const InputLabel = styled.label`
    margin-bottom: 0.5rem;
    color: #000;

    font-family: SUITE;
    font-size: 1.5625rem;
    font-style: normal;
    font-weight: 600;


    margin: 0;
    margin-top: 2.34375rem;
`;

const Input = styled.input`
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
    margin-bottom: 1rem;
    padding-left: 1.44rem;
`;

const Check = styled.div`
  display: flex;
  width: 120%;
  margin-bottom: 3rem;
`;

const SubmitButton = styled.button`
    background-color: #5B00EF;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    width: 35rem;
    height: 4.5rem;
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-left: -1rem;

    &:hover {
    background-color: #4a00d1;
    }
`;
