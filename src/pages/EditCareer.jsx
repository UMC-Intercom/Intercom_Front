import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import languages from '../data/languages';
import certificates from '../data/certificates'; 
import schools from '../data/schools'; // 학교 데이터
import majors from '../data/majors'; // 학과 데이터
import jobSkills from '../data/skillsData';
import axios from 'axios';
import config from '../path/config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const EditCareerPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3.125rem; 
  padding-bottom: 3.125rem; 
  width: 100%;
  font-family: SUITE;
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 1.5625rem;
  color: #636363;
  align-self: flex-start;
  margin-left: calc(50% - 37rem); 
`;

const EditContainer = styled.div`
  width: 75rem; 
  height: auto;
  background-color: #ffffff;
  border-radius: 0.625rem; 
  padding-top: 0.625rem;
  padding-bottom: 5rem; 
  border: 0.1875rem solid #E2E2E2; 
`;

const LanguageTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; // 또는 필요에 따라 조정
  margin-bottom: -10px;
`;


const LanguageTitle = styled.h3`
  font-weight: 700;
  font-size: 1.875rem;
  color: #636363;
  margin-left: 3.4375rem;
  margin-top: 3.125rem; 
  margin-bottom: 0.625rem; 
`;

const InputFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 3.4375rem;
  margin-top: 1.75rem;
`;

const LanguageName = styled.input.attrs({ readOnly: true })`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;
  background: #F7F7F7;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const SearchButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-left: 13px;
  margin-right: 25px;
`;

const SearchIcon = styled.img`
  height: 24px; 
  margin-right: 0.625rem;
`;

const SearchButton = styled.span`
  font-family: SUITE;
  font-size: 20px;
  color: #636363;
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const LanguageScore = styled.input`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }

`;

const AddButton = styled.img`
  width: 20px; // 버튼의 크기 조절 필요
  height: 20px;
  cursor: pointer;
  margin-left: 20px;
`;


const ModalOverlay = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
  z-index: 1000; // Ensure it's above everything else
`;

const ModalContainer = styled.div`
  width: 834px;
  height: 581px;
  background: #FFF;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1.5px solid #A1A1A1;
`;

const CloseButton = styled.img`
  align-self: flex-end;
  cursor: pointer;
  height: 16px; // Adjust as needed
`;

const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust as needed for spacing
`;

const SearchInput = styled.input`
  width: 556px;
  height: 35px;
  padding: 10px;
  margin-right: 15px;
  border: 2px solid #A1A1A1;
  border-radius: 10px;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }
`;


const ResultsContainer = styled.div`
  width: 556px;
  padding: 10px;
  height: 441px;
  overflow-y: auto; // 결과가 많을 경우 스크롤바 생성
  border: 2px solid #D1D1D1;
  border-radius: 10px;
  background-color: #FFF;
  margin-left: 49px;
  margin-top: 1px;
  font-family: SUITE;
  font-size: 17px;
  font-weight: 600;
  color: #636363;
`;

const ResultItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #E2E2E2; // 디바이더 추가

  &:last-child {
    border-bottom: none; // 마지막 항목은 구분선 제거
  }
`;

const HighlightText = styled.span`
  color: #5B00EF; 
`;

const ResultInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  font-family: SUITE;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-top: 5px;
`;

const SearchResultTitle = styled.span`
  font-size: 1rem;
`;

const ResultCount = styled.span`
  background-color: #F7F7F7;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-left: 1px;
`;

const QualificationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;

  &:hover {
    background-color: #F7F7F7;
    cursor: pointer;
  }
`;

const DeleteButton = styled.img`
  cursor: pointer;
  margin-top: 3.125rem; 
  margin-bottom: 0.625rem; 
  margin-right: 3.4375rem;
  height: 16px;
  width: 16px;
`;

const SectionDivider = styled.div`
  height: 2px;
  background-color: #E2E2E2;
  width: 92%; 
  margin: 40px auto; 
  display: ${({ last }) => (last ? 'none' : 'block')}; 
`;

const CertificateSectionContainer = styled.div`
margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const LanguageSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const EducationSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const ActivitySectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;

const SkillSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격 조정
  display: flex; // 플렉스 컨테이너로 변경
  flex-wrap: wrap; // 내용이 넘치면 다음 줄로
  align-items: center; // 세로 중앙 정렬
  gap: 5px; // 간격 추가
`;

const LinkSectionContainer = styled.div`
  margin-bottom: -30px; // 각 언어 섹션 간의 간격
`;



const CertificateName = styled.input.attrs({ readOnly: true })`
  width: 221px;
  height: 35px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.25rem;
  color: #636363;
  background: #F7F7F7;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const GradeLabel = styled.span`
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  margin-right: 10px; // Adjust spacing as needed
`;

const GradeInput = styled.input`
  width: 110px;
  height: 35px;
  margin-left: 30px;
  margin-right: 10px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;

  &::placeholder {
    color: #BDBDBD;
  }

  &:focus {
    outline: none;
  }

  
