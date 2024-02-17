import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from './AuthContext';
import fakeNotices from '../data/fakeNotices'; // Ensure the path to fakeNotices is correct
import fakeInterviewData from '../data/fakeInterviewData'; 
import fakeData from '../data/fakeData';
import fakeCoverletterData from '../data/fakeCoverletterData';
import axios from "axios";
import config from '../path/config';
import TalkPagination from "./TalkPagination";
import {Link} from "./join";

const ITEMS_PER_PAGE = 4;
const NOTICES_PER_PAGE = 9;

const Scrap = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleLogin } = useAuth();

    // const totalPages = Math.ceil(fakeInterviewData.length / ITEMS_PER_PAGE);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState([]);
    const indexOfLast = currentPage * ITEMS_PER_PAGE;
    const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
    const currentInterviews = fakeInterviewData.slice(indexOfFirst, indexOfLast);
    const currentTalks = fakeData.slice(indexOfFirst, indexOfLast);

    const totalNoticePages = Math.ceil(fakeNotices.length / NOTICES_PER_PAGE);
 
    const indexOfLastNotice = currentPage * NOTICES_PER_PAGE;
    const indexOfFirstNotice = indexOfLastNotice - NOTICES_PER_PAGE;
    const currentNotices = fakeNotices.slice(indexOfFirstNotice, indexOfLastNotice);

    const isCurrentPath = (path) => location.pathname === path;
    
    const handleLogout = () => {
        toggleLogin();
        navigate('/');
    };

    const [view, setView] = useState('announcement');
    const [data, setData] = useState([]);

    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    useEffect(() => {
        if (view === 'announcement') {
            axios.get(`${config.API_URL}/scraps/jobs?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    page: 1, // 페이지 수
                },
            })
                .then((response) => {
                    const jobDto = response.data;
                    setData(jobDto.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                })
                .catch((error) => {
                    console.error('Error fetching job scraps:', error);
                });
        }
        else if (view === 'interview') {
            axios.get(`${config.API_URL}/scraps/interviews?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    page: 1, // 페이지 수
                },
            })
                .then((response) => {
                    const interviewData = response.data;
                    setData(interviewData.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                })
                .catch((error) => {
                    console.error('Error fetching interview data:', error);
                });
        }
        else if (view === 'coverletter') {
            axios.get(`${config.API_URL}/scraps/resumes?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    page: 1, // 페이지 수
                },
            })
                .then((response) => {
                    const coverletterData = response.data;
                    setData(coverletterData.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                })
                .catch((error) => {
                    console.error('Error fetching coverletter data:', error);
                });
        }
        else if (view === 'talk') {
            axios.get(`${config.API_URL}/scraps/talks?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                params: {
                    page: 1, // 페이지 수
                },
            })
                .then((response) => {
                    const talkData = response.data;
                    setData(talkData.content);
                    setTotalPages(response.data.totalPages);
                    setTotalElements(response.data.totalElements);
                })
                .catch((error) => {
                    console.error('Error fetching talk data:', error);
                });
        }
      }, [currentPage, view]);

    const handleAnnouncementClick = () => {
        setView('announcement'); // 공고 글 보기로 설정
        setCurrentPage(1);
    };
    
    const handleInterviewClick = () => {
        setView('interview'); // 면접 후기 보기로 설정
        setCurrentPage(1);
    };
    
    const handleCoverLetterClick = () => {
        setView('coverletter');
        setCurrentPage(1);
    };

    const handleTalkClick = () => {
        setView('talk');
        setCurrentPage(1);
    };

    const calculateRemainingDays = (expirationDate) => {
        const today = new Date();
        const expiration = new Date(expirationDate);
        const timeDiff = expiration - today;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff > 0 ? `D-${daysDiff}` : '기한 만료';
    };

    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <ScrapContainer>
            <MenuContainer>
                <Divider />
                <MenuItem
                    className={isCurrentPath('/scrap') ? 'selected' : ''}
                    onClick={() => navigate('/scrap')}
                >
                    스크랩
                </MenuItem>
                <MenuItem
                    className={isCurrentPath('/settings') ? 'selected' : ''}
                    onClick={() => navigate('/settings')}
                >
                    설정
                </MenuItem>
                <NewDivider />
                <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
            </MenuContainer>

            <NoticesContainer>
                <ContentsBox>
                    <ButtonContainer>
                        <Button onClick={handleAnnouncementClick} selected={view === 'announcement'}>공고</Button>
                        <Button onClick={handleInterviewClick} selected={view === 'interview'}>면접 후기</Button>
                        <Button onClick={handleCoverLetterClick} selected={view === 'coverletter'}>합격 자소서</Button>
                        <Button onClick={handleTalkClick} selected={view === 'talk'}>톡톡 글</Button>
                    </ButtonContainer>

                    {view === 'announcement' && (  
                        <Content> 
                            <Title>공고({totalElements})</Title>
                            <NoticesContent>
                                {data.map(notice => (
                                    <Link to={`/notice/${notice.id}`} key={notice.id}>
                                    <NoticeItem key={notice.id} >
                                    <img src={notice.logoUrl} alt={notice.title} style={{marginBottom: "1.25rem"}}/>
                                    <div>
                                        <NoticeTitle>[{notice.title}]</NoticeTitle>
                                        <br /><br />
                                        <Information>{notice.company}</Information>
                                        <br /><br />
                                        <NoticeDeadline>{calculateRemainingDays(notice.expirationDate)}</NoticeDeadline> <NoticeViews> 조회 {notice.viewCounts}</NoticeViews>
                                    </div>
                                    </NoticeItem>
                                    </Link>
                                ))}
                                </NoticesContent>
                            <TalkPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </Content>   
                    )}

                    {view === 'interview' && (
                        <Content> 
                            <Title>면접 후기({totalElements})</Title>
                            <InterviewListContainer>
                                {data.map(item => {

                                    const englishList = item.english ? item.english.split(', ') : [];
                                    const scoreList = item.score ? item.score.split(', ') : [];

                                    return (
                                        <Link to={`/interviews/${item.id}`} key={item.id}>
                                        <InterviewItem key={item.id}>
                                            <div className="company-position">{item.company} | {item.department} | {item.year} | {item.semester}</div>
                                            <div className="details">
                                                {englishList.map((english, index) => (
                                                    <span key={index}> {english}: {scoreList[index]}, </span>
                                                ))} /
                                                <span> 대외활동: {item.activity}</span> /
                                                <span> {item.certification}</span> /
                                                <span> {item.education}</span> /
                                                <span> {item.department}</span> /
                                                <span> 학점: {item.gpa}</span>
                                            </div>
                                            <div className="scrap-views">
                                                스크랩 {item.scrapCount}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;조회수 {item.viewCount}
                                            </div>
                                        </InterviewItem>
                                        </Link>
                                    );
                                })}
                            </InterviewListContainer>
                            <TalkPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </Content>
                    )}

                    {view === 'coverletter' && (
                        <Content> 
                        <Title>합격 자소서({totalElements})</Title>
                        <InterviewListContainer>
                            {data.map(item => {
                                const englishList = item.english ? item.english.split(', ') : [];
                                const scoreList = item.score ? item.score.split(', ') : [];

                                return (
                                    <Link to={`/coverletter/${item.id}`} key={item.id}>
                                    <InterviewItem key={item.id}>
                                        <div className="company-position">{item.company} | {item.department} | {item.year} | {item.semester}</div>
                                        <div className="details">
                                            {englishList.map((english, index) => (
                                                <span key={index}> {english}: {scoreList[index]}, </span>
                                            ))} /
                                            <span> 대외활동: {item.activity}</span> /
                                            <span> {item.certification}</span> /
                                            <span> {item.education}</span> /
                                            <span> {item.department}</span> /
                                            <span> 학점: {item.gpa}</span>
                                        </div>
                                        <div className="scrap-views">
                                            스크랩 {item.scrapCount}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;조회수 {item.viewCount}
                                        </div>
                                    </InterviewItem>
                                    </Link>
                                );
                            })}
                        </InterviewListContainer>
                            <TalkPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                    </Content>
                    )}
                    
                    {view === 'talk' && (
                        <Content> 
                            <Title>톡톡 글({totalElements})</Title>
                            <TalkListContainer>
                            {data.map(item => (
                                <Link to={`/talks/${item.id}`} key={item.id}>
                                <SearchResultItem key={item.id}>
                                    <p className="title">{item.title}</p>
                                    <p className="content">{(item.content && item.content.replace(/<img[^>]*>/g,"").replace(/<[^>]*>?/gm, '')) || "내용이 없습니다."}</p>
                                    <p className="response">답변: {item.commentCount}&nbsp;&nbsp;&nbsp;댓글: {item.replyCount}&nbsp;&nbsp;&nbsp;조회수: {item.viewCount}&nbsp;&nbsp;&nbsp;좋아요: {item.likeCount}</p>
                                </SearchResultItem>
                                </Link>
                            ))}
                            </TalkListContainer>
                            <TalkPagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        </Content>
                    )}
                </ContentsBox>
              </NoticesContainer>
            </ScrapContainer>
    );
};
        
