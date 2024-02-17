import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import fakeUsersData from '../data/fakeUsersData';
import axios from "axios";



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
  
  const [currentYear] = useState(new Date().getFullYear());
  const [years] = useState(Array.from(new Array(125), (val, index) => currentYear - index));

  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(false)
  const [checkNickname, setCheckNickname] = useState(false)
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
  const isAllValid = isEmailValid && isPwdValid1 && isPwdValid2 && isPwdValid3 && isConfirmPwd && checkNickname && checkEmail && isRequiredConsent1 && isRequiredConsent2;

  // 닉네임 중복 검사 함수(수정해야함)
const isNicknameDuplicated = async (nickname) => {
  try {
    // 가짜 서버 대신 localStorage에서 닉네임 목록을 가져옴
    const nicknames = JSON.parse(localStorage.getItem('userNicknames')) || [];

    // 닉네임 중복 여부 체크
    const isDuplicated = nicknames.includes(nickname.toLowerCase());

    return isDuplicated;
  } catch (error) {
    console.error('Error checking nickname duplication:', error);
    return false;
  }
};

// 닉네임 형식 및 중복 여부 확인
const onChangeNickname = useCallback(async (e) => {
  const currNickname = e.target.value;
  setNickName(currNickname);

  // 닉네임 형식 체크
  // 여기서는 예시로 닉네임의 길이가 3자 이상이어야 한다고 가정합니다.
  const isNicknameValid = currNickname.length >= 3;

  // 닉네임 중복 여부 체크
  const isDuplicated = await isNicknameDuplicated(currNickname);

  // 형식 및 중복 여부에 따라 상태 업데이트
  if (!isNicknameValid || isDuplicated) {
    setCheckNickname(false);
  } else {
    setCheckNickname(true);

    // 닉네임이 중복되지 않으면 localStorage에 추가
    const nicknames = JSON.parse(localStorage.getItem('userNicknames')) || [];
    await new Promise((resolve) => {
      localStorage.setItem('userNicknames', JSON.stringify([...nicknames, currNickname.toLowerCase()]));
      resolve();
    });
  }
}, []);


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

// 생년월일 YYYY-MM-DD 형식으로 포맷팅 (날짜는 다 YYYY-MM-DD 형식으로 전달)
const formatDate = (year, month, day) => {
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
};

