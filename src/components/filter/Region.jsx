import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const Container = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  box-sizing: border-box;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    padding: 8px;
  }
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: left;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼이 많아지면 줄바꿈 처리 */
  gap: 10px; /* 버튼 간 간격 추가 */

  @media (max-width: ${breakpoints.mobile}) {
    gap: 6px; /* 모바일에서 버튼 간 간격 줄임 */
  }
`

const RegionCard = styled.button`
  height: 30px;
  padding: 0 10px;
  color: ${(props) => (props.$active ? '#000000' : '#6F6F6F')};
  border: 1px solid black;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? '#DBD8FF' : '#F2F2F7')};
  white-space: nowrap;
  transition: all 0.3s ease;
  width: fit-content;
  font-size: 14px;

  &:hover {
    background-color: #e0d9ff;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 28px;
    padding: 0 8px;
    font-size: 12px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 26px;
    padding: 0 6px;
    font-size: 11px;
  }
`

const regions = ['서울특별시', '인천광역시', '경기도', '강원도', '충청북도', '충청남도', '부산광역시', '대구광역시', '경상북도', '경상남도']

export const Region = ({ onRegionChange, selectedRegions }) => {
  const [activeRegions, setActiveRegions] = useState(selectedRegions) // 활성화된 버튼 상태 (다중 선택)

  useEffect(() => {
    setActiveRegions(selectedRegions)
  }, [selectedRegions])

  const onClick = (region) => {
    const updatedRegions = activeRegions.includes(region)
      ? activeRegions.filter((item) => item !== region) // 선택 해제
      : [...activeRegions, region] // 선택 추가

    console.log('Updated Regions:', updatedRegions) // 디버깅용 로그
    setActiveRegions(updatedRegions)
    onRegionChange(updatedRegions) // 부모 컴포넌트로 상태 전달
  }

  return (
    <Container>
      <Title>지역</Title>
      <ButtonContainer>
        {regions.map((region) => (
          <RegionCard key={region} $active={activeRegions.includes(region)} onClick={() => onClick(region)}>
            {region}
          </RegionCard>
        ))}
      </ButtonContainer>
    </Container>
  )
}
