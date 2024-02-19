import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ko from 'date-fns/locale/ko';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ActionButtons from './ActionButtons'; 
import RepliesToggle from './RepliesToggle'; // 올바른 경로로 수정하세요

const RepliesContainer = styled.div`
  margin-top: 20px;
`;

const ReplyContainer = styled.div`
background: #FFF;
border: 2px solid #E2E2E2;
border-radius: 1.25rem;
display: flex;
flex-direction: column;
width: 69rem;
padding: 3rem 5rem; 
`;


const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
`;

const ReplyProfileImage = styled.img`
  width: 63.75px;
  height: 63.75px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReplyUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReplyUserName = styled.span`
  font-weight: 900;
  font-size: 25px;
  font-family: SUITE;
  margin-bottom: 2px;
  margin-left: 17px;

`;

const ReplyMentorField = styled.span`
  font-size: 20px;
  color: #000000;
  font-weight: 700;
  margin-left: 17px;

`;

const ReplyContent = styled.div`
  margin-top: 30px;
  font-size: 25px;
  font-weight: 600;

  color: #636363;
`;

const ReplyFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ReplyDate = styled.span`
  font-size: 17px;
  font-weight: 700;
  color: #636363;
`;




const ReplyList = ({ talkId }) => {
    const defaultProfileImg = '../assets/MyProfile.png';
    const [replies, setReplies] = useState([]);
    const [liked, setLiked] = useState(false); // '좋아요' 클릭 상태
    const [showReplies, setShowReplies] = useState(false);
    const [showRepliesFor, setShowRepliesFor] = useState({});
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

   
        const fetchReplies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/comments/talk/${talkId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                // 서버 응답에서 userLiked 속성을 사용하여 각 댓글의 좋아요 상태를 설정합니다.
                const repliesWithLikeStatus = response.data.map(reply => ({
                    ...reply,
                    liked: reply.userLiked,
                    likeCount: reply.likeCount || 0,
                    defaultProfile: reply.defaultProfile,
                }));
                setReplies(repliesWithLikeStatus);
            } catch (error) {
                console.error("Error fetching replies:", error);
            }
        };
    
        useEffect(() => {
            fetchReplies();
            const interval = setInterval(fetchReplies, 3000); // 5초마다 댓글을 새로고침
    
            return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
        }, [talkId, accessToken]);

    const handleToggleLike = async (commentId) => {
        // 댓글의 좋아요 상태를 토글하는 함수입니다.
        const replyIndex = replies.findIndex(reply => reply.id === commentId);
        if (replyIndex === -1) return;

        const reply = replies[replyIndex];
        const updatedReplies = [...replies];
        const updatedReply = { ...reply, liked: !reply.liked };

        try {
            if (!reply.liked) {
                await axios.post(`http://localhost:8080/likes/comments/${commentId}`, {}, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                updatedReply.likeCount += 1;
                } else {
                await axios.delete(`http://localhost:8080/likes/comments/${commentId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                updatedReply.likeCount -= 1;
            }
            updatedReplies[replyIndex] = updatedReply; 
            setReplies(updatedReplies);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const handleCommentsClick = () => {
        setShowReplies(!showReplies);
      };
      const toggleRepliesVisibility = (commentId) => {
        setShowRepliesFor(prev => ({ ...prev, [commentId]: !prev[commentId] }));
      };
      

    return (
        <RepliesContainer>
            {replies.map(reply => (
                <ReplyContainer key={reply.id}>
                    <ReplyHeader>
                        <ReplyProfileImage src={reply.defaultProfile || defaultProfileImg} alt="Profile"style={{ border: '3px solid #E2E2E2' }} />
                        <ReplyUserInfo>
                            <ReplyUserName>{reply.writer}</ReplyUserName>
                            {reply.mentorField && <ReplyMentorField>{reply.mentorField}</ReplyMentorField>}
                        </ReplyUserInfo>
                    </ReplyHeader>
                    <ReplyContent>{reply.content}</ReplyContent>
                    <ReplyFooter>
                        <ReplyDate>{formatDistanceToNow(parseISO(reply.createdAt), { addSuffix: true, locale: ko })}</ReplyDate>
                        <ActionButtons
                         liked={reply.liked}
                         likesCount={reply.likeCount}
                          onToggleLike={() => handleToggleLike(reply.id)}
                          handleCommentsClick={() => toggleRepliesVisibility(reply.id)}
                        />
                        {showRepliesFor[reply.id] && <RepliesToggle talkId={talkId} />}

                    </ReplyFooter>
                </ReplyContainer>
            ))}
        </RepliesContainer>
    );
};

export default ReplyList;