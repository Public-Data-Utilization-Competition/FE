import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const FilterSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
`;

const RegionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RegionButton = styled.button`
  margin-right: 10px;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: ${({ selected }) => (selected ? '#DBD8FF' : '#F2F2F7')};
  color: ${({ selected }) => (selected ? '#3E3691' : '#6F6F6F')};
  cursor: pointer;
`;

const PriceSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PriceLabels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ApplyButton = styled.button`
  width: 100%;
  margin: 20px;
  background: #3E3691;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
`;

const Modal = () => {
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const regions = ['서울', '인천', '경기도', '강원특별자치도', '총청북도', '총청남도', '부산', '대구', '경상북도', '경상남도'];

  const toggleRegion = (region) => {
    setSelectedRegions((prevSelectedRegions) =>
      prevSelectedRegions.includes(region)
        ? prevSelectedRegions.filter((r) => r !== region)
        : [...prevSelectedRegions, region]
    );
  };

  const applyFilters = () => {
    // Logic to handle applying the selected filters
    console.log('Selected Regions:', selectedRegions);
    console.log('Price Range:', priceRange);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
  };

  return (
    <ModalContainer>
      <FilterSection>
        <SectionTitle>지역</SectionTitle>
        <RegionContainer>
          {regions.map((region) => (
            <RegionButton
              key={region}
              selected={selectedRegions.includes(region)}
              onClick={() => toggleRegion(region)}
            >
              {region}
            </RegionButton>
          ))}
        </RegionContainer>
      </FilterSection>

      <FilterSection>
        <SectionTitle>가격</SectionTitle>
        <PriceSlider>
          <input
            type="range"
            min="0"
            max="1000000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max="1000000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
          <PriceLabels>
            <span>최저금액 {priceRange[0]} 원</span>
            <span>최고금액 {priceRange[1]} 원</span>
          </PriceLabels>
        </PriceSlider>
      </FilterSection>

      <FilterSection>
        <SectionTitle>수강일</SectionTitle>
        <DateContainer>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="시작일"
          />
          <span> ~ </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="종료일"
          />
        </DateContainer>
      </FilterSection>

      <ApplyButton onClick={applyFilters}>적용하기</ApplyButton>
    </ModalContainer>
  );
};

export default Modal;

