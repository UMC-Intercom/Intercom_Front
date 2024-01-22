import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import SettingsSidebar from './SettingsSideBar';


const Header = () => {
  const [activePage, setActivePage] = useState("/home");
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarVisible, setIsSidebarVisible] = useState(false);


    useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);


  const handlePageChange = (path) => {
    navigate(path);
  };

   // 사이드바를 표시하거나 숨기는 함수를 정의합니다.
  const toggleSidebar = () => {
    console.log('Toggling sidebar, current state:', isSidebarVisible);
    setIsSidebarVisible(!isSidebarVisible);
  };

  // 사이드바를 닫는 함수를 정의합니다.
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    const closeSidebarOnOutsideClick = (event) => {
      // 사이드바가 열려있고, 클릭된 요소가 사이드바 내부가 아닐 때 사이드바를 닫습니다.
      if (isSidebarVisible && !event.target.closest("#sidebar")) {
        closeSidebar();
      }
    };

    // 사이드바가 보여질 때만 이벤트 리스너를 추가합니다.
    if (isSidebarVisible) {
      window.addEventListener("click", closeSidebarOnOutsideClick);
    }

    // 클린업 함수를 반환하여, 컴포넌트가 언마운트되거나 사이드바가 다시 숨겨질 때
    // 이벤트 리스너를 제거합니다.
    return () => {
      window.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarVisible]); // 의존성 배열에 isSidebarVisible를 추가합니다.


  return (
    <>
    <HeaderContainer>
      <HeaderBox>
        <Logo src="./assets/Logo.png" alt="IntercomLogo" onClick={() => handlePageChange('/home')}/>
        <PageLists>
        <Pages $active={activePage === '/home'} onClick={() => handlePageChange('/home')}>홈</Pages>
          <Pages active={activePage === '/saved-notices'} onClick={() => handlePageChange('/saved-notices')}>저장한 공고</Pages>
          <Pages active={activePage === '/talktalk'} onClick={() => handlePageChange('/talktalk')}>톡톡</Pages>
          <Pages active={activePage === '/my-career'} onClick={() => handlePageChange('/my-career')}>내커리어</Pages>
          <Pages active={activePage === '/cover-letters'} onClick={() => handlePageChange('/cover-letters')}>합격 자소서</Pages>
          <Pages active={activePage === '/interviews'} onClick={() => handlePageChange('/interviews')}>면접 후기</Pages>
          <Pages active={activePage === '/news'} onClick={() => handlePageChange('/news')}>취업 뉴스</Pages>
        </PageLists>
        <ButtonBox>
          <SearchButton src="/assets/Search.png" alt="SearchButton" onClick={() => handlePageChange('/search')}/>
          <JoinButton onClick={(e) => {
            e.stopPropagation(); // 이벤트 버블링을 중지합니다.
            toggleSidebar();
          }}>회원가입/로그인</JoinButton>        
        </ButtonBox>
      </HeaderBox>
    </HeaderContainer>
    <SettingsSidebar $isVisible={isSidebarVisible} onClose={closeSidebar} />
        </>
  );
};

export default Header;


const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    `;
const HeaderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content:center;
    height: 100%;    
    `;
const PageLists = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 755px;
height: 34px;
margin: 10px 0;
`;

const Pages = styled.div`
  font-size: 20px;
  color: ${(props) => props.$active ? '#5B00EF' : '#636363'};
  cursor: pointer;
  position: relative;
  padding: 0 10px;

  &:hover {
    color: #5B00EF;
  }
  
  &::after {
    content: '';
    display: block;
    width: 77px;
    height: 2px;
    background: #5B00EF;
    border-radius: 20px;
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%) scaleX(${props => props.active ? 1 : 0});
    transition: transform 0.3s ease;
  }
`;
const Logo = styled.img`
  width: 217.02px;
  height: 41px;
  cursor: pointer;
  margin-bottom: 10px;
`;
const ButtonBox = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
margin: 10px 0;
margin-left: 40px;

`;
const SearchButton = styled.img`
width:24px;
height:24px;
cursor: pointer;
margin: 0 15px 0 20px;
`;
const JoinButton = styled.button`
font-family: 'SUITE', sans-serif;
width: 125px;
height: 40px;
background-color: transparent;
border-radius: 7px;
border: 1px solid #E2E2E2;
font-size: 16px;
font-weight:bold;
color: #5B00EF;
box-shadow: none;
cursor: pointer;

&:hover {
background-color: #f2f2f2;
}
`;