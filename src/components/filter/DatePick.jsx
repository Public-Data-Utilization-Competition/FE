import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'

const Container = styled.div`
  padding: 10px;
  width: 600px;
  gap: 10px; /* Title과 DatePicker 간 간격 */
  z-index: 10;
`

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`

const DatePickerRow = styled.div`
  display: flex;
  width: 560px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`

const Text = styled.span`
  font-size: 16px;
  color: #333;
`

const DateInput = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  input {
    text-align: center;
    width: 120px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
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
    onDateChange({ startDate: date, endDate }) // 부모 컴포넌트에 업데이트
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
    onDateChange({ startDate, endDate: date }) // 부모 컴포넌트에 업데이트
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
