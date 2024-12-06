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
        console.log(response.data)
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

  // Filter data based on filter options
  const handleFilterApply = (filters) => {
    let data = [...allData]
    if (filters.sido) data = data.filter((item) => filters.sido.includes(item.region))
    if (filters.min_price) data = data.filter((item) => item.progrm_prc >= filters.min_price)
    if (filters.max_price) data = data.filter((item) => item.progrm_prc <= filters.max_price)
    if (filters.progrm_begin_de) data = data.filter((item) => new Date(item.progrm_begin_de) >= new Date(filters.progrm_begin_de))
    if (filters.progrm_end_de) data = data.filter((item) => new Date(item.progrm_end_de) <= new Date(filters.progrm_end_de))
    setFilteredData(data)
    setCurrentPage(1) // 필터링 후 페이지 초기화
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
      <Filter sortOption={sortOption} setSortOption={setSortOption} onFilterApply={handleFilterApply} />
      <SearchBar />
      {getPaginatedData().map((item, index) => (
        <Card
          key={index}
          logo={item.region_image}
          title={item.progrm_nm}
          time={`${item.days_display} ${item.time_range}`}
          tag={item.category_name}
          price={`${item.progrm_prc.toLocaleString()}원`}
          capacity={item.progrm_rcrit_nmpr_co > 0 ? `${item.progrm_rcrit_nmpr_co}` : '마감'}
          location={`${item.facility_name}(${item.facility_address})`}
          days={item.days_display}
          link={item.hmpg_url}
        />
      ))}
      <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / itemsPerPage)} onPageChange={handlePageChange} />
    </AppWrapper>
  )
}

export default App
