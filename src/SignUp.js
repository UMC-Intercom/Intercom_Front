import React, { useState } from 'react';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birth, setBirth] = useState('');

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

  return (
    <div>
      <div>
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={onChangeEmailHandler}
        />
        {isEmailCheck !== null && (
          <img
            src={isEmailCheck ? 'assets/체크.png' : 'assets/서치.png'} // 변경필요
            alt="이메일 중복 확인"
            style={{ width: '10px', height: '10px' }} // 변경필요
          />
        )} 중복확인

        <br /><label htmlFor="password">비밀번호</label>
        <input
          onChange={onChangePasswordHandler}
          type="password"
          id="password"
          name="password"
          value={password}
        />
        {passwordError && <span>비밀번호를 입력해주세요.</span>}
        {passwordError1 && <span>비밀번호는 8~20자의 영문, 숫자, !@*&-_만 입력 가능합니다.</span>}
        {passwordError2 && <span>대문자를 포함해야 합니다.</span>}
        {passwordError3 && <span>특수문자를 포함해야 합니다.</span>}

        <br /><label htmlFor="confirm">비밀번호 확인</label>
        <input
          onChange={onChangeConfirmHandler}
          type="password"
          id="confirm"
          name="confirm"
          value={confirm}
        />
        {confirmError && <span>비밀번호가 일치하지 않습니다.</span>}
      </div>
    </div>
  );
}
