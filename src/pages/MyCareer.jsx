import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeCareerData from '../data/fakeCareerData';
import fakeCareerDetailData from '../data/fakeCareerDetailData';
import fakeUserData from '../data/fakeUserData';
import html2pdf from 'html2pdf.js';

const MainContainer = styled.div`
  font-family: SUITE;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 600;
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
  height: auto;
  background-color: #EFF0F4;
  border-radius: 10px;
  padding-bottom: 50px;
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

const ProfileDetailsContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px; 
  margin-top: 166px;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 16px;
  color: #636363;
  margin-top: 10px;
  margin-left: 30px;
`;

const ProfileDetail2 = styled.div`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 16px;
  color: #636363;
  margin-top: 10px;
  margin-left: 13px;
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
  font-weight: 700;
  font-size: 30px;
  color: black;
  margin-top: 20px; 
  margin-left: 10px;
`;

const ProfileName2 = styled.h1`
  font-weight: 700;
  font-size: 30px;
  color: black;
  margin-top: 20px; 
  margin-left: 10px;
  margin-bottom: 5px;
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
  font-weight: 800;
  font-size: 25px;
  color: #636363;
  margin-left: 55px;
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
  font-weight: 700;
  font-size: 15px;
  color: #636363;
`;

const UniversityText = styled.div`
  font-weight: 600;
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

const LanguageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 792px; /* CareerBox와 동일한 너비로 설정 */
`;


const EditCareerButton = styled.button`
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  background-color: transparent;
  border: none;
  color: #A1A1A1;
  cursor: pointer;
  &:hover {
    color: #5B00EF;
  }
  margin-top: 35px;
  margin-right: 50px;
`;

const LanguageTitle = styled.h3`
  font-weight: 800;
  font-size: 25px;
  color: #636363;
  margin-left: 55px;
  margin-top: 50px;
  margin-bottom: 10px;
`;

const LanguageBox = styled.div`
  width: 690px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 5px;
  display: flex;
  align-items: center; // Added to vertically center the content
  margin-top: 10px;
`;

const LanguageEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
`;

const VerticalLine = styled.div`
  height: 20px;
  width: 2px;
  background-color: #E2E2E2;
  margin: 0 12px;
`;

const LanguageName = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`;

const LanguageScore = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #636363;
`;

const CertificateTitle = styled.h3`
  font-weight: 800;
  font-size: 25px;
  color: #636363;
  margin-left: 55px;
  margin-bottom: 10px;
`;

const CertificateBox = styled.div`
  width: 690px;
  height: 48px;
  background-color: #FFFFFF;
  border-radius: 5px;
  display: flex;
  align-items: center; 
  margin-top: 10px;
`;

const CertificateEntry = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
`;

const CertificateName = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`;

const CertificateScore = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: #636363;
`;

const CareerTitle = styled(EducationTitle)`
    margin-bottom: 10px;
`;

const CareerBox2 = styled(EducationBox)`
  margin-top: 10px;
  height: 123px; 
`;

const CareerText = styled.div`
  padding-left: 25px;
  font-weight: 700;
  font-size: 15px;
  color: #636363;
`;

const MonthText = styled.div`
  font-weight: 700;
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
  font-weight: 700;
  font-size: 15px;
  color: #636363;
  margin-top: 5px;
`;

const SalaryText = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: #636363;
`;

const Company = styled.div`
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 10px;
`;

const PositionText = styled.div`
  font-weight: 800;
  font-size: 16px;
  color: #636363;
  margin-left: 15px;
  margin-bottom: 10px;
`;

const DownloadButtonContainer = styled.div`
  display: flex;
  justify-content: ${props => props.center ? 'center' : 'flex-end'};
  width: 1200px;
  padding-top: 30px;
`;


const DownloadPDFButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #5B00EF; 
  color: white;
  border: none;
  border-radius: 8px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: #4a00cf; 
  }
`;

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalContainer = styled.div`
  width: 834px;
  height: 581px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ModalCloseButton = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  font-family: SUITE;
  font-weight: 700;
  font-size: 45px;
  text-align: center;
  margin-bottom: 30px;
`;

const ModalEditButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #A1A1A1;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
  &:hover {
    background-color: #939393;
  }
