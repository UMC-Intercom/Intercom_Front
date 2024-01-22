import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const fakeNotices = [
    {
      id: 1,
      imageUrl: "/assets/notice1.jpg",
      title: "가짜 공고 냠냠냠",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
      id: 2,
      imageUrl: "/assets/notice2.jpg",
      title: "가짜 공고 냉돌이",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
      id: 3,
      imageUrl: "/assets/notice3.jpg",
      title: "가짜 공고 냥돌냥",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
        id: 4,
        imageUrl: "/assets/notice4.jpg",
        title: "가짜 공고 돌돌이",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    }, 
    {
        id: 5,
        imageUrl: "/assets/notice5.jpg",
        title: "가짜 공고 냠냠냠",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
        id: 6,
        imageUrl: "/assets/notice6.jpg",
        title: "가짜 공고 냉돌이",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
        id: 7,
        imageUrl: "/assets/notice7.jpg",
        title: "가짜 공고 냥돌냥",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
          id: 8,
          imageUrl: "/assets/notice8.jpg",
          title: "가짜 공고 돌돌이",
          information: "2024년 상반기 체험형 청년인턴",
          deadline:15,
          views:1202
        },
  ];

const Home = () => {
    const [activePage, setActivePage] = useState("/home");
    const navigate = useNavigate();
  
    const handlePageChange = (path) => {
      navigate(path);
      setActivePage(path);
    };

  return (
    <Main>
     
      <MenuBox>
      <PageIcons>
          <Icons onClick={() => handlePageChange('/saved-notices')}>
            <img src="/assets/SavedNotices.png" alt="SavedNotices" 
            style={{width:"64px", height:"80px", marginBottom:"20px"}} />
            <span>저장한 공고</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/my-career')}>
            <img src="/assets/MyCareer.png" alt="MyCareer"
             style={{width:"74.61px", height:"67.15px", marginBottom:"32.85px"}}  />
            <span>내 커리어</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/talktalk')}>
            <img src="/assets/Talktalk.png" alt="Talktalk"
             style={{width:"82.19px", height:"81.99px", marginBottom:"18.01px"}}  />
            <span>톡톡</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/cover-letters')}>
            <img src="/assets/Coverletters.png" alt="Coverletters"
             style={{width:"64px", height:"81px", marginBottom:"19px"}}  />
            <span>합격 자소서</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/interviews')}>
            <img src="/assets/interviews.png" alt="Interviews"
             style={{width:"66px", height:"80px", marginBottom:"20px"}}  />
            <span>면접 후기</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/news')}>
            <img src="/assets/News.png" alt="News"
             style={{width:"64px", height:"64px", marginBottom:"36px"}}  />
            <span>취업 뉴스</span>
          </Icons>
        </PageIcons>
      </MenuBox>
      <RecommendBox>
        <span>내 스펙을 분석해 <br/> 관심 있을 만한 포지션을 추천해 드려요.</span>
        <StartButton>
            <span onClick={() => handlePageChange('/recommend')}>지금 시작하기</span>
        </StartButton>
      </RecommendBox>
      <PopularNoticesBox>
        <span style={{fontSize: "25px", fontWeight: "800"}}>실시간 인기 공고</span>
        <ContentsBox>
            <Content>
                {fakeNotices.map(notice => (
                 <NoticeItem key={notice.id}>
                    <img src={notice.imageUrl} alt={notice.title} style={{marginBottom:"20px"}}/>
                    <div>
                        <Title>[{notice.title}] </Title>
                        <Information>{notice.information}</Information>
                        <br />
                        <br />
                        <Deadline>D-{notice.deadline}</Deadline> <Views>조회 {notice.views}</Views>
                    </div>
                 </NoticeItem>
                ))}
            </Content>
        </ContentsBox>
      </PopularNoticesBox>
    </Main>
  );
};

export default Home;





const PopularNoticesBox = styled.div`
width: 1200px;
margin: 50px auto;
padding: 20px; 
display: flex;
flex-direction: column;
justify-content: center; 
`;
const ContentsBox = styled.div`
width: 1200px;
min-height: 437px; 
background-color: #FFFFFF;
border-radius: 20px;
`
;
const Content = styled.div`
display: flex;
gap: 25px;
flex-wrap: wrap;

@media (max-width: 1200px) {
justify-content: space-around;
}
`;

const NoticeItem = styled.div`
flex: 0 0 calc(25% - 20px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 20px;

img {
    background-color: #D9D9D9;
  width: 100%; 
  height: auto;
  aspect-ratio: 1 / 1;
  object-fit: cover; 

span {
  font-size: 20px;
  text-align: left;
  margin-top: 20px; 
}
`;

const RecommendBox = styled.div`
width: 1200px;
height: 196px;
background-color: #EFF0F4;
border-radius: 20px;
display: flex;
align-items: center;
justify-content: space-between;
margin: 50px auto;
margin-top: 80px;

span {
    font-size: 30px;
    font-weight: bold;
    text-align: left;
    margin-left: 95px; 

  }
`
const Main = styled.div`
  padding: 20px;
`;

const MenuBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 70px;
  max-width: 1000px;
`;

const Icons = styled.div`
display: flex;
flex-direction: column;
align-items: center;
cursor: pointer;
  span {
    font-size: 17px;
    text-align: center;
  }
`;

const StartButton = styled.div`
width: 224px;
height: 72px;
background-color: #5B00EF;
border-radius: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer;
margin-right: 62px;

span {
font-size: 25px;
color: #fff;
display: inline-block;
width: 100%;
white-space: nowrap;
overflow: hidden;
}
`;

const Title = styled.span`
font-weight: bold;
font-size: 20px;
`;

const Information = styled.span`
font-size: 20px;
font-weight: bold;
`;

const Deadline = styled.span`
font-size: 17px;
color: #5B00EF;
`;

const Views = styled.span`
color: #636363;

`;