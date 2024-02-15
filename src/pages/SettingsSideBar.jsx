// SettingsSidebar.jsx
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';


const SettingsSidebar = ({ $isVisible, onClose }) => {
  const [activePage, setActivePage] = useState("/home");
  const sidebarRef = useRef();
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleLogin } = useAuth();
  const { isLoggedIn } = useAuth();
  const [userProfile, setUserProfile] = useState({ name: "사용자", profileImageUrl: './assets/MyProfile.png'});


  const handleLogout = () => {
    // 로컬 스토리지에서 액세스 토큰 삭제
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userNickname');
    localStorage.removeItem('profileImageUrl');
    localStorage.setItem('isLoggedIn', 'false'); // 로그인 상태를 false로 설정

    // 로그인 상태 업데이트
    toggleLogin();

    // 로그인 페이지 또는 홈으로 리다이렉트
    navigate('/'); // 또는 navigate('/') 등 원하는 경로로 변경하세요.
    onClose(); // 사이드바 닫기
  };

  const handleSettingsClick = () => {
    handleNavigation('/settings');
    onClose();
  };

  const handleScrapsClick = () => {
    handleNavigation('/scrap');
    onClose();
  };

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
    const closeSidebarOnOutsideClick = (event) => {
      if ($isVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', closeSidebarOnOutsideClick);
    return () => {
      document.removeEventListener('mousedown', closeSidebarOnOutsideClick);
    };
  }, [$isVisible, onClose]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (!$isVisible) return null;

  return (
    <SidebarContainer ref={sidebarRef} $isVisible={$isVisible}>
      <SidebarItem>
        <ProfileIcon src={userProfile.profileImageUrl} alt="Profile" />
        <Username>{userProfile.name} 님</Username>
        <Line />
      </SidebarItem>
      <MenuItem onMouseEnter={() => setHoveredItem('scraps')}
                   onMouseLeave={() => setHoveredItem(null)}
                   onClick={handleScrapsClick}>
        {hoveredItem === 'scraps' && <CheckIcon src="./assets/Check.png" alt="Check" />}
        <ItemText>스크랩</ItemText>
      </MenuItem>
      <MenuItem onMouseEnter={() => setHoveredItem('settings')}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={handleSettingsClick}>
        {hoveredItem === 'settings' && <CheckIcon src="./assets/Check.png" alt="Check" />}
        <ItemText>설정</ItemText>
        <LogoutLine />
      </MenuItem>
      <LogoutItem onClick={handleLogout}>로그아웃</LogoutItem>
    </SidebarContainer>
  );
};


export default SettingsSidebar;

const SidebarContainer = styled.div`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 22rem; // Adjust width as needed
  height: 100vh;
  background: #EFF0F4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 1000;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
`;

const ProfileIcon = styled.img`
  width: 1.875rem;
  height: 1.875rem;
  flex-shrink: 0;
`;

const Username = styled.div`
  width: 4.92188rem;
  height: 1.73613rem;
  margin-left: 0.39rem;
  flex-shrink: 0;
  color: #5B00EF;
  text-align: right;
  font-family: 'SUITE', sans-serif;
  font-size: 1.32813rem;
  font-weight: 700;
`;

const CheckIcon = styled.img`
  width: 0.8rem;
  height: 1rem;
  flex-shrink: 0;
  margin-left: 0rem;
`;

const ItemText = styled.span`
  cursor: pointer;
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: normal;
  text-align: left; // 텍스트를 왼쪽 정렬
  margin-left: 2rem;
  color: ${(props) => (props.active ? '#5B00EF' : '#636363')};
`;

const Line = styled.div`
  height: 0.1rem;
  background-color: #E2E2E2;
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
`;

const LogoutLine = styled.div`
  height: 0.15rem;
  background-color: #E2E2E2;
  position: absolute;
  margin-top: 15rem;
  left: 3rem;
  right: 3rem;
`;

const LogoutItem = styled(SidebarItem)`
  cursor:pointer;
  margin-top: 7rem;
  justify-content: left;
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  text-align: left;
  margin-left: 2rem;
`;

const MenuItem = styled(SidebarItem)`
  &:hover {
    background-color: #f7f7f7;
  }
`;