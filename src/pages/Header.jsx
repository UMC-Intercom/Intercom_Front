import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchModal from './SearchModal'; 
import SettingsSidebar from "./SettingsSideBar";
import Modal from 'react-modal'; // 모달 라이브러리 추가
import NotificationModal from "./NotificationModal";

const Header = () => {
  const [activePage, setActivePage] = useState("/home");
  const { isLoggedIn, toggleLogin } = useAuth();
  const [userProfile, setUserProfile] = useState({ name: "사용자", profileImageUrl: '/assets/MyProfile.png'});
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePage(location.pathname);

    // 로컬 스토리지에서 로그인 상태 확인
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn !== isLoggedIn) {
      toggleLogin(); // 로컬 스토리지와 상태를 동기화
    }

    // 로컬 스토리지에서 사용자 이름을 가져와 상태에 저장
    const userName = localStorage.getItem('userName');
    if (userName) {
      setUserProfile({ name: userName });
    }

     // 로컬 스토리지에서 프로필 이미지 URL을 가져와 상태에 저장
     const profileImageUrl = localStorage.getItem('profileImageUrl');
     if (profileImageUrl) {
       setUserProfile(prevState => ({
         ...prevState,
         profileImageUrl
       }));
     }

  }, [location.pathname, isLoggedIn, toggleLogin]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'profileImageUrl') {
        setUserProfile(prevState => ({
          ...prevState,
          profileImageUrl: e.newValue
        }));
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if ((activePage === '/scrap' || activePage === '/mycareer') && !isLoggedIn) {
      navigate('/join');
    }
  }, [activePage, isLoggedIn, navigate]);

  

  const handlePageChange = (path) => {
    navigate(path);
  };

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

 
  return (
    <HeaderContainer>
      <HeaderBox>
        <Logo src="/assets/Logo.png" alt="IntercomLogo" onClick={() => handlePageChange('/home')}/>
        <PageLists>
          <Pages active={activePage === '/home'} onClick={() => handlePageChange('/home')}>홈</Pages>
          <Pages active={activePage === '/scrap'} onClick={() => handlePageChange('/scrap')}>스크랩</Pages>
          <Pages active={activePage === '/talktalk'} onClick={() => handlePageChange('/talktalk')}>톡톡</Pages>
          <Pages active={activePage === '/mycareer'} onClick={() => handlePageChange('/mycareer')}>내 커리어</Pages>
          <Pages active={activePage === '/cover-letters-home'} onClick={() => handlePageChange('/cover-letters-home')}>합격 자소서</Pages>
          <Pages active={activePage === '/interviews'} onClick={() => handlePageChange('/interviews')}>면접 후기</Pages>
        </PageLists>
        <ButtonBox>
        <SearchButton 
        src="/assets/Search.png" 
        alt="SearchButton" 
        onClick={openSearchModal}/>
          {isLoggedIn ? (
            <UserProfileBox>
              <NotificationImage 
              onClick={handleNotificationClick}
              src="/assets/Notification.png" 
              alt = "Notification Image"/>
              <ProfileBox onClick={toggleSettingsSidebar}>
              <ProfileImage 
              src={userProfile.profileImageUrl}
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

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
};

const mediaQueries = {
  mobile: `@media screen and (max-width: ${breakpoints.mobile})`,
  tablet: `@media screen and (max-width: ${breakpoints.tablet})`,
};


const HeaderContainer = styled.header`
  width: 100%;
  height: 6.125rem;
  box-shadow: 0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.2);

  ${mediaQueries.mobile} {
    height: auto; // 모바일에서 높이 자동 조정
    padding: 1rem 0; // 상하 패딩 추가
  }
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; // 내용물 사이의 간격을 균등하게 분배
  height: 100%;
  max-width: 1200px; // 최대 너비 설정
  margin: 0 auto; // 좌우 마진을 자동으로 조정하여 중앙 정렬
  padding: 0 20px; // 좌우 패딩 추가로 내용물이 화면 가장자리에 닿지 않도록 조정

  ${mediaQueries.mobile} {
    height: 7rem;
    flex-direction: column; // Stack elements vertically on mobile
    align-items: center; // Center items
  }
  
`;
const PageLists = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 47.1875rem;
  height: 2.125rem;
  margin: 0.625rem 0;
  ${mediaQueries.tablet} {
    justify-content: center; // Center items on tablet
  }

  ${mediaQueries.mobile} {
    width: 100%; // Use full width to accommodate all items
    justify-content: center;
    flex-wrap: wrap; // Allow items to wrap into multiple lines
    gap: 10px; // Add some gap between items for easier tapping
  }
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


   ${mediaQueries.mobile} {
    font-size: 0.75rem; // Adjust font size for mobile
    padding: 0.05rem; // Adjust padding for mobile

    &::after {
      width: 2.4rem; // Adjust width of underline for mobile
      left: 50%;
      transform: translateX(-50%) scaleX(${props => props.active ? 1 : 0}); // Ensure underline stays centered
    }
  }
`;

const Logo = styled.img`
  width: 13.563rem;
  height: 2.5625rem;
  cursor: pointer;
  margin-bottom:
  ${mediaQueries.mobile} {
    margin-right: 2rem;
    width: 50%; // You might want to adjust this for mobile
  }

  `;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0.625rem 0; 
  margin-left: 2.5rem; 

 ${mediaQueries.tablet} {
    justify-content: center; // 태블릿에서 중앙 정렬
  }

  ${mediaQueries.mobile} {
    display: flex;
    justify-content: center;
margin-top: -0.5rem;
align-items: center;
margin-left: -2.5rem;
margin-bottom: -0.5rem;
  }
`;

const SearchButton = styled.img`
  width: 1.5rem; 
  height: 1.5rem; 
  cursor: pointer;
  margin-right: 1.25rem;
  ${mediaQueries.mobile} {
    justify-content: center; // 태블릿에서 중앙 정렬
    width: 1rem;
    height: auto;
  }
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

  ${mediaQueries.mobile} {
    font-size: 0.75rem; // 모바일에서 폰트 크기 조정
    padding: 0.5rem 1rem; // 모바일에서 버튼 패딩 조정
  }
`;


const NotificationImage = styled.img`
  width: 1.5rem;
  height: 1.5rem; 
  cursor: pointer;
  margin-right: 1.25rem; 
  ${mediaQueries.mobile} {
    justify-content: center; // 태블릿에서 중앙 정렬
    width: 1rem;
    height: auto;
  }
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
  border-radius: 50%;
  margin-right: 0.31rem; 
  margin-top: -0.1rem;
 
`;

const UserName = styled.span`
width: auto;
max-width: 150px; // 최대 너비 설정
height: 1.75rem;
color: #5B00EF;
text-align: right;
align-items: center;
font-family: SUITE;
font-size: 1.32813rem;
font-weight: 700;
overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

${mediaQueries.tablet} {
  font-size: 1rem; // 태블릿에서 폰트 크기 조정
}

${mediaQueries.mobile} {
  font-size: 0.85rem; // 모바일에서 폰트 크기 조정
  max-width: 100px; // 모바일에서 최대 너비 조정
  margin-top: 0.7rem;
}
`;
