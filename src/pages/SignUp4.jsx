import React from 'react'
import styled from "styled-components";

export default function SignUp4() {
  return (
    <Container>
      {/* 이미지 화질 깨짐 이미지 다시 받기 */}
      <Image src='assets/Congratulation.png'></Image>
      <Text>모든 설정이 완료되었습니다!<br />인터컴과 함께 채용 여정을 떠나볼까요?</Text>
      <CheckButton>로그인 하기</CheckButton>
    </Container>
  )
}

const Container = styled.div`
text-align: center;
`

const Image = styled.img`
margin-top: 290px;
margin-bottom: 40px;
width: 150px;
height: 150px;
`

const Text = styled.p`
color: #000;

text-align: center;
/* T0 */
font-family: SUITE;
font-size: 50px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

export const CheckButton = styled.button`
  width: 588px;
  height: 72px;
  background-color: #5B00EF;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top:67px;
  margin-bottom:463px;
  color: #FFF;

  font-family: SUITE;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;