export default Scrap;
        

// 왼쪽 사이드 메뉴 스타일링
const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: SUITE;
    font-size: 1.5625rem;
    font-weight: 800;
    color: #636363;
    position: relative;
    left: 15rem;
    padding-top: 4rem;
`;

// 기존 구분선 스타일링
const Divider = styled.img.attrs({src: './assets/Divider1.png'})`
    position: absolute;
    top: 2.5rem;
    width: 0.1875rem;
    height: 18.625rem;
    left: 11rem;
    right: 7rem;
`;


// 왼쪽 사이드 메뉴 아이템 스타일링
const MenuItem = styled.div`
        cursor: pointer;
        padding: 0.625rem;
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 2.62rem;


        &:before {
        content: '';
        background-image: url('./assets/Check.png');
        background-size: contain;
        background-repeat: no-repeat;
        width: 1.1875rem;
        height: 1.1875rem;
        display: block;
        margin-right: 1.1875rem;
        opacity: 0;
        transition: opacity 0.3s;
        }

        &.selected:before {
        opacity: 1;
        }
`;
// 새 구분선 스타일링
const NewDivider = styled.div`
  position: sticky; // 요소를 스티키 포지셔닝합니다.
  margin-top: 56rem; // 부모 컨테이너 대비 하단에서부터의 거리를 지정합니다.
  height: 0.1875rem;
  background: url('./assets/Divider2.png') center/cover no-repeat;
  width: 11.25rem; // Divider의 너비를 지정합니다.