`;

const GradeSelect = styled.select`
  width: 130px;
  height: 60px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  background: #FFF;
  cursor: pointer;
  margin-left: 10px;
  appearance: none; /* Remove default styles, important for custom arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url('/assets/Polygon2.png');
  backgroung-width: 10px;
  background-position: right 10px center; /* Adjust arrow position */
  background-repeat: no-repeat;
  background-size: 13px; /* Adjust the size of the arrow image */

  &:focus {
    outline: none;
  }

  option[disabled] {
    color: #BDBDBD; /* Color for your placeholder option */
  }
`;

const Slash = styled.span`
  font-size: 30px;
  color: #A1A1A1;
`;

const GraduateLabel = styled.span`
  font-family: SUITE;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  margin-left: 60px;
`;

const GraduateSelect = styled.select`
  width: 130px;
  height: 60px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  background: #FFF;
  cursor: pointer;
  margin-left: 40px;
  appearance: none; /* Remove default styles, important for custom arrow */
  -moz-appearance: none;
  -webkit-appearance: none;
  background-image: url('/assets/Polygon2.png');
  backgroung-width: 10px;
  background-position: right 10px center; /* Adjust arrow position */
  background-repeat: no-repeat;
  background-size: 13px; /* Adjust the size of the arrow image */

  &:focus {
    outline: none;
  }

  option[disabled] {
    color: #BDBDBD; /* Color for your placeholder option */
  }
`;

const ActivityDescription = styled.input`
  width: 700px;
  height: 50px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const ActivityTitle = styled.input`
  width: 215px;
  height: 50px;
  margin-right: 3rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const LinkTitle = styled.input`
  width: 215px;
  height: 50px;
  margin-right: 3rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }

`;

const InputFieldRow = styled.div`
  margin-left: 3.4375rem;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1.75rem;
`;


const StyledDatePicker = styled(DatePicker)`
  height: 50px;
  width: 158px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  padding: 0.625rem;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363; 
  margin-right: 10px; 

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const DateInputContainer = styled.div`
  margin-right: 10px; // Adjust spacing as needed
  margin-left: 15px;
`;

const Tilde = styled.span`
  font-size: 30px;
  color: #A1A1A1;
`;


const AddButtonContainer = styled.div`
  display: flex;
  margin-left: 900px; 
`;

const AddButton4 = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  align-self: center; // 추가 버튼을 위로 정렬
  margin-left: 10px; 
  margin-top: -50px;
`;


const SkillBox = styled.div`
  width: auto;
  padding-right: 15px;
  padding-left: 15px;
  height: 40px;
  margin: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ selected }) => (selected ? '1.5px solid #5B00EF' : '1.5px solid #A1A1A1')}; // 선택 시 border 제거
  border-radius: 4px;
  font-family: SUITE;
  font-size: 1rem;
  color: ${({ selected }) => (selected ? '#FFFFFF' : '#636363')}; // 글씨 색상 변경
  background: ${({ selected }) => (selected ? '#5B00EF' : '#FFF')}; // 배경 색상 변경
  cursor: pointer;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#5B00EF' : '#f0f0f0')}; // 선택된 상태에서는 배경 색상 유지
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; // 선택된 스킬들을 위쪽으로 정렬
  gap: 5px;
  padding: 10px;
  max-height: 441px;
  overflow-y: auto;
`;

const SkillsContainer2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; // 선택된 스킬들을 위쪽으로 정렬
  gap: 5px;
  padding: 10px;
  max-height: 441px;
  overflow-y: auto;
  margin-left: 30px;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SelectedSkill = styled.div`
  width: 148px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;
  background: #FFF;
  border: 2px solid #A1A1A1;
  cursor: pointer;
  margin: 5px;
  &:hover {
    background-color: #f0f0f0;
  }
`;



const AddButton2 = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  align-self: center; // 추가 버튼을 위로 정렬
  order: 1; // Ensures the Add button comes after the selected skills
  margin-left: 10px; 
`;

const LinkInput = styled.input`
  width: 700px;
  height: 50px;
  margin-right: 0.625rem;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;
  cursor: default;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #BDBDBD;
  }
`;

const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  padding-top: 30px;
`;


const SaveButton = styled.button`
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

const HyperLinkContainer = styled.div`
  display: block; // 각 링크를 새로운 줄에 표시합니다.
  margin-bottom: 10px; // 링크 사이에 약간의 공간을 추가합니다.
  margin-left: 55px;
  margin-top: 20px;
`;


const HyperLink = styled.a`
  font-family: SUITE;
  font-size: 20px;
`;

const SkillsContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
  margin-top: 20px;
