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
          marginLeft: '48.5rem',
        },
      }}
    >
      <ModalContent>
        {fakeNotificationData.map(notification => (
          <NotificationItem key={notification.id}>
            <Text1>톡톡</Text1>
            <Text2>{notification.user} 님이 {notification.type === 'comment' ? '댓글을' : '좋아요를'} 남겼습니다</Text2>
            <Text3>{notification.content}</Text3>
            <hr />
          </NotificationItem>
        ))}
      </ModalContent>
    </Modal>
  );
};

const ModalContent = styled.div`
  text-align: center;
`;

const NotificationItem = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.625rem;
  text-align: left;
`;

const Text1 = styled.p`
width: 2.9375rem;
height: 1.125rem;
flex-shrink: 0;

color: #5B00EF;
/* B5 */
font-family: SUITE;
font-size: 1.0625rem;
font-style: normal;
font-weight: 600;
line-height: normal;

margin-top: -2rem;
`

const Text2 = styled.p`
width: 21.9375rem;
height: 1.25rem;
flex-shrink: 0;

color: #000;

/* B2 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const Text3 = styled.p`
width: 27.4375rem;
height: 3.5rem;
flex-shrink: 0;

color: #636363;
/* B3 */
font-family: SUITE;
font-size: 1.25rem;
font-style: normal;
font-weight: 600;
line-height: 1.875rem; /* 150% */
`
export default NotificationModal;
