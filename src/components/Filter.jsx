import React, { useState, useEffect } from 'react'
import MultiRangeSlider from './filter/Slider'
import { Region } from './filter/Region'
import { DatePick } from './filter/DatePick'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faRotateRight } from '@fortawesome/free-solid-svg-icons'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
  }
`

const ContainerHeader = styled.div`
  display: flex;
  align-items: center;
`

const Title = styled.h3`
  margin-left: 10px;
  font-size: 18px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

const HorizionLine = styled.div`
  width: 100%;
  border-bottom: 1px solid #f2f2f7;
  margin: 10px 0;
`

const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  padding: 0 16px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px;
    margin: 12px 0;
  }
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

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
    padding: 6px;
  }
`

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  color: #6f6f6f;
  background-color: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #5a4ebf;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
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
  left: 50%; /* 왼쪽 기준으로 50% 위치에 배치 */
  transform: translateX(-50%); /* 자기 자신 너비의 50%만큼 왼쪽으로 이동 */
  width: 100%;
  max-width: 600px;
  background-color: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px 8px 0 0;
  z-index: 10000;
  box-sizing: border-box; /* 패딩과 테두리를 포함한 너비 계산 */

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 12px 12px 0 0;
  }
`

const SearchButton = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 8px;
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

  @media (max-width: ${breakpoints.mobile}) {
    height: 48px;
    font-size: 12px;
  }
`

const Filter = ({ sortOption, setSortOption, onFilterApply, setResetFilterUI }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [region, setRegion] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })

  useEffect(() => {
    setResetFilterUI(() => resetUI)
  }, [setResetFilterUI])

  const resetUI = () => {
    setRegion([])
    setPriceRange({ min: 0, max: 1000000 })
    setDateRange({ startDate: null, endDate: null })
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
        <FilterButton onClick={() => setIsModalOpen(true)}>
          원하는 조건 결과만 필터링하기 <FontAwesomeIcon icon={faFilter} />
        </FilterButton>
      </FilterHeader>

      {isModalOpen && (
        <>
          <ModalOverlay onClick={() => setIsModalOpen(false)} />
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Container>
              <ContainerHeader>
                <Title>필터</Title>
                <ResetButton onClick={resetUI}>
                  <FontAwesomeIcon icon={faRotateRight} />
                </ResetButton>
              </ContainerHeader>
              <HorizionLine />
              <Region onRegionChange={(regions) => setRegion(regions)} selectedRegions={region} />
              <HorizionLine />
              <MultiRangeSlider min={0} max={1000000} value={priceRange} onChange={setPriceRange} />
              <HorizionLine />
              <DatePick onDateChange={setDateRange} selectedDates={dateRange} />
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
