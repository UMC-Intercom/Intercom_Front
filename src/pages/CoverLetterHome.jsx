import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeCoverletterData from '../data/fakeSearchCoverLetterData';

export default function CoverLetterHome() {
  const navigate = useNavigate();
  const navigateToInput = () => navigate('/cover-letters');
  const [sortByDateActive, setSortByDateActive] = useState(true);
  const [sortByLikesActive, setSortByLikesActive] = useState(false);
  const [sortedData, setSortedData] = useState(fakeCoverletterData);

  const handleSortByDate = () => {
    setSortByDateActive(true);
    setSortByLikesActive(false);
    const sortedByDate = [...fakeCoverletterData].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSortedData(sortedByDate);
  };

  const handleSortByLikes = () => {
    setSortByDateActive(false);
    setSortByLikesActive(true);
    const sortedByLikes = [...fakeCoverletterData].sort((a, b) => b.scrap - a.scrap);
    setSortedData(sortedByLikes);
  };

  return (
    <PageContainer>
      <SearchBox>
        <SearchText>합격 자소서 검색하기</SearchText>
        <SearchInput>
          <InputField type="text" id="company" placeholder="기업명" />
          <InputField type="text" id="position" placeholder="직무" />
          <SearchButton>검색</SearchButton>
        </SearchInput>
      </SearchBox>

      <WritingContainer>
        <img src="./assets/CoverLetterProfile.png" alt="Profile Icon" style={{ marginRight: '1.5rem' }} />
        <WritingBox onClick={navigateToInput}>
          합격 자소서를 남겨보세요
        </WritingBox>
      </WritingContainer>

      <SearchResultWrap>
        <SearchResultVar>
          <SearchResultText>
          검색결과 ({fakeCoverletterData.length})
          </SearchResultText>

          <SortButtonsContainer>
            <SortButton onClick={handleSortByDate} active={sortByDateActive}>
              <ButtonImage src={sortByDateActive ? "./assets/Vector14.png" : "./assets/Ellipse26.png"} alt="button image" />
              최근 작성순
            </SortButton>
            <SortButton onClick={handleSortByLikes} active={sortByLikesActive}>
              <ButtonImage src={sortByLikesActive ? "./assets/Vector14.png" : "./assets/Ellipse26.png"} alt="button image" />
              스크랩 많은 순
            </SortButton>
          </SortButtonsContainer>
        </SearchResultVar>

        {sortedData.map((coverLetter, index) => (
          <SearchResultBox key={index}>
            <Information1>{coverLetter.company} | {coverLetter.department} | {coverLetter.year} {' '} {coverLetter.semester}</Information1>
            <Information2>
              토익: {coverLetter.english}, 오픽: {coverLetter.opic} / {coverLetter.activity} / 컴퓨터활용능력: {coverLetter.certification} / {coverLetter.major} / 학점 {coverLetter.gpa}
            </Information2>
            <Information3>
              {coverLetter.contents}
            </Information3>
          </SearchResultBox>
        ))}
      </SearchResultWrap>
    </PageContainer>
  );
}

const SearchResultWrap = styled.div`
margin-top: 64px;
`;
const SearchResultVar = styled.div`
  width: 1198px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #636363;
`;
const SearchResultText = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 31px;
  color: #636363;
  flex-grow: 1;
`;
const SearchResultBox = styled.div`
width: 1185px;
height: 165px;
margin-top: 30px;
border-bottom: 2px solid #E2E2E2;
padding-bottom: 16px;
`;
const Information1 = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 800;
font-size: 25px;
line-height: 31px;
margin-bottom: 12px;

color: #000000;
`;
const Information2 = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 30px;
/* or 150% */
margin-bottom: 3px;

color: #636363;
`;
const Information3 = styled.div`
font-family: 'SUITE';
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 30px;
/* or 150% */

color: #A1A1A1;
`;

const SortButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SortButton = styled.button`
background-color: white;
  font-family: 'SUITE';
font-style: normal;
font-weight: 700;
font-size: 17px;
line-height: 21px;
border: none;
height: 25px;

color: ${({ active }) => (active ? '#000000' : '#A1A1A1')};
`;

const ButtonImage = styled.img`
  margin-right: 0.5rem;
`;

const SearchBox = styled.div`
  width: 74.9375rem;  
  height: 15.5625rem;
  background-color: #5B00EF;
  border-radius: 0.5rem;
  margin-top: 4.0625rem;
  margin-bottom: 3.9375rem;
`;

const SearchText = styled.p`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 700;
  font-size: 3.125rem;
  line-height: 3.875rem;
  color: #E5FF7D;
  margin-top: 2.4375rem;
  margin-bottom: 2.1875rem;
  margin-left: 4.875rem;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  margin-left: 4.875rem;
`;

const InputField = styled.input`
  width: 17.625rem;
  height: 4.5rem;
  border: 0.1875rem solid #FFFFFF;
  border-radius: 1rem;
  background-color: #5B00EF;
  color: #A1A1A1;
  font-size: 1.5625rem;
  margin-right: 1.25rem;
  padding-left: 1.75rem;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 1.5625rem;
  line-height: 2.375rem;
`;

const SearchButton = styled.button`
  width: 8.25rem;
  height: 4.5rem;
  background-color: #E5FF7D; 
  border: none;
  border-radius: 1rem;
  color: #5B00EF;
  font-size: 1.25rem;
  cursor: pointer;
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 1.5625rem;
  line-height: 2.375rem;
  text-align: center;
`;

const WritingContainer = styled.div`
  align-items: center;
  background-color: #FFF;
  display: flex;
  width:74.9375rem;
  height: 5rem;
  justify-content: center;
  cursor: pointer;
`;

const WritingBox = styled.div`
  align-items: center;
  background-color: #E2E2E2;
  border-radius: 1.3rem;
  box-sizing: border-box;
  color: #A1A1A1;
  display: flex;
  font-size: 1.5625rem;
  font-weight: 800;
  justify-content: left;
  margin-left: 1.5rem;
  padding-left: 2.69rem;
  width: 68.25rem;
  height: 5rem;
`;

const PageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
