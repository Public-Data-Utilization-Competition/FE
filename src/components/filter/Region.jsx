import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  box-sizing: border-box;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼이 많아지면 줄바꿈 처리 */
  gap: 10px; /* 버튼 간 간격 추가 */
`

const RegionCard = styled.button`
  height: 30px;
  padding: 0 10px;
  color: ${(props) => (props.$active ? '#000000' : '#6F6F6F')};
  border: 1px black solid;
  border-radius: 6px;
  background-color: ${(props) => (props.$active ? '#DBD8FF' : '#F2F2F7')};
  white-space: nowrap;
  transition: all 0.3s ease;
  width: fit-content;
`

const regions = ['서울특별시', '인천', '경기도', '강원도', '충청북도', '충청남도', '부산', '대구', '경상북도', '경상남도']

export const Region = ({ onRegionChange }) => {
  const [activeRegions, setActiveRegions] = useState([]) // 활성화된 버튼 상태 (다중 선택)

  const onClick = (region) => {
    const updatedRegions = activeRegions.includes(region)
      ? activeRegions.filter((item) => item !== region) // 선택 해제
      : [...activeRegions, region] // 선택 추가
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
