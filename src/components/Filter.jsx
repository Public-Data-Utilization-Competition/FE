import React, { useState } from 'react'
import MultiRangeSlider from './filter/Slider'
import { Region } from './filter/Region'
import { DatePick } from './filter/DatePick'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`
const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between; /* 텍스트와 드롭다운을 양 끝에 배치 */
  align-items: center; /* 수직 중앙 정렬 */
  margin: 16px 0;
  padding: 0 16px;
`

const Dropdown = styled.select`
  border: none;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
  color: #6f6f6f;

  &:focus {
    outline: none;
    border-color: #3e3691;
  }
`

const Text = styled.h3`
  padding-left: 10px;
`

const HorizionLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #f2f2f7;
  line-height: 0.1em;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`

const ModalContent = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  background-color: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  z-index: 10000;
`

const FilterButton = styled.button`
  display: block;
  padding: 0;
  color: #6f6f6f;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #5a4ebf;
    text-decoration: none;
  }
`

const SearchButton = styled.button`
  width: 560px;
  height: 54px;
  margin: 8px auto 0;
  padding: 8px 16px;
  background-color: #3e3691;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    color: #3e3691;
  }
`

const Filter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const serachlogic = () => setIsModalOpen(false)
  const [sortOption, setSortOption] = useState('distance') // 기본값: 거리순

  return (
    <>
      {/* 헤더 바로 아래에 버튼 배치 */}
      <FilterHeader>
        <Dropdown value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="distance">거리순</option>
          <option value="price">가격순</option>
          <option value="popularity">인기순</option>
        </Dropdown>
        <FilterButton onClick={openModal}>원하는 조건 결과만 필터링하기</FilterButton>
      </FilterHeader>
      {isModalOpen && (
        <>
          {/* 모달 오버레이 */}
          <ModalOverlay onClick={serachlogic} />
          {/* 모달 내용 */}
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Container>
              <Text>필터</Text>
              <HorizionLine />
              <Region />
              <HorizionLine />
              <MultiRangeSlider min={0} max={1000} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)} />
              <HorizionLine />
              <DatePick />
              <HorizionLine />
              <SearchButton onClick={serachlogic}>적용하기</SearchButton>
            </Container>
          </ModalContent>
        </>
      )}
    </>
  )
}

export default Filter
