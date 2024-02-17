import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostQuestionModal from './PostQuestionModal';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CoverLetterInput3() {
  const [questionNumber, setQuestionNumber] = useState(1); // 문항 번호 상태
  const [postModalOpen, setPostModalOpen] = useState(false); // PostQuestionModal 열림 상태
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    company: '',
    department: '',
    year: '',
    semester: '',
    gender: 'no-selected',
    birthday: '',
    education: '',
    major: '',
    gpa: '',
    activity: '',
    certifications: [],
    english: '',
    score: '',
    titles: [],
    contents: []
  }); // 기존 formData 상태

  useEffect(() => {
    if (location.state) {
        setFormData(location.state);
    }
}, [location]);

  const addQuestion = () => {
    setQuestionNumber(prevNumber => prevNumber + 1); // 문항 번호 업데이트
    setFormData(prevData => ({
      ...prevData,
      titles: [...prevData.titles, ''], // 빈 title 추가
      contents: [...prevData.contents, ''] // 빈 content 추가
    }));
  };

  const handleConfirm = () => {
    console.log(formData)
    setPostModalOpen(true); // PostQuestionModal 열기
  };

  const handleClose = () => {
    setPostModalOpen(false); // PostQuestionModal 닫기
  };

  return (
    <SettingTitle>
      <Container>
        <Title>합격 자소서 입력하기</Title>
        <Form>
          <Text>Step 3</Text>
          <SubtitleWrap>
            <SubTitle>자소서 문항과 답변을 입력해주세요</SubTitle>
            <AddContentWrap onClick={addQuestion}>
              문항 추가하기
              <PlusImage src='./assets/plus.png' />
            </AddContentWrap>
          </SubtitleWrap>

          {[...Array(questionNumber)].map((_, index) => (
            <QuestionWrap key={index}>
              <QuestionBox>
                <QuestionNumber>
                  문항{index + 1}
                </QuestionNumber>
                <Question
                  type='text'
                  placeholder='내용을 입력해주세요'
                  value={formData.titles[index] || ''}
                  onChange={(e) => {
                    const newTitles = [...formData.titles];
                    newTitles[index] = e.target.value;
                    setFormData(prevData => ({
                      ...prevData,
                      titles: newTitles
                    }));
                  }}
                />
                <Detail
                  type='text'
                  placeholder='답변을 입력해주세요'
                  value={formData.contents[index] || ''}
                  onChange={(e) => {
                    const newContents = [...formData.contents];
                    newContents[index] = e.target.value;
                    setFormData(prevData => ({
                      ...prevData,
                      contents: newContents
                    }));
                  }}
                />
              </QuestionBox>
            </QuestionWrap>
          ))}

        </Form>
        <SubmitButton type="button" onClick={handleConfirm}>등록하기</SubmitButton>
      </Container>
      <PostQuestionModal isOpen={postModalOpen} onClose={handleClose} />
    </SettingTitle>
  )
}

const SettingTitle = styled.div``;

const QuestionWrap = styled.div`
margin-left: 43px;
margin-bottom: 35px;

box-sizing: border-box;
width: 1116px;
height: 514px;
left: 400px;
top: 447px;

border: 3px solid #A1A1A1;
border-radius: 10px;

`

const QuestionBox = styled.div`
margin-left: 66px;
margin-top: 44px;
`

const QuestionNumber = styled.div`
width: 95px;
height: 37px;
left: 466px;
top: 491px;

/* T1 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #000000;

margin-bottom: 21px;

`
const Question = styled.input`
box-sizing: border-box;

width: 991px;
height: 60px;
left: 466px;
top: 549px;

border: 2px solid #5B00EF;
border-radius: 10px;

font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
padding-left: 21px;

&::placeholder {
  /* B3 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  /* or 150% */
  
  color: #A1A1A1;

}

margin-bottom: 22px;
`

const Detail = styled.textarea`
  box-sizing: border-box;
  width: 991px;
  height: 287px;
  left: 466px;
  top: 631px;
  border: 2px solid #A1A1A1;
  border-radius: 10px;
  padding-top: 18px; /* Adjust the padding-top value as needed */
  padding-left: 21px; /* 여기 참고 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 43px;

  &::placeholder {
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: #A1A1A1;
  }
`;


const SubtitleWrap = styled.div`
  display: flex;
  justify-content: space-between;

  text-align: left;
  margin-left: 43px;
  margin-bottom: 42px;

  font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #636363;
`;

const AddContentWrap = styled.div`
  display: flex;
  align-items: center; /* 세로 가운데 정렬 */
  justify-content: center; /* 가로 가운데 정렬 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  color: #A1A1A1;
  cursor: pointer;
`;


const PlusImage = styled.img`
margin-left: 20.69px;
margin-right: 49.59px;
`;


const Title = styled.div`
font-family: SUITE;
font-size: 1.5625rem;
font-weight: 600;
margin-top: 4rem;
margin-bottom: 1rem;
color: #636363;
transition: all 0.3s ease-in-out;
width: 1200px;
text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    width: 80%; 
    padding: 4rem; 
  }
  
  @media (max-width: 768px) {
    width: 90%; 
    padding: 3rem; 
  }
  
  @media (max-width: 480px) {
    width: 95%; 
    padding: 2rem; 
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 1200px; /* 폭 고정 */
  max-height: 754px; /* 최대 높이 지정 */
  overflow-y: auto; /* 세로 스크롤 추가 */
  background: none;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
`;


const SubTitle = styled.div`;
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 37px;

color: #636363;
`;

const SubmitButton = styled.button`
  width: 588px;
  height: 72px;
  background: #5B00EF;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */
  text-align: center;
  color: #FFFFFF;
  margin-top: 108px;
  cursor: pointer;
`;

const Text = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
  color: #5B00EF;
  margin-top: 50px;
  margin-left: 45px;
`;