import React, { useState } from 'react';
import styled from 'styled-components';
import Select, { components } from 'react-select';
import { useNavigate } from 'react-router-dom';

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
`;

const ModalContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 20px;
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
    font-family: 'suite-SemiBold', sans-serif;
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
        fontFamily: 'suite-SemiBold',
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
        maxHeight: '400px',
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '400px',
    }),
};

const SearchModal = ({ onClose }) => {
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/search-results', {
            state: {
                selectedJobs,
                selectedLocation,
                searchInput
            }
        });
        onClose();
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
                        isMulti
                        placeholder="모집 직무"
                        onChange={setSelectedJobs}
                        styles={customStyles}
                        components={{
                            Option: CheckboxOption,
                            ValueContainer: CustomValueContainer,
                        }}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
                    />
                    <GrayBar />
                    <Select
                        options={locationOptions}
                        isMulti
                        placeholder="근무 지역"
                        onChange={setSelectedLocation}
                        styles={customStyles}
                        components={{
                            Option: CheckboxOption,
                            MenuList: CustomMenuList,
                            ValueContainer: CustomValueContainer,
                        }}
                        closeMenuOnSelect={false}
                        hideSelectedOptions={false}
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
