import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TalkPagination from "./TalkPagination";

// JobDetail 컴포넌트 정의
const JobDetail = () => {
  const [job, setJob] = useState(null);
  const [isScraped, setIsScraped] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [interviews, setInterviews] = useState([]);
  const [resumes, setResumes] = useState([]);

  const [view, setView] = useState('coverletter');
  const handleInterviewClick = () => {
    setCurrentPage(1);
    setView('interview'); // 면접 후기 보기로 설정
  };

  const handleCoverLetterClick = () => {
    setCurrentPage(1);
    setView('coverletter');
  };

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;

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
  }, [view, job?.industry, accessToken, currentPage]);

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
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const fetchResumes = async (department) => {
    try {
      const response = await axios.get(`http://localhost:8080/search/resumes`, {
        params: { department, page: currentPage }, // 페이지 번호는 API 설계에 따라 조정
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      setResumes(response.data.content);
      setTotalPages(response.data.totalPages);
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

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
  
  // JobDetailsResponseDto에 맞춰서 상세 정보 표시
  return (
    <JobDetailContainer>
     <JobHeader>
        <Title>채용정보</Title>
        <JobCompany>{job.company}</JobCompany>
        <JobTitleAndScrapContainer>
            <JobTitle>{job.title}</JobTitle>
            <ScrapContainer>
                <ScrapButton onClick={toggleScrap}>스크랩</ScrapButton>
                <ScrapButton2 src={isScraped ? "/assets/Vector10.png" : "/assets/Vector11.png"} alt="Scrap Icon" width={24} height={35}/>
            </ScrapContainer>
        </JobTitleAndScrapContainer>
        <LinkButtonContainer>
            <Link to={job.url}><LinkButton>공고 보기</LinkButton></Link>
        </LinkButtonContainer>
    </JobHeader>
      <JobDescription>
        <DescriptionItem>
          <Label>근무 지역</Label>
          <Item dangerouslySetInnerHTML={{ __html: job.location }}></Item>
        </DescriptionItem>
        <DescriptionItem>
          <Label>직무</Label>
          <Item>{job.industry}</Item>
        </DescriptionItem>
        <DescriptionItem>
          <Label>경력</Label>
          <Item>{job.experienceLevel}</Item>
        </DescriptionItem>
        <DescriptionItem>
          <Label>학력</Label>
          <Item>{job.educationLevel}</Item>
        </DescriptionItem>
        <DescriptionItem>
          <Label>접수 시작 마감일</Label>
          <Item>{job.openingDate}~{job.expirationDate}</Item>
        </DescriptionItem>
        
      </JobDescription>





      
      </JobDetailContainer>
  );
};

export default JobDetail;

const ScrapContainer = styled.div `
  display: flex;
  margin-top: -40px;
`;

const ScrapButton = styled.button`
  font-family: SUITE;
  font-style: normal;
  font-weight: 700;
  height: 40px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  &:hover {
    background: #f7f7f7;
  }
  margin-right: 1rem;
  margin-top: 30px;
`;

const ScrapButton2 = styled.img`
  margin-top: 30px;
`;

const JobDetailContainer = styled.div`
  display: flex;
  margin-left: 0rem;
  align-items: center;
  flex-direction: column;
`;

const JobHeader = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start; // Align items to the start of the flex container
width: 1200px;
margin-top: 3rem;
`;

const JobTitle = styled.h1`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  color: #000000;
  flex: 1; // Allow the title to fill the space
  margin-right: 20px; // Add some margin to the right of the title
`;

const JobCompany = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  color: #000000;
  margin-bottom: 1rem; 
`;

const JobDescription = styled.div`
  display: flex;
  width: 1200px;
  align-items: flex-start;
  flex-direction: column;
  color: #666;
  margin-top: -85px;
`;
const DescriptionItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
`;

const Label = styled.span`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 38px;
  min-width: 250px; // 레이블의 최소 너비를 지정
`;

const LinkButtonContainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
width: 100%;
margin-top: 20px;
z-index: 10; // Ensure it's above other elements
`;

const Item = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 38px;
  display: flex;
  flex: 1;
  text-align: left;
  color: #000000;
`;

const Content = styled.div`
  margin-left:-20rem;
  margin-top: -1rem;
`;

const Title = styled.div`
    color: #5B00EF;
    font-family: 'SUITE';
    font-style: normal;
    font-size: 1.5625rem;
    font-weight: 800;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-self: flex-start;
  margin-left: calc(50% - 592px);
  margin-top: 2rem;
`;


const LinkButton = styled.button`
width: 281px;
height: 72px;
background-color: #5B00EF;
color: white;
border-radius: 10px;
border: none;
cursor: pointer;
padding: 15px 30px;
font-family: 'SUITE-SemiBold', sans-serif;
font-size: 22px;
transition: background-color 0.2s;
text-decoration: none; // Assuming it's styled like a link
display: inline-block; // Helps with clickable area
text-align: center; // Center the text if needed
`;

const JobTitleAndScrapContainer = styled.div`
  display: flex;
  justify-content: space-between; // Adjust as needed to space between title and scrap button
  align-items: center;
  width: 100%; // Make sure it spans the entire width of its container
  margin-top: -50px;
`;


const Button = styled.button`
  margin-right: 20px;
  width: 228px;
  height: 52px;
  background-color: white;
  color: ${({ selected }) => (selected ? '#5B00EF' : '#E2E2E2')};
  border-radius: 10px;
  border: 3px solid ${({ selected }) => (selected ? '#5B00EF' : '#E2E2E2')};
  cursor: pointer;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
`;

const InterviewListContainer = styled.div`
    font-family: SUITE;
    font-weight: 800;
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: white; // 배경색 변경
    border-radius: 3%; // 모서리 둥글게
    border: 2px solid #E2E2E2; // 윤곽선 색 변경
    padding: 1.5rem; // 내부 여백
    margin-top: 1rem; // 위 여백
`;

const InterviewItem = styled.div`
    font-family: SUITE;
    display: flex;
    flex-direction: column;
    padding: 2rem 0; // 상하 여백
    border-bottom: 2px solid #E2E2E2; // 구분선 스타일

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

const Resume = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
color: #A1A1A1;
`;

const InterviewContent = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
color: #A1A1A1;
`;