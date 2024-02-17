import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CoverLetterInput2() {
    const navigate = useNavigate();
    const navigateToPass3 = () => navigate('/interviews-input3', { state: formData });
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
        certifications: '',
        english: '',
        score: '',
        titles: '',
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
            const newCertifications = [...(formData.certifications || '').split(',')];


            newCertifications[index] = value;
            setFormData(prevData => ({
                ...prevData,
                certifications: newCertifications.join(',')
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

    return (
        <SettingTitle>
            <Container>
                <Title>면접 후기 입력하기</Title>
                <Form>
                    <Text>Step 2</Text>
                    <SubtitleWrap>
                        <SubTitle>지원 당시 스펙을 입력해주세요</SubTitle>
                        <AddContentWrap>
                            문항 추가하기
                            <PlusImage src='./assets/plus.png' />
                        </AddContentWrap>
                    </SubtitleWrap>

                    {languageFields.map((field, index) => (
                        <InputWrap key={field.id}>
                            {index === 0 && <Label>어학</Label>}
                            <InputField
                                placeholder='어학 종류'
                                type="text"
                                style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }}
                                value={(formData.english || '').split(',')[index] || ''}
                                onChange={(e) => handleChange(e, 'english', index)} // 변경된 부분: 'license' -> 'english'
                            />

                            <PassSearch>
                                <PassSearchIcon src='./assets/passSearch.png' />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            <InputField
                                placeholder='취득 점수'
                                type="text"
                                value={(formData.score || '').split(',')[index] || ''}
                                onChange={(e) => handleChange(e, 'score', index)}
                            />
                            <MiniPlusImage src='./assets/miniplus.png' onClick={handleAddLanguageField} />
                        </InputWrap>
                    ))}

                    {licenseFields.map((field, index) => (
                        <InputWrap key={field.id}>
                            {index === 0 && <Label>자격증</Label>}
                            <InputField
                                type="text"
                                style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }}
                                value={(formData.certifications || '').split(',')[index] || ''}
                                onChange={(e) => handleChange(e, 'certifications', index)}
                            />
                            <PassSearch>
                                <PassSearchIcon src='./assets/passSearch.png' />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            <LicensePlusImage src='./assets/miniplus.png' onClick={handleAddLicenseField} />
                        </InputWrap>
                    ))}

                    <InputWrap>
                        <MajorLabel>학력</MajorLabel>
                        <InputField
                            placeholder='학교명'
                            type="text"
                            value={formData.education}
                            onChange={handleChange}
                            name="education"
                        />
                        <PassSearch>
                            <PassSearchIcon src='./assets/passSearch.png' />
                            <PassSearchText>검색하기</PassSearchText>
                        </PassSearch>
                        <InputField
                            placeholder='학과명'
                            type="text"
                            value={formData.major}
                            onChange={handleChange}
                            name="major"
                        />
                        <PassSearch>
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
            </Container>
        </SettingTitle>
    );
}

const SettingTitle = styled.div``;

const LicensePlusImage = styled.img`
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