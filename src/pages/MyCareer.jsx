import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeCareerData from '../data/fakeCareerData';
import fakeCareerDetailData from '../data/fakeCareerDetailData';
import fakeUserData from '../data/fakeUserData';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  align-items: center;
`;

const Title = styled.h2`
  font-family: 'SUITE-SemiBold', sans-serif;
  font-size: 25px;
  color: #636363;
  align-self: flex-start; 
  margin-left: calc(50% - 592px); 
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; 
`;

const ProfileBox = styled.div`
  width: 384px;
  height: 385px;
  background-color: #EFF0F4;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 24px;
`;

const CareerBox = styled.div`
  width: 792px;
  min-height: 1120px;
  background-color: #EFF0F4;
  border-radius: 10px;
  padding-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const EditButton = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 107px; 
  bottom: 185px; 
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;


const ProfileDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px; 
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 16px;
  color: #636363;
  margin-top: 10px;
  margin-left: 30px;
`;

const ProfileEmailValue = styled.span`
  color: #5B00EF;
  margin-left: 44px;
`;

const ProfileNumberValue = styled.span`
  color: #5B00EF;
  margin-left: 30px;
`;

const ProfileName = styled.h1`
  font-family: 'SUITE-Bold';
  font-size: 30px;
  color: black;
  margin-top: 20px; 
  margin-left: 10px;
`;

const NavigateButton = styled.img`
  width: 20px;
  cursor: pointer;
  margin-left: 10px; 
`;

const NameAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-left: 20px; 
`;

const EducationTitle = styled.h3`
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 25px;
  color: #636363;
  margin-left: 55px;
  margin-top: 50px; 
  margin-bottom: 20px; 
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; 
`;

const EducationBox = styled.div`
  width: 690px;
  height: 92px;
  background-color: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MajorText = styled.div`
  padding-left: 25px;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #636363;
`;

const UniversityText = styled.div`
  font-family: 'SUITE-SemiBold', sans-serif;
  padding-left: 25px;
  font-size: 20px;
  color: #000000;
  margin-top: 5px;
`;

const SectionDivider = styled.div`
  height: 2px;
  background-color: #E2E2E2;
  width: 87%; 
  margin: 30px auto; 
`;

const SkillsTitle = styled.h3`
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 25px;
  color: #636363;
  margin-left: 55px;
  margin-top: 20px;
`;

const SkillBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 55px;
  gap: 10px; 
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 110px); 
`;

const SkillItem = styled.div`
  background-color: #9FAEFF;
  color: white;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 17px; 
  padding: 10px 20px;
  border-radius: 22px;
`;

const ToggleImage = styled.img`
  cursor: pointer;
  align-self: center; 
  margin-right: 55px; 
  width: 14px;
  transform: ${({ isRotated }) => isRotated ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const SkillsSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between; 
  align-items: center;
`;

const CareerTitle = styled(EducationTitle)`
    margin-bottom: 10px;
`;

const CareerBox2 = styled(EducationBox)`
  margin-top: 10px;
  height: 123px; // 높이만 변경
`;

const CareerText = styled.div`
  padding-left: 25px;
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #636363;
`;

const MonthText = styled.div`
  font-family: 'SUITE-Bold', sans-serif;
  padding-left: 25px;
  font-size: 15px;
  color: #5B00EF;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const CareerContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CareerInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const CareerInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
`;

const JobDescription = styled.div`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #636363;
  margin-top: 5px;
`;

const SalaryText = styled.div`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #636363;
`;

const Company = styled.div`
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 16px;
  margin-bottom: 10px;
`;

const PositionText = styled.div`
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 16px;
  color: #636363;
  margin-left: 15px;
  margin-bottom: 10px;
`;


const IntroductionTitle = styled(EducationTitle)``;

const IntroductionBox = styled(EducationBox)`
  height: auto; 
`;

const IntroductionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const IntroductionTitleText = styled.div`
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 16px;
  color: black;
  
`;

const IntroductionContentText = styled.div`
  font-family: 'SUITE-Bold', sans-serif;
  font-size: 15px;
  color: #636363;
  white-space: pre-wrap; 
  margin-top: 10px;
  margin-right: 15px;
`;

const IntroductionBoxStyled = styled.div`
  width: 660px;
  padding: 10px;
  padding-left: 25px;
  background-color: transparent;
  border-radius: 5px;
  margin-bottom: 20px;
`;

// 텍스트 필드 스타일 조정
const IntroductionTitleTextFieldStyled = styled.textarea`
  width: calc(100% - 40px);
  height: 20px;
  border: 1px solid #CCC;
  border-radius: 5px;
  padding: 10px;
  font-family: 'SUITE-ExtraBold', sans-serif;
  font-size: 16px;
  color: black;
  resize: none;
  outline-color: #5B00EF; 

  &:focus {
    border-color: #5B00EF;
  }

  ::placeholder {
    color: #A1A1A1; 
  }
`;

const IntroductionContentTextFieldStyled = styled(IntroductionTitleTextFieldStyled)`
  height: 200px;
  font-size: 15px;
  font-family: 'SUITE-Bold', sans-serif;
  margin-top: 20px;
`;

const CharacterCount = styled.span`
font-family: 'SUITE-Medium', sans-serif;
  font-size: 12px;
  color: #636363;
  align-self: flex-end;
  margin-right: 10px;
`;