`;

const AddSpecButton = styled.button`
  display: flex;
  margin-top: 20px;
  align-items: center; // 버튼 내부의 텍스트와 아이콘이 같은 줄에 정렬되도록 합니다.
  justify-content: center; // 내용물을 가운데 정렬합니다.
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  color: #636363; // 버튼의 텍스트 색상을 조정합니다.
  border: none;
  font-family: SUITE;
  font-size: 1.1rem;
  font-weight: 600;
  position: absolute; // 절대 위치 사용
  right: 0; // 우측 정렬
  top: 0; // 상단 정렬
  margin-right: calc((100% - 70rem) / 2 - 40px); 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const SpecModalOverlay = styled(ModalOverlay)`
background-color: rgba(0, 0, 0, 0.0);
  align-items: flex-start; // 모달이 상단에 위치하도록 조정
  padding-top: 250px; // '스펙 추가하기' 버튼 아래에 모달이 위치하도록 패딩 추가
  padding-left: 860px; // '스펙 추가하기' 버튼 아래에 모달이 위치하도록 패딩 추가
`;

const SpecModalContainer = styled(ModalContainer)`
  width: 300px;
  height: 457px; // 높이를 내용에 맞게 조정
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; // 내부 요소를 중앙에 위치시킴
`;

const SpecOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; // 컨테이너의 폭을 모달 크기에 맞춤
  align-items: flex-start; // 옵션을 중앙에 위치시킴
  margin-top: 50px;
  margin-left: 190px;
`;

const SpecOption = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  font-family: SUITE;
  font-size: 20px;
  font-weight: 600;
  color: #636363;
`;

const SpecCheckbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
`;

const SpecModalButton = styled(SaveButton)`
  width: 174px;
  height: 45px;
  margin-top: 20px;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between; // 양쪽 끝으로 정렬
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative; // 위치 기준을 설정합니다.
`;

const AddButton3 = styled.img`
  width: 20px; // 버튼의 크기 조절 필요
  height: 20px;
  cursor: pointer;
  margin-left: 20px;
`;


const EditCareer = () => {
  const [gradeScale, setGradeScale] = useState(""); // 선택한 기준 학점
  const [linkUrl, setLinkUrl] = useState(""); // 단일 링크 URL
  
  
  const [activities, setActivities] = useState([
    { title: '', startDate: null, endDate: null, description: '' },
  ]);

  // 새로운 대외활동 정보 추가
  const addActivity = () => {
    setActivities([...activities, { title: '', startDate: null, endDate: null, description: '' }]);
  };

  // 대외활동 정보 업데이트
  const updateActivity = (index, field, value) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );
    setActivities(updatedActivities);
  };

  useEffect(() => {
    // 로컬 스토리지에서 섹션의 활성화 상태를 불러옵니다.
    const savedSectionsVisible = JSON.parse(localStorage.getItem('sectionsVisible'));
  
    // 저장된 상태가 있으면 해당 상태를 사용하여 sectionsVisible 상태를 업데이트합니다.
    if (savedSectionsVisible) {
      setSectionsVisible(savedSectionsVisible);
    }
  }, []);
  
  
  useEffect(() => {


    const fetchCareerData = async () => {
      try {
        // 서버에서 사용자의 커리어 정보를 불러오는 GET 요청
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/careers`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
  
        const data = response.data;
        const isAllDataEmpty = !data.english && !data.certification && !data.university && !data.activity && !data.skill && !data.link;


        if (isAllDataEmpty) {
          // 모든 섹션을 활성화합니다.
          setSectionsVisible({
            어학: true,
            자격증: true,
            학력: true,
            대외활동: true,
            보유스킬: true,
            링크: true,
          });
        } else {
          // 데이터가 존재하는 섹션만 활성화
          const initialSectionsVisible = {
            어학: data.english && data.english.length > 0,
            자격증: data.certification && data.certification.length > 0,
            학력: data.university && data.university.length > 0,
            대외활동: data.activity && data.activity.length > 0,
            보유스킬: data.skill && data.skill.length > 0,
            링크: data.link && data.link.length > 0,
          };
  
          setSectionsVisible(initialSectionsVisible);
        }
     
  
       
      // 어학 점수 분할하여 상태 업데이트
      const languages = data.english.split(", ");
      const scores = data.score.split(", ");
      const languageInputs = languages.map((language, index) => ({
        name: language,
        score: scores[index] || '',
      }));
      setLanguageInputs(languageInputs);

      // 자격증 분할하여 상태 업데이트
      const certifications = data.certification.split(", ");
      const certificateInputs = certifications.map(certification => ({
        name: certification,
      }));
      setCertificateInputs(certificateInputs);
  
        // 학력 정보 업데이트
        setSchoolInputs([{ name: data.university }]);
        setMajorInputs([{ name: data.major }]);
  
        // GPA와 졸업 상태 분할 및 업데이트
        const [userGrade, userGradeScale] = data.gpa.split('/');
        setGrade(userGrade); // 사용자가 입력한 학점
        setGradeScale(userGradeScale); // 기준 학점

        setGraduate(data.graduateStatus);
  
        if (data.activity && data.activity.length > 0) {
          setActivities(data.activity.map(act => ({
            title: act.name,
            startDate: new Date(act.startDate),
            endDate: new Date(act.endDate),
            description: act.description
          })));
        } else {
          // 대외활동 데이터가 없는 경우, 빈 입력 필드 하나를 초기 상태로 설정
          setActivities([{ title: '', startDate: null, endDate: null, description: '' }]);
        }
  
        // 보유 스킬 정보 업데이트
        setSelectedSkills(data.skill.split(', '));

        setLinkUrl(data.link || '');
        // 커리어 프로필 이미지 URL 업데이트
        if (data.careerProfile) {
          localStorage.setItem('careerProfileImage', data.careerProfile);
        }
      } catch (error) {
        console.error("Error fetching career data:", error);
      }
    };
  
    fetchCareerData();
  }, []);

  const parseLinkData = (linkStr) => {
    // Assuming `linkStr` is a string "title: URL", parse it into an object {title, url}
    // Adjust this function based on the actual format of your link data
    const [title, url] = linkStr.split(": ");
    return { title, url };
  };

  // Update the link object on user input
  const handleLinkChange = (field, value) => {
    setLink(prevLink => ({
      ...prevLink,
      [field]: value,
    }));
  };


