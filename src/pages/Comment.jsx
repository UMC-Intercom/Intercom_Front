// Comment.jsx
import React, {useState} from 'react';
import styled from 'styled-components';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import CommentReply from "./CommetReply";

const Comment = ({ comment, postId, fetchComments }) => {
    const [isReplying, setReplying] = useState(false);
    let profileImageSrc = "../assets/MyProfile.png";
    const profile = comment.defaultProfile;
    if (profile !== null) {
        profileImageSrc = profile;
    }

    const toggleReply = () => {
        setReplying(!isReplying);
    };

    return (
        <CommentContainer isReply={comment.parentId !== null}>
            <ProfileImage
                src={profileImageSrc}
                alt="프로필"
            />
            <CommentContent>
                <CommentAuthor>{comment.writer}</CommentAuthor>
                <CommentAuthor>{comment.mentorField !== null ? comment.mentorField : <br />}</CommentAuthor>
                <CommentText>{comment.content}</CommentText>
                <CommentInfo>
                    {formatDistanceToNow(parseISO(comment.createdAt), {
                        addSuffix: true,
                        locale: ko,
                    })}
                    {comment.parentId === null && (
                        <>
                            <span> 좋아요 수 {comment.likeCount}개</span>
                            <span> 대댓글 수 {comment.replyCount}개</span>
                        </>
                    )}
                </CommentInfo>

                {comment.parentId === null && (
                    <>
                        <img src='../assets/like2.png'
                             alt="대댓글 버튼" onClick={toggleReply}
                             style={{cursor: "pointer", width: '30px', height: '30px', marginLeft: 'auto'}} />
                        <img src='../assets/comment.png'
                             alt="대댓글 버튼" onClick={toggleReply}
                             style={{cursor: "pointer", width: '30px', height: '30px', marginLeft: 'auto'}} />
                    </>
                )}
                {isReplying && comment.parentId === null && (
                    <CommentReply parentId={comment.id} postId={postId} fetchComments={fetchComments} />
                )}
            </CommentContent>
        </CommentContainer>
    );
};

export default Comment;

// Styled Components for Comment
const CommentContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  margin-left: ${props => props.isReply ? '20px' : '0'};
  padding-left: ${(props) => (props.isReply ? '20px' : '0')};
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