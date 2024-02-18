import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function CoverLetterResult() {
    const [isScrapped, setIsScrapped] = useState(false);
    const [resume , setResume] = useState(null);
    const { id } = useParams();
    // const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const toggleScrap = () => {
        setIsScrapped(!isScrapped);
    };

    useEffect(() => {
    const fetchResumeDetail = async () => {
      try {
        // 변경된 API 경로에 맞춰서 요청
        const response = await axios.get(`http://localhost:8080/resumes/{id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        setResume(response.data); // job 상태 설정
      } catch (error) {
        console.error('공고 상세 정보를 가져오는 데 실패했습니다:', error);
      }
    };
  
    fetchResumeDetail();
  }, [id, accessToken]);

    return (
        <Container>
            <CoverLetterResultWrap>
            <MainTitleWrap>
                <TitleText>합격 자소서</TitleText>

                <SubTitleWrap>
                    <Subtitle>
                        <Company>{resume.company}</Company>
                        <DepartmentSemester>{resume.department} / {resume.year} {resume.semester}</DepartmentSemester>
                    </Subtitle>

                    <IconWrap>
                        <ScrapButton onClick={toggleScrap}>
                            {isScrapped ? '스크랩' : '스크랩'}
                        </ScrapButton>
                        <ScrapIcon src={isScrapped ? './assets/scrap.png' : './assets/unscrap.png'} alt="Scrap Icon" />
                    </IconWrap>
                </SubTitleWrap>

            </MainTitleWrap>
            <SpecificationWrap>
                <SpecificationTitle>합격 스펙:</SpecificationTitle>
                <SpecificationInformation>
                    {resume.education}<br />
                    학점 {resume.gpa}<br />
                    {resume.english}:{resume.score}
                </SpecificationInformation>
            </SpecificationWrap>

            <QuestionContainer>
                <QuestionWrap>
                    <QuestionNum>{resume.title[0]}</QuestionNum>
                    <Question>해당 직무에 지원하게 된 동기와 이 직무를 수행하기 위한
                        본인만의 강점에 대해 구체적 사례를 들어 설명해주십시오. 또한 이를 바탕으로 입사 후
                        실현하고자 하는 커리어 목표에 대해서도 함께 작성해주시기 바랍니다. (1000자)
                    </Question>
                    <QuestionDetail>
                        {resume.contents[0]}
                    </QuestionDetail>
                </QuestionWrap>
            </QuestionContainer>
            </CoverLetterResultWrap>
        </Container>
    )
}

const Container = styled.div`
display: flex;
justify-content: center;
`;

const CoverLetterResultWrap = styled.div`
`

const SubTitleWrap = styled.div`
  width: 1201px;
  display: flex;
  justify-content: space-between; /* 수정: space-between; */
`;

const IconWrap = styled.div`
  display: flex; /* 추가 */
  align-items: center; /* 추가 */
`;
const ScrapIcon = styled.img`
margin-left: 29px;
`;

const Subtitle = styled.div`
display: flex;
align-items: center;
justify-content: row;
`;

const ScrapButton = styled.button`
width: 100px;
height: 54px;

border: 3px solid #A1A1A1;
border-radius: 10px;
background-color: white;

/* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */
text-align: center;

color: #636363;
cursor: pointer;

`;

const TitleText = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 800;
font-size: 25px;
line-height: 31px;

color: #5B00EF;

margin-bottom: 16px;
`;

const MainTitleWrap = styled.div`
    width: 1201px;
    text-align left;
    margin-top: 93px;
`;

const Company = styled.div`
/* 현대자동차 */
/* T0 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 50px;
line-height: 62px;

color: #000000;

display: inline-block;
margin-right: 19px;
`;

const DepartmentSemester = styled.div`
/* 마케팅 / 2023 하반기 */

/* T1 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 30px;
line-height: 42px;
/* identical to box height, or 140% */

color: #636363;
`;

const SpecificationWrap = styled.div`
    width: 1201px;
    text-align left;
    display: flex;
    flex-direction: row;
    margin-top: 11px;
    margin-bottom: 66px;
`;

const SpecificationTitle = styled.div`
/* 합격 스펙: */
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 30px;
/* or 150% */

color: #636363;
`;

const SpecificationInformation = styled.div`

font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 30px;
/* or 150% */

color: #636363;
`;

const QuestionContainer = styled.div`
width: 1201px;

background: #EFF0F4;
border-radius: 10px;
padding-top: 21px;
`;

const QuestionWrap = styled.div`
  padding: 0 21px; 
`;

const QuestionNum = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  color: #000000;
  margin-bottom: 11px;
`;

const Question = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  color: #000000;
  margin-bottom: 89px;
  line-height: 38px;
`;

const QuestionDetail = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  color: #636363;
  line-height: 38px;
`;