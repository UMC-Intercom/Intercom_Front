import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from './Comment'; // Comment 컴포넌트를 임포트합니다.

const TalkComment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기

  // 댓글 목록을 서버에서 조회하는 함수를 useEffect 밖으로 이동
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://www.umcintercom.site/comments/talk/${postId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const commentsWithReplies = response.data.reduce((acc, comment) => {
        if (comment.parentId === null) {
          return [...acc, { ...comment, replies: [] }];
        } else {
          const parentIndex = acc.findIndex((c) => c.id === comment.parentId);
          acc[parentIndex].replies.push(comment);
          return acc;
        }
      }, []);

      setComments(commentsWithReplies);

      ///setComments(response.data); // 서버로부터 받은 댓글 목록으로 상태 업데이트
    } catch (error) {
      console.error('댓글을 불러오는 데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트 마운트 시 댓글 목록 불러오기
  }, [postId]); // postId가 변경될 때마다 댓글 목록 새로고침

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const submitComment = async () => {
    if (commentInput.trim() !== '') {
      try {
        await axios.post(`http://www.umcintercom.site/comments`, {
          talkId : postId,
          content: commentInput,
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });

        setCommentInput(''); // 입력 필드 초기화
        fetchComments(); // 댓글 목록 새로고침
      } catch (error) {
        console.error('댓글 등록에 실패했습니다.', error);
      }
    }
  };

  return (
    <CommentSectionContainer>
       <CommentForm onSubmit={submitComment}>
        <CommentInput
          value={commentInput}
          onChange={handleCommentChange}
          placeholder="답변을 달아주세요!"
        />
        <SubmitButton type="submit">등록하기</SubmitButton>
      </CommentForm>
      <CommentsContainer>
        {comments.map((comment) => (
            <React.Fragment key={comment.id}>
              <Comment comment={comment} postId={postId} fetchComments={fetchComments} />
              {comment.replies.map((reply) => (
                  <Comment key={reply.id} comment={reply} postId={postId} />
              ))}
            </React.Fragment>
        ))}
      </CommentsContainer>
    </CommentSectionContainer>
  );
};

export default TalkComment;


// Styled Components
const CommentSectionContainer = styled.div`
background: #FFF;
border: 2px solid #E2E2E2;
border-radius: 1.25rem;
border-top: none;
display: flex;
flex-direction: column;
width: 75rem;
margin-bottom: 2rem;
padding: 2rem;
border-top-left-radius: 0; /* 하단 좌측 모서리를 뾰족하게 하기 위한 값 설정 */
border-top-right-radius: 0; /* 하단 우측 모서리를 뾰족하게 하기 위한 값 설정 */

`;

const CommentForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  position: relative; // SubmitButton을 상대적으로 배치하기 위함
`;

const CommentInput = styled.textarea`
  padding: 8px;
  padding-right: 80px; // "등록하기" 버튼을 위한 공간 확보
  border: 2px solid #A1A1A1;
  border-radius:
  outline: none;
  width: 993px;
  height: 138px;
  resize: none;
`;


const SubmitButton = styled.button`
position: absolute;
right: 59px; // 입력 칸 오른쪽 내부에 위치
top: 85%;
transform: translateY(-50%); 
  border-radius: 4px; /* 테두리 둥글게 설정 */
  border: none; /* 테두리 없애기 */
  background-color: #5B00EF; /* 배경색 설정 */
  color: white; /* 글자색 설정 */
  cursor: pointer; /* 마우스 오버 시 커서 변경 */
width: 128px;
height: 45px;
  &:hover {
    background-color: #4e00d1; /* 호버 시 배경색 변경 */
  }
`;

const CommentsContainer = styled.div`
  padding-left: 150px;
  width: 900px;
`;