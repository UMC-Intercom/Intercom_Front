import React from 'react';
import styled from 'styled-components';
import { useNavigate , useLocation } from 'react-router-dom';

// 스타일 적용
const SuccessPageWrapper = styled.div`
  text-align: center;
  margin-top: 230px;
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
  margin-top: 100px;
  margin-bottom: 568px;
`;
const PostSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // location.state에서 postId를 가져옵니다.
  const { postId } = location.state || {}; // state가 없는 경우를 대비해 기본값 설정

  const handleViewPost = () => {
    if (postId) {
      navigate(`/talks/${postId}`);
    } else {
      // postId가 없는 경우 홈으로 이동하거나 적절한 처리를 합니다.
      navigate('/home');
    }
  };

  return (
    <SuccessPageWrapper>
      <SuccessMessage>글이 등록되었습니다!</SuccessMessage>
      <Button onClick={handleViewPost}>확인</Button>
    </SuccessPageWrapper>
  );
};

export default PostSuccessPage;
