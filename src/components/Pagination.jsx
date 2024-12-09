import React, { useState } from 'react'
import styled from 'styled-components'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    margin: 16px 0;
  }
`

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.$active ? '#3e3691' : '#f2f2f2')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #3e3691;
    color: #fff;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 8px;
    font-size: 12px;
    margin: 0 3px;
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
  font-size: 14px;

  &:hover {
    background-color: #3e3691;
    color: #fff;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 8px;
    font-size: 12px;
    margin: 0 3px;
  }
`

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [currentGroup, setCurrentGroup] = useState(0)
  const itemsPerGroup = 10

  // 모바일 환경에서는 한 그룹에 5개씩만 표시
  const itemsPerGroupMobile = 5

  const isMobile = window.innerWidth <= parseInt(breakpoints.mobile)

  const startPage = currentGroup * (isMobile ? itemsPerGroupMobile : itemsPerGroup) + 1
  const endPage = Math.min(startPage + (isMobile ? itemsPerGroupMobile : itemsPerGroup) - 1, totalPages)

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