const onSubmit = (e) => {
  e.preventDefault();

  const user = {
    email,
    password,  
    name,
    // 전달할 값과 DB에 저장되는 이름과 같지 않다면
    // DB에 저장되는 이름: 프론트에서 전달하는 변수 이름
    nickname: nickName,
    birthday: formatDate(birthYear, birthMonth, birthDay),
    phone: phoneNum,
    gender,
  };

  axios.post('http://localhost:8080/users/signup', user, {
    withCredentials: true   // config
    }).then(response => {
        const userNickname = response.data;
        console.log("** userNickname: ", response.data);

        // 회원가입 성공시 처리
        alert('회원가입 성공');

        // userNickname 아래 페이지로 넘겨서 정보 보낼 때 같이 전달 plz
        localStorage.setItem('userNickname', userNickname);
        // 2단계 api는 구현 안 된 상태라 하고 연동 예정
        navigateToSignUp2();
      })
      .catch(error => {
        console.error('회원가입 실패:', error);
        alert('회원가입 실패');
      });
}

  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <InputWrap>
        <Label>이메일</Label>
        <InputField type="email" onChange={onChangeEmail} />
        <CheckWrap>
        {checkEmail !== null && (
                  <img
                    src={checkEmail ? 'assets/Check2.png' : 'assets/UnChecked.png'}
                    alt="이메일 중복 확인"
                    style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft:'49px', marginTop: '9px' }}
                  />
                )} 중복확인
        </CheckWrap>
        </InputWrap>

        <InputWrap>
        <Label>비밀번호</Label>
        <InputField type="password" onChange={onChangePwd1} />
        <CheckWrap>
        {checkPwd1 !== null && (
          <img
            className='check'
            src={checkPwd1 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="비밀번호수 제한 확인"
            style={{ width: '17px', height: '11px', marginRight: '7px',  marginLeft:'49px' , marginTop: '9px'}} // 변경필요
          />
        )} 영문 8~20자
        </CheckWrap>
        <CheckWrap>
                {checkPwd2 !== null && (
                
          <img
            src={checkPwd2 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="대문자 포함 확인"
            style={{width: '17px', height: '11px', marginRight: '7px', marginLeft:'49px', marginTop: '9px' }} // 변경필요
          />
        )} 대문자 포함
        </CheckWrap>
        <CheckWrap>
                {checkPwd3 !== null && (
          <img
            src={checkPwd3 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
            alt="특수문자 포함 확인"
            style={{ width: '17px', height: '11px', marginRight: '7px',  marginLeft:'49px', marginTop: '9px'}} // 변경필요
          />
        )} 특수문자
        </CheckWrap>
        </InputWrap>

        <InputWrap>
        <Label>비밀번호 확인</Label>
        <InputField type="password" onChange={onChangeConfirmPwd} />
        <CheckWrap>
        {confirmPwdMsg !== null && (
          <img
            className='check'
            src={confirmPwdMsg ? 'assets/Check2.png' : 'assets/UnChecked.png'}
            alt="비밀번호 확인"
            style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft:'49px', marginTop: '9px'}}
          />
        )} 확인완료
        </CheckWrap>
        </InputWrap>

        <InputWrap>
        <Label>이름</Label>
        <InputField type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </InputWrap>

        <InputWrap>
        <Label>닉네임</Label>
        <InputField type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} />
        <CheckWrap>
        {checkNickname !== null && (
                  <img
                    src={checkNickname ? 'assets/Check2.png' : 'assets/UnChecked.png'}
                    alt="닉네임 중복 확인"
                    style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft:'49px', marginTop: '9px' }}
                  />
                )} 중복확인
        </CheckWrap>
        </InputWrap>

        <InputWrap>
        <Label>휴대폰</Label>
        <InputField type="text" placeholder='  예시: 01000000000' maxLength={11} value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
        </InputWrap>

        <InputWrap>
            <Label>성별</Label>
            <RadioInput
              name="gender"
              value="male"
              label="남자"
            />
            <RadioInput
              name="gender"
              value="female"
              label="여자"
            />
            <RadioInput
              name="gender"
              value="no-selected"
              label="선택 안 함"
            />
          </InputWrap>

        <InputWrap>
            <Label>생년월일</Label>
            <Select name="birthYear">
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select><span>년</span>
            <Select name="birthMonth">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </Select><span>월</span>
            <Select name="birthDay">
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </Select><span>일</span>
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
        <RadioInput type="checkbox" id="requiredconsent1" name="requiredconsent1" onChange={handleRequiredConsent1Change} checked={isFullAgreement || isRequiredConsent1}
        style={{marginLeft:'188px'}}
        />
        <RequiredConsent for="scales">이용약관 동의 (필수)</RequiredConsent>
        </InputWrap>

        <InputWrap>
        <RadioInput type="checkbox" id="requiredconsent2" name="requiredconsent2" onChange={handleRequiredConsent2Change} checked={isFullAgreement || isRequiredConsent2} 
        style={{marginLeft:'188px'}}
        />
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

const CheckWrap = styled.div`
margin-top: 15px;
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;

svg {
  margin-top: 3.13rem;
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
/* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */

color: #636363;

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

margin-top: 13px;

`

const RequiredConsent = styled.label`
color: #636363;

/* B3 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-top: 14px;
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

  /* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */

color: #636363;

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

const Select = styled.select`
  font-family: SUITE;
  font-size: 1rem;
  font-weight: 700;
  width: 7rem;
  padding: 1rem 1rem;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
  background-color: white;
  margin-right: 1rem;
  margin-left: 2rem;

  /* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */

color: #636363;

& + span {
  margin-top: 16px; 
}
`;