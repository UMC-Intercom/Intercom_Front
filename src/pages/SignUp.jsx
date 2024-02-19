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
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isFullAgreement, setIsFullAgreement] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPwdValid1 = hasLowerCaseAndValidLength(password);
  const isPwdValid2 = hasUpperCase(password);
  const isPwdValid3 = hasSpecialCharacter(password);
  const [confirmPwdMsg, setConfirmPwdMsg] = useState(false);
  const isConfirmPwd = password === confirmPwd;

  const [isRequiredConsent1, setRequiredConsent1] = useState(false);
  const [isRequiredConsent2, setRequiredConsent2] = useState(false);

  //모든 조건 충족/ 이용약관관련 추가하기
  const isAllValid = isEmailValid && isPwdValid1 && isPwdValid2 && isPwdValid3 && isConfirmPwd && checkNickname && checkEmail && isRequiredConsent1 && isRequiredConsent2;


  const onChangeEmail = useCallback(async (e) => {
    const currEmail = e.target.value;
    setEmail(currEmail);

    try {
      const isDuplicated = await isEmailDuplicated(currEmail);
      setCheckEmail(isDuplicated); // 중복된 경우 true로 설정

      if (!isDuplicated) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    } catch (error) {
      console.error('Error checking email duplication:', error);
      setCheckEmail(false); // 오류 발생 시 false로 설정
      alert('이메일 중복 확인 중 오류가 발생했습니다.');
    }
  }, []);


  const isEmailDuplicated = async (email) => {
    try {
      // axios를 사용하여 서버에 GET 요청을 보냅니다.
      const response = await axios.get(`http://localhost:8080/users/signup/email?email=${(email)}`);

      // 요청이 성공하면 응답 데이터를 반환합니다.
      return response.data;
    } catch (error) {
      // 요청이 실패하면 콘솔에 에러를 출력하고 true를 반환합니다.
      console.error(error);
      return true;
    }
  };

  const onChangeNickname = useCallback(async (e) => {
    const currNickname = e.target.value;
    setNickname(currNickname); // setNickname -> setNickName으로 수정

    try {
      const isDuplicated = await isNicknameDuplicated(currNickname);
      setCheckNickname(isDuplicated); // 중복된 경우 true로 설정

      if (!isDuplicated) {
        setCheckNickname(true);
      } else {
        setCheckNickname(false);
      }
    } catch (error) {
      console.error('Error checking nickname duplication:', error);
      setCheckNickname(false); // 오류 발생 시 false로 설정
      alert('닉네임 중복 확인 중 오류가 발생했습니다.');
    }
  }, []);


  const isNicknameDuplicated = async (nickname) => {
    try {
      // axios를 사용하여 서버에 GET 요청을 보냅니다.
      const response = await axios.get(`http://localhost:8080/users/signup/nickname?nickname=${(nickname)}`);
      // const response = await axios.get(`http://localhost:8080/users/signup/?nickname=${encodeURIComponent(nickname)}`);

      // 요청이 성공하면 응답 데이터를 반환합니다.
      return response.data;
    } catch (error) {
      // 요청이 실패하면 콘솔에 에러를 출력하고 true를 반환합니다.
      console.error(error);
      return true;
    }
  };

  //비밀번호 조건 1~3
  const onChangePwd = useCallback((e) => {
    const currPwd = e.target.value;
    const isLowerCase = hasLowerCaseAndValidLength(currPwd);
    const isUpperCase = hasUpperCase(currPwd);
    const isSpecialCharacter = hasSpecialCharacter(currPwd);

    setPassword(currPwd);
    setCheckPwd1(isLowerCase);
    setCheckPwd2(isUpperCase);
    setCheckPwd3(isSpecialCharacter);
  }, []);

  //비밀번호 확인
  const onChangeConfirmPwd = useCallback((e) => {
    const currConfirmPwd = e.target.value;
    setConfirmPwd(currConfirmPwd);

    setConfirmPwdMsg(currConfirmPwd === password);
  }, [password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'birthYear' || name === 'birthMonth' || name === 'birthDay') {
      // 생년월일을 변경하는 경우에만 실행됩니다.
      if (name === 'birthYear') {
        setBirthYear(value);
      } else if (name === 'birthMonth') {
        setBirthMonth(value);
      } else if (name === 'birthDay') {
        setBirthDay(value);
      }

      // 생년월일의 값이 모두 채워졌을 때에만 YYYY-MM-DD 형식으로 값을 설정합니다.
      if (birthYear && birthMonth && birthDay) {
        const formattedBirthday = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;
        setBirthday(formattedBirthday);
      }
    } else {
      // 생년월일 이외의 입력값은 해당하는 상태를 바로 설정합니다.
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'confirmPwd':
          setConfirmPwd(value);
          break;
        case 'name':
          setName(value);
          break;
        case 'nickname':
          setNickname(value);
          break;
        case 'gender':
          setGender(value);
          break;
        case 'phoneNum':
          setPhoneNum(value);
          break;
        default:
          break;
      }
    }
  };


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

    // 모든 조건이 만족할 때만 회원가입 요청을 서버로 전송
    if (isAllValid) {
      const user = {
        email,
        password,
        name,
        // 전달할 값과 DB에 저장되는 이름과 같지 않다면
        // DB에 저장되는 이름: 프론트에서 전달하는 변수 이름
        nickname: nickname,
        birthday: formatDate(birthYear, birthMonth, birthDay),
        phone: phoneNum,
        gender,
      };

      console.log("조건확인", isAllValid); // 데이터 확인을 위한 콘솔 출력

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
    } else {
      // 유효성 검사에 실패한 경우에 대한 처리
      alert('입력값을 다시 확인해주세요.');
    }
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
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }}
                  />
              )} 중복확인
            </CheckWrap>
          </InputWrap>

          <InputWrap>
            <Label>비밀번호</Label>
            <InputField placeholder='숫자를 포함하세요' type="password" onChange={onChangePwd} />
            <CheckWrap>
              {checkPwd1 !== null && (
                  <img
                      className='check'
                      src={checkPwd1 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
                      alt="비밀번호수 제한 확인"
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }} // 변경필요
                  />
              )} 영문 8~20자
            </CheckWrap>
            <CheckWrap>
              {checkPwd2 !== null && (

                  <img
                      src={checkPwd2 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
                      alt="대문자 포함 확인"
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }} // 변경필요
                  />
              )} 대문자 포함
            </CheckWrap>
            <CheckWrap>
              {checkPwd3 !== null && (
                  <img
                      src={checkPwd3 ? 'assets/Check2.png' : 'assets/UnChecked.png'} // 변경필요
                      alt="특수문자 포함 확인"
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }} // 변경필요
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
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }}
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
            <InputField type="text" value={nickname} onChange={onChangeNickname} />
            <CheckWrap>
              {checkNickname !== null && (
                  <img
                      src={checkNickname ? 'assets/Check2.png' : 'assets/UnChecked.png'}
                      alt="닉네임 중복 확인"
                      style={{ width: '17px', height: '11px', marginRight: '7px', marginLeft: '49px', marginTop: '9px' }}
                  />
              )} 중복확인
            </CheckWrap>
          </InputWrap>

          <InputWrap>
            <Label>휴대폰</Label>
            <InputField type="text" placeholder='  예시: 01000000000' maxLength={11} value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} />
          </InputWrap>

          <InputWrap>
            <Label style={{ marginRight: '-35px' }}>성별</Label>
            <RadioInput
                name="gender"
                onChange={handleChange}
                value="male" // 남자일 때의 값을 설정합니다.
                checked={gender === "male"} // 현재 상태와 비교하여 체크 여부를 결정합니다.
                label="남자"
            />
            <RadioInput
                name="gender"
                onChange={handleChange}
                value="female" // 여자일 때의 값을 설정합니다.
                checked={gender === "female"} // 현재 상태와 비교하여 체크 여부를 결정합니다.
                label="여자"
            />
            <RadioInput
                name="gender"
                value="none" // 선택 안 함일 때의 값을 설정합니다.
                checked={!gender} // 현재 상태와 비교하여 체크 여부를 결정합니다.
                label="선택 안 함"
                onChange={handleChange}
            />
          </InputWrap>

          <InputWrap>
            <SelectWrap>
              <Label style={{ marginRight: '-35px'}}>생년월일</Label>
              <Select name="birthYear" value={birthYear} onChange={handleChange}>
                {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
              </Select>년
              <Select name="birthMonth" value={birthMonth} onChange={handleChange}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}</option>
                ))}
              </Select>월
              <Select name="birthDay" value={birthDay} onChange={handleChange}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}</option>
                ))}
              </Select>일
            </SelectWrap>
          </InputWrap>

          <svg xmlns="http://www.w3.org/2000/svg" width="1201" height="4" viewBox="0 0 1201 4" fill="none">
            <path d="M2 2L1199 2.0001" stroke="#A1A1A1" stroke-width="3" stroke-linecap="round" />
          </svg>

          <Terms>
            <InputWrap>
              <Label style={{ marginRight: '-35px' }}>이용약관동의</Label>
              <RadioInput type="checkbox" id="fullagreement" name="fullagreement" onChange={handleFullAgreementChange} checked={isFullAgreement} />
              <FullAgreement for="scales">전체 동의합니다.</FullAgreement>
            </InputWrap>

            <InputWrap>
              <RadioInput type="checkbox" id="requiredconsent1" name="requiredconsent1" onChange={handleRequiredConsent1Change} checked={isFullAgreement || isRequiredConsent1}
                          style={{ marginLeft: '153px' }}
              />
              <RequiredConsent for="scales">이용약관 동의 (필수)</RequiredConsent>
            </InputWrap>

            <InputWrap>
              <RadioInput type="checkbox" id="requiredconsent2" name="requiredconsent2" onChange={handleRequiredConsent2Change} checked={isFullAgreement || isRequiredConsent2}
                          style={{ marginLeft: '153px' }}
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

const SelectWrap = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center; // 수직 정렬
  margin-bottom: 1.87rem; // 아래 여백 조정
`;

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
  margin-top: 49px;
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

const SignUpButton = styled.button`
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

  padding-bottom:10px;
`;