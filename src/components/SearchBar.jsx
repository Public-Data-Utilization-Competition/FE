import React, { useState } from 'react'
import styled from 'styled-components'
import '@fortawesome/fontawesome-free/css/all.min.css'

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 18px 0;
  padding: 0px 20px;
  max-width: 560px;
  height: 40px;
`

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #6f6f6f;
`

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;

  i {
    font-size: 20px;
    color: #cccccc;

    &:hover {
      color: #5a4ebf;
    }
  }
`

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;

  i {
    font-size: 20px;
    color: #ca2525;
  }
`

const SearchBar = ({ onSearch, resetFilterUI }) => {
  const [searchText, setSearchText] = useState('')

  const handleSearch = () => {
    onSearch(searchText)
    if (resetFilterUI) resetFilterUI() // Call the reset function if available
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
      if (resetFilterUI) resetFilterUI() // 필터 모달 UI 초기화
    }
  }

  const clearSearch = () => {
    setSearchText('') // 검색창 비우기
    onSearch('') // 검색어 초기화
  }

  return (
    <SearchBarContainer>
      <SearchInput type="text" value={searchText} placeholder="관심있는 스포츠 강좌를 검색해보세요" onChange={(e) => setSearchText(e.target.value)} onKeyDown={handleKeyDown} />
      {searchText && (
        <ClearButton onClick={clearSearch}>
          <i className="fas fa-times"></i> {/* 초기화 버튼 */}
        </ClearButton>
      )}
      <SearchButton onClick={handleSearch}>
        <i className="fas fa-search"></i>
      </SearchButton>
    </SearchBarContainer>
  )
}

export default SearchBar
