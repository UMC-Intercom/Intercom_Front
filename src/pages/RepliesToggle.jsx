import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReplyList from './ReplyList'; // 댓글 목록을 표시하는 컴포넌트

const RepliesSection = styled.div`
  margin-top: 10px;
`;

const ReplyInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ReplyInput = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const ToggleButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
`;

const RepliesToggle = ({ talkId, parentId }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [newReply, setNewReply] = useState('');

  const toggleRepliesVisibility = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const submitReply = async (parentId) => {
    if (!newReply.trim()) return;
    try {
      const accessToken = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰 가져오기
      const response = await axios.post('http://localhost:8080/comments/reply', {
        talkId: talkId,
        parentId: parentId, // 대댓글이 달릴 상위 댓글의 ID
        content: newReply
      }, {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });
  
      console.log('Reply added successfully:', response.data); // 성공적으로 대댓글이 추가된 후의 응답 로깅
      setNewReply(''); // 입력 필드 초기화
  
      // TODO: 여기서 대댓글 목록을 새로고침하는 로직을 추가해야 합니다.
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };
  

  return (
    <RepliesSection>
      <ToggleButton onClick={toggleRepliesVisibility}>
      </ToggleButton>
      {showReplies && (
        <>
          <ReplyList talkId={talkId} />
          <ReplyInputContainer>
            <ReplyInput type="text" placeholder="댓글을 입력하세요..." value={newReply} onChange={handleReplyChange} />
            <SubmitButton onClick={submitReply}>댓글 달기</SubmitButton>
          </ReplyInputContainer>
        </>
      )}
    </RepliesSection>
  );
};

export default RepliesToggle;
