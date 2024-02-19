import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TalkPagination from "./TalkPagination"; 
import Slider from 'react-slick'; // npm install react-slick
import "slick-carousel/slick/slick.css"; //npm install react-slick slick-carousel 
import "slick-carousel/slick/slick-theme.css";

const ITEMS_PER_PAGE = 24;
const Home = () => {
  const [interests, setInterests] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const isLoggedIn = accessToken !== null;
  const [scrappedJobs, setScrappedJobs] = useState({});
  const [sortState, setSortState] = useState('default');


  useEffect(() => {
    const fetchInterests = async () => {
      // 로컬 스토리지에서 토큰을 가져옵니다.
  
      try {
        // axios 요청 헤더에 토큰을 포함시켜 관심 정보를 요청합니다.
        const response = await axios.get('http://localhost:8080/users/interests', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
  
        // 응답으로 받은 관심 정보를 상태에 저장합니다.
        setInterests(response.data);
      } catch (error) {
        console.error("Failed to fetch interests:", error);
      }
    };
  
    fetchInterests();
  }, []);

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

  const handlePageChange = (path) => {
    navigate(path);
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
};

const handleInterestClick = async (interest) => {
  if (selectedInterest === interest) {
    setSelectedInterest(null);
    fetchJobs(); 
  } else {
    setSelectedInterest(interest);
    const response = await axios.get(`http://localhost:8080/jobs/by-category?interest=${interest}&page=${currentPage}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
    setJobs(response.data.content);
    setTotalPages(response.data.totalPages);
  }
};

const incrementViewCount = async (jobId) => {
  try {
    await axios.get(`http://localhost:8080/jobs/${jobId}`, {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    fetchJobs();
  } catch (error) {
    console.error("Error incrementing view count:", error);
  }
};

// 공고 목록을 가져오기
const fetchJobs = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/jobs/by-count?page=${currentPage}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    setJobs(response.data.content);
    setTotalPages(response.data.totalPages);
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
  }
};

//스크랩
const toggleScrap = async (jobId) => {
  const isScrapped = scrappedJobs[jobId];
  setScrappedJobs({ ...scrappedJobs, [jobId]: !isScrapped });

  try {
    if (!isScrapped) {
      await axios.post(`http://localhost:8080/scraps/jobs/${jobId}`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    } else {
      await axios.delete(`http://localhost:8080/scraps/jobs/${jobId}`, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
    }
  } catch (error) {
    console.error("Error toggling scrap:", error);
  }
};
const ScrapIcon = ({ jobId, isScrapped }) => (
  <div style={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer', zIndex: 2 }}>
    <img
      src={isScrapped ? "/assets/scrap.png" : "/assets/Vector9.png"}
      alt="Scrap"
      onClick={(event) => {
        event.stopPropagation();
        toggleScrap(jobId);
      }}
      style={{ width: '24px', height: '32px' }}
    />
  </div>
);


const calculateRemainingDays = (expirationDate) => {
  const today = new Date();
  const expiration = new Date(expirationDate);
  const timeDiff = expiration - today;
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff > 0 ? `D-${daysDiff}` : '기한 만료';
};


  const BannerSlider = () => {
  const settings = {
      infinite: true, // 무한 반복 여부
      speed: 12000, // 애니메이션 전환 속도 (밀리초 단위)
      slidesToShow: 1, // 한 번에 보여줄 슬라이드 수
      slidesToScroll: 1, // 스크롤할 때마다 넘어가는 슬라이드 수
      autoplay: true, // 자동 재생 여부
      autoplaySpeed: 1, // 자동 재생 시간 간격 (밀리초 단위)
  };
  return (
    <StyledSlider {...settings}>
      <div onClick={() => navigate('/type-test-home')}>
        <img src="/assets/Banner.png" alt="Banner 1" style={{width: "100%", display: "block"}} />
      </div>
      <div onClick={() => navigate('/type-test-home')}>
        <img src="/assets/Frame8.png" alt="Banner 2" style={{width: "100%", display: "block"}} />
      </div>
    </StyledSlider>
  );
};

  return (
    <Main>
     
      <MenuBox>
      <PageIcons>
          <Icons onClick={() => handlePageChange('/scrap')}>
            <img src="/assets/SavedNotices.png" alt="SavedNotices" 
            style={{width: "4rem", height: "5rem", marginBottom: "1.25rem"}} />
            <span>스크랩</span>
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
          <Icons onClick={() => handlePageChange('/cover-letters-home')}>
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
     
      <BannerSlider onClick={() => navigate('/type-test-home')}
      style={{ marginTop:"50px"}}/> 
      <PopularNoticesBox>
                <span style={{ fontSize: "1.563rem", fontWeight: "800" }}>실시간 인기 공고</span>
                {isLoggedIn && (
                <InterestButtons>
                {interests.map((interest, index) => (
                <InterestButton
                key={index}
                onClick={() => handleInterestClick(interest)}
                isActive={selectedInterest === interest} 
                > {interest}
                 </InterestButton>
               ))}
               </InterestButtons> 
               )}
                <ContentsBox>
                <Content>
                {jobs.map(job => (
                  <NoticeItem key={job.id} onClick={() => {
                              navigate(`/job/${job.id}`);
                              incrementViewCount(job.id);
                              }}>
               <ImageWrapper>
               <img src={job.logoUrl} alt={job.title} />
                {isLoggedIn && (
                 <ScrapIcon jobId={job.id} isScrapped={!!scrappedJobs[job.id]} />
                  )}
             </ImageWrapper>             
                   <div>
                   <Title>[{job.company}] {job.title}</Title>
                   <TextWrap>
                     <SecondaryTitle>{job.company}</SecondaryTitle>
                   </TextWrap>
                   <Deadline>{calculateRemainingDays(job.expirationDate)}</Deadline>
                   <Views>조회 {job.viewCount.toLocaleString()}회</Views>
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


//스타일시트
const breakpoints = {
  mobile: '480px',
  tablet: '768px'
};

const mediaQueries = {
  mobile: `@media screen and (max-width: ${breakpoints.mobile})`,
  tablet: `@media screen and (max-width: ${breakpoints.tablet})`
};


const PopularNoticesBox = styled.div`
  width: 75rem;
  margin: auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${mediaQueries.mobile} {
    width: 100%;
    padding: 0.5rem;
  }

  ${mediaQueries.tablet} {
    width: 100%;
    padding: 1rem;
  }
`;

const ContentsBox = styled.div`
  width: 75rem;
  min-height: auto; 
  background-color: #FFFFFF;
  border-radius: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  gap: 1.563rem;
  flex-wrap: wrap;

  ${mediaQueries.mobile} {
    gap: 1rem;
    justify-content: center;
  }

  ${mediaQueries.tablet} {
    gap: 1.25rem;
    justify-content: space-around;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #D9D9D9;

  &:hover {
    filter: brightness(75%);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ScrapIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  z-index: 2; /* 스크랩 버튼이 이미지 위에 오도록 z-index 추가 */
  
  img {
    width: 24px;
    height: 24px;
  }
`;

const NoticeItem = styled.div`
  position: relative; /* 스크랩 버튼을 포함한 공고 아이템을 상대적으로 위치 설정 */
  flex: 0 0 calc(25% - 1.25rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  cursor: pointer;

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


  ${mediaQueries.mobile} {
    flex: 0 0 calc(50% - 10px); // 모바일에서 공고 아이템의 너비 조정
    margin: 5px; // 모바일에서 공고 아이템 사이의 간격 조정
  }

  ${mediaQueries.tablet} {
    flex: 0 0 calc(33.333% - 1rem); // 태블릿에서 한 줄에 3개씩 나오도록 조정
  }



`;

const BannerImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  cursor: pointer;
`;

const Main = styled.div`
  padding: 1.25rem;

  ${mediaQueries.mobile} {
    padding: 1rem;
  }

  ${mediaQueries.tablet} {
    padding: 1rem;
  }
`;

const MenuBox = styled.div`
  font-family: SUITE;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mediaQueries.mobile} {
    flex-direction: column; // 모바일에서는 아이콘을 세로로 배치
  }
`;

const PageIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  margin-top: 4.375rem;
  max-width: 58rem;

  ${mediaQueries.mobile} {
    margin-top: 2rem; // 모바일에서 상단 여백 줄임
  }
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
  ${mediaQueries.mobile} {
    img {
      width: 50%; // 모바일에서 아이콘 크기를 50%로 조정
    }

    span {
      font-size: 0.8rem; // 모바일에서 폰트 크기를 0.8rem으로 조정
    }
  }

  ${mediaQueries.tablet} {
    img {
      width: 70%; // 태블릿에서 아이콘 크기를 70%로 조정
    }

    span {
      font-size: 0.9rem; // 태블릿에서 폰트 크기를 0.9rem으로 조정
    }
  }

`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 3; // Limit to 2 lines
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4em;
`;

const Deadline = styled.span`
  font-size: 1.063rem;
  color: #5B00EF;
  font-weight: 700;
  margin-right: 12px;
`;

const Views = styled.span`
  color: #636363;
  font-size: 1.063rem;

  font-weight: 700;

`;

const InterestButton = styled.button`
  padding: 10px 20px;
  font-family: SUITE;
  border: 2px solid ${props => props.isActive ? '#5B00EF' : '#636363'};
  border-radius: 5px;
  cursor: pointer;
  margin-right : 16px;
  margin-top: 26px;
  display: inline-block;
  background-color: transparent;
  color: ${props => props.isActive ? '#5B00EF' : '#636363'};
  &:hover {
    border: 2px solid #5B00EF;
    color: #5B00EF
  }
  font-size: 1.063rem;
  font-weight: 700;

`;

const InterestButtons = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;
const TextWrap = styled.div`
  margin-bottom: 15px; `;

const SecondaryTitle = styled.div`
font-size: 17px;
font-weight: 700;
margin-top: 14px;`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    outline: none; 
  }

  .slick-dots { 
    bottom: -30px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto; 
margin-top: 70px;
max-width:1300px;


${mediaQueries.mobile} {
  margin-top: 40px;
  max-width: 90%;
}

${mediaQueries.tablet} {
  margin-top: 50px;
  max-width: 95%;
}



`;
