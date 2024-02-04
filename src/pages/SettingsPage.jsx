// SettingsPage.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useAuth } from './AuthContext';


const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleLogin } = useAuth();

  const isCurrentPath = (path) => location.pathname === path;

  const handleLogout = () => {
    toggleLogin();
    navigate('/');
  };
  

  return (
    <PageContainer>
      <MenuContainer>
      <Divider />
      <MenuItem
        className={isCurrentPath('/scrap') ? 'selected' : ''}
        onClick={() => navigate('/scrap')}
        >
        스크랩
      </MenuItem>
      <MenuItem
        className={isCurrentPath('/settings') ? 'selected' : ''}
        onClick={() => navigate('/settings')}
      >
        설정
      </MenuItem>
      <NewDivider />
      <LogoutText onClick={handleLogout}>로그아웃</LogoutText>
    </MenuContainer>

      <Content>
        <ProfileSection>
          <ProfileImage src="./assets/SettingProfile.png" alt="Profile" />
          <NameAndNickname>
            <NameContainer onClick={() => navigate('/profile-edit')}>
              <Name>User 님</Name>
              <VectorImage src="./assets/Vector2.png" alt="Vector" />
            </NameContainer>
            <Nickname>닉네임</Nickname>
          </NameAndNickname>
        </ProfileSection>
        <OptionSection>
          <Section>
            <SectionTitle>MY</SectionTitle>
            <MyAndAccountSection>
              <Option>
<<<<<<< HEAD
                <OptionText onClick={() => navigate('/my-career')}>내 커리어</OptionText>
              </Option>
              <Option>
                <OptionText onClick={() => navigate('/my-posts')}>작성한 글</OptionText>
=======
                <OptionText onClick={() => navigate('/mycareer')}>내 커리어</OptionText>
              </Option>
              <Option>
                <OptionText onClick={() => navigate('/written-content')}>작성한 글</OptionText>
>>>>>>> develop
              </Option>
            </MyAndAccountSection>
          </Section>
          <Section>
            <SectionTitle>계정</SectionTitle>
            <MyAndAccountSection>
              <Option>
<<<<<<< HEAD
                <OptionText onClick={() => navigate('/deactivate-account1')}>계정 탈퇴</OptionText>
=======
                <OptionText onClick={() => navigate('/deactivate-account')}>계정 탈퇴</OptionText>
>>>>>>> develop
              </Option>
              <Option>
                <OptionText onClick={() => navigate('/terms')}>이용약관</OptionText>
              </Option>
            </MyAndAccountSection>
          </Section>
        </OptionSection>
      </Content>
    </PageContainer>
  );
};

export default SettingsPage;


// 왼쪽 사이드 메뉴 스타일링
const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: SUITE;
  font-size: 1.5625rem;
  font-weight: 800;
  color: #636363;
  position: relative;
  left: 15rem;
  padding-top: 4rem;
`;

// 기존 구분선 스타일링
const Divider = styled.img.attrs({
  src: './assets/Divider1.png'
})`
  position: absolute;
  top: 2.5rem;
  width: 0.1875rem;
  height: 18.625rem;
  left: 11rem;
  right: 7rem;
`;

// 새 구분선 스타일링
const NewDivider = styled.img.attrs({
  src: './assets/Divider2.png'
})`
  position: absolute;
  bottom: 16rem;
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

  &.selected:before {
    opacity: 1;
  }
`;

// 로그아웃 텍스트 스타일링
const LogoutText = styled.div`
  cursor: pointer;
  margin-top: 35rem;
  margin-left: 4.7rem;
  font-family: SUITE;
  font-size: 1.5625rem;
  color: #636363;
`;


// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  display: flex;
  padding: 2rem;
`;

const Content = styled.div`
  flex-grow: 0.6;
  position: relative;
  margin-left: calc(7rem + 0.1875rem + 7rem);
  top: 3rem;
  left: 7.8rem;
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  margin-left: 6rem;
  padding-bottom: 2rem; // 섹션 사이 간격
`;

const ProfileImage = styled.img`
  width: 7.375rem;
  height: 7.375rem;
  flex-shrink: 0;
  margin-right: 1rem;
`;


const NameAndNickname = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 2rem;
  margin-bottom: 0.2rem; /* 각 요소 간의 여백 */
`;

const NameContainer = styled.div`
  display: flex; // 추가: flex를 사용하여 Name과 VectorImage를 한 줄에 나란히 배치합니다.
  align-items: center; // 추가: 세로 중앙 정렬
  cursor: pointer;
`;

const Name = styled.h1`
  color: #636363;
  font-family: SUITE;
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 0.1rem;
`;

const VectorImage = styled.img`
  padding-top: 2.2rem;
  margin-left: 2.12rem;
  width: 1.375rem;
  height: 1.375rem;
  flex-shrink: 0;
`;

const Nickname = styled.h2`
  color: #636363;
  font-family: SUITE;
  font-size: 1.875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Section = styled.section`
    margin-bottom: 4.12rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5625rem;
  color: #636363;
  margin-bottom: 1rem; /* 제목과 입력란 사이의 간격 */
`;

const MyAndAccountSection = styled.div`
  background: #fff;
  border: 0.1875rem solid #A1A1A1;
  border-radius: 0.625rem;
`;

const OptionSection = styled.div `
  margin-top: 6rem;
  margin-left: 6rem;
`;

const Option = styled.div`
  padding-left: 4rem;
  display: flex;
  flex-direction: column;
  margin-top: 2.8rem;
  margin-bottom: 2.8rem;
  &::after {
    content: '';
    width: 90%;
    height: 0.1rem;
    background-color: #E2E2E2;
    margin-top: 0.2rem; /* 원하는 여백 조절 가능 */
  }
`;

const OptionText = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem;
  font-weight: 600;
  color: #636363;
  cursor: pointer;
<<<<<<< HEAD
`;
=======
`;
>>>>>>> develop
