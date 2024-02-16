import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageNumber = styled.button`
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin: 0 5px;
  background-color: ${({ isActive }) => (isActive ? '#5B00EF' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'white' : '#000')};
  cursor: pointer;

  &:hover {
    background-color: #5B00EF;
    color: white;
  }
`;

const TalkPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <PaginationContainer>
      {pages.map((page) => (
        <PageNumber
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
};

export default TalkPagination;
