import React, { useState, useRef, useCallback, useEffect } from 'react'
import styled from 'styled-components'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const Container = styled.div`
  padding: 10px;
  height: 51px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`

const SliderWrapper = styled.div`
  position: relative;
  width: 534px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  height: 5px;
  background-color: #ced4da;
  border-radius: 3px;
  z-index: 1;
`

const SliderRange = styled.div`
  position: absolute;
  height: 5px;
  background-color: #3e3691;
  border-radius: 3px;
  z-index: 2;
`

const SliderValue = styled.div`
  position: absolute;
  font-size: 12px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 10px;
    margin-top: 16px;
  }
`

const LeftValue = styled(SliderValue)`
  left: 6px;
`

const RightValue = styled(SliderValue)`
  right: -4px;
`

const ThumbInput = styled.input.attrs({ type: 'range' })`
  pointer-events: none;
  position: absolute;
  width: 534px;
  height: 0;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  z-index: 9;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #3e3691;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;

    @media (max-width: ${breakpoints.mobile}) {
      height: 14px;
      width: 14px;
    }
  }
`

const MultiRangeSlider = ({ min, max, value, onChange }) => {
  const [minVal, setMinVal] = useState(value.min)
  const [maxVal, setMaxVal] = useState(value.max)
  const range = useRef(null)

  // Convert to percentage
  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max])

  // Update slider range dynamically
  useEffect(() => {
    if (range.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(maxVal)
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, maxVal, getPercent])

  // Sync with external value changes
  useEffect(() => {
    setMinVal(value.min)
    setMaxVal(value.max)
  }, [value])

  // Handle min value change
  const handleMinChange = (event) => {
    const newValue = Math.min(+event.target.value, maxVal - 1)
    setMinVal(newValue)
    onChange({ min: newValue, max: maxVal })
  }

  // Handle max value change
  const handleMaxChange = (event) => {
    const newValue = Math.max(+event.target.value, minVal + 1)
    setMaxVal(newValue)
    onChange({ min: minVal, max: newValue })
  }

  return (
    <Container>
      <Title>가격</Title>
      <SliderWrapper>
        <ThumbInput min={min} max={max} value={minVal} onChange={handleMinChange} />
        <ThumbInput min={min} max={max} value={maxVal} onChange={handleMaxChange} />
        <SliderTrack />
        <SliderRange ref={range} />
        <LeftValue>최저금액 {minVal.toLocaleString('ko-KR')}원</LeftValue>
        <RightValue>최고금액 {maxVal.toLocaleString('ko-KR')}원</RightValue>
      </SliderWrapper>
    </Container>
  )
}

export default MultiRangeSlider
