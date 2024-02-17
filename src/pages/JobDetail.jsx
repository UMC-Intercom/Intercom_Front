import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';

// JobDetail 컴포넌트 정의
const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [isScraped, setIsScraped] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [interviews, setInterviews] = useState([]);
  const [resumes, setResumes] = useState([]);

  const [view, setView] = useState('interview');
  const handleInterviewClick = () => {
    setView('interview'); // 면접 후기 보기로 설정
  };

  const handleCoverLetterClick = () => {
      setView('coverletter'); 
  };

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        // 변경된 API 경로에 맞춰서 요청
        const response = await axios.get(`http://localhost:8080/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        setJob(response.data); // job 상태 설정
      } catch (error) {
        console.error('공고 상세 정보를 가져오는 데 실패했습니다:', error);
      }
    };
  
    fetchJobDetail();
  }, [jobId, accessToken]);
  
  useEffect(() => {
    // job 데이터가 세팅된 후에만 API 호출
    if (job?.industry) {
      if (view === 'interview') {
        fetchInterviews(job.industry);
      } else if (view === 'coverletter') {
        fetchResumes(job.industry);
      }
    }
  }, [view, job?.industry, accessToken]);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        // 변경된 API 경로에 맞춰서 요청
        const response = await axios.get(`http://localhost:8080/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setJob(response.data);

        const scrapResponse = await axios.get(`http://localhost:8080/scraps/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setIsScraped(scrapResponse.data);

        await fetchInterviews(response.data.industry);
        await fetchResumes(response.data.industry);
      } catch (error) {
        console.error('공고 상세 정보를 가져오는 데 실패했습니다:', error);
      }
    };

    fetchJobDetail();
  }, [jobId, accessToken]);

  const toggleScrap = async () => {
    try {
      if (isScraped) {
        await axios.delete(`http://localhost:8080/scraps/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      } else {
        await axios.post(`http://localhost:8080/scraps/jobs/${jobId}`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
      }
      setIsScraped(!isScraped);
    } catch (error) {
      console.error('스크랩 처리 중 오류가 발생했습니다:', error);
    }
  };

 // 데이터 가져오기 함수에서 파라미터 사용
  const fetchInterviews = async (department) => {
    try {
      const response = await axios.get(`http://localhost:8080/search/interviews`, {
        params: { department, page: 1 }, // 페이지 번호는 API 설계에 따라 조정
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      setInterviews(response.data.content);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const fetchResumes = async (department) => {
    try {
      const response = await axios.get(`http://localhost:8080/search/resumes`, {
        params: { department, page: 1 }, // 페이지 번호는 API 설계에 따라 조정
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      setResumes(response.data.content);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    }
  };
  
  useEffect(() => {
    console.log(interviews); // 면접 후기 데이터 확인
    console.log(resumes); // 합격 자소서 데이터 확인
  }, [interviews, resumes]);

  if (!job) {
    return <div>로딩 중...</div>;
  }

  
  // JobDetailsResponseDto에 맞춰서 상세 정보 표시
  return (
    <JobDetailContainer>
      <JobHeader>
        <div>
          <JobCompany>{job.company}</JobCompany>
          <JobTitle>{job.title}</JobTitle>
          <ScrapButton onClick={toggleScrap}>
            {isScraped ? '스크랩 취소' : '스크랩'}
          </ScrapButton>
          <Link to={job.url}>
            <Button>공고 보기</Button>
          </Link>
        </div>
      </JobHeader>
      <JobDescription>
        <p>근무지역 {job.location}</p>
        <p>직무 {job.industry}</p>
        <p>경력 {job.experienceLevel}</p>
        <p>학력 {job.educationLevel}</p>
        <p>접수 시작 마감일 {job.openingDate}~{job.expirationDate} </p>
      </JobDescription>

      <ButtonContainer>
        <Button onClick={handleInterviewClick} selected={view === 'interview'}>면접 후기</Button>
        <Button onClick={handleCoverLetterClick} selected={view === 'coverletter'}>합격 자소서</Button>
      </ButtonContainer>

      {view === 'interview' && (
        <Content>
          <Title>면접 후기</Title>
          <InterviewListContainer>
            {interviews.map((interview) => (
              <InterviewItem key={job.id}>
                <div className="company-position">{interview.company} | {interview.position} | {interview.when}</div>
                <div className="details">
                  <span>{interview.language}</span> /
                  <span> 대외활동: {interview.activity}</span> /
                  <span> {interview.certificate}</span> /
                  <span> {interview.education}</span> /
                  <span> {interview.department}</span> /
                  <span> 학점: {interview.grade}</span>
                </div>
                <div className="scrap-views">
                  스크랩 {interview.scrap} | 조회수 {interview.views}
                </div>
              </InterviewItem>
            ))}
          </InterviewListContainer>
        </Content>
      )}

      {view === 'coverletter' && (
        <Content>
          <Title>합격 자소서</Title>
          <InterviewListContainer>
            {resumes.map((resume) => (
              <InterviewItem key={resume.id}>
                <div className="company-position">{resume.company} | {resume.position} | {resume.when}</div>
                <div className="details">
                  <span>{resume.language}</span> /
                  <span> 대외활동: {resume.activities}</span> /
                  <span> {resume.certificate}</span> /
                  <span> {resume.education}</span> /
                  <span> {resume.department}</span> /
                  <span> 학점: {resume.grade}</span>
                </div>
                <div className="scrap-views">
                  스크랩 {resume.scrap} | 조회수 {resume.views}
                </div>
              </InterviewItem>
            ))}
          </InterviewListContainer>
        </Content>
      )}  
      </JobDetailContainer>
  );
};

export default JobDetail;

const ScrapButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  &:hover {
    background: #f7f7f7;
  }
`;

const JobDetailContainer = styled.div`
    align-items: center;
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;


const JobTitle = styled.h1`
  margin: 0;
  color: #333;
  font-size: 26px;
`;

const JobCompany = styled.p`
  color: #666;
  font-size: 18px;
`;

const JobDescription = styled.div`
  line-height: 1.6;
  color: #666;
`;

const Content = styled.div``;

const Title = styled.div`
    color: #636363;
    font-size: 1.5625rem;
    font-weight: 600;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 40px;
  width: 100%;
  align-self: flex-start;
  margin-left: calc(50% - 592px);
`;

const Button = styled.button`
  margin-right: 20px;
  height: 57px;
  background-color: ${({ selected }) => (selected ? '#5B00EF' : '#E2E2E2')};
  border-radius: 30px;
  border: none;
  cursor: pointer;
  padding: 0 30px;
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 22px;
  color: white;
  transition: background-color 0.2s;
`;

const InterviewListContainer = styled.div`
    font-family: SUITE;
    display: flex;
    width: 50rem;
    flex-direction: column;
    background-color: #Eff0F4; // 배경색 변경
    border-radius: 3%; // 모서리 둥글게
    padding: 1.5rem; // 내부 여백
    margin-top: 1rem; // 위 여백
`;

const InterviewItem = styled.div`
    font-family: SUITE;
    display: flex;
    flex-direction: column;
    padding: 2rem 0; // 상하 여백
    border-bottom: 2px solid #A1A1A1; // 구분선 스타일

    &:last-child {
    border-bottom: none; // 마지막 항목 구분선 제거
    }

    .company-position {
    font-size: 1.5625rem;
    color: #000000; // 텍스트 색상
    font-weight: bold; // 굵기
    margin-bottom: 0.5rem; // 여백
    }

    .details {
    font-size: 0.875rem; // 상세 정보 폰트 크기
    color: #666; // 텍스트 색상
    margin-bottom: 2rem;
    }

    .scrap-views {
    font-size: 0.875rem; // 상세 정보 폰트 크기
    color: #666; // 텍스트 색상
    }
`;