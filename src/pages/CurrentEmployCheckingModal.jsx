// CurrentEmployCheckingModal.jsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
position: fixed;
background-color: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 834px;
  height: 581px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const ModalHeader = styled.div`
  align-items: center;

`;

const CloseButton = styled.button`
  width: 200px;
  height: 64px;
  background-color: #A1A1A1;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: SUITE;
  &:hover {
    background-color: #848484;
  }
  &:active {
    background-color: #6a6a6a;
  }
`;
const CloseIcon = styled.div`
  position: absolute;
  top: 20px; // 상단으로부터의 위치를 조정합니다.
  left: 25px; // 우측으로부터의 위치를 조정합니다.
  cursor: pointer;
  font-size: 40px; // X 아이콘의 크기를 조정합니다.
  color: black; // X 아이콘의 색상을 조정합니다.
  &:hover {
    color: #666; // 마우스 호버 시 X 아이콘의 색상을 변경합니다.
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: ${({ modalStep }) => modalStep === 1 ? 'space-between' : 'center'};
  align-items: center;
  margin-top: 152px;
  width: ${({ modalStep }) => modalStep === 1 ? '424px' : 'auto'};
`;



const NextButton = styled.button`
  background-color: #5B00EF;
  width: 200px;
  height: 64px;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: SUITE;
  &:hover {
    background-color: #3e0089;
  }
  &:active {
    background-color: #2d0066;
  }
`;
const Note = styled.p`
  font-size: 50px;
  color: black;
  text-align: left;
  margin-top: 104px;
  font-family:SUITE;
  font-weight: 700;
  margin-bottom:21px;
`;
const MentorMessage = styled.p`
  font-size: 25px;
  color: black;
  text-align: center;
  font-family: SUITE;
  margin-bottom: -10px;
`;
const DropdownItem = styled.div`\
width: 14.25rem;
height: 2.25rem;
justify-content: flex;
border-bottom: 2px solid #E2E2E2;
margin-left: 3rem;
display: flex;
align-items: center; 
padding: 10px;
padding-top: 10px;
`;

const CheckboxLabel = styled.label`
display: flex;
margin-right: 2.5rem; // 라벨과 카테고리 이름 사이의 간격을 설정합니다.
position: relative;
cursor: pointer;

input {
  opacity: 0;
  position: absolute;
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: -0.5rem;;
  left: 0;
  width: 1.25rem;
height: 1.25rem;
  background-color: #eee;
  border-radius: 4px;
  &:after {
    content: "";
    position: absolute;
    display: none;
    left: 0.4rem;
    top: 0.15rem;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
}

input:checked ~ .checkmark {
  background-color: #5B00EF;
  &:after {
    display: block;
  }
}
`;


const DropdownContainer = styled.div`
  position: relative;
  margin-left: 2.06rem;
  margin-top: 4rem;
  border-radius: 0.625rem;
  border: 2px solid #A1A1A1;
  width: 21.4375rem;
  height: 3rem;
  `;

const DropdownHeader = styled.div`
padding: 10px;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 3rem;
margin-right: 1.12rem;
margin-top: 0.19rem;

`;

const DropdownIndicator = styled.span`
display: inline-block;
width: 1rem;
height: 1rem;
background-image: url('./assets/Vector3.png');
background-size: contain;
background-repeat: no-repeat;
transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'none')};
transition: transform 0.3s;
`;

