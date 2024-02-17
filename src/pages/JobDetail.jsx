import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetailContainer = styled.div`
  background: #fff;
  padding: 30px;
  margin: 30px auto;
  max-width: 1000px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const JobHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const JobLogo = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 20px;
  object-fit: contain;
  border-radius: 5px;
  background-color: #f3f3f3;
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

const JobDescription = styled.p`
  line-height: 1.6;
  color: #666;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #f3f3f3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e2e2;
  }
`;

// JobDetail 컴포넌트 정의
const JobDetail = () => {
    const [job, setJob] = useState(null);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
  
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
        } catch (error) {
          console.error('공고 상세 정보를 가져오는 데 실패했습니다:', error);
        }
      };
  
      fetchJobDetail();
    }, [jobId, accessToken]);
  
    if (!job) {
      return <div>로딩 중...</div>;
    }
  
    // JobDetailsResponseDto에 맞춰서 상세 정보 표시
    return (
      <JobDetailContainer>
        <JobHeader>
          <JobLogo src={job.logoUrl || '기본 로고 이미지 URL'} alt={`${job.company} 로고`} />
          <div>
            <JobTitle>{job.title}</JobTitle>
            <JobCompany>{job.company}</JobCompany>
          </div>
        </JobHeader>
        {/* 기타 필요한 정보 표시 */}
        <JobDescription>
          <p>산업 분야: {job.industry}</p>
          <p>위치: {job.location}</p>
          <p>경력 수준: {job.experienceLevel}</p>
          <p>학력 수준: {job.educationLevel}</p>
          {/* 추가적으로 필요한 정보들을 여기에 표시 */}
        </JobDescription>
        <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton>
      </JobDetailContainer>
    );
  };
  
  export default JobDetail;
