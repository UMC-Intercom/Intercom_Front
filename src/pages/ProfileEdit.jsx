import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
 

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '', // 예: 'user@example.com'
    name: '',
    nickname: '',
    phoneNum: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // 비밀번호 유효성 검사 상태
  const [isValidPwd1, setIsValidPwd1] = useState(false);
  const [isValidPwd2, setIsValidPwd2] = useState(false);
  const [isValidPwd3, setIsValidPwd3] = useState(false);
  const [isPwdMatched, setIsPwdMatched] = useState(false);

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
  // 비밀번호 변경 처리
  const handleChangePassword = useCallback((e) => {
    const currPwd = e.target.value;
    setNewPassword(currPwd);
    setIsValidPwd1(hasLowerCaseAndValidLength(currPwd));
    setIsValidPwd2(hasUpperCase(currPwd));
    setIsValidPwd3(hasSpecialCharacter(currPwd));
  }, []);

  // 새 비밀번호 확인 처리
  const handleConfirmPassword = useCallback((e) => {
    const currConfirmPwd = e.target.value;
    setConfirmNewPassword(currConfirmPwd);
    setIsPwdMatched(newPassword === currConfirmPwd);
  }, [newPassword]);

  useEffect(() => {
    // 현재 사용자 데이터를 가져오는 함수
   const fetchUserData = async () => {
     try {
       const response = await axios.get('/users/current-user', {
         headers: {
           Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
         },
       });
       const data = response.data;
       //const birthdayParts = data.birthday.split('-');
      const birthdayParts = data.birthday.split('-');
       setUser({
         ...user,
         email: data.email,
         name: data.name,
         nickname: data.nickname, // 여기를 수정했습니다
         phone: data.phone, // 여기를 수정했습니다
         gender: data.gender,
         birthYear: birthdayParts[0],
         birthMonth: birthdayParts[1],
         birthDay: birthdayParts[2],
       }); 
     } catch (error) {
       console.error('사용자의 정보를 찾을 수 없습니다', error);
     }
   };
 
   fetchUserData();
 }, []);
   // 사용자 입력 처리
