// SettingsPage.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation  } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrentPath = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <PageContainer>
      <Sidebar>
      <MenuItem active={isCurrentPath('/scraps')} onClick={() => navigate('/scraps')}>
        {isCurrentPath('/scraps') && <CheckIcon src="./assets/Check.png" alt="Check" />}
        <ItemLabel>스크랩</ItemLabel>
      </MenuItem>
      <MenuItem active={isCurrentPath('/settings')} onClick={() => navigate('/profilesetting')}>        
        {isCurrentPath('/profilesetting') && <CheckIcon src="./assets/Check.png" alt="Check" />}
        <ItemLabel>설정</ItemLabel>
      </MenuItem>
      <LogoutSection>
        <Divider />
        <MenuItem onClick={() => handleNavigation('/logout')}>
          <LogoutLabel>로그아웃</LogoutLabel>
        </MenuItem>
      </LogoutSection>
      </Sidebar>
      <Content>
        <ProfileSection>
          <ProfileImage src="./assets/SettingProfile.png" alt="Profile" />
          <NameAndNickname>
            <Name>User 님</Name>
            <Nickname>닉네임</Nickname>
          </NameAndNickname>
        </ProfileSection>
        <SectionTitle>MY</SectionTitle>
        <MyAndAccountSection>
          <Section>
            <Option onClick={() => navigate('/my-career')}>내 커리어</Option>
            <Option onClick={() => navigate('/my-posts')}>작성한 글</Option>
          </Section>
        </MyAndAccountSection>
        <br /><br /><br />
        <SectionTitle>계정</SectionTitle>
        <MyAndAccountSection>
          <Section>
            <Option onClick={() => navigate('/deactivate-account')}>계정 탈퇴</Option>
            <Option onClick={() => navigate('/terms')}>이용약관</Option>
          </Section>
        </MyAndAccountSection>
      </Content>
    </PageContainer>
  );
};

export default SettingsPage;

const CheckIcon = styled.img`
  width: 0.8rem;
  height: 1rem;
  margin-right: 0.5rem;
  position: absolute;
  left: -1.5rem; // CheckIcon을 왼쪽으로 조금 더 이동
  top: 0.2rem; // CheckIcon의 상단 위치 조정
`;

// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  display: flex;
  padding: 2rem;
`;

const Sidebar = styled.div`
  flex-direction: column;
  padding-right: 2rem;
  position: relative;
`;

const LogoutSection = styled.div`
  margin-top: 10
`;
const ItemLabel = styled.span`
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: normal;
  text-align: left; // 텍스트를 왼쪽 정렬
  margin-left: 15rem;
  padding-left: 2rem;
  color: ${(props) => (props.active ? '#5B00EF' : '#636363')};
`;

const Divider = styled.hr`
  border: none;
  height: 0.1rem;
  background-color: #ccc;
  margin-top: 30Rem; // Divider 위쪽 여백 조정
  margin-bottom: 1rem; // Divider 아래쪽 여백 조정
  width: 60%; // Divider의 너비를 90%로 조정
  align-self: center; // Divider를 Sidebar 중앙으로 위치시킴
  `;

const LogoutLabel = styled.span`
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: normal;
  text-align: left; // 텍스트를 왼쪽 정렬
  margin-top: 2rem;
  margin-left: 15rem;
`;

const MenuItem = styled.div`
  color: #636363;
  font-family: 'SUITE', sans-serif;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: normal;
  text-align: left; // 텍스트를 왼쪽 정렬
  margin-left: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  flex-grow: 1;
  border-left: 0.2rem solid #ccc;
  margin-left: 5rem;
  padding-left: 3rem;
`;

const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  margin-left: 2rem;
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

const Name = styled.h1`
  color: #636363;
  font-family: SUITE;
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 0.1rem;
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
  &:not(:last-child) {
    margin-bottom: 2rem; /* 섹션 사이의 여백 */
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem; /* 20px */
  color: #666;
  margin-bottom: 1rem; /* 제목과 입력란 사이의 간격 */
`;

const MyAndAccountSection = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
`;

const Option = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }

  &:last-child {
    border-bottom: none;
  }
`;
