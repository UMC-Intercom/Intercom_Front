import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import companies from '../data/companies';
import fields from '../data/fields';

export default function InterviewInput1() {
  const navigate = useNavigate();
  const [currentYear] = useState(new Date().getFullYear());
  const [years] = useState(Array.from(new Array(125), (val, index) => currentYear - index));

  const [isSearchModalVisible, setSearchModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [isFieldSearchModalVisible, setFieldSearchModalVisible] = useState(false);
  const [fieldSearchTerm, setFieldSearchTerm] = useState('');
  const [fieldSearchResults, setFieldSearchResults] = useState([]);

  const toggleFieldSearchModal = () => {
    setFieldSearchModalVisible(!isFieldSearchModalVisible);
  };
  
  // 검색 입력 변경 처리 함수
  const handleFieldSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setFieldSearchTerm(newSearchTerm);
    const filteredFields = fields.filter(field =>
      field.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFieldSearchResults(filteredFields);
  };
  
  // 검색 결과 선택 처리 함수
  const handleFieldSelect = (field) => {
    setFormData({ ...formData, department: field.name });
    setFieldSearchModalVisible(false);
    setFieldSearchTerm('');
    setFieldSearchResults([]);
  };



  const handleCloseModal = () => {
    setSearchModalVisible(false); // 모달 창을 닫음
  };
  

  const [formData, setFormData] = useState({
    company: '',
    department: '',
    year: '2024',
    semester: '상반기',
    gender: 'no-selected',
    birthday: `${currentYear}-01-01`,
    education: '',
    major: '',
    gpa: '',
    activity: '',
    certifications: [],
    english: '',
    score: '',
    contents: '',
    birthYear: '2024',
    birthMonth: '1',
    birthDay: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      if (name === 'birthYear' || name === 'birthMonth' || name === 'birthDay') {
        const newBirthData = {
          ...prevData,
          [name]: value
        };
        const birthday = `${newBirthData.birthYear}-${newBirthData.birthMonth.padStart(2, '0')}-${newBirthData.birthDay.padStart(2, '0')}`;
        return {
          ...newBirthData,
          birthday: birthday
        };
      } else {
        return {
          ...prevData,
          [name]: value
        };
      }
    });
  };
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    const filteredCompanies = companies.filter(company =>
      company.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setSearchResults(filteredCompanies);
  };

  const handleCompanySelect = (company) => {
    setFormData({ ...formData, company: company.name });
    setSearchModalVisible(false);
    setSearchTerm('');
    setSearchResults([]);
  };

  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };

  const navigateToPass2 = () => {
    const isFormComplete = formData.company && formData.department && formData.year && formData.gender !== 'no-selected' && formData.birthday !== `${currentYear}-01-01`;
  
    if (isFormComplete) {
      navigate('/interviews-input2', { state: formData });
    } else {
      alert('모든 필수 항목을 입력해주세요.');
    }
  };
  

  return (
    <SettingTitle>
      <Container>
        <Title>면접 후기 입력하기</Title>
        <Form>
          <Text>Step 1</Text>
          <SubTitle>회사명과 부서 및 직무명, 합격 연도를 입력해주세요</SubTitle>

          <InputWrap>
            <Label>회사명</Label>
            <InputField
              type="text"
              name="company"
              placeholder="회사명"
              value={formData.company}
              onChange={handleChange}
            />
            <PassSearch onClick={toggleSearchModal}>
              <PassSearchIcon src='./assets/passSearch.png' />
              <PassSearchText>검색하기</PassSearchText>
            </PassSearch>
          </InputWrap>

          <InputWrap>
            <Label>부서 및 직무명</Label>
            <InputField
              type="text"
              name="department"
              placeholder="부서 및 직무명"
              value={formData.department}
              onChange={handleChange}
            />
            <PassSearch onClick={toggleFieldSearchModal}> {/* 검색 모달 토글 함수 호출 */}
              <PassSearchIcon src='./assets/passSearch.png' />
              <PassSearchText>검색하기</PassSearchText>
            </PassSearch>
          </InputWrap>

          <InputWrap>
            <Label>합격 연도</Label>
            <Select name="year" value={formData.year} onChange={handleChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>년
            <Select name="semester" value={formData.semester} onChange={handleChange}>
              <option value="상반기">상반기</option>
              <option value="하반기">하반기</option>
            </Select>
          </InputWrap>

          <InputWrap>
            <Label>성별</Label>
            <RadioInput
              name="gender"
              value="male"
              label="남자"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            <RadioInput
              name="gender"
              value="female"
              label="여자"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            <RadioInput
              name="gender"
              value="no-selected"
              label="선택 안 함"
              checked={formData.gender === 'no-selected'}
              onChange={handleChange}
            />
          </InputWrap>

          <InputWrap>
            <Label>생년월일</Label>
            <Select name="birthYear" value={formData.birthYear} onChange={handleChange}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>년
            <Select name="birthMonth" value={formData.birthMonth} onChange={handleChange}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </Select>월
            <Select name="birthDay" value={formData.birthDay} onChange={handleChange}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </Select>일
          </InputWrap>

        </Form>
        <SubmitButton type="submit" onClick={navigateToPass2}>다음</SubmitButton>

        {isSearchModalVisible && (
            <Modal>
              <ModalContent>
                <CloseButton src="./assets/closebtn.png" alt="Close" onClick={handleCloseModal} />
                <SearchSection>
                  <SearchInput
                    type="text"
                    placeholder="회사명을 검색해보세요"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <SearchButtonContainer>
                    <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
                    <SearchButton>검색하기</SearchButton>
                  </SearchButtonContainer>
                </SearchSection>
                {/* searchTerm이 비어있지 않을 경우에만 결과 컨테이너 렌더링 */}
                {searchTerm && (
                  <ResultsContainer>
                    {searchResults.length > 0 && (
                      <ResultInfo>
                        <SearchResultTitle>검색결과</SearchResultTitle>
                        <SearchResultsCount>({searchResults.length})</SearchResultsCount>
                      </ResultInfo>
                    )}
                    {searchResults.map((company, index) => (
                      <SearchResultItem key={index} onClick={() => handleCompanySelect(company)}>
                        {company.name.split(new RegExp(`(${searchTerm})`, 'gi'))
                          .map((part, index) => part.toLowerCase() === searchTerm.toLowerCase() ? 
                            <Highlight key={index}>{part}</Highlight> : part)}
                      </SearchResultItem>
                    ))}
                  </ResultsContainer>
                )}
              </ModalContent>
            </Modal>
          )}

            {isFieldSearchModalVisible && (
              <Modal>
                <ModalContent>
                  <CloseButton src="./assets/closebtn.png" alt="Close" onClick={() => setFieldSearchModalVisible(false)} />
                  <SearchSection>
                    <SearchInput
                      type="text"
                      placeholder="부서 및 직무명을 검색해보세요 ex) IT개발·데이터"
                      value={fieldSearchTerm}
                      onChange={handleFieldSearchChange}
                    />
                    <SearchButtonContainer>
                    <SearchIcon src="./assets/EditCareerSearch.png" alt="Search" />
                    <SearchButton>검색하기</SearchButton>
                  </SearchButtonContainer>
                  </SearchSection>
                  {fieldSearchTerm && (
                    <ResultsContainer>
                    {fieldSearchResults.map((field, index) => (
                      <SearchResultItem key={index} onClick={() => handleFieldSelect(field)}>
                        {field.name.split(new RegExp(`(${fieldSearchTerm})`, 'gi')).map((part, index) => 
                          part.toLowerCase() === fieldSearchTerm.toLowerCase() ? 
                          <Highlight key={index}>{part}</Highlight> : part
                        )}
                      </SearchResultItem>
                    ))}
                    </ResultsContainer>
                  )}
                </ModalContent>
              </Modal>
            )}

            </Container>
          </SettingTitle>
        );
      }

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


