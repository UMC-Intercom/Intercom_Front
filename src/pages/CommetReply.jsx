// CommentReply.jsx
import {useState} from "react";
import axios from 'axios';

const CommentReply = ({ parentId, postId, fetchComments }) => {
    const [replyInput, setReplyInput] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleReplyChange = (e) => {
        setReplyInput(e.target.value);
    };

    const submitReply = async () => {
        if (replyInput.trim() !== '') {
            try {
                await axios.post(`http://www.umcintercom.site/comments/reply`, {
                    talkId : postId,
                    content: replyInput,
                    parentId: parentId,
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                setReplyInput('');
                alert('대댓글이 등록되었습니다.');
                fetchComments(); // 댓글 목록 새로고침
            } catch (error) {
                console.error('대댓글 등록에 실패했습니다.', error);
            }
        }
    };
    return (
        <div>
      <textarea
          style={{ width: '900px', height: '100px' }}
          value={replyInput}
          onChange={handleReplyChange}
          placeholder="대댓글을 입력하세요..."
      />
            <button onClick={submitReply}>등록하기</button>
        </div>
    );
};
export default CommentReply;