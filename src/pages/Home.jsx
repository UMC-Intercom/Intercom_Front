import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import fakeNotices from '../data/fakeNotices';


const ITEMS_PER_PAGE = 24;

const Home = () => {
    const [activePage, setActivePage] = useState("/home");
    const navigate = useNavigate();
    const totalPages = Math.ceil(fakeNotices.length / ITEMS_PER_PAGE);
 
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (path) => {
      navigate(path);
      setActivePage(path);
    };

    const indexOfLastNotice = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstNotice = indexOfLastNotice - ITEMS_PER_PAGE;
    const currentNotices = fakeNotices.slice(indexOfFirstNotice, indexOfLastNotice);


    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    };


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
        <span style={{fontSize: "1.563rem", fontWeight: "800"}}>실시간 인기 공고</span>
        <ContentsBox>
            <Content>
                {currentNotices.map(notice => (
                 <NoticeItem key={notice.id}>
                    <img src={notice.imageUrl} alt={notice.title} style={{marginBottom: "1.25rem"}}/>
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
        <Pagination>
          {/* 현재 페이지가 1 또는 2일 때 */}
          {currentPage === 1 && totalPages > 1 && (
            <>
              <PageNumber
                onClick={() => paginate(1)}
                isActive={true}
              >
                1
              </PageNumber>
              <PageNumber
                onClick={() => paginate(2)}
                isActive={false}
              >
                2
              </PageNumber>
              {totalPages > 2 && (
                <Arrow
                  src="/assets/RightArrow.png"
                  onClick={() => paginate(3)}
                  alt="Next"
                />
              )}
            </>
          )}

          {currentPage === 2 && (
            <>
              <PageNumber
                onClick={() => paginate(1)}
                isActive={false}
              >
                1
              </PageNumber>
              <PageNumber
                onClick={() => paginate(2)}
                isActive={true}
              >
                2
              </PageNumber>
              {totalPages > 2 && (
                <Arrow
                  src="/assets/RightArrow.png"
                  onClick={() => paginate(3)}
                  alt="Next"
                />
              )}
            </>
          )}

          {/* 현재 페이지가 3 이상일 때 */}
          {currentPage > 2 && (
            <>
              <Arrow
                src="/assets/LeftArrow.png"
                onClick={() => paginate(currentPage - 1)}
                alt="Previous"
              />
              <PageNumber
                onClick={() => paginate(currentPage)}
                isActive={true}
              >
                {currentPage}
              </PageNumber>
              {currentPage < totalPages && (
                <Arrow
                  src="/assets/RightArrow.png"
                  onClick={() => paginate(currentPage + 1)}
                  alt="Next"
                />
              )}
            </>
          )}
        </Pagination>
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

const Information = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
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

const PageNumber = styled.span`
  font-family: SUITE;
  font-size: 1.25rem;
  margin: 0 0.1rem;
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
  ${({ isArrow }) => isArrow && `pointer-events: none;`}
  border-radius: 50%; // 원형 모양
  background-color: ${({ isActive }) => (isActive ? "#E0E0E0" : "transparent")}; // 선택된 페이지에 대한 배경색
  display: inline-block;
  text-align: center;
  min-width: 2rem; // 최소 너비 설정
  height: 2rem; // 높이 설정
  line-height: 2rem; // 텍스트를 수직 중앙으로 정렬
`;

const Arrow = styled.img`
  width: 7px;
  height: 15px;
  cursor: pointer;
  margin-top: 0.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
`;