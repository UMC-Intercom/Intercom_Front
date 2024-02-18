import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeData from '../data/fakeData';
import fakeInterviewData from '../data/fakeInterviewData';
import fakeCoverletterData from '../data/fakeCoverletterData';
import axios from 'axios';
import config from '../path/config';
import TalkPagination from "./TalkPagination";

const WrittenContentPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'SUITE';
  font-weight: 400;
  color: #636363;
  align-self: flex-start;
  margin-left: calc(50% - 592px);
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
  font-family: 'SUITE';
  font-size: 22px;
  color: white;
  transition: background-color 0.2s;
`;

const TalkListContainer = styled.div`
  width: 1202px;
  background-color: #EFF0F4;
  border-radius: 10px;
  padding-top: 30px;
  padding-bottom: 40px;
  overflow-y: auto;
`;
const SearchResultItem = styled.div`
  border-bottom: 1px solid #ddd;
  font-family: 'SUITE';

  padding: 32px 0;

  .title, .content, .response {
    margin: 5px 0;
    padding-left: 70px;
    padding-right: 70px;
  }

  .title {
    font-size: 24px;
    font-weight: 700;
  }
  .content{
    margin-top: 10px;
    font-size: 19px;
    color: #A1A1A1;
  }
  .response {
    font-weight: 500;
    font-size: 16px;
    margin-top: 10px;
    color: #636363;
  }
`;

const InterviewReviewContainer = styled.div`
  width: 1202px;
  min-height: 958px;
  background-color: #EFF0F4;
  border-radius: 10px;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const InterviewReviewContainer2 = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;


const InterviewReviewBox = styled.div`
  width: 1044px;
  height: auto;
  background-color: #FFFFFF;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 40px;
`;

const InfoBox = styled.div`
  margin-top: 25px;
  margin-bottom: 20px; 
  margin-left: 40px;
  cursor: pointer;
`;

const InfoItems = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 32px;
`;

const InfoItem = styled.div`
  font-family: 'SUITE';
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

const InfoDetail = styled.div`
  color: #636363;
  font-family: 'SUITE';
  font-size: 19px;
  display: flex;
  flex-direction: column;
  margin-top: 7px;
`;

const InfoContent = styled.span`
  font-family: 'SUITE';
  font-weight: 700;
  font-size: 24px;
`;

const SectionDivider = styled.div`
  height: 2px;
  background-color: #E2E2E2;
  width: 92%; // 너비를 80%로 조정
  margin: 30px auto; // 자동 마진으로 중앙 정렬
`;

const ReviewBox = styled.div`
  margin-left: 40px;
  margin-right: 40px;
`;

const ReviewContent = styled.p`
  font-family: 'SUITE';
  font-size: 19px;
  color: #636363;
  margin-bottom: 20px;
`;

const ReviewStats = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: 'SUITE';;
  font-size: 16px;
  color: #636363;
  & > span {
    margin-right: 20px;
  }
`;

const CoverLetterContainer = styled(InterviewReviewContainer)``;

const WrittenContentPageComponent = () => {
  const [view, setView] = useState('talk'); // 'talk', 'interview' 중 하나를 상태로 관리
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 4;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState([]);
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;

  const handleNavigate = () => {
    navigate('/interview');
  };

  const handleNavigate2 = () => {
    navigate('/cover-letters');
  };

  useEffect(() => {
    setData(fakeData);
  }, []);

  const handleTalkClick = () => {
    setCurrentPage(1);
    setView('talk'); // 톡톡 글 보기로 설정
  };

  const handleInterviewClick = () => {
    setCurrentPage(1);
    setView('interview'); // 면접 후기 보기로 설정
  };

  const handleCoverLetterClick = () => {
    setCurrentPage(1);
    setView('coverletter'); 
  };

  const fetchData = async (endpoint) => {
    try {
      const response = await axios.get(`${config.API_URL}${endpoint}`);
      // response.data에 있는 content를 사용하여 상태 업데이트
      setData(response.data.content);
    } catch (error) {
      console.error("데이터를 불러오는 데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    let endpoint = '';
    switch(view) {
      case 'talk':
        endpoint = '/users/talk';
        break;
      case 'interview':
        endpoint = '/users/interview';
        break;
      case 'coverletter':
        endpoint = '/users/resume';
        break;
      default:
        console.error('알 수 없는 뷰 타입입니다.');
        return;
    }

    const accessToken = localStorage.getItem('accessToken');

    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}${endpoint}?page=${currentPage}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setData(response.data.content); // 서버로부터 받은 데이터로 상태
        setTotalPages(response.data.totalPages);
        setTotalElements(response.data.totalElements);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchData();
  }, [view, currentPage]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
};

// 뷰 변경 핸들러
const handleViewChange = (newView) => {
  setData([]); // 뷰 변경 전 데이터 초기화
  setCurrentPage(1);
  setView(newView);
};

  const renderContent = () => {
    switch(view) {
      case 'talk':
      case 'interview':
      case 'coverletter':
        return (
          <TalkListContainer>
            {data.map((item) => (
              <SearchResultItem key={item.id}>
                <p className="title">{item.title}</p>
                <p className="content">{item.content || "내용이 없습니다."}</p>
                <p className="response">조회수 {item.viewCount}회 &nbsp;&nbsp; 스크랩 {item.scrapCount}</p>
              </SearchResultItem>
            ))}
            <TalkPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
          </TalkListContainer>
        );
      default:
        return <p>데이터를 불러올 수 없습니다.</p>;
    }
  };


  return (
    <WrittenContentPage>
      <Title>작성한 글</Title>
      <ButtonContainer>
        <Button onClick={() => handleViewChange('talk')} selected={view === 'talk'}>톡톡 글</Button>
        <Button onClick={() => handleViewChange('interview')} selected={view === 'interview'}>면접 후기</Button>
        <Button onClick={() => handleViewChange('coverletter')} selected={view === 'coverletter'}>합격 자소서</Button>
      </ButtonContainer>
      {renderContent()}
    </WrittenContentPage>
  );
};

export default WrittenContentPageComponent;
