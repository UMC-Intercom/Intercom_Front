import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function CoverLetterInput2() {
    const navigate = useNavigate();
    const navigateToPass3 = () => navigate('/cover-letters-input3');

    const [languageFields, setLanguageFields] = useState([{ id: 1 }]);
    const [licenseFields, setLicenseFields] = useState([{ id: 1 }]);

    const handleAddLanguageField = () => {
        const newLanguageField = { id: languageFields.length + 1 };
        setLanguageFields([...languageFields, newLanguageField]);
    };

    const handleAddLicenseField = () => {
        const newLicenseField = { id: licenseFields.length + 1 };
        setLicenseFields([...licenseFields, newLicenseField]);
    };

    const [grade, setGrade] = useState('');
    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };

    return (
        <SettingTitle>
            <Container>
                <Title>합격 자소서 입력하기</Title>
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
                            {index === 0 && <Label >어학</Label>}
                            <InputField placeholder='어학 종류' type="text" style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }} />
                            <PassSearch>
                                <PassSearchIcon src='./assets/passSearch.png' />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            <InputField placeholder='취득 점수' type="text" />
                            <MiniPlusImage src='./assets/miniplus.png' onClick={handleAddLanguageField} />
                        </InputWrap>
                    ))}

                    {licenseFields.map((field, index) => (
                        <InputWrap key={field.id}>
                            {index === 0 && <Label >자격증</Label>}
                            <InputField type="text" style={{ marginLeft: index !== 0 ? '12.6rem' : '0' }} />
                            <PassSearch>
                                <PassSearchIcon src='./assets/passSearch.png' />
                                <PassSearchText>검색하기</PassSearchText>
                            </PassSearch>
                            <LicensePlusImage src='./assets/miniplus.png' onClick={handleAddLicenseField} />
                        </InputWrap>
                    ))}

                    <InputWrap>
                        <MajorLabel >학력</MajorLabel>
                        <InputField placeholder='학교명' type="text" />
                        <PassSearch>
                            <PassSearchIcon src='./assets/passSearch.png' />
                            <PassSearchText>검색하기</PassSearchText>
                        </PassSearch>
                        <InputField placeholder='학과명' type="text" />
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
                        />
                        <Slash>/</Slash>
                        <GradeSelect
                            defaultValue={grade}
                            onChange={handleGradeChange}
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

                    <InputWrap style={ {marginBottom: '57px' }}>
                        <Label >대외 활동</Label>
                        <ExternalInputField type="text" placeholder='관련 설명 입력하기'/>
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
    margin-left: 43px; /* 왼쪽 정렬 */
    margin-top: 4rem;
    margin-bottom: 1rem;
    color: #636363;
    max-width: 80%;
    transition: all 0.3s ease-in-out;

    @media (max-width: 768px) {
        font-size: 1.25rem;
        margin-top: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
        margin-top: 1.5rem;
    }
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