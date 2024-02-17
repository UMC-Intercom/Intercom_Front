import React, { useState } from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { useLocation } from "react-router-dom";
import SearchModal from './SearchModal';

const SearchBarContainer = styled.div`
  width: 75rem;
  height: 4.3rem;
  margin-top: 1.25rem;
  border: 3px solid #5B00EF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 0 1rem;
  font-size: 1.2rem;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: 'suite-SemiBold', sans-serif;
  color: #636363;
`;

const GrayBar = styled.div`
  width: 0.125rem;
  height: 50%;
  background-color: #E2E2E2;
  align-self: center;
`;

const SearchIcon = styled.img`
  width: 1.4375rem;
  height: 1.603rem;
  margin-left: 1rem;
`;

const CheckboxOptionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 2.5rem;
  border-bottom: 1px solid #E2E2E2;
  margin: 0.3125rem 0;
  padding: 0 0.625rem;
  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  margin-right: 0.625rem;
  border: 2px solid #636363;
  border-radius: 0;
  appearance: none;
  &:checked {
    background-color: #5B00EF;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.00049 10.7939L3.70718 8.50059L2.29297 9.9148L6.00049 13.6223L14.0005 5.62231L12.5863 4.2081L6.00049 10.7939Z'/%3E%3C/svg%3E");
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }
`;

const CheckboxOption = ({ innerProps, label, isSelected }) => (
  <CheckboxOptionContainer {...innerProps} isSelected={isSelected}>
    <Checkbox checked={isSelected} readOnly />
    <span>{label}</span>
  </CheckboxOptionContainer>
);

const CustomValue = styled.div`
  color: #636363;
  font-family: SUITE-SemiBold;
`;

const CustomValueContainer = ({ children, getValue, ...props }) => {
  const selectedValues = getValue();
  const numValues = selectedValues.length;
  let displayedChildren = React.Children.toArray(children).filter(
    child => child.type !== components.Input
  );
  if (numValues > 1) {
    displayedChildren = [<CustomValue key="value">{`${selectedValues[0].label} 외 ${numValues - 1}`}</CustomValue>];
  } else if (numValues === 1) {
    displayedChildren = [<CustomValue key="value">{`${selectedValues[0].label}`}</CustomValue>];
  }
  return (
    <components.ValueContainer {...props}>
      {displayedChildren}
      {React.Children.toArray(children).find(child => child.type === components.Input)}
    </components.ValueContainer>
  );
};

const jobOptions = [
  { value: 'sales', label: '영업/고객상담' },
  { value: 'management', label: '경영/사무' },
  { value: 'marketing', label: '마케팅/경영/홍보' },
  { value: 'production', label: '생산/제조' },
  { value: 'research', label: '연구개발/설계' },
  { value: 'it', label: 'IT/인터넷' },
  { value: 'design', label: '디자인' },
];

const locationOptions = [
  { value: 'all', label: '지역 제한 없음' },
  { value: 'seoul', label: '서울' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'incheon', label: '인천' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'daejeon', label: '대전' },
];

const CustomMenuList = props => (
  <components.MenuList {...props}>
    {props.children}
  </components.MenuList>
);

const customStyles = {
  control: (provided) => ({
    ...provided,
    cursor: 'pointer',
    border: 'none',
    boxShadow: 'none',
    fontSize: '1.2rem',
    width: '17rem',
    paddingLeft: '0.5rem',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#5B00EF',
    cursor: 'pointer',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    cursor: 'pointer',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#636363',
    fontFamily: 'SUITE' //폰트 바꿈
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    backgroundColor: state.isSelected ? '#5B00EF' : 'white',
    color: state.isSelected ? 'white' : 'black',
    borderBottom: '1px solid #E2E2E2',
    margin: '0.25rem 0',
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  menu: (provided) => ({
    ...provided,
    color: '#636363',
    cursor: 'pointer',
    borderWidth: '2px',
    borderColor: '#E2E2E2',
    borderStyle: 'solid',
    marginTop: '1.25rem',
    boxShadow: 'none',
    padding: '0.625rem',
    maxHeight: '25rem',
  }),
 
  menuList: (provided) => ({
    ...provided,
    maxHeight: '25rem',
  }),
};

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3.125rem;
`;

const SearchResultTextWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -1.25rem;
`;

const SearchResultText = styled.h2`
  text-align: left;
  font-size: 1.5625rem;
  font-family: SUITE; //검색결과 폰트수정
`;

const ResultCount = styled.span`
  color: #636363;
  font-size: 1.5625rem;
  margin-left: 0.625rem;
  font-family: SUITE; // 검색개수 폰트수정
