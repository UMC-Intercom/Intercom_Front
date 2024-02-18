import React, {useEffect, useState} from 'react';
import axios from 'axios'; 
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { useLocation, Link } from "react-router-dom";
import SearchModal from './SearchModal';


const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

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
  { value: '기획·전략', label: '기획·전략' },
  { value: 'IT개발·데이터', label: 'IT개발·데이터' },
  { value: '상품기획·MD', label: '상품기획·MD' },
  { value: '의료', label: '의료' },
  { value: '마케팅·홍보·조사', label: '마케팅·홍보·조사' },
  { value: '디자인', label: '디자인' },
  { value: '운전·운송·배송', label: '운전·운송·배송' },
  { value: '연구·R&D', label: '연구·R&D' },
  { value: '회계·세무·재무', label: '회계·세무·재무' },
  { value: '영업·판매·무역', label: '영업·판매·무역' },
  { value: '서비스', label: '서비스' },
  { value: '교육', label: '교육' },
  { value: '인사·노무·HRD', label: '인사·노무·HRD' },
  { value: '고객상담·TM', label: '고객상담·TM' },
  { value: '생산', label: '생산' },
  { value: '미디어·문화·스포츠', label: '미디어·문화·스포츠' },
  { value: '총무·법무·사무', label: '총무·법무·사무' },
  { value: '구매·자재·물류', label: '구매·자재·물류' },
  { value: '건설·건축', label: '건설·건축' },
  { value: '금융·보험', label: '금융·보험' },
];

const locationOptions = [
  { value: 'all', label: '지역 제한 없음' },
  { value: '서울', label: '서울' },
  { value: '부산', label: '부산' },
  { value: '대구', label: '대구' },
  { value: '인천', label: '인천' },
  { value: '광주', label: '광주' },
  { value: '대전', label: '대전' },
  { value: '울산', label: '울산' },
  { value: '경기', label: '경기' },
  { value: '강원', label: '강원' },
  { value: '충북', label: '충북' },
  { value: '충남', label: '충남' },
  { value: '전북', label: '전북' },
  { value: '전남', label: '전남' },
  { value: '경북', label: '경북' },
  { value: '경남', label: '경남' },
  { value: '제주', label: '제주' },
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
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; // 아이템 간 간격을 조정합니다.
  justify-content: flex-start; // 아이템을 왼쪽 정렬합니다.
  padding: 1.25rem;
`;

const Content = styled.div`
  display: flex;
  gap: 1.563rem;
  flex-wrap: wrap;

  @media (max-width: 75rem) {
    justify-content: space-around;
  }
`;

const NoticeItem = styled.div`
flex: 1 1 calc(33.333% - 1rem); // 3개의 아이템이 한 줄에 표시되도록 조정합니다. gap과 일치하도록 계산합니다.
margin-bottom: 1rem; // 아이템 사이의 세로 간격을 추가합니다.
max-width: calc(33.333% - 1rem); // 최대 너비를 설정합니다.

img {
  width: 100%;
  height: auto;
  object-fit: cover;
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

  useEffect(() => {
      setSearchResults(location.state.searchResults);
      }, []);

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

  const calculateRemainingDays = (expirationDate) => {
    const today = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? `D-${daysDiff}` : '기한 만료';
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
                          <StyledLink to={`/job/${result.id}`} key={result.id}>
                            <NoticeItem key={result.id}>
                                <img src={result.logoUrl} alt={result.title} style={{ marginBottom: "20px" }} />
                                <div>
                                    <Title>[{result.title}]</Title>
                                    <Information>{result.company}</Information>
                                    <br /><br />
                                    <Deadline>{calculateRemainingDays(result.expirationDate)}</Deadline> <Views>조회 {result.viewCount.toLocaleString()}회</Views>
                                </div>
                            </NoticeItem>
                          </StyledLink>
                        ))}
                    </Content>
                </ContentsBox>
            </PopularNoticesBox>

        {isModalOpen && <SearchModal onClose={() => setIsModalOpen(false)} />}
    </div>
);
};

export default SearchResults;