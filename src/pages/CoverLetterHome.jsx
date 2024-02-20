import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import fakeCoverletterData from '../data/fakeSearchCoverLetterData';
import CoinUseQuestionModal from './CoinUseQuestionModal';
import axios from "axios";
import config from "../path/config";
import TalkPagination from "./TalkPagination";
import { useAuth } from './AuthContext';

export default function CoverLetterHome() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [sortByDateActive, setSortByDateActive] = useState(true);
  const [sortByLikesActive, setSortByLikesActive] = useState(false);
  // const [sortedData, setSortedData] = useState(fakeCoverletterData);
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    company: '',
    position: ''
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const profile = localStorage.getItem('userProfile');
  
      if (profile === null || profile === "null") { 
        setUserProfile("./assets/MyProfile.png");
      } else {
        setUserProfile(profile);
      }
    } else {
      setUserProfile("./assets/MyProfile.png");
    }
  }, [isLoggedIn]);
  

  const fetchPosts = async (page) => {
    let url = `${config.API_URL}/resumes?page=${currentPage}`;

    if (!isSearchMode && sortByLikesActive) {
      url = `${config.API_URL}/resumes/scrap-counts?page=${currentPage}`;
    }
    if (isSearchMode && sortByDateActive) {
      url = `${config.API_URL}/resumes/search?company=${searchQuery.company}&department=${searchQuery.position}&page=${currentPage}`;
    }
    else if (isSearchMode && sortByLikesActive) {
      url = `${config.API_URL}/resumes/search/scrap-counts?company=${searchQuery.company}&department=${searchQuery.position}&page=${currentPage}`;
    }
    try {
      //const sortBy = sortByDateActive ? '' : '/scrap-counts'; // 추가된 부분
      const response = await axios.get(url);

      setSortedData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);

    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, sortByDateActive]);

  const handleResultClick = (item) => {
    if (isLoggedIn) {
      setSelectedItem(item);
      setIsModalOpen(true);
    } else {
      navigate('/join'); // 로그인하지 않았다면 회원가입 페이지로 리다이렉트
    }
  };

  const navigateToInput = () => {
    if (isLoggedIn) {
      navigate('/cover-letters'); // 로그인했다면 입력 페이지로 이동
    } else {
      navigate('/join'); // 로그인하지 않았다면 회원가입 페이지로 리다이렉트
    }
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleSortByDate = () => {
    setSortByDateActive(true);
    setSortByLikesActive(false);
    setCurrentPage(1);
  };

  const handleSortByLikes = () => {
    setSortByDateActive(false);
    setSortByLikesActive(true);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    const { id, value } = event.target;
    setSearchQuery({ ...searchQuery, [id]: value });
  };

  const handleSearch = async () => {
    // 빈칸 검색 시 검색 모드 종료 및 상태 초기화
    if (!searchQuery.company.trim() && ! searchQuery.position.trim) {
      resetSearch();
      return;
    }

    let url;
    if (sortByDateActive) {
      url = `${config.API_URL}/resumes/search`;
    }
    else if (sortByLikesActive) {
      url = `${config.API_URL}/resumes/scrap-counts`;
    }

    try {
      const response = await axios.get(url, {
        params: {
          company: searchQuery.company,
          department: searchQuery.position,
          page: currentPage // 현재 페이지도 함께 전송할 수 있도록 수정
        }
      });

      setIsSearchMode(true);
      setSortedData(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error('Failed to search resumes:', error);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const resetSearch = () => {
    // setSearchTerm('');
    setIsSearchMode(false);
    setCurrentPage(1);
  };

  return (
    <PageContainer>
      <SearchBox>
        <SearchText>합격 자소서 검색하기</SearchText>
        <SearchInput>
          <InputField type="text" id="company" placeholder="기업명" onChange={handleSearchInputChange} />
          <InputField type="text" id="position" placeholder="직무" onChange={handleSearchInputChange} />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchInput>
      </SearchBox>

      <WritingContainer>
        <img src={userProfile} alt="Profile Icon" style={{ marginRight: '1.5rem', width: '78px', height: '78px', borderRadius: '100%', border: '3px solid #E2E2E2' }} />
        <WritingBox onClick={navigateToInput}>
          합격 자소서를 남겨보세요
        </WritingBox>
      </WritingContainer>

      <SearchResultWrap>
        {totalElements > 0 && (
          <SearchResultVar>
            <SearchResultText>
              검색결과 ({totalElements})
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

        {sortedData.map((coverLetter, index) => {
          const englishList = coverLetter.english ? coverLetter.english.split(', ') : [];
          const scoreList = coverLetter.score ? coverLetter.score.split(', ') : [];

          return (
              // <SearchResultBox key={index} onClick={() => handleResultClick(coverLetter)}>
              <SearchResultBox key={index}>
                <InformationContainer key = {coverLetter.id} onClick={() => handleResultClick(coverLetter)}>
                  <Information1>{coverLetter.company} | {coverLetter.department} | {coverLetter.year} {' '} {coverLetter.semester}</Information1>
                  <Information2>
                    {englishList.map((english, index) => (
                        <span key={index}> {english}: {scoreList[index]}, </span>
                    ))} /
                    <span> 대외활동: {coverLetter.activity}</span> /
                    <span> {coverLetter.certification}</span> /
                    <span> {coverLetter.education}</span> /
                    <span> {coverLetter.department}</span> /
                    <span> 학점: {coverLetter.gpa}</span>
                  </Information2>
                  <Information3>
                    {coverLetter.titles}
                    <br/>
                    {coverLetter.contents}
                  </Information3>
                </InformationContainer>
                <ScrapIconWrap>
                  <ScrapIcon src="./assets/scrap.png" />
                  <ScrapCount>{coverLetter.scrapCount.toLocaleString()}</ScrapCount>
                </ScrapIconWrap>
              </SearchResultBox>
          );
        })}
      </SearchResultWrap>

      <CoinUseQuestionModal isOpen={isModalOpen} onClose={closeModal} selectedItem={selectedItem} />

      <TalkPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
      />
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
  width: 132px;
  height: 78px;
  background-color: #E5FF7D; 
  border: 0.1875rem solid #E5FF7D;
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
  overflow: hidden;
  padding-bottom: 5px; 
  cursor: pointer;
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
