import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import fakeNotificationData from '../data/fakeNotificationData';

const NotificationModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'none',
        },
        content: {
          width: '33.125rem',
          height: '48.5rem',
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
        {fakeNotificationData.map(notification => (
          <NotificationItem key={notification.id}>
            <Text1>톡톡</Text1>
            <Text2>{notification.user} 님이 {notification.type === 'comment' ? '댓글을' : '좋아요를'} 남겼습니다</Text2>
            <Text3>{notification.content}</Text3>
            <Text4>4분전</Text4>
            <hr />
          </NotificationItem>
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
export default NotificationModal;