import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const NumbersContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: ${({ pagesCount }) => `${pagesCount * 40}px`}; 
`;

const PageNumber = styled.button.attrs(props => ({
  isActive: undefined, 
}))`
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  color: #636363;
  border-radius: 100%;
  font-size: 20px;
  font-family: SUITE;
  background-color: ${({ isActive }) => (isActive ? '#D9D9D9' : 'transparent')};
  font-weight: ${({ isActive }) => (isActive ? '800' : 'normal')};
  cursor: pointer;
`;

const ArrowButton = styled(PageNumber)`
  background-color: transparent;
  color: #000;
  border: none;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')}; /* 화살표의 가시성 조정 */
`;

const TalkPagination = ({ currentPage, totalPages, onPageChange }) => {
  let startPage = 1;
  if (currentPage > 5) {
    startPage = currentPage - 4;
    if (startPage + 9 > totalPages) {
      startPage = totalPages - 9;
    }
  }
  const pages = [];
  for (let i = startPage; i <= Math.min(startPage + 9, totalPages); i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      <ArrowButton onClick={() => onPageChange(1)} isVisible={currentPage > 1}>&lt;&lt;</ArrowButton>
      <ArrowButton onClick={() => onPageChange(currentPage - 1)} isVisible={currentPage > 1}>&lt;</ArrowButton>
      <NumbersContainer>
        {pages.map((page) => (
          <PageNumber
            key={page}
            isActive={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageNumber>
        ))}
      </NumbersContainer>
      <ArrowButton onClick={() => onPageChange(currentPage + 1)} isVisible={currentPage < totalPages}>&gt;</ArrowButton>
      <ArrowButton onClick={() => onPageChange(totalPages)} isVisible={currentPage < totalPages}>&gt;&gt;</ArrowButton>
    </PaginationContainer>
  );
};
export default TalkPagination;