`;


const PopularNoticesBox = styled.div`
  width: 75rem;
  margin: 3.125rem auto;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentsBox = styled.div`
  width: 75rem;
  min-height: 27.3125rem;
  background-color: #FFFFFF;
  border-radius: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  gap: 1.5625rem;
  flex-wrap: wrap;
  @media (max-width: 75rem) {
    justify-content: space-around;
  }
`;

const NoticeItem = styled.div`
  flex: 0 0 calc(25% - 1.25rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
  img {
    background-color: #D9D9D9;
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }
  span {
    font-size: 1.25rem;
    text-align: left;
    margin-top: 1.25rem;
  }
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
`;

const Information = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Deadline = styled.span`
  font-size: 1.0625rem;
  color: #5B00EF;
`;

const Views = styled.span`
  color: #636363;
`;

const fakeNotices = [
    {
      id: 1,
      imageUrl: "/assets/notice1.jpg",
      title: "가짜 공고 냠냠냠",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
      id: 2,
      imageUrl: "/assets/notice2.jpg",
      title: "가짜 공고 냉돌이",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
      id: 3,
      imageUrl: "/assets/notice3.jpg",
      title: "가짜 공고 냥돌냥",
      information: "2024년 상반기 체험형 청년인턴",
      deadline:15,
      views:1202
    },
    {
        id: 4,
        imageUrl: "/assets/notice4.jpg",
        title: "가짜 공고 돌돌이",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    }, 
    {
        id: 5,
        imageUrl: "/assets/notice5.jpg",
        title: "가짜 공고 냠냠냠",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
        id: 6,
        imageUrl: "/assets/notice6.jpg",
        title: "가짜 공고 냉돌이",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
        id: 7,
        imageUrl: "/assets/notice7.jpg",
        title: "가짜 공고 냥돌냥",
        information: "2024년 상반기 체험형 청년인턴",
        deadline:15,
        views:1202
    },
      {
          id: 8,
          imageUrl: "/assets/notice8.jpg",
          title: "가짜 공고 돌돌이",
          information: "2024년 상반기 체험형 청년인턴",
          deadline:15,
          views:1202
        },
  ];


const SearchResults = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedJobs, selectedLocation, searchInput } = location.state || {};
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isButtonSelected, setIsButtonSelected] = useState({
    button1: false,
    button2: false,
    button3: false,
  });
  

  const handleSearchBarClick = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = (buttonName) => {
    setIsButtonSelected({
      ...isButtonSelected,
      [buttonName]: !isButtonSelected[buttonName],
    });
  };


  return (
    <div>
        <SearchBarWrapper>
            <SearchBarContainer onClick={handleSearchBarClick}>
                <Select
                    options={jobOptions}
                    isMulti
                    value={selectedJobs}
                    placeholder="모집 직무"
                    onChange={() => {}}
                    styles={customStyles}
                    components={{
                        Option: CheckboxOption,
                        MenuList: CustomMenuList,
                        ValueContainer: CustomValueContainer
                    }}
                    menuIsOpen={isDropdownOpen}
                />
                <GrayBar />
                <Select
                    options={locationOptions}
                    isMulti
                    value={selectedLocation}
                    placeholder="근무 지역"
                    onChange={() => {}}
                    styles={customStyles}
                    components={{
                        Option: CheckboxOption,
                        MenuList: CustomMenuList,
                        ValueContainer: CustomValueContainer
                    }}
                    menuIsOpen={isDropdownOpen}
                />
                <GrayBar />
                <SearchIcon src="./assets/Search2.png" alt="search" />
                <SearchInput
                    type="text"
                    value={searchInput}
                    readOnly
                />
            </SearchBarContainer>
        </SearchBarWrapper>

        <PopularNoticesBox>
                <SearchResultTextWrapper>
                    <SearchResultText>검색 결과</SearchResultText>
                    <ResultCount>({searchResults.length})</ResultCount>
                </SearchResultTextWrapper>

                <ContentsBox>
                    <Content>
                        {searchResults.map(result => (
                            <NoticeItem key={result.id}>
                                <img src={result.imageUrl} alt={result.title} style={{ marginBottom: "20px" }} />
                                <div>
                                    <Title>[{result.title}]</Title>
                                    <Information>{result.information}</Information>
                                    <br /><br />
                                    <Deadline>D-{result.deadline}</Deadline> <Views>조회 {result.views}</Views>
                                </div>
                            </NoticeItem>
                        ))}
                    </Content>
                </ContentsBox>
            </PopularNoticesBox>

        {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}
    </div>
);
};

export default SearchResults;