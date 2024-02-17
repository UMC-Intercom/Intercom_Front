import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TalkPagination from "./TalkPagination"; 

const ITEMS_PER_PAGE = 24;

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

    const handlePageChange = (path) => {
      navigate(path);
    };

    const onPageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
  };

    useEffect(() => {
      const fetchJobs = async () => {
          try {
              const response = await axios.get(`http://localhost:8080/jobs/by-count?page=${currentPage}`);
              setJobs(response.data.content);
              setTotalPages(response.data.totalPages);
          } catch (error) {
              console.error("Failed to fetch jobs:", error);
          }
      };

      fetchJobs();
  }, [currentPage]);


  return (
    <Main>
     
      <MenuBox>
      <PageIcons>
          <Icons onClick={() => handlePageChange('/scrap')}>
            <img src="/assets/SavedNotices.png" alt="SavedNotices" 
            style={{width: "4rem", height: "5rem", marginBottom: "1.25rem"}} />
            <span>저장한 공고</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/mycareer')}>
            <img src="/assets/MyCareer.png" alt="MyCareer"
            style={{width: "4.663rem", height: "4.197rem", marginBottom: "2.053rem"}}  />
            <span>내 커리어</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/talktalk')}>
            <img src="/assets/Talktalk.png" alt="Talktalk"
             style={{width: "5.136rem", height: "5.124rem", marginBottom: "1.126rem"}} />
             <span>톡톡</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/cover-letters')}>
            <img src="/assets/Coverletters.png" alt="Coverletters"
             style={{width: "4rem", height: "5.063rem", marginBottom: "1.188rem"}} />
             <span>합격 자소서</span>
          </Icons>
          <Icons onClick={() => handlePageChange('/interviews')}>
            <img src="/assets/interviews.png" alt="Interviews"
             style={{width: "4.125rem", height: "5rem", marginBottom: "1.25rem"}} />
             <span>면접 후기</span>
          </Icons>
        </PageIcons>
      </MenuBox>
      <BannerImg>
        <img src="/assets/Banner.png" alt="Banner" 
        style={{width: "75rem"}} />
      </BannerImg>
      <PopularNoticesBox>
                <span style={{ fontSize: "1.563rem", fontWeight: "800" }}>실시간 인기 공고</span>
                <ContentsBox>
                    <Content>
                        {jobs.map(job => (
                            <NoticeItem key={job.id}>
                                <img src={job.logoUrl} alt={job.title} style={{ marginBottom: "1.25rem" }} />
                                <div>
                                    <Title>[{job.company}] {job.title}</Title>
                                    <Deadline>D-{job.expirationDate}</Deadline> <Views>조회 {job.viewCount}</Views>
                                </div>
                            </NoticeItem>
                        ))}
                    </Content>
                </ContentsBox>
         <TalkPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </PopularNoticesBox>
    </Main>
  );
};

export default Home;




const PopularNoticesBox = styled.div`
  width: 75rem;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentsBox = styled.div`
  width: 75rem;
  min-height: 27.313rem;
  background-color: #FFFFFF;
  border-radius: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  gap: 1.563rem;
  flex-wrap: wrap;

  @media (max-width: 75rem) {
    justify-content: space-around;
  }
`;

const NoticeItem = styled.div`
  flex: 0 0 calc(25% - 1.25rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;

  img {
    background-color: #D9D9D9;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  span {
    font-size: 1.25rem;
    text-align: left;
    margin-top: 1.25rem;
  }
`;

const BannerImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`;

const Main = styled.div`
  padding: 1.25rem;
`;

const MenuBox = styled.div`
  font-family: SUITE;
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
  margin-top: 4.375rem;
  max-width: 58rem;
`;

const Icons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  span {
    font-size: 1.063rem;
    text-align: center;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
`;


const Deadline = styled.span`
  font-size: 1.063rem;
  color: #5B00EF;
`;

const Views = styled.span`
  color: #636363;
`;

const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;
