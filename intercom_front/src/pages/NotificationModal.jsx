import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";

const NotificationModal = ({ isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/noti`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error('알림 내역을 불러오는 중 오류 발생:', error);
            }
        };

        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    useEffect(() => {
        // 모달이 열릴 때 스크롤 방지
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            // 컴포넌트가 언마운트될 때 스크롤을 다시 활성화
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // 모달 오버레이 클릭 시 모달 닫기
    const handleOverlayClick = () => {
        onClose();
        document.body.style.overflow = 'unset'; // 스크롤 활성화
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={handleOverlayClick}
            shouldCloseOnOverlayClick={true}
            style={{
                overlay: {
                    backgroundColor: 'none',
                },
                content: {
                    width: '33.125rem',
                    height: '30rem',
                    borderRadius: '1.25rem',
                    border: '2px solid #E2E2E2',
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '5rem',
                    marginLeft: '48rem',
                },
            }}
        >
            <ModalContent>
                {notifications.map(notification => (
                    <StyledLink to={`/talks/${notification.talkId}`} key={notification.id} onClick={() => onClose(true)}>
                        <NotificationItem key={notification.id}>
                            <Text1>톡톡</Text1>
                            <Text2>{notification.writer} 님이 {notification.commentId ? '댓글을' : '좋아요를'} 남겼습니다</Text2>
                            <Text3>{notification.commentId ? notification.comment : notification.talkTitle}</Text3>
                            <Text4>
                                {
                                    notification.createdAt && !isNaN(parseISO(notification.createdAt).getTime())
                                        ? formatDistanceToNow(parseISO(notification.createdAt), {
                                            addSuffix: true,
                                            locale: ko,
                                        })
                                        : '날짜 정보 없음'
                                }
                            </Text4>
                            <hr />
                        </NotificationItem>
                    </StyledLink>
                ))}

            </ModalContent>

        </Modal>
    );
};

const ModalContent = styled.div`
  text-align: center;
  margin-top:50px;
`;

const NotificationItem = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.625rem;
  text-align: left;
`;

const Text1 = styled.div`
  /* B5 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 21px;

  color: #5B00EF;



  margin-top: -2rem;
  margin-bottom:11px;
`

const Text2 = styled.div`
  width: 21.9375rem;
  flex-shrink: 0;

  color: #000;

  /* B2 */
  font-family: SUITE;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom:14px;
`
const Text3 = styled.div`
  width: 27.4375rem;
  flex-shrink: 0;

  color: #636363;
  /* B3 */
  font-family: SUITE;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.875rem; /* 150% */
  margin-bottom:10px;
`

const Text4 = styled.div`
  /* B4 */
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 21px;

  color: #636363;
  margin-bottom:20px;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default NotificationModal;