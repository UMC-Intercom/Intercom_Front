import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeInterviewData from '../data/fakeSearchInterviewData';
import InterviewCoinUseQuestionModal from './InterviewCoinUseQuestionModal';


export default function InterviewHome() {
  const navigate = useNavigate();
  const navigateToInput = () => navigate('/interviews-input1');
  const [sortByDateActive, setSortByDateActive] = useState(true);
  const [sortByLikesActive, setSortByLikesActive] = useState(false);
  const [sortedData, setSortedData] = useState(fakeInterviewData);
  const [searchQuery, setSearchQuery] = useState({
    company: '',
    position: ''
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResultClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSortByDate = () => {
    setSortByDateActive(true);
    setSortByLikesActive(false);
    const sortedByDate = [...fakeInterviewData].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setSortedData(sortedByDate);
  };

  const handleSortByLikes = () => {
    setSortByDateActive(false);
    setSortByLikesActive(true);
    const sortedByLikes = [...fakeInterviewData].sort((a, b) => b.scrap - a.scrap);
    setSortedData(sortedByLikes);
  };

  const handleSearchInputChange = (event) => {
    const { id, value } = event.target;
    setSearchQuery({ ...searchQuery, [id]: value });
  };

  const handleSearch = () => {
    let filteredData = fakeInterviewData;

    if (searchQuery.company.trim() !== '') {
      filteredData = filteredData.filter(item => item.company.toLowerCase().includes(searchQuery.company.toLowerCase()));
    }

    if (searchQuery.position.trim() !== '') {
      filteredData = filteredData.filter(item => item.department.toLowerCase().includes(searchQuery.position.toLowerCase()));
    }

    setSortedData(filteredData);
  };

  return (
    <PageContainer>
      <SearchBox>
        <SearchText>합격 후기 검색하기</SearchText>
        <SearchInput>
          <InputField type="text" id="company" placeholder="기업명" onChange={handleSearchInputChange} />
          <InputField type="text" id="position" placeholder="직무" onChange={handleSearchInputChange} />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchInput>
      </SearchBox>

      <WritingContainer>
        <img src="./assets/CoverLetterProfile.png" alt="Profile Icon" style={{ marginRight: '1.5rem' }} />
        <WritingBox onClick={navigateToInput}>
          합격 후기를 남겨보세요
        </WritingBox>
      </WritingContainer>

      <SearchResultWrap>
        {sortedData.length > 0 && (
          <SearchResultVar>
            <SearchResultText>
              검색결과 ({sortedData.length})
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
        )}

        {sortedData.map((coverLetter, index) => (
          <SearchResultBox key={index} onClick={() => handleResultClick(coverLetter)}>
            <InformationContainer>
              <Information1>{coverLetter.company} | {coverLetter.department} | {coverLetter.year} {' '} {coverLetter.semester}</Information1>
              <Information2>
                토익: {coverLetter.english}, 오픽: {coverLetter.opic} / {coverLetter.activity} / 컴퓨터활용능력: {coverLetter.certification} / {coverLetter.major} / 학점 {coverLetter.gpa}
              </Information2>
              <Information3>
                {coverLetter.contents}
              </Information3>
            </InformationContainer>
            <ScrapIconWrap>
              <ScrapIcon src="./assets/scrap.png" />
              <ScrapCount>{coverLetter.scrap}</ScrapCount>
            </ScrapIconWrap>
          </SearchResultBox>
        ))}
      </SearchResultWrap>

      <InterviewCoinUseQuestionModal isOpen={isModalOpen} onClose={closeModal} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchBox = styled.div`
  width: 74.9375rem;  
  height: 15.5625rem;
  background-color: #E5FF7D;
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
  color: #5B00EF;
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
  border: 0.1875rem solid #5B00EF;
  border-radius: 1rem;
  background-color: #E5FF7D;
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
  width: 132px;
  height: 78px;
  background-color:  #5B00EF; 
  border: 0.1875rem solid  #5B00EF;
  border-radius: 1rem;
  color: white;
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

const SearchResultBox = styled.div`
  display: flex;
  width: calc(1198px); 
  height: 165px;
  margin-top: 30px;
  border-bottom: 2px solid #E2E2E2;
  padding-bottom: 16px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  margin-bottom: 3px;
  color: #636363;
`;

const Information3 = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #A1A1A1;
`;

const ScrapIconWrap = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left:37px;
`;

const ScrapIcon = styled.img`
  margin-bottom: 4px;
`;

const ScrapCount = styled.div`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #A1A1A1;
`;
