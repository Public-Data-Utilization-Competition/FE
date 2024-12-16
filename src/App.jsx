import React, { useState, useEffect, Suspense } from 'react'
import styled from 'styled-components'
import Filter from './components/Filter'
import Pagination from './components/Pagination'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import mainIcon from './images/main_logo.png'

// Card 컴포넌트를 React.lazy로 동적 임포트
const Card = React.lazy(() => import('./components/Card'))

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
    padding: 0 8px;
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
  loading: lazy;

  @media (max-width: ${breakpoints.mobile}) {
    height: 18px;
    margin-right: 4px;
  }
`

// 스켈레톤 UI 스타일
const SkeletonCard = styled.div`
  height: 80px;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 16px;
`

const App = () => {
  const [allData, setAllData] = useState([]) // 전체 데이터
  const [filteredData, setFilteredData] = useState([]) // 최종 필터링된 데이터
  const [searchData, setSearchData] = useState([]) // 검색된 데이터
  const [sortOption, setSortOption] = useState('default') // 정렬 옵션
  const [currentPage, setCurrentPage] = useState(1) // 현재 페이지
  const [totalPages, setTotalPages] = useState(1) // 전체 페이지 수
  const [loading, setLoading] = useState(false) // 로딩 상태
  const [resetFilterUI, setResetFilterUI] = useState(null) // 필터 리셋 함수
  const itemsPerPage = 10 // 페이지당 아이템 수
  const cache = {} // 페이지별 데이터 캐싱 객체

  // Fetch data for the current page
  const fetchPageData = async (page) => {
    if (cache[page]) {
      setAllData(cache[page])
      setFilteredData(cache[page])
      setSearchData(cache[page])
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(`https://dev.hufsthon.site/api/programs/?page=${page}`)
      const results = response.data.results
      cache[page] = results
      setAllData(results)
      setFilteredData(results)
      setSearchData(results)
      setTotalPages(Math.ceil(response.data.count / itemsPerPage))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
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

  // Search functionality
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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
    fetchPageData(page)
  }

  useEffect(() => {
    fetchPageData(1) // 초기 렌더링 시 1페이지 데이터만 불러옴
  }, [])

  return (
    <AppWrapper>
      <Header>
        <HeaderImage src={mainIcon} alt="main" />
        한번에 찾는 전국 체육시설 스포츠강좌 리스트
      </Header>
      <SearchBar onSearch={handleSearch} resetFilterUI={resetFilterUI} />
      <Filter sortOption={sortOption} setSortOption={setSortOption} onFilterApply={handleFilterApply} setResetFilterUI={setResetFilterUI} />

      <Suspense fallback={<SkeletonCard />}>
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
          : filteredData.map((item) => (
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
      </Suspense>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </AppWrapper>
  )
}

export default App
