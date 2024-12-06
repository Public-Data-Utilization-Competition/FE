import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Filter from './components/Filter'
import Card from './components/Card'
import Pagination from './components/Pagination'
import axios from 'axios'
import SearchBar from './components/SearchBar'

const AppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 16px;
`

const Header = styled.h1`
  font-size: 18px;
  color: #fff;
  background-color: #3e3691;
  font-weight: bold;
  text-align: center;
  height: 57px;
  margin: 0;
  line-height: 57px;
  vertical-align: middle;
`

const App = () => {
  const [allData, setAllData] = useState([]) // 전체 데이터
  const [filteredData, setFilteredData] = useState([]) // 필터링된 데이터
  const [sortOption, setSortOption] = useState('default') // 정렬 옵션
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const itemsPerPage = 10 // 페이지당 아이템 수

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
    setFilteredData(allResults) // 기본값: 전체 데이터를 필터링 데이터로 설정
  }

  // Filter data based on search input
  const handleSearch = (searchText) => {
    const lowerCaseSearchText = searchText.toLowerCase() // 대소문자 무시
    const searchedData = allData.filter(
      (item) =>
        item.progrm_nm.toLowerCase().includes(lowerCaseSearchText) || // 프로그램 이름
        item.category_name.toLowerCase().includes(lowerCaseSearchText) || // 카테고리 이름
        item.facility_name.toLowerCase().includes(lowerCaseSearchText) || // 시설 이름
        item.region.toLowerCase().includes(lowerCaseSearchText), // 시설 이름
    )
    setFilteredData(searchedData)
    setCurrentPage(1) // 검색 후 페이지 초기화
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
      <Header>한번에 찾는 전국 체육시설 스포츠강좌 리스트</Header>
      <Filter sortOption={sortOption} setSortOption={setSortOption} onFilterApply={(filters) => handleFilterApply(filters)} />
      <SearchBar onSearch={handleSearch} /> {/* 검색 기능 추가 */}
      {getPaginatedData().map((item, index) => (
        <Card
          key={index}
          logo={item.region_image}
          title={item.progrm_nm}
          time={`${item.days_display} | ${item.time_range} | ${`${item.progrm_begin_de}~${item.progrm_end_de}`}`}
          tag={item.category_name}
          price={`${item.progrm_prc.toLocaleString()}원`}
          capacity={item.progrm_rcrit_nmpr_co > 0 ? `${item.progrm_rcrit_nmpr_co}` : '마감'}
          location={`${item.region}| ${item.facility_name}(${item.facility_address})`}
          link={item.hmpg_url}
          target={item.progrm_trget_nm}
        />
      ))}
      <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / itemsPerPage)} onPageChange={handlePageChange} />
    </AppWrapper>
  )
}

export default App
