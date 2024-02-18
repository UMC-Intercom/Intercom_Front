import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    font-family: 'SUITE', sans-serif;
`;

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 20px;
    font-family: 'SUITE', sans-serif;

`;

const FlexContainer = styled.div`
    width: 75rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
`;

const Logo = styled.img`
    width: 12rem;
    height: auto;
`;

const CloseButton = styled.img`
    cursor: pointer;
    width: 1.5rem;
    height: auto;
`;

const SearchBarContainer = styled.div`
    width: 75rem;
    height: 4.3rem;
    margin-top: 20px;
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
    font-family: 'SUITE', sans-serif;
    font-weight: 700;
    color: #636363;
`;

const SearchIcon = styled.img`
    width: 1.4375rem; 
    height: 1.603rem;
    margin-left: 1rem;
`;

const GrayBar = styled.div`
    width: 2px;
    height: 50%;
    background-color: #E2E2E2;
    align-self: center;
`;

const CheckboxOptionContainer = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #E2E2E2;
    margin: 5px 0;
    padding: 0 10px;
    &:last-child {
        border-bottom: none;
    }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-right: 10px;
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
        fontFamily: 'SUITE',
        fontWeight: '700',
    }),
    option: (provided, state) => ({
        ...provided,
        padding: '8px 16px',
        cursor: 'pointer',
        backgroundColor: state.isSelected ? '#5B00EF' : 'white',
        color: state.isSelected ? 'white' : 'black',
        borderBottom: '1px solid #E2E2E2',
        margin: '4px 0',
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
        marginTop: '20px',
        boxShadow: 'none',
        padding: '10px',
        maxHeight: '600px',
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '400px',
    }),
};

const NoOptionsMessage = props => (
    <components.NoOptionsMessage {...props}>
      해당 항목 없음
    </components.NoOptionsMessage>
);

const SearchModal = ({ onClose, setSearchResults}) => {
    const [selectedJob, setSelectedJob] = useState(null); // 상태를 단일 객체로 초기화
    const [selectedLocation, setSelectedLocation] = useState(null); // 상태를 단일 객체로 초기화
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/jobs/search', {
                params: {
                    jobMidCode: selectedJob ? selectedJob.value : '', // 단일 선택 반영
                    location: selectedLocation ? selectedLocation.value : '', // 단일 선택 반영
                    keyword: searchInput,
                    page: 1
                }
            });
            console.log(response.data);
            setSearchResults(response.data.content);
            navigate('/search-results', { state: { searchResults: response.data.content } });
            onClose();
        } catch (error) {
            console.error('Error searching for jobs:', error);
        }
    };

    const handleInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <ModalContainer>
            <ModalContent>
                <FlexContainer>
                    <Logo src="./assets/Logo.png" alt="logo" />
                    <CloseButton src="./assets/close.png" alt="close" onClick={onClose} />
                </FlexContainer>
                <SearchBarContainer>
                    <Select
                       options={jobOptions}
                       isMulti={false} // 단일 선택으로 설정
                       isSearchable={false} // 검색 기능 비활성화
                       placeholder="모집 직무"
                       onChange={setSelectedJob} // 선택 항목을 단일 객체로 처리
                       styles={customStyles}
                       components={{
                           Option: CheckboxOption,
                           ValueContainer: CustomValueContainer,
                           NoOptionsMessage: NoOptionsMessage,
                       }}
                    />
                    <GrayBar />
                    <Select
                       options={locationOptions}
                       isMulti={false} // 단일 선택으로 설정
                       isSearchable={false} // 검색 기능 비활성화
                       placeholder="근무 지역"
                       onChange={setSelectedLocation} // 선택 항목을 단일 객체로 처리
                       styles={customStyles}
                       components={{
                           Option: CheckboxOption,
                           MenuList: CustomMenuList,
                           ValueContainer: CustomValueContainer,
                           NoOptionsMessage: NoOptionsMessage,
                       }}
                    />
                    <GrayBar />
                    <SearchIcon src="./assets/Search2.png" alt="search" />
                    <SearchInput type="text" onChange={handleInputChange} onKeyDown={handleKeyDown} />
                </SearchBarContainer>
            </ModalContent>
        </ModalContainer>
    );
};

export default SearchModal;