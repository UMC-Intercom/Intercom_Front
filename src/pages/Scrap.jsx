import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from './AuthContext';
import fakeNotices from '../data/fakeNotices'; // Ensure the path to fakeNotices is correct
import fakeInterviewData from '../data/fakeInterviewData'; 
import fakeData from '../data/fakeData';
import fakeCoverletterData from '../data/fakeCoverletterData';



const Scrap = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleLogin } = useAuth();

    const isCurrentPath = (path) => location.pathname === path;

    const handleLogout = () => {
        toggleLogin();
        navigate('/');
    };

    const [view, setView] = useState('announcement');
    const [data, setData] = useState([]);

    useEffect(() => {
        if (view === 'announcement') {
            setData(fakeNotices);
        }
        else if (view === 'interview') {
          setData(fakeInterviewData);
        }
        else if (view === 'coverletter') {
            setData(fakeCoverletterData);
        }
        else if (view === 'talk') {
            setData(fakeData);
        }
      }, [view]);

    const handleAnnouncementClick = () => {
        setView('announcement'); // 공고 글 보기로 설정
    };
    
    const handleInterviewClick = () => {
        setView('interview'); // 면접 후기 보기로 설정
    };
    
    const handleCoverLetterClick = () => {
        setView('coverletter'); 
    };

    const handleTalkClick = () => {
        setView('talk');
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
                            <Title>공고({fakeNotices.length})</Title>
                            <NoticesContent>
                                {fakeNotices.map(notice => (
                                    <NoticeItem key={notice.id} >
                                    <img src={notice.imageUrl} alt={notice.title} style={{marginBottom: "1.25rem"}}/>
                                    <div>
                                        <NoticeTitle>[{notice.title}]</NoticeTitle> 
                                        <Information>{notice.information}</Information>
                                        <br />
                                        <br />
                                        <NoticeDeadline>D-{notice.deadline} </NoticeDeadline> <NoticeViews> 조회 {notice.views}</NoticeViews>
                                    </div>
                                    </NoticeItem>
                                ))}
                            </NoticesContent>
                        </Content>   
                    )}

                    {view === 'interview' && (
                        <Content> 
                            <Title>면접 후기({fakeInterviewData.length})</Title>
                            <InterviewListContainer>
                                {data.map(item => (
                                    <InterviewItem key={item.id}>
                                    <div className="header">
                                        <span className="category">{item.field}</span>
                                        <h2 className="title">{item.company} {item.position}</h2>
                                    </div>
                                    {item.interview && ( // 여기서 interview 객체가 있는지 확인합니다.
                                        <div className="body">
                                        <p className="content">{item.interview.q1}</p> {/* 이제 안전하게 접근할 수 있습니다. */}
                                        <p className="details">
                                            댓글: {item.comments} | 스크랩: {item.scrap} | 조회수: {item.views}
                                        </p>
                                        </div>
                                        )}
                                    </InterviewItem>
                                ))}
                            </InterviewListContainer>
                        </Content>
                    )}

                    {view === 'coverletter' && (
                        <Content> 
                            <Title>합격 자소서({fakeInterviewData.length})</Title>
                            <InterviewListContainer>
                                {data.map(item => (
                                    <InterviewItem key={item.id}>
                                    <div className="header">
                                        <span className="category">{item.field}</span>
                                        <h2 className="title">{item.company} {item.position}</h2>
                                    </div>
                                    {item.interview && ( // 여기서 interview 객체가 있는지 확인합니다.
                                        <div className="body">
                                        <p className="content">{item.interview.q1}</p> {/* 이제 안전하게 접근할 수 있습니다. */}
                                        <p className="details">
                                            댓글: {item.comments} | 스크랩: {item.scrap} | 조회수: {item.views}
                                        </p>
                                        </div>
                                        )}
                                    </InterviewItem>
                                ))}
                            </InterviewListContainer>
                        </Content>
                    )}
                    
                    {view === 'talk' && (
                        <Content> 
                            <Title>톡톡 글({fakeData.length})</Title>
                            <TalkListContainer>
                            {data.map(item => (
                                <SearchResultItem key={item.id}>
                                <p className="title">{item.title}</p>
                                <p className="content">{item.content || "내용이 없습니다."}</p>
                                <p className="response">답변: {item.answers} | 댓글: {item.comments} | 조회수: {item.views} | 좋아요: {item.likes}</p>
                                </SearchResultItem>
                            ))}
                            </TalkListContainer>
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
  margin-top: 1rem;
  background-color: #fff; // 면접 후기 배경색
  border-radius: 10px; // 모서리 둥글게
  padding: 20px; // 패딩
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 그림자 효과
  overflow-y: auto; // 내용이 많을 경우 스크롤
  max-height: 600px; // 최대 높이 설정
`;

const InterviewItem = styled.div`
  border-bottom: 1px solid #ececec; // 항목 사이의 구분선
  padding: 20px 0; // 상하 패딩

  &:last-child {
    border-bottom: none; // 마지막 항목에는 구분선 없음
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px; // 헤더와 내용 사이의 여백
  }

  .category {
    font-size: 0.875rem; // 카테고리 폰트 크기
    background-color: #e0e0e0; // 카테고리 배경색
    border-radius: 20px; // 카테고리 둥글게
    padding: 5px 15px; // 카테고리 내부 여백
    color: #555; // 카테고리 텍스트 색상
    margin-right: 10px; // 카테고리와 제목 사이 여백
  }

  .title {
    font-weight: bold; // 제목 굵게
    font-size: 1.25rem; // 제목 폰트 크기
    flex-grow: 1; // 제목이 남은 공간을 모두 차지
  }

  .content {
    font-size: 1rem; // 내용 폰트 크기
    color: #666; // 내용 텍스트 색상
    line-height: 1.5; // 줄 간격
    margin-bottom: 10px; // 내용과 상세정보 사이 여백
  }

  .details {
    font-size: 0.875rem; // 상세정보 폰트 크기
    color: #999; // 상세정보 텍스트 색상
  }
`;

        

const TalkListContainer = styled.div`
    margin-top: 1rem;
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