const handleInputChange = useCallback((e) => {
  const { name, value } = e.target;
  setUser((prev) => ({
    ...prev,
    [name]: value,
  }));
}, []);

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 새 비밀번호가 입력된 경우 유효성 검사 실행
    if (newPassword) {
      if (!isValidPwd1 || !isValidPwd2 || !isValidPwd3 || newPassword !== confirmNewPassword) {
        let errorMessage = '비밀번호 유효성 검사에 실패했습니다.';
        if (!isValidPwd1) {
          errorMessage = '비밀번호는 8자 이상이며 소문자를 포함해야 합니다.';
        } else if (!isValidPwd2) {
          errorMessage = '비밀번호는 대문자를 포함해야 합니다.';
        } else if (!isValidPwd3) {
          errorMessage = '비밀번호는 특수 문자(!@#$%^*+=-)를 포함해야 합니다.';
        } else if (newPassword !== confirmNewPassword) {
          errorMessage = '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.';
        }
        setMessage(errorMessage);
        return;
      }
    }
  
    // 서버 요청 데이터 준비
    // 서버 요청 데이터 준비
  let updateData = {
    name: user.name,
    nickname: user.nickname,
    phone: user.phone,
    gender: user.gender,
    birthday: `${user.birthYear}-${user.birthMonth.padStart(2, '0')}-${user.birthDay.padStart(2, '0')}`, // LocalDate 형식에 맞춤
  };

  // 새 비밀번호가 입력된 경우에만 updateData에 추가
  if (newPassword && isPwdMatched) {
    updateData.password = newPassword;
  }
  
    // 서버 요청 로직
    try {
      const response = await axios.put('/users/update', updateData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 204) { // No Content
        localStorage.setItem('userName', updateData.name);
        localStorage.setItem('userNickname', updateData.nickname);
        setMessage('회원 정보가 성공적으로 업데이트되었습니다.');
        navigate('/settings');
      }
    } catch (error) {
      console.error(error);
      setMessage('회원 정보 업데이트 중 오류가 발생했습니다. 서버 로그를 확인해주세요.');
    }
  };
  // 사용자 입력 처리


  // 메시지 창
  const MessageModal = ({ message, onClose }) => (
    <MessageContainer>
      <p>{message}</p>
      <button onClick={onClose}>확인</button>
    </MessageContainer>
  );

  const handleCloseMessageModal = () => {
    if (message === '회원 정보가 저장되었습니다.') {
        navigate('/settings');
      }
      // 메시지 상태 초기화
      setMessage('');
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month - 1, 0).getDate();
  };

  const daysInMonth = useMemo(() => {
    if (!user.birthYear || !user.birthMonth) {
      return 31; // 기본값으로 가정
    }
    return getDaysInMonth(user.birthYear, user.birthMonth);
  }, [user.birthYear, user.birthMonth]);

  

  

  return (
    <SettingTitle>
        <Title>계정 설정</Title>
        <Container>
        <Form onSubmit={handleSubmit}>
            <SubTitle>회원 정보 수정</SubTitle>
            
            <InputWrap>
            <EmailLabel>이메일</EmailLabel>
            <StaticField>{user.email}</StaticField>
            </InputWrap>

            <InputWrap>
            <Label>새 비밀번호</Label>
            <InputField type="password" value={newPassword} onChange={handleChangePassword} />
            </InputWrap>

            <InputWrap>
            <Label>새 비밀번호 확인</Label>
            <InputField type="password" value={confirmNewPassword} onChange={handleConfirmPassword} />
            </InputWrap>

            <InputWrap>
            <Label>이름</Label>
            <InputField type="text" name="name" value={user.name} onChange={handleInputChange} />
            </InputWrap>

            <InputWrap>
            <Label>닉네임</Label>
            <InputField type="text" name="nickname" value={user.nickname} onChange={handleInputChange} />
            </InputWrap>

            <InputWrap>
            <Label>휴대폰</Label>
            <InputField type="text" name="phone" value={user.phone} onChange={handleInputChange} />
            </InputWrap>

            <InputWrap>
            <Label>성별</Label>
                <RadioInput
                    name="gender"
                    value="MALE"
                    onChange={handleInputChange}
                    checked={user.gender === 'MALE'}
                    label="남자"
                />
                <RadioInput
                    name="gender"
                    value="FEMALE"
                    onChange={handleInputChange}
                    checked={user.gender === 'FEMALE'}
                    label="여자"
                />
                <RadioInput
                    name="gender"
                    value="NONE"
                    onChange={handleInputChange}
                    checked={user.gender === 'NONE'}
                    label="선택 안 함"
                />
            </InputWrap>

            <InputWrap>
            <Label>생년월일</Label>
            <Select name="birthYear" value={user.birthYear} onChange={handleInputChange}>
              {Array.from({ length: new Date().getFullYear() - 1900 }, (_, index) => (
                <option key={index} value={1900 + index}>
                  {1900 + index}
                </option>
              ))}
            </Select>년
            <Select name="birthMonth" value={user.birthMonth} onChange={handleInputChange}>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>월
            <Select name="birthDay" value={user.birthDay} onChange={handleInputChange}>
              {[...Array(daysInMonth)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>일
            </InputWrap>

            <SubmitButton type="submit">저장하기</SubmitButton>
        </Form>

        {message && <MessageModal message={message} onClose={handleCloseMessageModal} />}
        </Container>
    </SettingTitle>
  );
}

const SettingTitle = styled.div` 

`;

const Title = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem; // 기본 폰트 크기
  font-weight: 600;
  margin-left: auto;
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: #636363;
  max-width: 80%; // 최대 너비 제한
  transition: all 0.3s ease-in-out; // 부드러운 전환 효과

  @media (max-width: 768px) {
    font-size: 1.25rem; // 화면 너비가 768px 이하일 때 폰트 크기 조정
    margin-top: 2rem; // 상단 여백 조정
  }

  @media (max-width: 480px) {
    font-size: 1rem; // 화면 너비가 480px 이하일 때 폰트 크기 조정
    margin-top: 1.5rem; // 상단 여백 조정
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 3rem;
    @media (max-width: 1024px) {
        width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
        padding: 4rem; // 패딩 조정
      }
    
      @media (max-width: 768px) {
        width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
        padding: 3rem; // 패딩 조정
      }
    
      @media (max-width: 480px) {
        width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
        padding: 2rem; // 패딩 조정
      }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 65rem;
    background: #EFF0F4;
    padding: 5rem;
    box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
    border-radius: 0.625rem;
    transition: all 0.3s ease-in-out; // 부드러운 크기 조정을 위한 전환 효과

  @media (max-width: 1024px) {
    width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
    padding: 4rem; // 패딩 조정
  }

  @media (max-width: 768px) {
    width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
    padding: 3rem; // 패딩 조정
  }

  @media (max-width: 480px) {
    width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
    padding: 2rem; // 패딩 조정
  }
`;

const SubTitle = styled.div`
    font-family: SUITE;
    font-size: 1.5625rem;
    font-weight: 800;
    text-align: left;
    margin-left: 5rem;
    margin-bottom: 4.8rem;
    color: #636363;
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    font-family: SUITE;
    font-size: 1rem;
    font-weight: 700;
`;

const EmailLabel = styled.label`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    display: block;
    min-width: 10rem;
    margin-left: 5rem;
    color: #A1A1A1;
`;

const Label = styled.label`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;   
    min-width: 10rem;
    margin-left: 5rem;
    color: #000;
    width: auto;
`;

const StaticField = styled.div`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    color: #A1A1A1;
    width: 30rem;
    height: 1.5rem;
    margin-left: 2rem;
    padding: 1rem 1.5rem;
    border: 3px solid #e2e2e2;
    border-radius: 0.625rem;
    &:focus {
    border-color: #7a42f4;
    }
    @media (max-width: 1024px) {
        width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
        padding: 4rem; // 패딩 조정
      }
    
      @media (max-width: 768px) {
        width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
        padding: 3rem; // 패딩 조정
      }
    
      @media (max-width: 480px) {
        width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
        padding: 2rem; // 패딩 조정
      }
`;

const InputField = styled.input`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    width: 30rem;
    height: 1.5rem;
    margin-left: 2rem;
    padding: 1rem 1.5rem;
    border: 3px solid #e2e2e2;
    border-radius: 0.625rem;
    &:focus {
    border-color: #7a42f4;
    }
    @media (max-width: 1024px) {
        width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
        padding: 4rem; // 패딩 조정
      }
    
      @media (max-width: 768px) {
        width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
        padding: 3rem; // 패딩 조정
      }
    
      @media (max-width: 480px) {
        width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
        padding: 2rem; // 패딩 조정
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
    &:focus {
    border-color: #7a42f4;
    }
    @media (max-width: 1024px) {
        width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
        padding: 4rem; // 패딩 조정
      }
    
      @media (max-width: 768px) {
        width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
        padding: 3rem; // 패딩 조정
      }
    
      @media (max-width: 480px) {
        width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
        padding: 2rem; // 패딩 조정
      }
`;


const SubmitButton = styled.button`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    width: 18.375rem;
    padding: 1rem 7rem;
    background-color: #5B00EF;
    color: white;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
    margin-top: 5rem;
    align-self: center;
    &:hover {
    background-color: #4a00d1;
    }
    &:disabled {
    background-color: #A1A1A1;
    cursor: not-allowed;
    }
    @media (max-width: 1024px) {
        width: 80%; // 화면 너비가 1024px 이하일 때 너비 조정
        padding: 4rem; // 패딩 조정
      }
    
      @media (max-width: 768px) {
        width: 90%; // 화면 너비가 768px 이하일 때 너비 조정
        padding: 3rem; // 패딩 조정
      }
    
      @media (max-width: 480px) {
        width: 95%; // 화면 너비가 480px 이하일 때 너비 조정
        padding: 2rem; // 패딩 조정
      }
`;

const MessageContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
  text-align: center;
  

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #5B00EF;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #4a00d1;
    }
  }
`;
