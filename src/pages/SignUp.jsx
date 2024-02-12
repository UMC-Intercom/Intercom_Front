import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import fakeUsersData from '../data/fakeUsersData';

//이메일 유효성
const validateEmail = (email) => {
  return email
    .toLowerCase()
    .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
};
// 이메일 중복 검사 함수 수정 실패!! 수정해야함
const isEmailDuplicated = async (email) => {
  try {
    // 가짜 서버 대신 localStorage에서 이메일 목록을 가져옴
    const emails = JSON.parse(localStorage.getItem('userEmails')) || [];

    // 이메일 중복 여부 체크
    const isDuplicated = emails.includes(email.toLowerCase());

    return isDuplicated;
  } catch (error) {
    console.error('Error checking email duplication:', error);
    return false;
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

export default function SignUp() {
  const navigate = useNavigate();
  const navigateToSignUp2 = () => navigate('/signup2');

  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false)
  const [password, setPassword] = useState("");
  const [checkPwd1, setCheckPwd1] = useState(false);
  const [checkPwd2, setCheckPwd2] = useState(false);
  const [checkPwd3, setCheckPwd3] = useState(false);
  const [confirmPwd, setConfirmPwd] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isFullAgreement, setIsFullAgreement] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPwdValid1 = hasLowerCaseAndValidLength(password);
  const isPwdValid2 = hasUpperCase(password);
  const isPwdValid3 = hasSpecialCharacter(password);
  const [confirmPwdMsg, setConfirmPwdMsg]= useState(false);
  const isConfirmPwd = password === confirmPwd;

  const [isRequiredConsent1, setRequiredConsent1] = useState(false);
  const [isRequiredConsent2, setRequiredConsent2] = useState(false);

  //모든 조건 충족/ 이용약관관련 추가하기
  const isAllValid = isEmailValid && isPwdValid1 && isPwdValid2 && isPwdValid3 && isConfirmPwd && checkEmail && isRequiredConsent1 && isRequiredConsent2;


  //이메일 형식
  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    if (!validateEmail(currEmail)) {
      setCheckEmail(false)
    } else {
      setCheckEmail(true)
    }
  }, []);

  //비밀번호 조건 1~3
  const onChangePwd1 = useCallback((e) => {
    const currPwd = e.target.value;
    const isUpperCase = hasUpperCase(currPwd);
    const isSpecialCharacter = hasSpecialCharacter(currPwd);
  
    setPassword(currPwd);
    setCheckPwd1(hasLowerCaseAndValidLength(currPwd));
    setCheckPwd2(isUpperCase);
    setCheckPwd3(isSpecialCharacter);
  }, []);
  
  const onChangePwd2 = useCallback((e) => {
    const currPwd = e.target.value;
    const isLowerCase = hasLowerCaseAndValidLength(currPwd);
    const isSpecialCharacter = hasSpecialCharacter(currPwd);
  
    setPassword(currPwd);
    setCheckPwd1(isLowerCase);
    setCheckPwd2(hasUpperCase(currPwd));
    setCheckPwd3(isSpecialCharacter);
  }, []);
  
  const onChangePwd3 = useCallback((e) => {
    const currPwd = e.target.value;
    const isLowerCase = hasLowerCaseAndValidLength(currPwd);
    const isUpperCase = hasUpperCase(currPwd);
  
    setPassword(currPwd);
    setCheckPwd1(isLowerCase);
    setCheckPwd2(isUpperCase);
    setCheckPwd3(hasSpecialCharacter(currPwd));
  }, []);

  //비밀번호 확인
  const onChangeConfirmPwd = useCallback((e) => {
    const currConfirmPwd = e.target.value;
    setConfirmPwd(currConfirmPwd);
  
    setConfirmPwdMsg(currConfirmPwd === password);
  }, [password]);

  //수정하기
  const onCheckEmail = useCallback(async (e) => {
    e.preventDefault();
  
    try {
      const isDuplicated = await isEmailDuplicated(email);
  
      if (isDuplicated) {
        setCheckEmail(false);
      } else {
        setCheckEmail(true);
  
        // 이메일이 중복되지 않으면 localStorage에 추가
        const emails = JSON.parse(localStorage.getItem('userEmails')) || [];
        await new Promise((resolve) => {
          localStorage.setItem('userEmails', JSON.stringify([...emails, email.toLowerCase()]));
          resolve();
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [email]);

  //약관 전체동의
  const handleFullAgreementChange = useCallback((e) => {
    setIsFullAgreement(e.target.checked);
  }, []);

  // 각 약관 동의 체크박스 핸들러
const handleRequiredConsent1Change = useCallback((e) => {
  setRequiredConsent1(e.target.checked);
}, []);

const handleRequiredConsent2Change = useCallback((e) => {
  setRequiredConsent2(e.target.checked);
}, []);

// 약관 전체 동의가 변경될 때 각 약관 동의 상태 업데이트
useEffect(() => {
  if (isFullAgreement) {
    setRequiredConsent1(true);
    setRequiredConsent2(true);
  } else {
    setRequiredConsent1(false);
    setRequiredConsent2(false);
  }
}, [isFullAgreement]);

const onSubmit = (e) => {
  e.preventDefault();

  // 로컬 스토리지에 가입 정보 추가
  const user = {
    email,
    password,  
    name, 
    nickName,
    phoneNum,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    isRequiredConsent1,
    isRequiredConsent2
  };

  // 로컬 스토리지에 가입 정보 저장
  const users = JSON.parse(localStorage.getItem('users')) || [];
  localStorage.setItem('users', JSON.stringify([...users, user]));

  navigateToSignUp2();
}

  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <InputWrap>
        <Label>이메일</Label>
        <InputField type="email" onChange={onChangeEmail} />
        {checkEmail !== null && (
                  <img
                    src={checkEmail ? 'assets/Check2.png' : 'assets/UnChecked.png'}
                    alt="이메일 중복 확인"
                    style={{ width: '17px', height: '11px', marginRight: '5px', marginLeft:'10px' }}
                  />
                )} 중복확인
        </InputWrap>

        <InputWrap>
        <Label>비밀번호</Label>
        <InputField type="password" onChange={onChangePwd1} />
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

        </InputWrap>

        <InputWrap>
        <Label>비밀번호 확인</Label>
        <InputField type="password" onChange={onChangeConfirmPwd} />
        {confirmPwdMsg !== null && (
          <img
            className='check'
            src={confirmPwdMsg ? 'assets/Check2.png' : 'assets/UnChecked.png'}
            alt="비밀번호 확인"
            style={{ width: '17px', height: '11px', marginRight: '5px', marginLeft:'10px'}}
          />
        )} 확인완료
        </InputWrap>

        <InputWrap>
        <Label>이름</Label>
        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </InputWrap>

        <InputWrap>
        <Label>닉네임</Label>
        <InputField type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        </InputWrap>

        <InputWrap>
        <Label>휴대폰</Label>
        <InputField type="text" value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
        </InputWrap>

        <InputWrap>
        <Label>성별</Label>
        <RadioInput type='radio' name='gender' value='female' onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} />여자
        <RadioInput type='radio' name='gender' value='male' onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} />남자
        <RadioInput type='radio' name='gender' value='none-selected' onChange={(e) => setGender(e.target.value)} checked={gender === 'none-selected'} />선택 안 함
        </InputWrap>

        <InputWrap>
        <Label>생년월일</Label>
        <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
          <option value="" disabled></option>
          {Array.from({ length: 125 }, (_, index) => 2024 - index).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        년
        <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
          <option value="" disabled></option>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        월
        <select value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
          <option value="" disabled></option>
          {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
        일
        </InputWrap>

        <svg xmlns="http://www.w3.org/2000/svg" width="1201" height="4" viewBox="0 0 1201 4" fill="none">
        <path d="M2 2L1199 2.0001" stroke="#A1A1A1" stroke-width="3" stroke-linecap="round"/>
        </svg>

        <Terms>
        <InputWrap>
          <Label>이용약관동의</Label>
          <RadioInput type="checkbox" id="fullagreement" name="fullagreement" onChange={handleFullAgreementChange} checked={isFullAgreement} />
          <FullAgreement for="scales">전체 동의합니다.</FullAgreement>
        </InputWrap>

        <InputWrap>
        <RadioInput type="checkbox" id="requiredconsent1" name="requiredconsent1" onChange={handleRequiredConsent1Change} checked={isFullAgreement || isRequiredConsent1} />
        <RequiredConsent for="scales">이용약관 동의 (필수)</RequiredConsent>
        </InputWrap>

        <InputWrap>
        <RadioInput type="checkbox" id="requiredconsent2" name="requiredconsent2" onChange={handleRequiredConsent2Change} checked={isFullAgreement || isRequiredConsent2} />
        <RequiredConsent for="scales">개인정보 수집 이용 동의 (필수)</RequiredConsent>
        </InputWrap>
        </Terms>

        <SignUpButton type="submit" onClick={onSubmit} disabled={!isAllValid}>
          확인
        </SignUpButton>
      </Form>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;

svg {
  margin-top: 3.13rem;
}

//수정필요
select {
  border: 3px solid #E1E1E1;
  border-radius: 10px;
  margin-right: 12px;
  width: 70px;
  height: 40px;
}
`
const Title = styled.p`
height: 2.8125rem;
color: #000;

text-align: center;
/* T1 */
font-family: SUITE;
font-size: 1.875rem;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-top:4.94rem;
margin-bottom:2.62rem;
`
const Form = styled.form`
`

const InputWrap = styled.div`
display: flex;
flex-direction: row;
height: 3.5rem;
margin-bottom: 1.87rem;
`

const Terms = styled.div`
`

const Label = styled.label`
color: #000;

/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;

width: 11.3725rem;
display: flex;
align-items: center;

&:after {
  content: "*";
  color: #FF0000;
}
`

const InputField = styled.input`
width: 30.375rem;
height: 3.5rem;

border-radius: 0.625rem;
border: 3px solid #E2E2E2;

color: #000;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const FullAgreement = styled.label`
color: #636363;

/* T2 */
font-family: SUITE;
font-size: 1.5625rem;
font-style: normal;
font-weight: 800;
line-height: normal;

`

const RequiredConsent = styled.label`
color: #636363;

/* B3 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
`

export const SignUpButton = styled.button`
width: 36.75rem;
height: 4.5rem;
flex-shrink: 0;
border-radius: 0.625rem;
background: #5B00EF;

color: #FFF;

text-align: center;
/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;

margin-left: 18rem;
// 가운데 정렬이 안돼서 일단 눈대중으로 맞춤..
cursor: pointer;

&:disabled {
  background: #A1A1A1;  
  cursor: not-allowed;
}
`;

const RadioLabel = styled.label`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    margin-left: 2rem;
    margin-right: 5rem; // 각 라디오 버튼 사이 간격

    & input {
        appearance: none; // 기본 스타일 제거
        -webkit-appearance: none; // Safari를 위한 기본 스타일 제거
        border: 1rem solid #E2E2E2;
        border-radius: 50%; // 원형 테두리
        width: 1em; // 너비
        height: 1em; // 높이
        margin-right: 0.4em; // 텍스트와의 간격

    &:checked {
        background-color: #5B00EF; // 선택 시 보라색으로 채움
        border: 1rem solid #5B00EF; // 선택 시 보라색 테두리
        position: relative; // 가상 요소를 위한 포지셔닝 컨텍스트
      }
  
      &:checked::after {
        content: ''; // 가상 요소에는 내용이 없음
        position: absolute; // 부모 요소(input) 기준으로 절대 위치
        top: 50%; // 상위 요소의 정중앙
        left: 50%; // 상위 요소의 정중앙
        transform: translate(-50%, -50%); // 정확한 중앙에 위치
        width: 1rem; // 내부 원의 너비
        height: 1rem; // 내부 원의 높이
        border-radius: 50%; // 원형
        background: #fff; // 내부 원의 배경색은 흰색
      }
  }
  
`;

const RadioInput = ({ className, label, ...props }) => (
  <RadioLabel className={className}>
    <input type="radio" {...props} />
    {label}
  </RadioLabel>
);