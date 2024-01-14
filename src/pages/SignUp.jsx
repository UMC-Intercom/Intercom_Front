import React, { useState } from 'react';
import styled, {css} from "styled-components";

// 가상의 email 중복 확인 함수
const checkEmailAvailability = async (email) => {
  // 가짜 데이터를 반환하도록 설정 (true: 중복 없음, false: 중복)
  return new Promise((resolve) => {
    setTimeout(() => {
      const fakeResponse = Math.random() > 0.5; // 50% 확률로 중복 여부 설정
      resolve(fakeResponse);
    }, 1000); // 가짜 딜레이를 추가한 예시
  });
};

export default function SignUp() {
  const [activePage, setActivePage] = useState("/join");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');

  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordError, setPasswordError] = useState(false); // 입력체크
  const [passwordError1, setPasswordError1] = useState(false); // 영문 8~20
  const [passwordError2, setPasswordError2] = useState(false); // 대문자
  const [passwordError3, setPasswordError3] = useState(false); // 특수문자
  const [confirmError, setConfirmError] = useState(false);

  const [isEmailCheck, setIsEmailCheck] = useState(false);

  const onChangeEmailHandler = async (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // 가상의 email 중복 확인 함수 사용
    try {
      const isAvailable = await checkEmailAvailability(emailValue);
      setIsEmailCheck(isAvailable);
    } catch (error) {
      setIsEmailCheck(false); // 에러 시에도 중복으로 처리
      alert('서버 오류입니다.');
      console.error(error);
    }
  };

  const onChangePasswordHandler = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword, confirm);
  };

  const onChangeConfirmHandler = (e) => {
    const newConfirm = e.target.value;
    setConfirm(newConfirm);
    validatePassword(password, newConfirm);
  };

  const validatePassword = (newPassword, newConfirm) => {
    const passwordRegex = /^[a-zA-Z\d!@*&-_]{8,20}$/;

    setPasswordError(false);
    setPasswordError1(false);
    setPasswordError2(false);
    setPasswordError3(false);
    setConfirmError(false);

    if (newPassword === '') {
      setPasswordError(true);
    } else if (!passwordRegex.test(newPassword)) {
      setPasswordError1(true);
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError2(true);
    } else if (!/[!@*&-_]/.test(newPassword)) {
      setPasswordError3(true);
    } else if (newConfirm !== newPassword) {
      setConfirmError(true);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBirthYearChange = (event) => {
    setBirthYear(event.target.value);
  };

  const handleBirthMonthChange = (event) => {
    setBirthMonth(event.target.value);
  };

  const handleBirthDayChange = (event) => {
    setBirthDay(event.target.value);
  };

  return (
    <SignUpContainer>
      <SignUpForm>
        <p>회원가입</p>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="email">이메일</label></td>
              <td>
                <input
                  size="63"
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmailHandler}
                />
                {isEmailCheck !== null && (
                  <img
                    src={isEmailCheck ? 'assets/체크.png' : 'assets/미체크.png'}
                    alt="이메일 중복 확인"
                    style={{ width: '17px', height: '11px', marginRight: '5px', marginLeft:'10px' }}
                  />
                )} 중복확인
              </td>
            </tr>
  
            <tr>
              <td><label htmlFor="password">비밀번호</label></td>
              <td>
                <input
                  size="63"
                  className='check'
                  onChange={onChangePasswordHandler}
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                />
                        {isEmailCheck !== null && (
          <img
            className='check'
            src={isEmailCheck ? 'assets/체크.png' : 'assets/미체크.png'} // 변경필요
            alt="이메일 중복 확인"
            style={{ width: '17px', height: '11px', marginRight: '5px',  marginLeft:'10px'}} // 변경필요
          />
        )} 영문 8~20자
                {isEmailCheck !== null && (
          <img
            src={isEmailCheck ? 'assets/체크.png' : 'assets/미체크.png'} // 변경필요
            alt="이메일 중복 확인"
            style={{width: '17px', height: '11px', marginRight: '5px', marginLeft:'70px' }} // 변경필요
          />
        )} 대문자 포함
                {isEmailCheck !== null && (
          <img
            src={isEmailCheck ? 'assets/체크.png' : 'assets/미체크.png'} // 변경필요
            alt="이메일 중복 확인"
            style={{ width: '17px', height: '11px', marginRight: '5px',  marginLeft:'70px'}} // 변경필요
          />
        )} 특수문자
              </td>
            </tr>
  
            <tr>
              <td style={{ whiteSpace: 'nowrap' }}><label htmlFor="confirm">비밀번호 확인</label></td>
              <td>
                <input
                  onChange={onChangeConfirmHandler}
                  size="63"
                  type="password" 
                  id="confirm"
                  name="confirm"
                  value={confirm}
                />
              </td>
            </tr>
  
            <tr>
              <td><label htmlFor="confirm">이름</label></td>
              <td>
                <input
                  size="63"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                />
              </td>
            </tr>
  
            <tr>
              <td><label htmlFor="confirm">휴대폰</label></td>
              <td>
                <input
                  size="63"
                  type="text"
                  id="phone"
                  name="phone"
                  value={phoneNumber}
                />
              </td>
            </tr>
  
            <tr>
              <td><label htmlFor="gender">성별</label></td>
              <td>
                <div>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={handleGenderChange}
                    />
                    여성

                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={handleGenderChange}
                    />
                    남성
  
                    <input
                      type="radio"
                      name="gender"
                      value=""
                      checked={gender === ''}
                      onChange={handleGenderChange}
                    />
                    선택 안 함
                </div>
              </td>
            </tr>
  
            <tr>
              <td><label htmlFor="birth">생년월일</label></td>
              <td>
                <div>
                  <select value={birthYear} onChange={handleBirthYearChange}>
                    <option value="" disabled />
                  </select>년
                  <select value={birthMonth} style={{marginLeft: '35px'}} onChange={handleBirthMonthChange}>
                    <option value="" disabled />
                  </select>월
                  <select value={birthDay} style={{marginLeft: '35px'}} onChange={handleBirthDayChange}>
                    <option value="" disabled />
                  </select>일
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
  
        <br />
        <button type='submit'>
          <img src='assets/임시가입버튼.png' />
        </button>
      </SignUpForm>
    </SignUpContainer>
  );
  
}

const tableStyles = css`
  font-size: 20px;
  width: 100%;

  @media (max-width: 800px) {
    width: 80%;
  }
`;

const SignUpContainer = styled.div`
margin-top: 15px;
display: flex;
justify-content: center;
align-items: center;
`

const SignUpForm = styled.div`
text-align: left;

p {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

table {
  font-size: 20px;
  width: 1240px;
}

td, th {
  text-align: left;
  padding: 15px 
}

label {
  margin-right: 33px;
}

label::after {
  content: "*";
  color: #FF0000;
}

input {
  border: 3px solid #E1E1E1;
  border-radius: 10px; 
  margin-right: 40px;
  height: 40px;
}

select {
  border: 3px solid #E1E1E1;
  border-radius: 10px;
  margin-right: 12px;
  width: 70px;
  height: 40px;
}

button {
  display: block;
  margin: 0 auto; 
  border: none;
  outline: none;
  background: none;
}
`;
