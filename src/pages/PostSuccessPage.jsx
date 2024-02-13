import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 스타일 적용
const SuccessPageWrapper = styled.div`
  text-align: center;
  margin-top: 341px;
`;

const SuccessMessage = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: #000000;
`;

const Button = styled.button`
  background-color: #5B00EF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 588px;
  height: 72px;
  font-size: 20px;
  margin-top: 563px;
`;

const PostSuccessPage = ({ postId }) => {
  const navigate = useNavigate();

  const handleViewPost = () => {
    navigate(`/post/1`);
    //navigate(`/post/:${postId}`);
  };

  return (
    <SuccessPageWrapper>
      <SuccessMessage>글이 등록되었습니다!</SuccessMessage>
      <Button onClick={handleViewPost}>확인</Button>
    </SuccessPageWrapper>
  );
};

export default PostSuccessPage;
