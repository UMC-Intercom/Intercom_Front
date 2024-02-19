import React from 'react';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const IconButtonWithCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
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

const Count = styled.span`
  margin-right: 13px;
  font-size: 25px;
  font-weight: 700;
  color: #636363;
  font-family: SUITE;
`;

const ActionButtons = ({ postId, liked, onToggleLike, likesCount, handleCommentsClick, repliesCount }) => {
  return (
    <ButtonsContainer>
      <IconButtonWithCount onClick={() => onToggleLike(postId)}>
      <Count>{likesCount}</Count>
        <LikeIcon src={liked ? "/assets/Vector1.png" : "/assets/Vector.png"} alt="Like" />
       
      </IconButtonWithCount>
      <IconButtonWithCount onClick={handleCommentsClick}>
      <Count>{repliesCount}</Count>
        <CommentIcon src="/assets/comment.png" alt="Comment" />
      </IconButtonWithCount>
    </ButtonsContainer>
  );
};

export default ActionButtons;