`;

const ModalPDFButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #5B00EF;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  margin: 10px;
  &:hover {
    background-color: #4a00cf;
  }
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;

const IDPhoto = styled.img`
  width: 184.44px;
  height: 237px;
  margin-right: 20px; // 다음 요소와의 간격
  margin-top: 50px;
  margin-left: 50px;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%; // 전체 너비를 차지하도록 설정
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
  const [isPdfDownloadMode, setIsPdfDownloadMode] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); 
  const contentRef = useRef(null);
  const [showDownloadCompleteModal, setShowDownloadCompleteModal] = useState(false);



  const calculateDuration = (start, end) => {
    const startDate = new Date(start.split('. ').join('-'));
    const endDate = new Date(end.split('. ').join('-'));
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    return `${years > 0 ? `${years}년 ` : ''}${remainingMonths > 0 ? `${remainingMonths}개월` : ''}`.trim();
  };

  
  const togglePdfDownloadMode = () => {
    setIsPdfDownloadMode(!isPdfDownloadMode);
  };

  const handleDownloadPDF = () => {
    if (isPdfDownloadMode) {
      setShowModal(true); 
    } else {
      togglePdfDownloadMode();
    }
  };

  const handleEdit = () => {
    setShowModal(false);
    navigate('/mycareer-edit');
  };


  const handleDownload = () => {
    setShowModal(false);
    setIsPdfDownloadMode(true);
    
    setTimeout(() => {
      const element = document.getElementById('pdf-content');
      const fileName = `${fakeUserData.name}님의 커리어.pdf`;
  
      const options = {
      margin: [5, 5, 5, 5],
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        logging: true, 
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight 
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    
    html2pdf().from(element).set(options).save().then(() => {
      // PDF 다운로드가 완료되면 완료 모달 표시
      setShowDownloadCompleteModal(true);
      setIsPdfDownloadMode(false); // PDF 다운로드 모드 비활성화
    });
  }, 500);
};

const DownloadCompleteModal = () => (
  <ModalBackground>
    <ModalContainer>
      <ModalCloseButton src="./assets/closebtn.png" alt="Close" onClick={() => setShowDownloadCompleteModal(false)} />
      <ModalTitle>다운로드 되었습니다<br></br>파일을 확인해주세요</ModalTitle>
      <ModalButtonContainer>
        <ModalPDFButton onClick={() => setShowDownloadCompleteModal(false)}>확인</ModalPDFButton>
      </ModalButtonContainer>
    </ModalContainer>
  </ModalBackground>
);
  return (
    <>
      {showModal && (
        
        <ModalBackground>
          <ModalContainer>
            <ModalCloseButton src="./assets/closebtn.png" alt="Close" onClick={() => setShowModal(false)} />
            <ModalTitle>이대로 내려받을까요?</ModalTitle>
            <ModalButtonContainer>
              <ModalEditButton onClick={handleEdit}>편집하기</ModalEditButton>
              <ModalPDFButton onClick={handleDownload}>내려받기</ModalPDFButton>
            </ModalButtonContainer>
          </ModalContainer>
        </ModalBackground>
      )}
      {showDownloadCompleteModal && <DownloadCompleteModal />}
    <MainContainer ref={contentRef} >
      <Title style={{ marginLeft: isPdfDownloadMode ? 'calc(50% - 372px)' : 'calc(50% - 592px)' }}>{isPdfDownloadMode ? '내 커리어 - PDF 내려받기' : '내 커리어' }</Title>
      <ContentContainer>
        {!isPdfDownloadMode && <MyProfile />}
        <CareerBox  id="pdf-content" style={{ width: isPdfDownloadMode ? '757px' : '792px' }}>
        {isPdfDownloadMode && (
        <ProfileSection>
          <IDPhoto src="./assets/idphoto.png" alt="ID Photo" />
          <ProfileDetailsContainer2>
            <ProfileName2>{fakeUserData.name}</ProfileName2>
            <ProfileDetail2>이메일 <ProfileEmailValue>{fakeUserData.email}</ProfileEmailValue></ProfileDetail2>
            <ProfileDetail2>휴대전화 <ProfileNumberValue>{fakeUserData.phoneNum}</ProfileNumberValue></ProfileDetail2>
          </ProfileDetailsContainer2>
        </ProfileSection>
      )}
        <LanguageTitleContainer>
            <LanguageTitle>어학</LanguageTitle>
            {!isPdfDownloadMode && <EditCareerButton onClick={() => navigate('/mycareer-edit')}>편집하기</EditCareerButton>}
          </LanguageTitleContainer>
      {fakeCareerData.languages.map((language, index) => (
        <CenteredContainer key={index}>
          <LanguageBox style={{ width: isPdfDownloadMode ? '655px' : '690px' }}>
            <LanguageEntry>
              <LanguageName>{language.name}</LanguageName>
              <VerticalLine />
              <LanguageScore>{language.score}</LanguageScore>
            </LanguageEntry>
          </LanguageBox>
        </CenteredContainer>
      ))}
          <SectionDivider />
          <CertificateTitle>자격증</CertificateTitle>
      {fakeCareerData.certificates.map((certificate, index) => (
        <CenteredContainer key={index}>
          <CertificateBox style={{ width: isPdfDownloadMode ? '670px' : '690px' }}>
            <CertificateEntry>
              <CertificateName>{certificate.name}</CertificateName>
              <VerticalLine />
              <CertificateScore>{certificate.score}</CertificateScore>
            </CertificateEntry>
          </CertificateBox>
        </CenteredContainer>
      ))}
          <SectionDivider />
          
          
          <EducationTitle>학력</EducationTitle>
          <CenteredContainer>
            <EducationBox style={{ width: isPdfDownloadMode ? '655px' : '690px' }}>
              <MajorText>{fakeCareerData.major}</MajorText>
              <UniversityText>{fakeCareerData.university}</UniversityText>
            </EducationBox>
          </CenteredContainer>
          <SectionDivider />
          <CareerTitle>경력</CareerTitle>
          {fakeCareerDetailData.map((career, index) => (
            <CenteredContainer key={index}>
              <CareerBox2 style={{ width: isPdfDownloadMode ? '655px' : '690px' }}>
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
          
        </CareerBox>
        
      </ContentContainer>
      <DownloadButtonContainer center={isPdfDownloadMode}>
          <DownloadPDFButton onClick={handleDownloadPDF}>
            PDF 내려받기
          </DownloadPDFButton>
        </DownloadButtonContainer>
    </MainContainer>
    </>
  );
};

export default MyCareer;
