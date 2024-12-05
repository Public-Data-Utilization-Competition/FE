import React, { useCallback, useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

// Styled Components
const Container = styled.div`
  padding: 10px;
  height: 51px;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 10px;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px; /* 슬라이더와 간격 */
`

const SliderWrapper = styled.div`
  position: relative;
  width: 534px;
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  &::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }

  &.thumb--zindex-3 {
    z-index: 3;
  }

  &.thumb--zindex-4 {
    z-index: 4;
  }

  &.thumb--zindex-5 {
    z-index: 5;
  }
`

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(null)
  const maxValRef = useRef(null)
  const range = useRef(null)

  // Convert to percentage
  const getPercent = useCallback((value) => Math.round(((value - min) / (max - min)) * 100), [min, max])

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal)
      const maxPercent = getPercent(+maxValRef.current.value)

      if (range.current) {
        range.current.style.left = `${minPercent}%`
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [minVal, getPercent])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value)
      const maxPercent = getPercent(maxVal)

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [maxVal, getPercent])

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal })
  }, [minVal, maxVal, onChange])

  return (
    <Container>
      <Title>가격</Title>
      <SliderWrapper>
        <ThumbInput
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1)
            setMinVal(value)
            event.target.value = value.toString()
          }}
          className={minVal > max - 100 ? 'thumb--zindex-5' : 'thumb--zindex-3'}
        />
        <ThumbInput
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1)
            setMaxVal(value)
            event.target.value = value.toString()
          }}
          className="thumb--zindex-4"
        />
        <SliderTrack />
        <SliderRange ref={range} />
        <LeftValue>최저금액 {minVal}원</LeftValue>
        <RightValue>최고금액 {maxVal}원</RightValue>
      </SliderWrapper>
    </Container>
  )
}

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default MultiRangeSlider
