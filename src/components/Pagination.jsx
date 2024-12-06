import React from 'react'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? '#3e3691' : '#f2f2f2')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};
  cursor: pointer;

  &:hover {
    background-color: #3e3691;
    color: #fff;
  }
`

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <PaginationWrapper>
    {Array.from({ length: totalPages }, (_, index) => (
      <PageButton key={index + 1} $active={currentPage === index + 1} onClick={() => onPageChange(index + 1)}>
        {index + 1}
      </PageButton>
    ))}
  </PaginationWrapper>
)

export default Pagination