// 링크 URL 변경 처리
const handleLinkUrlChange = (value) => {
  setLinkUrl(value);
};


  const [link, setLink] = useState({ title: '', url: '' });

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [languageInputs, setLanguageInputs] = useState([{ name: "", score: "" }]);
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [certificateInputs, setCertificateInputs] = useState([{ name: "" }]); // 자격증 입력 상태
  const [searchMode, setSearchMode] = useState('languages'); // 'languages' 또는 'certificates'
  const [searchTermSchool, setSearchTermSchool] = useState('');
  const [searchTermMajor, setSearchTermMajor] = useState('');
  const [schoolInputs, setSchoolInputs] = useState([{ name: "" }]);
  const [majorInputs, setMajorInputs] = useState([{ name: "" }]);
  const [grade, setGrade] = useState("");
  const [graduate, setGraduate] = useState("");
  const [activityDescription, setActivityDescription] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [isSkillModalVisible, setSkillModalVisible] = useState(false);
  const [skillSearchTerm, setSkillSearchTerm] = useState('');
  const [skillSearchResults, setSkillSearchResults] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [links, setLinks] = useState([{ title: '', url: '' }]);
  const [linkInput, setLinkInput] = useState('');
  const [isSpecModalVisible, setSpecModalVisible] = useState(false);
  const [sectionsVisible, setSectionsVisible] = useState({
    어학: true, // 기본적으로 표시
    자격증: true, // 기본적으로 표시
    학력: true, // 기본적으로 표시
    대외활동: true, // 기본적으로 숨김
    보유스킬: true, // 기본적으로 숨김
    링크: true, // 기본적으로 숨김
  });

  const addLink = () => {
    setLinks([...links, { title: '', url: '' }]);
  };

const updateLink = (index, field, value) => {
  const updatedLinks = links.map((link, i) =>
    i === index ? { ...link, [field]: value } : link
  );
  setLinks(updatedLinks);
};

  const handleSave = async () => {

    if (!isFormValid()) {
      // 폼이 유효하지 않으면 경고 메시지 표시
      alert('모든 활성화된 섹션의 필수 입력 필드를 채워주세요.');
      return; // 함수 실행 종료
    }

    const formatDate = (date) => {
      if (!date) return '';
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [year, month, day].join('-');
    };
  
    const payload = {
      // 다음은 섹션별로 정보를 포함시킬지 여부를 결정하는 예시입니다.
      // `sectionsVisible` 상태를 기반으로 각 섹션의 데이터를 포함하거나 제외합니다.
      english: sectionsVisible['어학'] ? languageInputs.map(input => input.name).join(", ") : "",
      score: sectionsVisible['어학'] ? languageInputs.map(input => input.score).join(", ") : "",
      certification: sectionsVisible['자격증'] ? certificateInputs.map(input => input.name).join(", ") : "",
      university: sectionsVisible['학력'] ? schoolInputs[0].name : "",
      major: sectionsVisible['학력'] ? majorInputs[0].name : "",
      gpa: sectionsVisible['학력'] ? `${grade}/${gradeScale}` : "",
      graduateStatus: sectionsVisible['학력'] ? graduate : "",
      activity: sectionsVisible['대외활동'] ? activities.map(activity => ({
        name: activity.title,
        startDate: activity.startDate ? formatDate(activity.startDate) : "",
        endDate: activity.endDate ? formatDate(activity.endDate) : "",
        description: activity.description
      })) : [],
      skill: sectionsVisible['보유스킬'] ? selectedSkills.join(", ") : "",
      link: sectionsVisible['링크'] ? linkUrl : "", // 링크 URL
      careerProfile: localStorage.getItem('careerProfileImage'), // 사용자가 업로드한 이미지 URL 사용
      noCareer: false
    };
  
    // 서버에 POST 요청 보내기
    axios.post(`${process.env.REACT_APP_API_URL}/careers`, payload, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log("서버 응답:", response.data);
      alert('저장되었습니다.');
      navigate('/mycareer');
    })
    .catch(error => {
      console.error("서버로 데이터 저장 중 오류 발생:", error);
      alert('저장에 실패했습니다.');
    });
  };
  
  
  const handleSpecCheckboxChange = (specName) => {
    setSectionsVisible(prevSections => {
      const updatedSections = {
        ...prevSections,
        [specName]: !prevSections[specName]
      };
  
      // 변경된 상태를 로컬 스토리지에 저장합니다.
      localStorage.setItem('sectionsVisible', JSON.stringify(updatedSections));
  
      return updatedSections;
    });
  };
  
  const navigate = useNavigate();
  