const SearchButton = styled.span`
  font-family: SUITE;
  font-size: 20px;
  color: #636363;
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
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


const SearchSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; // Adjust as needed for spacing
`;

const CloseButton = styled.img`
  align-self: flex-end;
  cursor: pointer;
  height: 16px; // Adjust as needed
`;

const SearchResultsCount = styled.span`
  background-color: #F7F7F7;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-left: 1px;
`;

const Highlight = styled.span`
  color: #5B00EF; 
`;

const SettingTitle = styled.div``;

const Text = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 25px;
  color: #5B00EF;
  margin-top: 50px;
  margin-left: 45px;
`;

const PassSearch = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  color: #636363;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  cursor: pointer;
`;

const PassSearchText = styled.div`
  margin-left: 10px;
`;

const PassSearchIcon = styled.img``;

const Title = styled.div`
  font-family: SUITE;
  font-size: 1.5625rem;
  font-weight: 600;
  margin-top: 4rem;
  margin-bottom: 1rem;
  color: #636363;
  transition: all 0.3s ease-in-out;
  width: 1200px;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 1024px) {
    width: 80%;
    padding: 4rem;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 3rem;
  }

  @media (max-width: 480px) {
    width: 95%;
    padding: 2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 669px;
  background: none;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
`;

const SubTitle = styled.div`
  text-align: left;
  margin-left: 43px;
  margin-bottom: 42px;

  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 37px;

  color: #636363;
`;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 28px; /* 변경된 부분 */
  font-family: SUITE;
  font-size: 1rem;
  font-weight: 700;
