import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import {useAuth} from "./AuthContext";
import ReplyModal from "./ReplyModal";
import ReplyList from './ReplyList';
import ActionButtons from "./ActionButtons";



const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [isMentor, setIsMentor] = useState(false); // 현직자 인증 여부
    const defaultProfileImg = '../assets/MyProfile.png';
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
    const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
    const [liked, setLiked] = useState(false); // '좋아요' 클릭 상태
    const [likesCount, setLikesCount] = useState(0);
    const [commentsCount, setCommentsCount] = useState(0);
    const [isScrapped, setIsScrapped] = useState(false);
    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/join', { state: { from: location } });
            return;
        }

        const fetchData = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${accessToken}` };
                const postDetailsRequest = axios.get(`http://localhost:8080/talks/${postId}`, { headers });
                const scrapStatusRequest = axios.get(`http://localhost:8080/scraps/talks/${postId}`, { headers });
                const likeStatusRequest = axios.get(`http://localhost:8080/likes/talks/${postId}`, { headers });

                const [postDetailsResponse, scrapStatusResponse, likeStatusResponse] = await axios.all([
                    postDetailsRequest,
                    scrapStatusRequest,
                    likeStatusRequest
                ]);

                setPost(postDetailsResponse.data);
                setIsMentor(postDetailsResponse.data.mentorField != null);
                setIsScrapped(scrapStatusResponse.data);
                setLiked(likeStatusResponse.data);
                setLikesCount(postDetailsResponse.data.likeCount);
                setCommentsCount(postDetailsResponse.data.commentCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    if (!post) {
        return <div>Loading post...</div>;
    }
    const handleReplyClick = () => {
        setIsReplyModalOpen(true);
      };
    
      const handleCommentsClick = () => {
        setIsCommentsModalOpen(true);
      };
      const toggleScrap = () => {
 
        if (isScrapped) {
          // 스크랩 취소 요청
          axios.delete(`http://localhost:8080/scraps/talks/${postId}`, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(() => setIsScrapped(false))
            .catch(error => console.error('Error removing scrap:', error));
        } else {
          // 스크랩 추가 요청
          axios.post(`http://localhost:8080/scraps/talks/${postId}`, {}, { headers: { Authorization: `Bearer ${accessToken}` } })
            .then(() => setIsScrapped(true))
            .catch(error => console.error('Error adding scrap:', error));
        }
      };
      const toggleLike = async () => {
        try {
            // 현재 '좋아요' 상태에 따라 요청을 달리합니다.
            if (!liked) {
                // 좋아요가 안 되어 있으면 추가하는 요청
                const response = await axios.post(`http://localhost:8080/likes/talks/${postId}`, {}, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                if (response.status === 200) {
                    setLiked(true); // 좋아요 상태를 true로 설정
                    setLikesCount(prev => prev + 1); // 좋아요 수 증가
                }
            } else {
                // 좋아요가 되어 있으면 삭제하는 요청
                const response = await axios.delete(`http://localhost:8080/likes/talks/${postId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                if (response.status === 200) {
                    setLiked(false); // 좋아요 상태를 false로 설정
                    setLikesCount(prev => prev - 1); // 좋아요 수 감소
                }
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // 에러 처리 로직 (예: 사용자에게 오류 메시지 표시)
        }
    };
    
    const ActionButtons = () => {
        return (
            <ButtonsContainer>
                <TextButton onClick={handleReplyClick}>답변 달기</TextButton>
                <IconButtonWithCount>
                <Count>{likesCount}</Count>
                    <LikeIcon onClick={toggleLike} src={liked ? "/assets/Vector1.png" : "/assets/Vector.png"} alt="좋아요" />   
                </IconButtonWithCount>
                <IconButtonWithCount>
                <Count>{commentsCount}</Count>
                    <CommentIcon onClick={handleCommentsClick} src="/assets/comment.png" alt="댓글 보기" />
                </IconButtonWithCount>
            </ButtonsContainer>
        );
    };
    
  const categories = post.category ? post.category.split(',') : [];

  // 분리된 카테고리를 map 함수로 순회하며 렌더링
  const renderedCategories = categories.length > 0 ? categories.map((category, index) => (
    <Category key={index}>{category.trim()}</Category>
)) : null;

    const timeAgo = post.createdAt ? formatDistanceToNow(parseISO(post.createdAt), { addSuffix: true, locale: ko }) : '시간 정보 없음';

    return (
        <PageContainer>
            <PostContainer>
                <TitleWrapper>
                <LeftContainer>
                        <Title>{post.title}</Title>
                        {isMentor && <MentorLabel>멘토</MentorLabel>}
                    </LeftContainer>
                    {isLoggedIn && ( // 로그인 상태일 때만 스크랩 버튼 표시
                       <RightContainer>
                       <ScrapButton 
                           src={isScrapped ? '/assets/scrap.png' : '/assets/unscrap.png'}
                           alt='스크랩버튼'
                           onClick={toggleScrap}
                       />
                   </RightContainer>
                    )}
                   
                </TitleWrapper>
                <Content dangerouslySetInnerHTML={{ __html: post.content }} />
                <PostingInfoContainer>
                <ProfileImage src={post.imageUrls && post.imageUrls.length > 0 ? post.imageUrls[0] : defaultProfileImg} alt="Profile" style={{ border: '3px solid #E2E2E2' }} />
                    <User>{post.writer}</User>
                    <WrittenTime>{timeAgo}</WrittenTime>
            
                </PostingInfoContainer>
                <BottomWrapper>
                {categories.length > 0 && <Categories>{renderedCategories}</Categories>}
                <ActionButtons
                    postId={postId}
                    liked={liked}
                    toggleLike={toggleLike}
                    likesCount={likesCount}
                    handleCommentsClick={handleCommentsClick}
                    commentsCount={commentsCount}
                />
            </BottomWrapper>
            </PostContainer>
            {isReplyModalOpen && <ReplyModal isOpen={isReplyModalOpen} onClose={() => setIsReplyModalOpen(false)} postId={postId}/>}
            <ReplyList talkId={postId} accessToken={accessToken} />
        </PageContainer>
    );
};

export default PostPage;
const ScrapButton = styled.img`
width: 24px;
height: 32px;
cursor: pointer;

`;
const Categories = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`;
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* 양 끝으로 요소 정렬 */
    width: 100%; /* 전체 너비 사용 */
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
`;
const MentorLabel = styled.span`
display: flex;
    background-color: #9FAEFF;
    color: #FFFFFF;
    border-radius:15px;
    font-weight: bold;
    width: 81px;
    height: 42.23px;
    font-size: 20px;
    align-items: center;
  justify-content: center;
`;


const Category = styled.span`
display: flex;
flex-wrap: wrap;
  min-width: 80px; 
  height: 40px;
  background-color: white;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 700;
  color: #5B00EF;
  border: 2px solid #5B00EF;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
`;


const PostingInfoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom:0.5rem;
`;
const User=styled.div`
margin-right: 11px;
font-size: 17px;
color: #636363;
font-weight: 600;

`;
const WrittenTime=styled.div`
font-size: 17px;
font-weight: 600;
color: #636363;

`;
const BottomWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center; 
    width: 100%; 
    margin-top: 10px;
`;
const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
`;
const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EFF0F4;
    min-height: 100vh;
    padding: 2rem;
`;

const PostContainer = styled.div`
    background: #FFF;
    border: 2px solid #E2E2E2;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    width: 69rem;
    padding: 3rem 5rem; 
    
`;



const Title = styled.h1`
    color: #000;
    font-family: SUITE;
    font-size: 50px
    font-weight: 700;
    margin-right: 1rem;
    overflow-wrap: break-word;
`;
const Content = styled.div`
    font-family: SUITE;
    font-size: 25px;
    color: #636363;
    margin-bottom: 1rem;
    overflow-wrap: break-word; 
    img {
        float: left;
        margin-right: 1rem;
    }
`;
const ContentPreview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%; // 최대 너비 설정
`;
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: flex-end; 
    padding: 10px; 
`;
const TextButton = styled.button`
    background: none;
    border: none;
    color: #5B00EF;
    cursor: pointer;
    margin-right: 13px;
    font-size: 25px;
    font-weight: 700;
    font-family: SUITE;
`;

const LikeIcon = styled.img`
    width: 34px;
    height: 30px;
    cursor: pointer;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;
const CommentIcon = styled.img`
    width: 36.43px;
    height: 34px;
    cursor: pointer;
    &:not(:last-child) {
        margin-right: 10px;
    }
`;
const IconButtonWithCount = styled.div`
    display: flex;
    align-items: center;
    margin-left: 10px; 
`;

const Count = styled.span`
    margin-right: 13px;
    font-size: 25px;
    font-weight: 700;
    color: #636363;
    font-family: SUITE;
`;