const handleDeleteSection = (sectionName) => {
  setSectionsVisible(prevSpecs => ({
    ...prevSpecs,
    [sectionName]: false
  }));
};

const parseDateOrNull = (dateStr) => {
  // 입력값이 null이거나 undefined인 경우 바로 null을 반환
  if (!dateStr) return null;

  // 공백 문자열인 경우도 처리
  if (typeof dateStr === 'string' && dateStr.trim() === "") return null;

  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

const isFormValid = () => {
  // 어학 섹션이 활성화되어 있고, 필수 필드가 모두 채워져 있는지 확인
  if (sectionsVisible['어학'] && !languageInputs.every(input => input.name && input.score)) {
    return false; // 하나라도 비어있다면 false 반환
  }

  // 자격증 섹션 확인
  if (sectionsVisible['자격증'] && !certificateInputs.every(input => input.name)) {
    return false;
  }

  // 학력 섹션 확인
  if (sectionsVisible['학력'] && (!schoolInputs[0].name || !majorInputs[0].name || !grade || !gradeScale || !graduate)) {
    return false;
  }

  // 대외활동 섹션 확인
  if (sectionsVisible['대외활동'] && !activities.every(activity => activity.title && activity.startDate && activity.endDate && activity.description)) {
    return false;
  }

  // 보유스킬 섹션 확인 (활성화된 경우 선택된 스킬이 있는지 확인)
  if (sectionsVisible['보유스킬'] && selectedSkills.length === 0) {
    return false;
  }

  // 링크 섹션 확인 (활성화된 경우 링크가 최소 하나 이상 있는지 확인)
  if (sectionsVisible['링크'] && links.length === 0) {
    return false;
  }

  // 모든 조건을 만족하는 경우 true 반환
  return true;
};


// 각 섹션을 조건부로 렌더링하는 함수
const renderSection = (sectionName) => {
  
  switch (sectionName) {
    case '어학':
      if (!sectionsVisible['어학']) return null;
      return (
        <LanguageSectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>어학</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('어학')}/>
            </LanguageTitleContainer>
            {languageInputs.map((input, index) => (
              <InputFieldContainer key={index}>
                <LanguageName
                  placeholder="어학 종류"
                  value={input.name}
                  readOnly={true}
                />
                <SearchButtonContainer onClick={() => handleSearchClick(index, 'languages')}>
                <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
                <SearchButton>검색하기</SearchButton>
                </SearchButtonContainer>
                <LanguageScore
                  value={input.score}
                  onChange={(e) => updateLanguageScore(index, e.target.value)}
                  placeholder="취득 점수"
                  onKeyDown={(e) => handleScoreEnter(e, index)}
                />
                {index === languageInputs.length - 1 && (
                  <AddButton src="./assets/addbtn.png" onClick={addLanguageInput} alt="Add" />
                )}
              </InputFieldContainer>
            ))}
            <SectionDivider />
          </LanguageSectionContainer>
      );
    case '자격증':
      if (!sectionsVisible['자격증']) return null;
      return (
        <CertificateSectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>자격증</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('자격증')} />
            </LanguageTitleContainer>
            {certificateInputs.map((input, index) => (
            <InputFieldContainer key={index}>
              <CertificateName
                placeholder="자격증 종류"
                value={input.name}
                readOnly={true}
            />
            <SearchButtonContainer onClick={() => handleSearchClick(index, 'certificates')}>
            <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
            <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
            {index === certificateInputs.length - 1 && (
                  <AddButton src="./assets/addbtn.png" onClick={addCertificateInput} alt="Add" />
                )}
            </InputFieldContainer>
            ))}
            <SectionDivider />
          </CertificateSectionContainer>
      );
    case '학력':
      if (!sectionsVisible['학력']) return null;
      return (
        <EducationSectionContainer>
          <LanguageTitleContainer>
            <LanguageTitle>학력</LanguageTitle>
            <DeleteButton 
            src="./assets/editclose.png" 
            onClick={() => handleDeleteSection('학력')}
          />
          </LanguageTitleContainer>
          <InputFieldContainer style={{ justifyContent: 'start' }}>
            <LanguageName
              placeholder="학교명"
              value={schoolInputs[0].name}
              readOnly={true}
            />
            <SearchButtonContainer onClick={handleSearchSchoolClick}>
              <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
              <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
            <LanguageName
              placeholder="학과명"
              value={majorInputs[0].name}
              readOnly={true}
            />
            <SearchButtonContainer onClick={handleSearchMajorClick}>
              <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
              <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
          </InputFieldContainer>
          <InputFieldContainer style={{ justifyContent: 'start', alignItems: 'center' }}>
          <GradeLabel>학점</GradeLabel>
          <GradeInput
            type="text"
            placeholder="학점"
            value={grade} // 사용자가 입력한 학점을 표시
            onChange={(e) => setGrade(e.target.value)} // 사용자 입력을 grade 상태에 저장
          />

          <Slash>/</Slash>
          <GradeSelect
             value={gradeScale}
             onChange={(e) => setGradeScale(e.target.value)}
          >
            <option value="" disabled selected>기준 학점</option>
            <option value="4.0">4.0</option>
            <option value="4.3">4.3</option>
            <option value="4.5">4.5</option>
            <option value="5.0">5.0</option>
            <option value="7.0">7.0</option>
            <option value="100">100</option>
          </GradeSelect>
          <GraduateLabel>졸업여부</GraduateLabel>
          <GraduateSelect
            value={graduate}
            onChange={handleGraduateChange}
          >
            <option value="" disabled selected>졸업 여부</option>
            <option value="졸업">졸업</option>
            <option value="졸업예정">졸업 예정</option>
            <option value="재학중">재학중</option>
            <option value="휴학중">휴학중</option>
            <option value="수료">수료</option>
            <option value="중퇴">중퇴</option>
            <option value="자퇴">자퇴</option>
          </GraduateSelect>
        </InputFieldContainer>
          <SectionDivider />
        </EducationSectionContainer>
      );
      case '대외활동':
        if (!sectionsVisible['대외활동']) return null;
        return (
          <ActivitySectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>대외 활동</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('대외활동')} />
            </LanguageTitleContainer>
            {activities.map((activity, index) => (
              <div key={index}>
                <InputFieldRow>
                  <ActivityTitle
                    placeholder="제목"
                    value={activity.title}
                    onChange={(e) => updateActivity(index, 'title', e.target.value)}
                  />
                  <GradeLabel>활동기간</GradeLabel>
                  <DateInputContainer>
                  <StyledDatePicker
                    selected={parseDateOrNull(activity.startDate)}
                    onChange={(date) => updateActivity(index, 'startDate', date)}
                    selectsStart
                    startDate={parseDateOrNull(activity.startDate)}
                    endDate={parseDateOrNull(activity.endDate)}
                    placeholderText="시작 날짜"
                  />
                  </DateInputContainer>
                  <Tilde>~</Tilde>
                  <DateInputContainer>
                  <StyledDatePicker
                    selected={parseDateOrNull(activity.endDate)}
                    onChange={(date) => updateActivity(index, 'endDate', date)}
                    selectsEnd
                    startDate={parseDateOrNull(activity.startDate)}
                    endDate={parseDateOrNull(activity.endDate)}
                    placeholderText="종료 날짜"
                  />


                  </DateInputContainer>
                </InputFieldRow>
                <InputFieldContainer style={{ justifyContent: 'start' }}>
                  <ActivityDescription
                    placeholder="활동 설명 입력하기"
                    value={activity.description}
                    onChange={(e) => updateActivity(index, 'description', e.target.value)}
                  />
                </InputFieldContainer>
              </div>
            ))}
          <AddButtonContainer>
            <AddButton4 src="./assets/addbtn.png" onClick={addActivity} alt="대외활동 추가" />
          </AddButtonContainer>
            <SectionDivider />
          </ActivitySectionContainer>
        );
      
    case '보유스킬':
      if (!sectionsVisible['보유스킬']) return null;
      return (
        <SkillSectionContainer>
        <LanguageTitleContainer>
          <LanguageTitle>보유 스펙</LanguageTitle>
          <DeleteButton src="./assets/editclose.png"  onClick={() => handleDeleteSection('보유스킬')}/>
        </LanguageTitleContainer>
        <SkillsContainerWrapper>
            {renderSkillsSection()}
            <SectionDivider />
          </SkillsContainerWrapper>
       

      </SkillSectionContainer>

      );
      case '링크':
        if (!sectionsVisible['링크']) return null;
        return (
          <LinkSectionContainer>
            <LanguageTitleContainer>
              <LanguageTitle>링크</LanguageTitle>
              <DeleteButton src="./assets/editclose.png" onClick={() => handleDeleteSection('링크')} />
            </LanguageTitleContainer>
            <InputFieldRow>
            <LinkInput
              placeholder="링크 URL"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            </InputFieldRow>
          </LinkSectionContainer>
        );
      
    default:
      return null;
  }
};



  const toggleSpecModal = () => {
    setSpecModalVisible(!isSpecModalVisible);
  };

  const renderSpecModal = () => {
    if (!isSpecModalVisible) return null;
  
    return (
      <SpecModalOverlay show={isSpecModalVisible}>
        <SpecModalContainer>
          <SpecOptionsContainer>
            {Object.keys(sectionsVisible).map(specName => (
              <SpecOption key={specName}>
                <SpecCheckbox
                  checked={sectionsVisible[specName]}
                  onChange={() => handleSpecCheckboxChange(specName)}
                />
                <label>{specName}</label>
              </SpecOption>
            ))}
          </SpecOptionsContainer>
          <SpecModalButton onClick={toggleSpecModal}>완료</SpecModalButton>
        </SpecModalContainer>
      </SpecModalOverlay>
    );
  };
  
  
  
  const handleAddSkillClick = () => {
    setSkillModalVisible(true);
  };
  
  const handleSkillSearch = (searchTerm) => {
    const searchResults = Object.entries(jobSkills).reduce((acc, [jobTitle, skills]) => {
      if (jobTitle.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc = acc.concat(skills);
      }
      return acc;
    }, []);
  
    setSkillSearchResults([...new Set(searchResults)]); // 중복 제거 후 상태 업데이트
  };
  
  useEffect(() => {
    if (skillSearchTerm) {
      handleSkillSearch(skillSearchTerm);
    } else {
      setSkillSearchResults([]);
    }
  }, [skillSearchTerm]);
  
  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    } else {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    }
  };
  

  const renderSkillsSection = () => {
    return (
      <>
        <SkillsContainer2>
          {selectedSkills.map((skill, index) => (
            <SelectedSkill key={index} onClick={() => handleSkillSelect(skill)}>
              {skill}
            </SelectedSkill>
          ))}
        <AddButton2 src="./assets/addbtn.png" onClick={handleAddSkillClick} alt="Add Skill" />
        </SkillsContainer2>
      </>
    );
  };
  
  
  const renderSkillBoxes = () => {
    return (
      <SkillsContainer>
        {skillSearchResults.map((skill, index) => (
          <SkillBox
            key={index}
            onClick={() => handleSkillSelect(skill)}
            selected={selectedSkills.includes(skill)}
          >
            {skill}
          </SkillBox>
        ))}
      </SkillsContainer>
    );
  };
  
  


  const handleActivityDescriptionChange = (event) => {
    const input = event.target.value;
    const nonSpaceCharCount = input.replace(/\s/g, '').length;
  
    if (nonSpaceCharCount <= 50) {
      setActivityDescription(input);
      setCharCount(nonSpaceCharCount);
    }
  };
  
    // onChange 핸들러
    const handleGradeChange = (e) => {
      setGrade(e.target.value);
    };

    const handleGraduateChange = (e) => {
      setGraduate(e.target.value);
    };

   const handleSearchClick = (index, mode) => {
    setCurrentInputIndex(index);
    setSearchMode(mode);
  
    // 모드에 따라 적절한 검색어 상태를 설정합니다.
    if (mode === 'schools') {
      setSearchTerm(searchTermSchool);
    } else if (mode === 'majors') {
      setSearchTerm(searchTermMajor);
    } else {
      setSearchTerm('');
    }
  
    setModalVisible(true);
  };
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
    
    // 모드에 따라 추가적인 상태 업데이트
    if (searchMode === 'schools') {
      setSearchTermSchool(newSearchTerm);
    } else if (searchMode === 'majors') {
      setSearchTermMajor(newSearchTerm);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const addLanguageInput = () => {
    setLanguageInputs([...languageInputs, { name: "", score: "" }]);
  };

  const updateLanguageName = (index, name) => {
    const newInputs = [...languageInputs];
    newInputs[index].name = name;
    setLanguageInputs(newInputs);
  };

  const updateLanguageScore = (index, score) => {
    const newInputs = [...languageInputs];
    newInputs[index].score = score;
    setLanguageInputs(newInputs);
  };

  const handleScoreEnter = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Score input completed for index:', index);
    }
  };

  const handleLinkInput = (e) => {
    setLinkInput(e.target.value);
  };

  const handleLinkSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setLinks([...links, linkInput]);
      setLinkInput(''); // Reset input field
    }
  };

  

  useEffect(() => {
    let results = [];
    // 검색 모드에 따라 결과 설정
    switch (searchMode) {
      case 'languages':
        results = languages.filter(lang =>
          lang.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'certificates':
        results = certificates.filter(cert =>
          cert.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case 'schools':
        results = schools.filter(school =>
          school.name.toLowerCase().includes(searchTermSchool.toLowerCase())
        );
        break;
      case 'majors':
        results = majors.filter(major =>
          major.name.toLowerCase().includes(searchTermMajor.toLowerCase())
        );
        break;
      default:
        break;
    }
    setSearchResults(results);
  }, [searchTerm, searchTermSchool, searchTermMajor, searchMode]);


  const renderSearchResults = () => {
    const currentSearchTerm = searchMode === 'schools' ? searchTermSchool :
    searchMode === 'majors' ? searchTermMajor : searchTerm;
  
    return searchResults.map((item, index) => (
      <ResultItem key={index} onClick={() => selectQualification(item.name)}>
        <QualificationContainer>
          <span>{
            item.name.split(new RegExp(`(${currentSearchTerm})`, 'gi'))
              .map((part, index) => part.toLowerCase() === currentSearchTerm.toLowerCase() ? 
                <HighlightText key={index}>{part}</HighlightText> : part)
          }</span>
          {item.field && <span>{item.field}</span>}
        </QualificationContainer>
      </ResultItem>
    ));
  };
  

  const selectQualification = (name) => {
    switch (searchMode) {
        case 'languages':
            updateLanguageName(currentInputIndex, name); // 어학 이름 업데이트
            break;
        case 'certificates':
            updateCertificateName(currentInputIndex, name); // 자격증 이름 업데이트
            break;
        case 'schools':
            // 학교명 선택 로직
            const newSchoolInputs = [...schoolInputs];
            newSchoolInputs[currentInputIndex].name = name;
            setSchoolInputs(newSchoolInputs);
            break;
        case 'majors':
            // 학과명 선택 로직
            const newMajorInputs = [...majorInputs];
            newMajorInputs[currentInputIndex].name = name;
            setMajorInputs(newMajorInputs);
            break;
        default:
            break;
    }
    setModalVisible(false);
};

  const addCertificateInput = () => {
    setCertificateInputs([...certificateInputs, { name: "" }]);
  };

  const updateCertificateName = (index, name) => {
    const newInputs = [...certificateInputs];
    newInputs[index].name = name;
    setCertificateInputs(newInputs);
  };


const handleSearchSchoolClick = () => {
  setCurrentInputIndex(0); // 현재 입력 필드 인덱스 설정
  setSearchMode('schools');
  setSearchTerm(searchTermSchool); // 현재 학교명 검색어로 설정
  setModalVisible(true); // 모달 표시
};

// 학과명 검색 버튼 클릭 시 호출될 함수
const handleSearchMajorClick = () => {
  setCurrentInputIndex(0); // 현재 입력 필드 인덱스 설정
  setSearchMode('majors');
  setSearchTerm(searchTermMajor); // 현재 학과명 검색어로 설정
  setModalVisible(true); // 모달 표시
};


  return (
    <>
       <EditCareerPage>
       <TitleContainer>
        <Title>내 커리어</Title>
        <AddSpecButton onClick={toggleSpecModal}>
          스펙 추가하기
          <AddButton3 src="./assets/addbtn.png" alt="Add" onClick={toggleSpecModal}/>
        </AddSpecButton>
        {renderSpecModal()} 
      </TitleContainer>
      <EditContainer>
      {renderSection('어학')}
      {renderSection('자격증')}
      {renderSection('학력')}
      {renderSection('대외활동')}
      {renderSection('보유스킬')}
      {renderSection('링크')}

        
      {isSkillModalVisible && (
      <ModalOverlay show={isSkillModalVisible}>
        <ModalContainer>
          <CloseButton src="./assets/closebtn.png" alt="Close" onClick={() => setSkillModalVisible(false)} />
          <SearchSection>
            <SearchInput
              placeholder="직무를 검색해보세요 ex) 개발자"
              value={skillSearchTerm}
              onChange={(e) => setSkillSearchTerm(e.target.value)}
            />
            <SearchButtonContainer onClick={handleSearchClick}>
              <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
              <SearchButton>검색하기</SearchButton>
            </SearchButtonContainer>
          </SearchSection>
          {/* 사용자가 검색어를 입력했을 때만 결과 컨테이너를 렌더링 */}
          {skillSearchTerm && (
            <ResultsContainer>
              {renderSkillBoxes()}
            </ResultsContainer>
          )}
        </ModalContainer>
      </ModalOverlay>
    )}


          
      </EditContainer>

      <SaveButtonContainer>
          <SaveButton onClick={handleSave}>
            저장하기
          </SaveButton>
      </SaveButtonContainer>

    </EditCareerPage>

      <ModalOverlay show={isModalVisible}>
        <ModalContainer>
          <CloseButton src="./assets/closebtn.png"  alt="Close" onClick={handleCloseModal} />
          <SearchSection>
            <SearchInput 
              placeholder={
                searchMode === 'certificates' ? "자격증을 검색해보세요 ex) 정보처리기사" :
                searchMode === 'languages' ? "어학 자격증을 검색해보세요 ex) TOEFL" :
                searchMode === 'schools' ? "학교를 검색해보세요 ex) 서울대학교" :
                searchMode === 'majors' ? "학과를 검색해보세요 ex) 컴퓨터공학" :
                "검색"
              } 
              value={searchTerm} 
              onChange={handleInputChange}
            />

              <SearchButtonContainer onClick={handleSearchClick}>
            <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
            <SearchButton>검색하기</SearchButton>
          </SearchButtonContainer>
          </SearchSection>
          {searchTerm && searchResults.length > 0 && (
            <>
              <ResultsContainer>
              <ResultInfo>
                <SearchResultTitle>검색결과</SearchResultTitle>
                <ResultCount>({searchResults.length})</ResultCount>
              </ResultInfo>
                {renderSearchResults()} 
              </ResultsContainer>
            </>
          )}
        </ModalContainer>
      </ModalOverlay>

  

    </>

  );
};

export default EditCareer;