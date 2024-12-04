import React from 'react'
import MultiRangeSlider from './filter/Slider'
import { Region } from './filter/Region'
import { DatePick } from './filter/DatePick'
import styled from 'styled-components'

const Container = styled.div``

const Filter = () => {
  return (
    <Container>
      <Region />
      <MultiRangeSlider min={0} max={1000} onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)} />
      <DatePick />
    </Container>
  )
}

export default Filter
