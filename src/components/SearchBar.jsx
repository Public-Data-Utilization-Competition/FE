import React from 'react';
import styled from 'styled-components';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin: 18px 0;
  padding: 0px 20px;
  max-width: 560px;
  height: 40px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #6F6F6F;
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  height: 24px;
  width: 24px;

  i {
    font-size: 20px;
    color: #CCCCCC;
  }
`;

const SearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="관심있는 스포츠 강좌를 검색해보세요" />
      <SearchButton>
        <i className="fas fa-search"></i> {/* FontAwesome 아이콘 */}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;