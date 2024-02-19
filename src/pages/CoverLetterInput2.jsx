import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import languages from '../data/languages';
import certificates from '../data/certificates'; 
import schools from '../data/schools';
import majors from '../data/majors'; 

export default function CoverLetterInput2() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [languageInputs, setLanguageInputs] = useState([{ name: "", score: "" }]);
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [certificateInputs, setCertificateInputs] = useState([{ name: "" }]); // 
    const [searchMode, setSearchMode] = useState('languages'); // 'languages' 또는 'certificates'
    const [schoolInputs, setSchoolInputs] = useState([{ name: "" }]);
    const [searchTermSchool, setSearchTermSchool] = useState('');

  const [majorInputs, setMajorInputs] = useState([{ name: "" }]);

  const [searchTermMajor, setSearchTermMajor] = useState('');

  

    const handleCloseModal = () => {
        setModalVisible(false);
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


  const updateLanguageName = (index, name) => {
    const newInputs = [...languageInputs];
    newInputs[index].name = name;
    setLanguageInputs(newInputs);
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
                setFormData(prevData => ({
                    ...prevData,
                    english: name // 선택된 어학 이름을 english 필드에 저장
                }));
                break;
            case 'certificates':
                updateCertificateName(currentInputIndex, name); // 자격증 이름 업데이트
                setFormData(prevData => ({
                    ...prevData,
                    certifications: [...prevData.certifications, name] // 선택된 자격증을 certifications 배열에 추가
                }));
                break;
            case 'schools':
                // 학교명 선택 로직
                const newSchoolInputs = [...schoolInputs];
                newSchoolInputs[currentInputIndex].name = name;
                setSchoolInputs(newSchoolInputs);
                setFormData(prevData => ({
                    ...prevData,
                    education: name // 선택된 학교 이름을 education 필드에 저장
                }));
                break;
            case 'majors':
                // 학과명 선택 로직
                const newMajorInputs = [...majorInputs];
                newMajorInputs[currentInputIndex].name = name;
                setMajorInputs(newMajorInputs);
                setFormData(prevData => ({
                    ...prevData,
                    major: name // 선택된 학과 이름을 major 필드에 저장
                }));
                break;
            default:
                break;
        }
        setModalVisible(false);
    };


    

    const navigate = useNavigate();
    const navigateToPass3 = () => {
        // 입력된 어학, 자격증, 학교명, 학과명이 존재하는지 확인
        const hasLanguage = languageInputs.some(input => input.name && input.score);
        const hasCertificate = certificateInputs.some(input => input.name);
        const hasSchool = schoolInputs[0].name;
        const hasMajor = majorInputs[0].name;
        const hasGPA = formData.gpa;
        const hasActivity = formData.activity;
      
        // 모든 필수 정보가 입력되었는지 검사
        const isFormComplete = hasLanguage && hasCertificate && hasSchool && hasMajor && hasGPA && hasActivity;
      
        if (isFormComplete) {
          navigate('/cover-letters-input3', { state: formData });
        } else {
          alert('모든 필수 정보를 입력해주세요.');
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
      
    const location = useLocation();
    const [languageFields, setLanguageFields] = useState([{ id: 1 }]);
    const [licenseFields, setLicenseFields] = useState([{ id: 1 }]);
    const [formData, setFormData] = useState({
        company: '',
        department: '',
        year: '',
        semester: '',
        gender: 'no-selected',
        birthday: '',
        education: '',
        major: '',
        gpa: '',
        activity: '',
        certifications: [],
        english: '',
        score: '',
        contents: ''
    });

    useEffect(() => {
        if (location.state) {
            setFormData(location.state);
        }
    }, [location]);

    const handleAddLanguageField = () => {
        const newLanguageField = { id: languageFields.length + 1 };
        setLanguageFields([...languageFields, newLanguageField]);
    };

    const handleAddLicenseField = () => {
        const newLicenseField = { id: licenseFields.length + 1 };
        setLicenseFields([...licenseFields, newLicenseField]);
    };

    const handleChange = (e, field, index) => {
        const { name, value } = e.target;
        if (field === 'certifications') {
            const newCertifications = [...formData.certifications];
            newCertifications[index] = value;
            setFormData(prevData => ({
                ...prevData,
                certifications: newCertifications
            }));
        } else if (field === 'gpa') {
            setFormData(prevData => ({
                ...prevData,
                gpa: value
            }));
        } else if (field === 'english') {
            const newEnglish = [...(formData.english || '').split(',')];
            newEnglish[index] = value;
            setFormData(prevData => ({
                ...prevData,
                english: newEnglish.join(',')
            }));
        } else if (field === 'score') {
            const newScore = [...(formData.score || '').split(',')];
            newScore[index] = value;
            setFormData(prevData => ({
                ...prevData,
                score: newScore.join(',')
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };


  const addLanguageInput = () => {
    setLanguageInputs([...languageInputs, { name: "", score: "" }]);
  };
    
  const updateLanguageScore = (index, score) => {
    const newInputs = [...languageInputs];
    newInputs[index].score = score;
    setLanguageInputs(newInputs);
    setFormData(prevData => ({
        ...prevData,
        score: score 
    }));
  };

  const addCertificateInput = () => {
    setCertificateInputs([...certificateInputs, { name: "" }]);
  };


    return (
        <SettingTitle>
            <Container>
                <Title>합격 자소서 입력하기</Title>
                <Form>
                    <Text>Step 2</Text>
                    <SubtitleWrap>
                        <SubTitle>지원 당시 스펙을 입력해주세요</SubTitle>
                
                    </SubtitleWrap>

                    {languageInputs.map((input, index) => (
                        <InputWrap key={index}>
                            {index === 0 && <Label>어학</Label>}
                            <InputField
                                placeholder='어학 종류'
                                type="text"
                                style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }}
                                value={input.name}
                                onChange={(e) => handleChange(e, 'english', index)} // 변경된 부분: 'license' -> 'english'
                            />

                            <PassSearch onClick={() => handleSearchClick(index, 'languages')}>
                                <PassSearchIcon src='./assets/passSearch.png'  />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            <InputField
                                placeholder='취득 점수'
                                type="text"
                                value={input.score}
                                onChange={(e) => updateLanguageScore(index, e.target.value)}
                            />
                             {index === languageInputs.length - 1 && (
                            <MiniPlusImage src='./assets/miniplus.png'  onClick={addLanguageInput} alt="Add" />
                            )}
                                </InputWrap>
                            ))}

                        {certificateInputs.map((input, index) => (
                        <InputWrap key={index}>
                            {index === 0 && <Label>자격증</Label>}
                            <InputField
                                type="text"
                                style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }}
                                value={input.name}
                                onChange={(e) => handleChange(e, 'certifications', index)}
                            />
                            <PassSearch onClick={() => handleSearchClick(index, 'certificates')}>
                                <PassSearchIcon src='./assets/passSearch.png'  />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            {index === certificateInputs.length - 1 && (
                  <LicensePlusImage src="./assets/addbtn.png" onClick={addCertificateInput} alt="Add" />
                )}
                           
                        </InputWrap>
                    ))}

                    <InputWrap>
                        <MajorLabel>학력</MajorLabel>
                        <InputField
                            placeholder='학교명'
                            type="text"
                            value={schoolInputs[0].name}
                            onChange={handleChange}
                            name="education"
                        />
                        <PassSearch onClick={handleSearchSchoolClick}>
                            <PassSearchIcon src='./assets/passSearch.png' />
                            <PassSearchText>검색하기</PassSearchText>
                        </PassSearch>
                        <InputField
                            placeholder='학과명'
                            type="text"
                            value={majorInputs[0].name}
                            onChange={handleChange}
                            name="major"
                        />
                        <PassSearch onClick={handleSearchMajorClick}>
                            <PassSearchIcon src='./assets/passSearch.png' />
                            <PassSearchText>검색하기</PassSearchText>
                        </PassSearch>
                    </InputWrap>

                    <InputWrap>
                        <Label>학점</Label>
                        <GradeInput
                            type="text"
                            placeholder="학점"
                            value={formData.gpa}
                            onChange={(e) => handleChange(e, 'gpa')}
                        />
                        <Slash>/</Slash>
                        <GradeSelect
                            defaultValue={formData.gpa}
                            onChange={(e) => handleChange(e, 'gpa')}
                        >
                            <option value="" disabled selected>기준 학점</option>
                            <option value="4.0">4.0</option>
                            <option value="4.3">4.3</option>
                            <option value="4.5">4.5</option>
                            <option value="5.0">5.0</option>
                            <option value="7.0">7.0</option>
                            <option value="100">100</option>
                        </GradeSelect>
                    </InputWrap>

                    <InputWrap style={{ marginBottom: '57px' }}>
                        <Label>대외 활동</Label>
                        <ExternalInputField
                            type="text"
                            placeholder='관련 설명 입력하기'
                            value={formData.activity}
                            onChange={handleChange}
                            name="activity"
                        />
                    </InputWrap>
                </Form>
                <SubmitButton type="submit" onClick={navigateToPass3}>다음</SubmitButton>

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



            </Container>
        </SettingTitle>


        
    );
}

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

const ResultCount = styled.span`
  background-color: #F7F7F7;
  font-size: 0.875rem;
  color: #9E9E9E;
  margin-left: 1px;
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

const SettingTitle = styled.div``;

const LicensePlusImage = styled.img`
    width: 20px;
    margin-left: 13px;
`;

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
    margin-left: 24px;
`;

const PassSearchText = styled.div`
    margin-left: 10px;
    margin-right: 36px;
`;

const PassSearchIcon = styled.img`
`;

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
    height: auto; /* 자동으로 늘어나도록 설정 */
    background: none;
    border: 3px solid #e2e2e2;
    border-radius: 0.625rem;
`;

const SubTitle = styled.div`
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

const MajorLabel = styled.label`
    font-family: SUITE;
    font-size: 1.25rem;
    font-weight: 700;
    min-width: 10rem;
    margin-left: 43px;
    color: #000;
    width: auto;
`;

const InputField = styled.input`
    width: 231px;
    height: 56px;
    left: 502px;
    top: 427px;
    border: 3px solid #E2E2E2;
    border-radius: 10px;
    color: #000;
    &:focus {
        border-color: #7a42f4;
    }
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    padding-left: 21px;

    &::placeholder {
        color: #A1A1A1;
        font-family: 'SUITE';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
    }
`;

const ExternalInputField = styled.input`
    width: 650px;
    height: 56px;
    left: 502px;
    top: 427px;
    border: 3px solid #E2E2E2;
    border-radius: 10px;
    color: #000;
    padding-left: 21px;
    
    &:focus {
        border-color: #7a42f4;
    }
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    &::placeholder {
        color: #A1A1A1;
        font-family: 'SUITE';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
    }
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
    text-align: center;
    color: #FFFFFF;
    margin-top: 108px;
    cursor: pointer;
`;

const SubtitleWrap = styled.div`
    display: flex;
    justify-content: space-between;
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

const AddContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'SUITE';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    color: #A1A1A1;
`;

const PlusImage = styled.img`
    margin-left: 20.69px;
    margin-right: 49.59px;
`;

const MiniPlusImage = styled.img`
    margin-left: 49px;
    cursor: pointer;
`;

const GradeInput = styled.input`
  width: 110px;
  height: 35px;

  margin-right: 10px;
  padding: 10px;
  border: 3px solid #E2E2E2;
  border-radius: 10px;
  font-family: SUITE;
  font-weight: 700;
  font-size: 1.1rem;
  color: #636363;

  &::placeholder {
    color: #A1A1A1;
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
  color: ${({ defaultValue }) => defaultValue ? "#636363" : "#BDBDBD"};
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