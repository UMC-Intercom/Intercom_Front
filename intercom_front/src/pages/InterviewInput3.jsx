import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostQuestionModal from './PostQuestionModal';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function CoverLetterInput3() {
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
    certification: [],
    english: '',
    score: '',
    contents: ''
});

useEffect(() => {
  if (location.state) {
      setFormData(location.state);
  }
}, [location]);

  const accessToken = localStorage.getItem('accessToken');

  const handleConfirm = async () => {
    // 모든 필수 정보가 입력되었는지 확인
    if (!formData.contents.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }
  
    console.log(formData);
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/interviews`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
      console.log(response.data);
      setPostModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('후기 등록에 실패했습니다. 나중에 다시 시도해주세요.');
    }
  };
  

  const handleClose = () => {
    setPostModalOpen(false); // PostQuestionModal 닫기
  };

  return (
    <SettingTitle>
      <Container>
        <Title>면접 후기 입력하기</Title>
        <Form>
          <Text>Step 3</Text>
          <SubtitleWrap>
            <SubTitle>후기를 작성해주세요</SubTitle>
          </SubtitleWrap>

            <QuestionWrap type='text' placeholder='답변을 입력해주세요'
            value={formData.contents}
            onChange={(e) => setFormData({...formData, contents: e.target.value})}
            />

        </Form>
        <SubmitButton type="button" onClick={handleConfirm}>등록하기</SubmitButton>
      </Container>
      <PostQuestionModal isOpen={postModalOpen} onClose={handleClose} />
    </SettingTitle>
  )
}

const SettingTitle = styled.div``;

const QuestionWrap = styled.textarea`
  margin-left: 43px;
  margin-bottom: 35px;
  box-sizing: border-box;
  width: 1119px;
  height: 456px;
  max-height: 456px; /* 수정된 부분: 최대 높이 지정 */
  left: 400px;
  top: 447px;
  border: 3px solid #A1A1A1;
  border-radius: 10px;
  padding-left: 21px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  margin-bottom: 43px;
  resize: none; /* 수정된 부분: 사용자가 크기 조정할 수 없게 함 */
  overflow-y: auto; /* 수정된 부분: 필요할 때 세로 스크롤 추가 */
  padding-top: 10px;

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