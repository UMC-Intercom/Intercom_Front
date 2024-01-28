import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";


export default function SignUp() {
  const navigate = useNavigate();

  const navigateToSignUp2 = () => navigate('/signup2');

  return (
    <Container>
      <Form>
        <Title>회원가입</Title>
        <InputWrap>
        <Label>이메일</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>비밀번호</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>비밀번호 확인</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>이름</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>닉네임</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>휴대폰</Label>
        <InputField></InputField>
        </InputWrap>

        <InputWrap>
        <Label>성별</Label>
        <input type='radio' name='gender' value='female' />여자
        <input type='radio' name='gender' value='female' />남자
        <input type='radio' name='gender' value='female' />선택 안 함
        </InputWrap>

        <InputWrap>
        <Label>생년월일</Label>
        <select>
          <option value="" disabled />
        </select>년
        <select>
          <option value="" disabled />
        </select>월
        <select>
          <option value="" disabled />
        </select>일
        </InputWrap>

        <svg xmlns="http://www.w3.org/2000/svg" width="1201" height="4" viewBox="0 0 1201 4" fill="none">
        <path d="M2 2L1199 2.0001" stroke="#A1A1A1" stroke-width="3" stroke-linecap="round"/>
        </svg>

        <Terms>
        <InputWrap>
        <Label>이용약관동의</Label>
        <InputField type="checkbox" id="fullagreement" name="fullagreement" />
        <FullAgreement for="scales">전체 동의합니다.</FullAgreement>
        </InputWrap>

        <InputWrap>
        <InputField type="checkbox" id="requiredconsent1" name="requiredconsent1" />
        <RequiredConsent for="scales">이용약관 동의 (필수)</RequiredConsent>
        </InputWrap>

        <InputWrap>
        <InputField type="checkbox" id="requiredconsent2" name="requiredconsent2" />
        <RequiredConsent for="scales">개인정보 수집 이용 동의 (필수)</RequiredConsent>
        </InputWrap>
        </Terms>

        <SignUpButton type="submit" onClick={navigateToSignUp2}>회원가입 하기</SignUpButton>
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
`;

