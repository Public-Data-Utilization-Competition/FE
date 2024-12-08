import React, { useState, useEffect } from 'react'
import MultiRangeSlider from './filter/Slider'
import { Region } from './filter/Region'
import { DatePick } from './filter/DatePick'
import styled from 'styled-components'
import filterResetIcon from '../images/filter_reset.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
`

const ContainerHeader = styled.div`
  display: flex;
`
const Title = styled.h3`
  margin-left: 10px;
`

const ResetButton = styled.button`
  background-color: transparent;
  border: none;
  color: #6f6f6f;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    color: #5a4ebf;
  }
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
      setPriceRange({ min: 0, max: 1000000 })
    }
  }, [isModalOpen])

  const resetFilters = () => {
    console.log('함수 실행')
    setRegion([]) // 선택된 지역 초기화
    setPriceRange({ min: 0, max: 1000000 }) // 선택된 가격 범위 초기화
    setDateRange({ startDate: null, endDate: null }) // 선택된 날짜 범위 초기화
  }

  const applyFilters = () => {
    const filters = {
      sido: region.length > 0 ? region.join(',') : undefined,
      min_price: priceRange.min,
      max_price: priceRange.max,
      progrm_begin_de: dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : '2024-01-01',
      progrm_end_de: dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : '2025-12-31',
    }
    onFilterApply(filters)
    setIsModalOpen(false)
  }

  return (
    <>
      <FilterHeader>
        <Dropdown value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="default">기본</option>
          <option value="price">낮은가격순</option>
          <option value="capacity">모집인원순</option>
        </Dropdown>
        <FilterButton onClick={() => setIsModalOpen(true)}>원하는 조건 결과만 필터링하기</FilterButton>
      </FilterHeader>

      {isModalOpen && (
        <>
          <ModalOverlay onClick={() => setIsModalOpen(false)} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Container>
              <ContainerHeader>
                <Title>필터</Title>
                <ResetButton onClick={resetFilters}>
                  <img src={filterResetIcon} alt="Reset" />
                </ResetButton>
              </ContainerHeader>
              <HorizionLine />
              <Region onRegionChange={(regions) => setRegion(regions)} selectedRegions={region} />
              <HorizionLine />
              <MultiRangeSlider min={0} max={1000000} value={{ min: priceRange.min, max: priceRange.max }} onChange={(range) => setPriceRange(range)} />
              <HorizionLine />
              <DatePick onDateChange={(dates) => setDateRange(dates)} selectedDates={dateRange} />
              <HorizionLine />
              <SearchButton onClick={applyFilters}>적용하기</SearchButton>
            </Container>
          </ModalContent>
        </>
      )}
    </>
  )
}

export default Filter
