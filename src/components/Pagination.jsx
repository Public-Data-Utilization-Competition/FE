import React, { useState } from 'react'
import styled from 'styled-components'

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
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

const NavigationButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #f2f2f2;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #3e3691;
    color: #fff;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
  }
`

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [currentGroup, setCurrentGroup] = useState(0)
  const itemsPerGroup = 10

  const startPage = currentGroup * itemsPerGroup + 1
  const endPage = Math.min(startPage + itemsPerGroup - 1, totalPages)

  const handleNextGroup = () => {
    if (endPage < totalPages) {
      setCurrentGroup(currentGroup + 1)
    }
  }

  const handlePrevGroup = () => {
    if (currentGroup > 0) {
      setCurrentGroup(currentGroup - 1)
    }
  }

  return (
    <PaginationWrapper>
      <NavigationButton onClick={handlePrevGroup} disabled={currentGroup === 0}>
        이전
      </NavigationButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <PageButton key={startPage + index} $active={currentPage === startPage + index} onClick={() => onPageChange(startPage + index)}>
          {startPage + index}
        </PageButton>
      ))}

      <NavigationButton onClick={handleNextGroup} disabled={endPage >= totalPages}>
        다음
      </NavigationButton>
    </PaginationWrapper>
  )
}

export default Pagination
