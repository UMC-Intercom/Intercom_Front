// SettingsSidebar.jsx
import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from './AuthContext';


const SettingsSidebar = ({ $isVisible, onClose }) => {
  const sidebarRef = useRef();
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();
  const { toggleLogin } = useAuth();

  const handleLogout = () => {
    toggleLogin(); // 로그인 상태를 토글하여 로그아웃 처리
    onClose(); // 사이드바를 닫습니다.
  };

  const handleSettingsClick = () => {
    handleNavigation('/settings');
    onClose();
  };


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
        <ProfileIcon src="./assets/Profile.png" alt="Profile" />
        <Username>김선정 님</Username>
        <Line />
      </SidebarItem>
      <MenuItem onMouseEnter={() => setHoveredItem('scraps')}
                   onMouseLeave={() => setHoveredItem(null)}>
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
  margin-top: 7rem;
  justify-content: left;
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  text-align: left;
  margin-left: 2rem;
  cursor: pointer;
`;

const MenuItem = styled(SidebarItem)`
  &:hover {
    background-color: #f7f7f7;
  }
`;