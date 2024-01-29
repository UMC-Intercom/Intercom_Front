// Scrap.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

// 전체 레이아웃을 감싸는 스타일 컴포넌트
const AppContainer = styled.div`
  display: flex;
  justify-content: center; // 수평 중앙 정렬
  align-items: start; // 수직 시작점 정렬
  height: 100vh; // 전체 화면 높이
`;

// 왼쪽 사이드 메뉴 스타일링
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 1.25rem;
  color: #636363;
  position: relative;
  padding-right: 20rem; // 왼쪽으로 이동하기 위해 줄인 값
  padding-top: 4rem;
`;

// 기존 구분선 스타일링
const Divider = styled.img.attrs({
  src: './assets/Divider1.png'
})`
  position: absolute;
  top: 3.5rem;
  width: 0.1875rem;
  margin-left: 11rem;
`;

// 새 구분선 스타일링
const NewDivider = styled.img.attrs({
  src: './assets/Divider2.png'
})`
  position: absolute;
  bottom: 6rem;
  left: -1rem;
`;

// 왼쪽 사이드 메뉴 아이템 스타일링
const MenuItem = styled.div`
  cursor: pointer;
  padding: 0.625rem;
  position: relative;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    background-image: url('./assets/Check.png');
    background-size: contain;
    background-repeat: no-repeat;
    width: 1.1875rem;
    height: 1.1875rem;
    display: block;
    margin-right: 1.1875rem;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover:before {
    opacity: 1;
  }

  &.selected:before {
    opacity: 1;
  }
`;

// 로그아웃 텍스트 스타일링
const LogoutText = styled.div`
  cursor: pointer;
  padding: 10px;
  margin-top: 36rem; // 위치 조정
  margin-left: 5rem;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 20px;
  color: #636363;
`;

// 오른쪽 사이드 메뉴 스타일링
const SideMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 1.25rem;
  color: #636363;
  position: relative;
  margin-left: 20rem;
  // margin-bottom을 조정하거나 제거
`;

const SideMenuItem = styled.div`
  cursor: pointer;
  padding: 0.625rem;
  padding-left: 2.2rem;
  padding-right: 2.2rem;
  bottom: 45rem;
  position: relative;
  color: white;
  background-color: ${({ isSelected }) => isSelected ? '#5B00EF' : '#d3d3d3'};
  margin-right: 10px;
  border-radius: 35px;
  
`;

const AnnouncementText = styled.div`
  margin-top: 2rem; // 여유 공간 추가
  font-size: 1.5rem; // 텍스트 크기 조정
  color: #000; // 텍스트 색상 설정
  position: relative; // 상대적 위치 설정
  z-index: 999; // Z-Index 설정
  margin-left: 20rem;
`;

// 오른쪽 사이드 메뉴 컴포넌트
const RightSideMenu = () => {
  const [selectedItem, setSelectedItem] = useState('');

  return (
    <SideMenuContainer>
      <SideMenuItem 
        isSelected={selectedItem === 'announcement'}
        onClick={() => setSelectedItem('announcement')}
      >
        공고
      </SideMenuItem>
      <SideMenuItem 
        isSelected={selectedItem === 'interview'}
        onClick={() => setSelectedItem('interview')}
      >
        면접 후기
      </SideMenuItem>
      <SideMenuItem 
        isSelected={selectedItem === 'successEssay'}
        onClick={() => setSelectedItem('successEssay')}
      >
        합격 자소서
      </SideMenuItem>
      <SideMenuItem 
                isSelected={selectedItem === 'talk'}
                onClick={() => setSelectedItem('talk')}
              >
                톡톡
              </SideMenuItem>
            </SideMenuContainer>
          );
        };
        
        // 왼쪽 사이드 메뉴 컴포넌트
        const Scrap = () => {
          const [selectedItem, setSelectedItem] = useState('');
        
          return (
            <MenuContainer>
              <Divider />
              <MenuItem
                className={selectedItem === 'scrap' ? 'selected' : ''}
                onClick={() => setSelectedItem('scrap')}
              >
                스크랩
              </MenuItem>
              <MenuItem
                className={selectedItem === 'settings' ? 'selected' : ''}
                onClick={() => setSelectedItem('settings')}
              >
                설정
              </MenuItem>
              <NewDivider />
              <LogoutText onClick={() => console.log('Logging out...')}>로그아웃</LogoutText>
              <RightSideMenu />
              {selectedItem === 'announcement' && (
              <AnnouncementText>공고 (16)</AnnouncementText>
              )}
            </MenuContainer>
          );
        };
        
        const App = () => {
          return (
            <AppContainer>
              <Scrap />
            </AppContainer>
          );
        };
        
        export default App;