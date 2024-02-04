import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import SearchModal from './SearchModal';
=======
import SearchModal from './SearchModal'; //다현 여기 추가
import SettingsSidebar from "./SettingsSideBar";
import Modal from 'react-modal'; // 모달 라이브러리 추가
import NotificationModal from "./NotificationModal";
>>>>>>> seongbin

const Header = () => {
  const [activePage, setActivePage] = useState("/home");
  const { isLoggedIn, toggleLogin } = useAuth();
  const [userProfile, setUserProfile] = useState({ name: "사용자"});
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handlePageChange = (path) => {
    navigate(path);
  };

<<<<<<< HEAD
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

=======
  const handleUserNameClick = () => {
    toggleLogin();
  };

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const openSearchModal = () => setIsSearchModalOpen(true); 
  const closeSearchModal = () => setIsSearchModalOpen(false); 

  const [isSettingsSidebarVisible, setIsSettingsSidebarVisible] = useState(false);

  const toggleSettingsSidebar = () => {
    setIsSettingsSidebarVisible(!isSettingsSidebarVisible);
  };

  const closeSettingsSidebar = () => {
    setIsSettingsSidebarVisible(false);
  };

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false); //여기부터 추가

  const handleNotificationClick = () => {
    setNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setNotificationModalOpen(false);
  };

 
>>>>>>> seongbin
  return (
    <HeaderContainer>
      <HeaderBox>
        <Logo src="./assets/Logo.png" alt="IntercomLogo" onClick={() => handlePageChange('/home')}/>
        <PageLists>
          <Pages active={activePage === '/home'} onClick={() => handlePageChange('/home')}>홈</Pages>
          <Pages active={activePage === '/saved-notices'} onClick={() => handlePageChange('/saved-notices')}>저장한 공고</Pages>
          <Pages active={activePage === '/talktalk'} onClick={() => handlePageChange('/talktalk')}>톡톡</Pages>
          <Pages active={activePage === '/mycareer'} onClick={() => handlePageChange('/mycareer')}>내 커리어</Pages>
          <Pages active={activePage === '/cover-letters'} onClick={() => handlePageChange('/cover-letters')}>합격 자소서</Pages>
          <Pages active={activePage === '/interviews'} onClick={() => handlePageChange('/interviews')}>면접 후기</Pages>
          <Pages active={activePage === '/news'} onClick={() => handlePageChange('/news')}>취업 뉴스</Pages>
        </PageLists>
        <ButtonBox>
<<<<<<< HEAD
        <SearchButton src="/assets/Search.png" alt="SearchButton" onClick={openSearchModal}/>
        <JoinButton onClick={() => handlePageChange('/join')}>회원가입/로그인</JoinButton>
      </ButtonBox>
      {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
=======
        <SearchButton 
        src="/assets/Search.png" 
        alt="SearchButton" 
        onClick={openSearchModal}/>
          {isLoggedIn ? (
            <UserProfileBox>
              <NotificationImage 
              onClick={handleNotificationClick}
              src="./assets/Notification.png" 
              alt = "Notification Image"/>
              <ProfileBox onClick={toggleSettingsSidebar}>
              <ProfileImage 
              src="./assets/Profile.png" 
              alt="Profile" />
              <UserName>
                {userProfile.name} 님
              </UserName>    
              </ProfileBox>        
              </UserProfileBox>
              ) : (
              <JoinButton 
              onClick={()=>handlePageChange('/join')}>회원가입/로그인
              </JoinButton>        
              )}
              </ButtonBox>
              {isSearchModalOpen && <SearchModal onClose={closeSearchModal} />}
>>>>>>> seongbin
      </HeaderBox>
      <SettingsSidebar 
        $isVisible={isSettingsSidebarVisible} 
        onClose={closeSettingsSidebar} 
      />
      <NotificationModal isOpen={isNotificationModalOpen} onClose={closeNotificationModal} /> 
    </HeaderContainer>
  );
};

export default Header;

const ModalContent = styled.div` 
  text-align: center;
`;

const CloseButton = styled.button`
  margin-top: 10px;
  cursor: pointer;
`;

const HeaderContainer = styled.header`
  width: 100%;
  height: 6.125rem;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;    
`;

const PageLists = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 47.1875rem;
  height: 2.125rem;
  margin: 0.625rem 0;
`;

const Pages = styled.div`
  font-size: 1.25rem;
  color: ${props => props.active ? '#5B00EF' : '#636363'};
  cursor: pointer;
  position: relative;
  padding: 0 0.625rem;

  &:hover {
    color: #5B00EF;
  }
  
  &::after {
    content: '';
    display: block;
    width: 4.8125rem;
    height: 0.125rem;
    background: #5B00EF;
    border-radius: 1.25rem;
    position: absolute;
    bottom: -0.3125rem;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;

const Logo = styled.img`
  width: 13.563rem;
  height: 2.5625rem;
  cursor: pointer;
  margin-bottom:
  `;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0.625rem 0; 
  margin-left: 2.5rem; 
`;

const SearchButton = styled.img`
  width: 1.5rem; 
  height: 1.5rem; 
  cursor: pointer;
  margin-right: 1.25rem;
`;

const JoinButton = styled.button`
  font-family: 'SUITE', sans-serif;
  width: 7.8125rem; 
  height: 2.5rem; 
  background-color: transparent;
  border-radius: 0.4375rem; 
  border: 0.0625rem solid #E2E2E2; 
  font-size: 1rem; 
  font-weight: bold;
  color: #5B00EF;
  box-shadow: none;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const NotificationImage = styled.img`
  width: 1.5rem;
  height: 1.5rem; 
  cursor: pointer;
  margin-right: 1.25rem; 
`;

const UserProfileBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.31rem; 
  margin-top: -0.1rem;
`;

const UserName = styled.span`
width: 5rem;
height: 1.75rem;
color: #5B00EF;
text-align: right;
font-family: SUITE;
font-size: 1.32813rem;
font-weight: 700;
`;