const DropdownList = styled.div`
margin-top:7px;
margin-left:-1px;
  position: absolute;
  width: 21.25rem;  
  height: 432px;
  background-color: #fff;
  border: 3px solid #E2E2E2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const categories = [
  { id: 1, name: '영업/고객상담' },
  { id: 2, name: '경영/사무' },
  { id: 3, name: '마케팅/홍보' },
  { id: 4, name: '생산/제조' },
  { id: 5, name: '연구개발/설계' },
  { id: 6, name: 'IT/인터넷' },
  { id: 7, name: '디자인' },
 ];

 const accessToken = localStorage.getItem("accessToken");

 
const CurrentEmployCheckingModal = ({ isOpen, onClose, onCheck }) => {
  const [modalStep, setModalStep] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState([]);


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelectedCategories) => {
      const isSelected = prevSelectedCategories.includes(categoryId);
      if (isSelected) {
        const updatedCategories = prevSelectedCategories.filter(id => id !== categoryId);
        const updatedCategoryNames = updatedCategories.map(id => categories.find(category => category.id === id).name);
        setSelectedCategoryNames(updatedCategoryNames);
        return updatedCategories;
      } else {
        const updatedCategories = [...prevSelectedCategories, categoryId];
        const updatedCategoryNames = updatedCategories.map(id => categories.find(category => category.id === id).name);
        setSelectedCategoryNames(updatedCategoryNames);
        return updatedCategories;
      }
    });
  };
  let selectedCategoriesHeader = '카테고리 선택';
  if (selectedCategoryNames.length > 0) {
    if (selectedCategoryNames.length <= 2) {
      selectedCategoriesHeader = selectedCategoryNames.join(', ');
    } else {
      selectedCategoriesHeader = `${selectedCategoryNames.slice(0, 2).join(', ')} 외 ${selectedCategoryNames.length - 2}개`;
    }};
  
    const handleNext = () => {
      if (modalStep === 1) {
        setModalStep(2);
      } else if (modalStep === 2) {
        if (selectedCategories.length === 0) {
          window.alert("카테고리를 선택해주세요.");
        } else {
          setModalStep(3);
        }
      } else if (modalStep === 3) {
        sendCategoriesToServer(selectedCategories); // 서버로 카테고리 데이터를 보내고 모달을 닫습니다.
      }
    };
    const sendCategoriesToServer = async (selectedCategories) => {
      // 선택한 카테고리가 여러 개일 경우 로직을 추가할 수 있습니다.
      // 예시로 첫 번째 선택된 카테고리만 사용합니다.
      const selectedCategory = selectedCategories[0];
      const selectedCategoryName = categories.find(category => category.id === selectedCategory)?.name;
    
      if (!selectedCategoryName) {
        console.error('Selected category is invalid');
        return;
      }
    
      try {
        // `mentorField` 쿼리 파라미터로 카테고리 이름을 전송합니다.
        // JSON 형식이 아닌 URL 인코딩된 폼 데이터 형식을 사용할 경우, `Content-Type` 헤더와 `body` 형식을 변경해야 합니다.
        const response = await fetch(`http://localhost:8080/talks/certification-mentor?mentorField=${selectedCategoryName}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          // JSON 형식의 데이터 대신 쿼리 문자열을 사용하여 서버로 전송합니다.
          // body: JSON.stringify({ categories: selectedCategories }) 부분을 제거하거나 수정합니다.
        });
    
        if (!response.ok) {
          throw new Error(`Server response was not ok: ${response.status}`);
        }
    
        const data = await response.json(); // 서버로부터 받은 응답을 JSON 형식으로 파싱합니다.
        console.log('Server response:', data);
    
        onClose(); // 모달을 닫습니다.
      } catch (error) {
        console.error('Error submitting categories:', error);
      }
    };
    
  return isOpen ? (
    <ModalWrapper>
      <ModalContent>
      
      {modalStep > 1 && ( 
        <CloseIcon onClick={onClose}>&times;</CloseIcon>
      )}
        
        <ModalHeader>
          {modalStep === 1 && (
            <>
              <Note>잠시만요, 현직자이신가요?</Note>
              <MentorMessage>
                현직자로 설정하면 멘토로 활동할 수 있어요.<br />
                지금 인증할까요?
              </MentorMessage>
            </>
          )}
            {modalStep === 2 && (
            <>
              <Note>분야를 선택해주세요</Note>
              
              <DropdownContainer>
                <DropdownHeader onClick={handleDropdownToggle}>
                  {selectedCategoriesHeader}
                  <DropdownIndicator isOpen={isDropdownOpen} />
                </DropdownHeader>
                {isDropdownOpen && (
                  <DropdownList>
                    {categories.map((category) => (
                      <DropdownItem key={category.id}>
                        <CheckboxLabel>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          <span className="checkmark" />
                        </CheckboxLabel>
                        {category.name}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )}
              </DropdownContainer>
            </>
          )}
           {modalStep === 3 && (
            <>
             <Note>인증이 완료되었습니다!</Note>
             <MentorMessage>질문글을 게시해보세요.</MentorMessage>
            </>
          )}
        </ModalHeader>
        <ButtonWrapper modalStep={modalStep}>
          {modalStep === 1 && (
            <CloseButton onClick={onClose}>나중에 하기</CloseButton>
         )}
          <NextButton onClick={() => modalStep === 3 ? sendCategoriesToServer(selectedCategories) : handleNext()}>
  {modalStep === 3 ? "완료" : modalStep === 1 ? "인증하기" : "다음"}
</NextButton>
        </ButtonWrapper>
      </ModalContent>
    </ModalWrapper>
  ) : null;
};

export default CurrentEmployCheckingModal;