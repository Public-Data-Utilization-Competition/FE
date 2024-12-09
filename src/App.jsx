import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Filter from './components/Filter'
import Card from './components/Card'
import Pagination from './components/Pagination'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import mainIcon from './images/main_logo.png'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

// AppWrapper 스타일
const AppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 14px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 8px; // 모바일에서 패딩을 줄임
  }
`

// Header 스타일
const Header = styled.h1`
  font-size: 16px;
  color: #fff;
  background-color: #3e3691;
  font-weight: bold;
  text-align: center;
  height: 57px;
  margin: 0;
  line-height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
    height: 50px;
    line-height: 50px;
  }
`

// HeaderImage 스타일
const HeaderImage = styled.img`
  height: 22px;
  margin-right: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    height: 18px; // 모바일에서 이미지 크기를 줄임
    margin-right: 4px;
  }
`

const App = () => {
  const [allData, setAllData] = useState([]) // 전체 데이터
  const [searchData, setSearchData] = useState([]) // 검색된 데이터
  const [filteredData, setFilteredData] = useState([]) // 최종 필터링된 데이터
  const [sortOption, setSortOption] = useState('default') // 정렬 옵션
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const itemsPerPage = 10 // 페이지당 아이템 수
  const [resetFilterUI, setResetFilterUI] = useState(null)

  // Fetch all data
  const fetchAllData = async () => {
    let allResults = []
    let page = 1
    let hasNextPage = true

    while (hasNextPage) {
      try {
        const response = await axios.get(`https://dev.hufsthon.site/api/programs/?page=${page}`)
        allResults = [...allResults, ...response.data.results]
        hasNextPage = !!response.data.next
        page += 1
      } catch (error) {
        console.error('Error fetching data:', error)
        hasNextPage = false
      }
    }
    setAllData(allResults)
    setSearchData(allResults) // 검색 데이터 초기화
    setFilteredData(allResults) // 필터링 데이터 초기화
  }

  // Filter data based on filter options
  const handleFilterApply = (filters) => {
    let data = [...searchData]
    if (filters.sido) data = data.filter((item) => filters.sido.includes(item.region))
    if (filters.min_price) data = data.filter((item) => item.progrm_prc >= filters.min_price)
    if (filters.max_price) data = data.filter((item) => item.progrm_prc <= filters.max_price)
    if (filters.progrm_begin_de) data = data.filter((item) => new Date(item.progrm_begin_de) >= new Date(filters.progrm_begin_de))
    if (filters.progrm_end_de) data = data.filter((item) => new Date(item.progrm_end_de) <= new Date(filters.progrm_end_de))
    setFilteredData(data)
    setCurrentPage(1)
  }

  // Filter data based on search input
  const handleSearch = (searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase()
    const searchedData = allData.filter(
      (item) =>
        item.progrm_nm.toLowerCase().includes(lowerCaseSearchText) ||
        item.category_name.toLowerCase().includes(lowerCaseSearchText) ||
        item.facility_name.toLowerCase().includes(lowerCaseSearchText) ||
        item.region.toLowerCase().includes(lowerCaseSearchText),
    )
    setSearchData(searchedData)
    setFilteredData(searchedData)
    setCurrentPage(1)
  }

  // Sort data based on the selected sort option
  const getSortedData = () => {
    let sortedData = [...filteredData]
    switch (sortOption) {
      case 'price':
        sortedData.sort((a, b) => a.progrm_prc - b.progrm_prc)
        break
      case 'capacity':
        sortedData.sort((a, b) => b.progrm_rcrit_nmpr_co - a.progrm_rcrit_nmpr_co)
        break
      default:
        break
    }
    return sortedData
  }

  // Paginate data
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return getSortedData().slice(startIndex, endIndex)
  }

  const handlePageChange = (page) => setCurrentPage(page)

  useEffect(() => {
    fetchAllData()
  }, [])

  return (
    <AppWrapper>
      <Header>
        <HeaderImage src={mainIcon} alt="main" />
        한번에 찾는 전국 체육시설 스포츠강좌 리스트
      </Header>
      <SearchBar onSearch={handleSearch} resetFilterUI={resetFilterUI} />
      <Filter sortOption={sortOption} setSortOption={setSortOption} onFilterApply={handleFilterApply} setResetFilterUI={setResetFilterUI} />
      {getPaginatedData().map((item) => (
        <Card
          key={item.id}
          logo={item.region_image}
          title={item.progrm_nm}
          time={`${item.days_display} | ${item.time_range} | ${`${item.progrm_begin_de}~${item.progrm_end_de}`}`}
          tag={item.category_name}
          price={`${item.progrm_prc.toLocaleString()}원`}
          capacity={item.progrm_rcrit_nmpr_co > 0 ? `${item.progrm_rcrit_nmpr_co}` : '마감'}
          location={`${item.facility_name} (${item.facility_address})`}
          link={item.hmpg_url}
          target={item.progrm_trget_nm}
        />
      ))}
      <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / itemsPerPage)} onPageChange={handlePageChange} />
    </AppWrapper>
  )
}

export default App
