import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Comment from './Comment'; // Comment 컴포넌트를 임포트합니다.

const TalkComment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  // 댓글 목록을 서버에서 조회하는 함수를 useEffect 밖으로 이동
  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/posts/${postId}/comments`);
      setComments(response.data); // 서버로부터 받은 댓글 목록으로 상태 업데이트
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
        await axios.post(`http://localhost:8080/posts/${postId}/comments`, {
          content: commentInput,
          // 여기에 추가적인 데이터를 포함할 수 있습니다.
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
      <CommentInputContainer>
        <CommentInput
          type="text"
          value={commentInput}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton onClick={submitComment}>등록하기</SubmitButton>
      </CommentInputContainer>
      <CommentsContainer>
        {comments.map((comment, index) => (
          <Comment key={index} comment={comment} />
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
  border-radius: 0 0 1.25rem 1.25rem; /* 아래쪽 모서리에만 border-radius 적용 */
  border-top: none; /* 위쪽 테두리 없애기 */
  width: 75rem; /* 너비 설정 */
  margin-left: 6.38rem; /* PostContainer와 정렬 */
  
`;

const CommentInputContainer = styled.div`
  display: flex;
  justify-content: center; // 가운데 정렬
  align-items: center; // 수직 중앙 정렬
  margin-bottom: 114px;
  margin-top: 78px;
`;
const CommentInput = styled.input`
  padding: 8px;
  border: 2px solid #A1A1A1;
  outline: none; // 테두리 변화 없애기
  width: 993px; // 너비 조정
  height: 138px; // 높이 조정
  resize: none; // 크기 조절 비활성화
`;


const SubmitButton = styled.button`
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
`;
