import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ko from 'date-fns/locale/ko';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ActionButtons from './ActionButtons'; 
import Adopt from './Adopt';


const RepliesContainer = styled.div`
  margin-top: 20px;
  margin-left: -80px;
`;

const ReplyContainer = styled.div`
background: #FFF;
border-top: 2px solid #E2E2E2;
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



const ProfileAdoptWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center; 
width: 100%; 
margin-top: 10px;
`;
const TopBar = styled.div`
  height: 10px; 
  background-color: #5B00EF; 
  width: 1100px; 
`;
const AdoptedTag = styled.div`
  justify-content: flex-end;
  background: none;
  color: #5B00EF;
  font-size: 20px;
  font-weight: 800;
  margin-right: 5px;
  margin-top: 10px;
  margin-left: auto;

`;


const fetchCurrentUser = async (accessToken) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/current-user`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
};



const ReplyList = ({ talkId, postWriter  , adoptedReplyId, onAdoptReply}) => {
    const defaultProfileImg = '../assets/MyProfile.png';
    const [replies, setReplies] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const [liked, setLiked] = useState(false); 
    const [showReplies, setShowReplies] = useState(false);
    const [showRepliesFor, setShowRepliesFor] = useState({});
    const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

    const [adoptedCommentId, setAdoptedCommentId] = useState(null);
    const [nestedReplies, setNestedReplies] = useState([]);
    const [isAdopted, setIsAdopted] = useState(false);

    const addReplyToList = (newReply) => {
      setReplies((prevReplies) => [...prevReplies, newReply]);
    };


    const checkAdoptionStatus = async () => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/check-adopt/${talkId}`);
          setIsAdopted(response.data);
      } catch (error) {
          console.error('Error checking adoption status:', error);
      }
  };

  
    useEffect(() => {
      const checkAdoptionStatus = async () => {
          try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/check-adopt/${talkId}`);
              setIsAdopted(response.data);
          } catch (error) {
              console.error('Error checking adoption status:', error);
          }
      };

      if (talkId) {
          checkAdoptionStatus();
      }
  }, [talkId, adoptedCommentId]);

  const handleAdopt = async (commentId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/comments/${commentId}/adopt`, {}, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
      setAdoptedCommentId(commentId); // 채택된 댓글 ID 업데이트
      // 채택 성공에 대한 추가 처리 (예: 알림 표시)
    } catch (error) {
      console.error("Error adopting comment:", error);
    }
    onAdoptReply(commentId);
  };


    const NestedReplyInput = ({ parentId, onReplySubmit }) => {
      const [replyContent, setReplyContent] = useState('');

      const handleSubmit = async (e) => {
        e.preventDefault();
       
        onReplySubmit(parentId, replyContent);
        setReplyContent(''); 
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            style={{
              paddingLeft: '30px',
              fontFamily: 'SUITE',
              fontSize: '17px',
              fontWeight: '700',
              width: '800px', // 입력창의 너비 설정
              marginLeft: '70px',
              border: 'none', // 테두리 색상 설정
              height: '44px',
              outline: 'none', // 포커스 시 테두리 스타일 제거
              marginTop: '62px'
            }}
          />
          <button
            type="submit"
            disabled={!replyContent.trim()} // 입력창이 비어있으면 버튼 비활성화
            style={{
              marginTop: '62px',
              fontSize: '17px',
              fontWeight: '700',
              fontFamily: 'SUITE',
              width: '148px',
              height: '46px',
              border: 'none',
              backgroundColor: replyContent.trim() ? '#5B00EF' : '#ccc', // 입력 내용에 따라 배경색 변경
              color: 'white',
              cursor: replyContent.trim() ? 'pointer' : 'default', // 입력 내용에 따라 커서 변경
            }}
          >
            등록 하기
          </button>
        </form>
      );
    };
    




    const handleNestedReplySubmit = async ( parentId, content) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/comments/reply`, {
          talkId:talkId,
          parentId,
          content
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, 
            'Content-Type': 'application/json'
          }
        });
    
        if (response.status === 200) {
          const newNestedReply = response.data;
         setNestedReplies([...nestedReplies, newNestedReply]);
        }
      } catch (error) {
        console.error('Error submitting nested reply:', error);
        // 에러 처리 로직 구현
      }
    };
    

    const fetchReplies = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/talk/${talkId}`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });    
                const comments = response.data.filter(reply => !reply.parentId || reply.parentId === null);
                const nestedReplies = response.data.filter(reply => reply.parentId);
                console.log(comments)
                console.log(nestedReplies)
                // 서버 응답에서 userLiked 속성을 사용하여 각 댓글의 좋아요 상태를 설정합니다.
                const repliesWithLikeStatus = comments.map(reply => ({
                    ...reply,
                    liked: reply.userLiked,
                    likeCount: reply.likeCount || 0,
                    defaultProfile: reply.defaultProfile,
                }));
                setReplies(repliesWithLikeStatus);
                setNestedReplies(nestedReplies);

            } catch (error) {
                console.error("Error fetching replies:", error);
            }
        };


        useEffect(() => {
          const getCurrentUser = async () => {
            const user = await fetchCurrentUser(accessToken);
            setCurrentUser(user);
          };
      
          if (accessToken) {
            getCurrentUser();
          }
        }, [accessToken]);


        useEffect(() => {
          const fetchReplies = async () => {
            try {
              const response = await axios.get(`${process.env.REACT_APP_API_URL}/comments/talk/${talkId}`, {
                headers: { 'Authorization': `Bearer ${accessToken}` },
              });
              // 채택된 답변을 상단에 배치하는 정렬 로직
              const sortedReplies = response.data.sort((a, b) => b.adoptionStatus === 'ADOPTED' ? -1 : a.id - b.id);
              setReplies(sortedReplies);
            } catch (error) {
              console.error("Error fetching replies:", error);
            }
          };
        
          fetchReplies();
        }, [talkId, accessToken, adoptedCommentId]); // adoptedCommentId가 변경될 때마다 댓글 목록을 새로고침합니다.
        
    const handleToggleLike = async (commentId) => {
        // 댓글의 좋아요 상태를 토글하는 함수입니다.
        const replyIndex = replies.findIndex(reply => reply.id === commentId);
        if (replyIndex === -1) return;

        const reply = replies[replyIndex];
        const updatedReplies = [...replies];
        const updatedReply = { ...reply, liked: !reply.liked };

        try {
            if (!reply.liked) {
                await axios.post(`${process.env.REACT_APP_API_URL}/likes/comments/${commentId}`, {}, {
                    headers: { 'Authorization': `Bearer ${accessToken}` },
                });
                updatedReply.likeCount += 1;
                } else {
                await axios.delete(`${process.env.REACT_APP_API_URL}/likes/comments/${commentId}`, {
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

  
      const toggleNestedRepliesVisibility = (commentId) => {
        setShowRepliesFor(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

      useEffect(() => {
        fetchReplies().then(() => {
          // 채택된 답변을 상단에 배치
          setReplies(prevReplies => 
            prevReplies.sort((a, b) => b.adoptionStatus === 'ADOPTED' ? 1 : -1)
          );
        });
      }, [talkId, accessToken, adoptedCommentId]); // adoptedCommentId가 변경될 때마다 댓글 목록을 업데이트합니다.
    
     
    return (
        <RepliesContainer>
            {replies.map(reply => (
               <div key={reply.id}>
                <ReplyContainer key={reply.id}>
                   {reply.adoptionStatus === 'ADOPTED' && <TopBar />}
                   {reply.adoptionStatus === 'ADOPTED' && (
              <AdoptedTag>작성자 채택</AdoptedTag>)} 
                  <ProfileAdoptWrapper>
                    <ReplyHeader>
                    
                        <ReplyProfileImage src={reply.defaultProfile || defaultProfileImg} alt="Profile"style={{ border: '3px solid #E2E2E2' }} />
                        <ReplyUserInfo>
                            <ReplyUserName>{reply.writer}
                            {reply.mentorField && <CheckIcon src="/assets/Group133.png" alt="Verified" />}
                            </ReplyUserName> 
                            {reply.mentorField && <ReplyMentorField>{reply.mentorField}</ReplyMentorField>}
                        </ReplyUserInfo>
                    </ReplyHeader>
                   
                    {currentUser && currentUser.nickname === postWriter && !isAdopted && (
  <Adopt commentId={reply.id} accessToken={accessToken} adoptionStatus={reply.adoptionStatus} onAdoptSuccess={() => handleAdopt(reply.id)}/>
)}
                  </ProfileAdoptWrapper>
                    <ReplyContent>{reply.content}</ReplyContent>
                    <ReplyFooter>
                        <ReplyDate>{formatDistanceToNow(parseISO(reply.createdAt), { addSuffix: true, locale: ko })}</ReplyDate>
                        <ActionButtons
                         liked={reply.liked}
                         likesCount={reply.likeCount}
                         repliesCount={reply.replyCount}
                          onToggleLike={() => handleToggleLike(reply.id)}
                          handleCommentsClick={() => toggleNestedRepliesVisibility(reply.id)}
                        />
                    </ReplyFooter>


                    {showRepliesFor[reply.id] && (
  <NestedRepliesContainer>
    <NestedRepliesWrapper>
      {nestedReplies
        .filter(nestedReply => nestedReply.parentId === reply.id)
        .map(nestedReply => (
          <NestedReplyContainer key={nestedReply.id}>
            <NestedReplyUserInfo>
              <NestedReplyProfileImage src={nestedReply.defaultProfile || defaultProfileImg} alt="Profile" />
              <NestedReplyUserName>{nestedReply.writer}
              {nestedReply.mentorField && <CheckIcon2 src="/assets/Group133.png" alt="Verified" />}

              </NestedReplyUserName>
            </NestedReplyUserInfo>
            <NestedReplyContent>{nestedReply.content}</NestedReplyContent>
          </NestedReplyContainer>
      ))}
      
      <NestedReplyInput
      parentId={reply.id}
      onReplySubmit={handleNestedReplySubmit}
    />
    </NestedRepliesWrapper>
    
  </NestedRepliesContainer>
)}





                </ReplyContainer>
                
        </div>
                    ))}
        </RepliesContainer>

    );
};

export default ReplyList;
const NestedRepliesContainer = styled.div`
  background: #FFF;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center; 
  padding: 37px; 
  margin-top: 50px;
`;

const NestedRepliesWrapper=styled.div`
background: #EFF0F4;
width: 1120px;
border-radius: 10px;
padding-top: 42.75px;
padding-bottom: 62px; 

`;

const NestedReplyContainer = styled.div`
background: #EFF0F4;
border-bottom: 2px solid #E2E2E2;
display: flex;
flex-direction: column;
width: 984px;
margin-left: 67px;

`;
const NestedReplyUserInfo = styled.div`
  display: flex;
  margin-top: 10px;
  
  justify-content: flex-start; /* 요소들을 왼쪽으로 정렬합니다 */
`;
const NestedReplyProfileImage = styled.img`
width: 34.5px;
height: 34.5px;
border-radius: 50%;
margin-top: 16px

`;
const NestedReplyUserName = styled.div`
font-weight: 900;
font-size: 20px;
font-family: SUITE;
margin-bottom: 2px;
margin-left: 10.75px;
margin-top: 19px
`;
const NestedReplyContent = styled.div`
padding-bottom: 27px;
margin-top: 19px;
font-size: 20px;
font-weight: 600;
margin-left: 11px;
color: rgba(99, 99, 99, 0.5);

`;
const CheckIcon = styled.img`
  width: 20px;  // 로고 크기 조절
  height: 20px; // 로고 크기 조절
  margin-left: 7px; // 이름과의 간격 조절
`;

const CheckIcon2 = styled.img`
  width: 15px;  // 로고 크기 조절
  height: 15px; // 로고 크기 조절
  margin-left: 5px; // 이름과의 간격 조절
`;