const EditButtonStyled = styled.button`
font-family: 'SUITE-Medium', sans-serif;
  background-color: transparent; 
  color: #A1A1A1; 
  border: none; 
  cursor: pointer;
  margin-left: 580px;
  margin-top: 10px;
  &:hover {
    color: #5B00EF;
  }
`;

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState('./assets/MyProfile.png');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNavigate = () => {
    navigate('/profile-edit');
  };

  return (
    <ProfileBox>
      <ProfileImage src={profileImage} alt="Profile" />
      <label htmlFor="profile-upload">
        <EditButton src="./assets/Edit1.png" alt="Edit" />
      </label>
      <FileInput
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <ProfileDetailsContainer>
        <NameAndButtonContainer>
          <ProfileName>{fakeUserData.name}</ProfileName>
          <NavigateButton src="./assets/Edit2.png" alt="Settings" onClick={handleNavigate} />
        </NameAndButtonContainer>
        <ProfileDetail>이메일 <ProfileEmailValue>{fakeUserData.email}</ProfileEmailValue></ProfileDetail>
        <ProfileDetail>휴대전화 <ProfileNumberValue>{fakeUserData.phoneNum}</ProfileNumberValue></ProfileDetail>
      </ProfileDetailsContainer>
    </ProfileBox>
  );
};

const MyCareer = () => {
  const [isSkillsVisible, setIsSkillsVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [introductionTitle, setIntroductionTitle] = useState(fakeCareerData.introduction.title);
  const [introductionContent, setIntroductionContent] = useState(fakeCareerData.introduction.content);

  const toggleSkillsVisibility = () => {
    setIsSkillsVisible(!isSkillsVisible);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start.split('. ').join('-'));
    const endDate = new Date(end.split('. ').join('-'));
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years > 0 ? `${years}년 ` : ''}${remainingMonths > 0 ? `${remainingMonths}개월` : ''}`.trim();
  };

  return (
    <MainContainer>
      <Title>내 커리어</Title>
      <ContentContainer>
        <MyProfile />
        <CareerBox>
          <EducationTitle>학력</EducationTitle>
          <CenteredContainer>
            <EducationBox>
              <MajorText>{fakeCareerData.major}</MajorText>
              <UniversityText>{fakeCareerData.university}</UniversityText>
            </EducationBox>
          </CenteredContainer>
          <SectionDivider />
          <SkillsSection>
            <SkillsTitle>보유 스킬</SkillsTitle>
            <ToggleImage
              src="./assets/Toggle.png"
              alt="Toggle Skills"
              onClick={toggleSkillsVisibility}
              isRotated={!isSkillsVisible}
            />
          </SkillsSection>
          {isSkillsVisible && (
            <SkillBox>
              {fakeCareerData.skill.map((skill, index) => (
                <SkillItem key={index}>{skill}</SkillItem>
              ))}
            </SkillBox>
          )}
          <SectionDivider />
          <CareerTitle>경력</CareerTitle>
          {fakeCareerDetailData.map((career, index) => (
            <CenteredContainer key={index}>
              <CareerBox2>
                <CareerContainer>
                  <CareerInfoLeft>
                    <CareerText>{`${career.start_data} ~ ${career.end_data}`}</CareerText>
                    <MonthText>{calculateDuration(career.start_data, career.end_data)}</MonthText>
                  </CareerInfoLeft>
                  <CareerInfoRight>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Company>{career.company}</Company>
                      <PositionText>{career.position}</PositionText>
                    </div>
                    <SalaryText>연봉 | {career.salary}</SalaryText>
                    <JobDescription>주요 직무 | {career.job}</JobDescription>
                  </CareerInfoRight>
                </CareerContainer>
              </CareerBox2>
            </CenteredContainer>
          ))}
          <SectionDivider />
          <IntroductionTitle>자기소개서</IntroductionTitle>
          <CenteredContainer>
            <IntroductionBox>
              <IntroductionSection>
                <IntroductionBoxStyled>
                  {editMode ? (
                    <>
                      <IntroductionTitleTextFieldStyled
                        placeholder="제목을 입력하세요"
                        value={introductionTitle}
                        onChange={(e) => {
                          const text = e.target.value;
                          if (text.replace(/\s+/g, '').length <= 25) setIntroductionTitle(text);
                        }}
                      />
                      <CharacterCount>{`${introductionTitle.replace(/\s+/g, '').length}/25`}</CharacterCount>
                      <IntroductionContentTextFieldStyled
                        placeholder="내용을 입력하세요"
                        value={introductionContent}
                        onChange={(e) => {
                          const text = e.target.value;
                          if (text.replace(/\s+/g, '').length <= 300) setIntroductionContent(text);
                        }}
                      />
                      <CharacterCount>{`${introductionContent.replace(/\s+/g, '').length}/300`}</CharacterCount>
                    </>
                  ) : (
                    <>
                      <IntroductionTitleText>{introductionTitle}</IntroductionTitleText>
                      <IntroductionContentText>{introductionContent}</IntroductionContentText>
                    </>
                  )}
                  <EditButtonStyled onClick={() => setEditMode(!editMode)}>
                    {editMode ? '수정 완료' : '수정하기'}
                  </EditButtonStyled>
                </IntroductionBoxStyled>
              </IntroductionSection>
            </IntroductionBox>
          </CenteredContainer>
        </CareerBox>
      </ContentContainer>
    </MainContainer>
  );
};

export default MyCareer;
