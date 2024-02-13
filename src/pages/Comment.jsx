// Comment.jsx
import React from 'react';
import styled from 'styled-components';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';

const Comment = ({ comment }) => {
  return (
    <CommentContainer>
      <ProfileImage src={comment.userProfileImageUrl} alt="Profile" />
      <CommentContent>
        <CommentAuthor>{comment.username}</CommentAuthor>
        <CommentText>{comment.content}</CommentText>
        <CommentInfo>
          {formatDistanceToNow(parseISO(comment.date), { addSuffix: true, locale: ko })}
        </CommentInfo>
      </CommentContent>
    </CommentContainer>
  );
};

export default Comment;

// Styled Components for Comment
const CommentContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
`;

const CommentText = styled.p`
  margin: 5px 0;
`;

const CommentInfo = styled.span`
  font-size: 0.8em;
  color: #777;
`;
