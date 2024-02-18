import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeData from '../data/fakeData';
import fakeInterviewData from '../data/fakeInterviewData';
import fakeCoverletterData from '../data/fakeCoverletterData';

const WrittenContentPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
`;

const Title = styled.h2`
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 25px;
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
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 22px;
  color: white;
  transition: background-color 0.2s;
`;

const TalkListContainer = styled.div`
  width: 1202px;
  max-height: 958px;
  background-color: #EFF0F4;
  border-radius: 10px;
  padding-top: 40px;
  padding-bottom: 40px;
  overflow-y: auto;
`;
const SearchResultItem = styled.div`
  border-bottom: 1px solid #ddd;

  padding: 20px 0;

  .title, .content, .response {
    margin: 5px 0;
    padding-left: 70px;
    padding-right: 70px;
  }

  .title {
    font-family: 'SUITE-ExtraBold', sans-serif;
    font-size: 24px;
  }
  .content{
    margin-top: 10px;
    font-family: 'SUITE-SemiBold', sans-serif;
    font-size: 19px;
    color: #A1A1A1;
  }
  .response {
    font-family: 'SUITE-Bold', sans-serif;
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

const FieldBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
`;

const FieldBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 40px;
  gap: 10px; // 아이템들 사이의 고정 간격
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 110px); 
`;

const FieldItem = styled.div`
  background-color: transparent;
  color: #5B00EF; 
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 17px; 
  padding: 10px 20px; 
  margin-top: 2.2rem;
  border-radius: 5px; 
  border: 1.5px solid #5B00EF;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 25px;
  margin-bottom: 20px; 
  margin-left: 40px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 39px;
`;

const InfoTitle = styled.span`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #A1A1A1;
  margin-bottom: 5px;
`;

const InfoContent = styled.span`
  font-family: 'SUITE-Bold', sans-serif;
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

const ReviewTitle = styled.h3`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #A1A1A1;
  margin-bottom: -15px;
`;

const ReviewContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -25px;
`;

const ReviewContentTitle = styled.p`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 24px;
`;

const ReviewContent = styled.p`
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 19px;
  color: #636363;
  margin-bottom: 20px;
`;

const ReviewStats = styled.div`
  display: flex;
  justify-content: flex-start;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 16px;
  color: #636363;
  & > span {
    margin-right: 20px;
  }
`;

const EditButton = styled.img`
  cursor: pointer;
  width: 19.73px; // Set a specific size for your image
  align-self: flex-end;
`;

const ViewMoreButton = styled.button`
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 16px;
  color: #A1A1A1; // Adjust the color to match your design
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #5B00EF;
  }
`;

const CoverLetterContainer = styled(InterviewReviewContainer)``;

const WrittenContentPageComponent = () => {
  const [view, setView] = useState('talk'); // 'talk', 'interview' 중 하나를 상태로 관리
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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
    setView('talk'); // 톡톡 글 보기로 설정
  };

  const handleInterviewClick = () => {
    setView('interview'); // 면접 후기 보기로 설정
  };

  const handleCoverLetterClick = () => {
    setView('coverletter'); 
  };

  return (
    <WrittenContentPage>
      <Title>작성한 글</Title>
      <ButtonContainer>
        <Button onClick={handleTalkClick} selected={view === 'talk'}>톡톡 글</Button>
        <Button onClick={handleInterviewClick} selected={view === 'interview'}>면접 후기</Button>
        <Button onClick={handleCoverLetterClick} selected={view === 'coverletter'}>합격 자소서</Button>
      </ButtonContainer>

      {view === 'talk' && (
        <TalkListContainer>
          {data.map(item => (
            <SearchResultItem key={item.id}>
              <p className="title">{item.title}</p>
              <p className="content">{item.content || "내용이 없습니다."}</p>
              <p className="response">답변: {item.answers} | 댓글: {item.comments} | 조회수: {item.views} | 좋아요: {item.likes}</p>
            </SearchResultItem>
          ))}
        </TalkListContainer>
      )}

      {view === 'interview' && (
        <InterviewReviewContainer>
            <CenteredContainer>
            <InterviewReviewContainer2>
                {fakeInterviewData && fakeInterviewData.length > 0 && fakeInterviewData.map((data, index) => (
                <InterviewReviewBox key={index}>
                    <InfoBox>
                    <InfoItem>
                        <InfoContent>{data.company} |&nbsp;</InfoContent>
                    </InfoItem>
                    <InfoItem>
                        <InfoContent>{data.position} |&nbsp;</InfoContent>
                    </InfoItem>
                    <InfoItem>
                        <InfoContent>{data.when}</InfoContent>
                    </InfoItem>
                    </InfoBox>
                    <SectionDivider />
                    <ReviewBox>
                    <ReviewTitle>면접 후기</ReviewTitle>
                    <ReviewContentHeader>
                        <ReviewContentTitle>{data.interview.q1}</ReviewContentTitle>
                        <ViewMoreButton onClick={handleNavigate}>더보기</ViewMoreButton>
                    </ReviewContentHeader>
                    <ReviewContent>{data.interview.content}</ReviewContent>
                    <ReviewStats>
                        <span>스크랩 {data.scrap}</span>
                        <span>조회수 {data.views}회</span>
                    </ReviewStats>
                    </ReviewBox>
                </InterviewReviewBox>
                ))}
            </InterviewReviewContainer2>
            </CenteredContainer>
        </InterviewReviewContainer>
      )}

      {view === 'coverletter' && (
        <CoverLetterContainer>
            <CenteredContainer>
            <InterviewReviewContainer2>
                {fakeCoverletterData && fakeCoverletterData.length > 0 && fakeCoverletterData.map((data, index) => (
                <InterviewReviewBox key={index}>
                    <FieldBoxContainer>
                    <FieldBox>
                        {data.field.map((fieldItem, fieldIndex) => (
                        <FieldItem key={fieldIndex}>{fieldItem}</FieldItem>
                        ))}
                    </FieldBox>
                    <EditButton src="./assets/Edit2.png" onClick={handleNavigate2} alt="Edit" />
                    </FieldBoxContainer>
                    <InfoBox>
                    <InfoItem>
                        <InfoTitle>기업 이름</InfoTitle>
                        <InfoContent>{data.company}</InfoContent>
                    </InfoItem>
                    <InfoItem>
                        <InfoTitle>지원 포지션</InfoTitle>
                        <InfoContent>{data.position}</InfoContent>
                    </InfoItem>
                    </InfoBox>
                    <SectionDivider />
                    <ReviewBox>
                    <ReviewTitle>면접 후기</ReviewTitle>
                    <ReviewContentHeader>
                        <ReviewContentTitle>{data.coverletter.title}</ReviewContentTitle>
                        <ViewMoreButton onClick={handleNavigate2}>더보기</ViewMoreButton>
                    </ReviewContentHeader>
                    <ReviewContent>{data.coverletter.content}</ReviewContent>
                    <ReviewStats>
                        <span>댓글 {data.comments}</span>
                        <span>스크랩 {data.scrap}</span>
                        <span>조회수 {data.views}회</span>
                    </ReviewStats>
                    </ReviewBox>
                </InterviewReviewBox>
                ))}
            </InterviewReviewContainer2>
            </CenteredContainer>
        </CoverLetterContainer>
      )}
        </WrittenContentPage>
        );

        
    };

export default WrittenContentPageComponent;
