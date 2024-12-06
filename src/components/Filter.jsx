import React, { useState, useEffect } from 'react'
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

const HorizionLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #f2f2f7;
  line-height: 0.1em;
  margin-top: 10px;
  margin-bottom: 10px;
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Filter = ({ sortOption, setSortOption, onFilterApply }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [region, setRegion] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  useEffect(() => {
    if (isModalOpen) {
      setPriceRange({ min: 0, max: 1000000 }) // 슬라이더 초기값 재설정
    }
  }, [isModalOpen])

  const applyFilters = () => {
    const filters = {
      sido: region.length > 0 ? region.join(',') : undefined,
      min_price: priceRange.min,
      max_price: priceRange.max,
      progrm_begin_de: dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : '2024-01-01',
      progrm_end_de: dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : '2025-12-31',
    }
    onFilterApply(filters) // 부모 컴포넌트(App)로 전달
    setIsModalOpen(false)
  }

  return (
    <>
      {/* 드롭다운과 필터 버튼 */}
      <FilterHeader>
        <Dropdown value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">기본</option>
          <option value="price">낮은가격순</option>
          <option value="capacity">모집인원순</option>
        </Dropdown>
        <FilterButton onClick={() => setIsModalOpen(true)}>원하는 조건 결과만 필터링하기</FilterButton>
      </FilterHeader>

      {/* 모달 */}
      {isModalOpen && (
        <>
          <ModalOverlay onClick={() => setIsModalOpen(false)} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Container>
              <Region onRegionChange={(regions) => setRegion(regions)} />
              <HorizionLine />
              <MultiRangeSlider min={0} max={1000000} value={{ min: priceRange.min, max: priceRange.max }} onChange={(range) => setPriceRange(range)} />
              <HorizionLine />
              <DatePick onDateChange={(dates) => setDateRange(dates)} />
              <HorizionLine />
              <SearchButton onClick={applyFilters}>적용하기</SearchButton>
            </Container>
          </ModalContent>
        </>
      )}
    </>
  )
}

export default Filter // default로 내보내기
