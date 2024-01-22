// SettingsPage.jsx
import React from 'react';
import styled from 'styled-components';

const SettingPage = () => {
  return (
    <PageContainer>
      <Header>
        <Title>설정</Title>
      </Header>
      <Section>
        <SectionTitle>MY</SectionTitle>
        <Input placeholder="내 카테고리" />
        <Input placeholder="작성한 글" />
      </Section>
      <Section>
        <SectionTitle>계정</SectionTitle>
        <Input placeholder="계정 탈퇴" />
        <Input placeholder="이용약관" />
      </Section>
      <Footer>
        로그아웃
      </Footer>
    </PageContainer>
  );
};

export default SettingPage;

// 스타일 컴포넌트 정의
const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #333;
`;

const Section = styled.section`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 10px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Footer = styled.footer`
  margin-top: 20px;
  text-align: center;
  color: #333;
`;