`;
// 로그아웃 텍스트 스타일링
const LogoutText = styled.div`
    cursor: pointer;
    margin-top: 1.44rem;
    margin-left: 4.7rem;
    font-family: SUITE;
    font-size: 1.5625rem;
    color: #636363;
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

const ScrapContainer = styled.div`
    display: flex;
    padding: 2rem;
`;

const NoticesContainer = styled.div`
    position: relative;
    margin-left: calc(7rem + 0.1875rem + 7rem);
    top: 3rem;
    left: 7.8rem;
`;

const ContentsBox = styled.div`
    width: 75rem;
    min-height: 27.313rem;
    background-color: #FFFFFF;
    border-radius: 1.25rem;
`;

const NoticeTitle = styled.h1`
    font-size: 1.5625rem;
    font-weight: 700;
`;
        
const NoticesContent = styled.div`
    display: flex;
    gap: 1.563rem;
    flex-wrap: wrap;

    @media (max-width: 75rem) {
        justify-content: space-around;
    }
`;

const Content = styled.div``;

const Title = styled.div`
    color: #636363;
    font-size: 1.5625rem;
    font-weight: 600;
`;

const NoticeItem = styled.div`
    flex: 0 0 calc(33% - 1.56rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

const Information = styled.span`
    font-size: 1.25rem;
    font-weight: 700;
`;

const NoticeDeadline = styled.span`
    font-size: 1.063rem;
    color: #5b00ef;
`;
        
const NoticeViews = styled.span`
    color: #636363;
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

        

const TalkListContainer = styled.div`
    font-family: SUITE;
    display: flex;
    width: 50rem;
    flex-direction: column;
    background-color: #Eff0F4; // 배경색 변경
    border-radius: 3%; // 모서리 둥글게
    padding: 1.5rem; // 내부 여백
    margin-top: 1rem; // 위 여백
`;

const SearchResultItem = styled.div`
  border-bottom: 2px solid #E2E2E2;

  padding: 20px 0;

  .title, .content, .response {
    margin: 5px 0;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .title {
    font-family: SUITE;
    font-Weight: 700;
    font-size: 1.5625rem;
    color: #000000;
  }
  .content{
    margin-top: 1rem;
    font-family: SUITE;
    font-size: 1.2rem;
    color: #A1A1A1;
  }
  .response {
    font-family: SUITE;
    font-size: 1rem;
    font-weight: 500;
    margin-top: 1rem;
    color: #636363;
  }
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