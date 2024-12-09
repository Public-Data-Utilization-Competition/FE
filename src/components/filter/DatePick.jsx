import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const Container = styled.div`
  padding: 10px;
  width: 580px;
  gap: 10px;
  z-index: 10;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
  }
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`

const Text = styled.span`
  font-size: 16px;
  color: #333;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`

const DatePickerRow = styled.div`
  display: flex;
  width: 550px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 10px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
    gap: 8px;
  }
`

const DateInput = styled.div`
  flex: 1; /* 각 입력 필드가 동일한 너비를 가짐 */
  max-width: 200px; /* 최대 너비를 설정 */

  .react-datepicker-wrapper {
    width: 100%;
  }

  input {
    text-align: center;
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    color: #333;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 12px;
      height: 28px;
    }
  }

  input::placeholder {
    color: #999;
  }
`

export const DatePick = ({ onDateChange, selectedDates }) => {
  const [startDate, setStartDate] = useState(selectedDates.startDate)
  const [endDate, setEndDate] = useState(selectedDates.endDate)

  useEffect(() => {
    setStartDate(selectedDates.startDate)
    setEndDate(selectedDates.endDate)
  }, [selectedDates])

  const handleStartDateChange = (date) => {
    setStartDate(date)
    onDateChange({ startDate: date, endDate })
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    onDateChange({ startDate, endDate: date })
  }

  return (
    <Container>
      <Title>수강일</Title>
      <DatePickerRow>
        <DateInput>
          <DatePicker selected={startDate} onChange={handleStartDateChange} dateFormat="yyyy-MM-dd" placeholderText="시작일" />
        </DateInput>
        <Text>~</Text>
        <DateInput>
          <DatePicker selected={endDate} onChange={handleEndDateChange} dateFormat="yyyy-MM-dd" placeholderText="마감일" />
        </DateInput>
      </DatePickerRow>
    </Container>
  )
}