`;

const Label = styled.label`
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;
  min-width: 10rem;
  margin-left: 43px;
  color: #000;
  width: auto;
  &:after {
    content: "*";
    color: #FF0000;
  }
`;

const InputField = styled.input`
  font-family: SUITE;
  font-size: 1.25rem;
  font-weight: 700;
  width: 30rem;
  height: 1.5rem;
  margin-left: 2rem;
  margin-right: 25px;
  padding: 1rem 1.5rem;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
  color: #000;
  &:focus {
    border-color: #7a42f4;
  }
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-left: 2rem;
  margin-right: 5rem; // 각 라디오 버튼 사이 간격

  /* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */

color: #636363;

  & input {
    appearance: none; // 기본 스타일 제거
    -webkit-appearance: none; // Safari를 위한 기본 스타일 제거
    border: 1rem solid #E2E2E2;
    border-radius: 50%; // 원형 테두리
    width: 1em; // 너비
    height: 1em; // 높이
    margin-right: 0.4em; // 텍스트와의 간격

    &:checked {
      background-color: #5B00EF; // 선택 시 보라색으로 채움
      border: 1rem solid #5B00EF; // 선택 시 보라색 테두리
      position: relative; // 가상 요소를 위한 포지셔닝 컨텍스트
    }

    &:checked::after {
      content: ''; // 가상 요소에는 내용이 없음
      position: absolute; // 부모 요소(input) 기준으로 절대 위치
      top: 50%; // 상위 요소의 정중앙
      left: 50%; // 상위 요소의 정중앙
      transform: translate(-50%, -50%); // 정확한 중앙에 위치
      width: 1rem; // 내부 원의 너비
      height: 1rem; // 내부 원의 높이
      border-radius: 50%; // 원형
      background: #fff; // 내부 원의 배경색은 흰색
    }
  }
`;

const Modal = styled.div`
display: flex;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
justify-content: center;
align-items: center;
z-index: 1000;
`;

// 모달 내용 컨테이너
const ModalContent = styled.div`
width: 834px;
height: 581px;
background: #FFF;
border-radius: 10px;
padding: 20px;
display: flex;
flex-direction: column;
border: 1.5px solid #A1A1A1;
`;

// 검색 결과 리스트
const SearchResults = styled.div`
  margin-top: 10px;
  max-height: 300px; // 검색 결과 리스트의 최대 높이 설정
  overflow-y: auto; // 내용이 넘칠 경우 스크롤 가능하도록 설정
  border-top: 1px solid #ccc; // 상단에 구분선 추가
  padding-top: 10px;
`;

// 검색 결과 아이템
const SearchResultItem = styled.div`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f8f8f8; // 마우스 호버 시 배경색 변경
  }
`;

// 검색 입력 필드
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


const RadioInput = ({ className, label, ...props }) => (
  <RadioLabel className={className}>
    <input type="radio" {...props} />
    {label}
  </RadioLabel>
);

const Select = styled.select`
  font-family: SUITE;
  font-size: 1rem;
  font-weight: 700;
  width: 7rem;
  padding: 1rem 1rem;
  border: 3px solid #e2e2e2;
  border-radius: 0.625rem;
  background-color: white;
  margin-right: 1rem;
  margin-left: 2rem;

  /* B2 */
font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 25px;
/* identical to box height */

color: #636363;
`;

const SubmitButton = styled.button`
  width: 588px;
  height: 72px;
  background: #5B00EF;
  border-radius: 10px;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 25px;
  /* identical to box height */
  text-align: center;
  color: #FFFFFF;
  margin-top: 108px;
  cursor: pointer;
`;
