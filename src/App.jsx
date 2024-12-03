import { useEffect, useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import Card from './components/Card'
import TopButton from './components/TopButton'
import SearchBar from './components/SearchBar'
import GlobalStyle from './GlobalStyle'
import axios from 'axios'

const AppWrapper = styled.div`
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

// //temporary 더미 데이터
// const cardsData = [
//   {
//     logo: 'https://via.placeholder.com/60', // 로고 이미지 URL
//     title: '09시/A(진도)_상급-12개월차(영법교정)',
//     time: '월, 수, 금  09:00-09:50  2024.10.01 - 2024.10.31',
//     location: '광주시문화스포츠센터 (경기도 광주시 회안대로 891)', // 위치 정보 추가
//     tag: '수영',
//     price: '41,000',
//     capacity: '20',
//     link: '#',
//   },
// ]

const App = () => {
  // API Response 저장할 상태
  const [cardsData, setCardsData] = useState([])

  // useEffect로 처음 렌더링시 API GET
  useEffect(() => {
    getData()
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function getData() {
    try {
      const response = await axios.get('https://df3074a6-9b72-4d06-bb69-6b8e152d5bb4.mock.pstmn.io/api/programs')
      console.log(response.data)
      // const results = response.data.results
      const allResults = response.data.flatMap((item) => item.results)

      const formattedData = allResults.map((item) => ({
        title: item.progrm_nm,
        time: `${item.days_display} ${item.time_range} ${item.progrm_begin_de} - ${item.progrm_end_de}`,
        tag: item.category_name,
        price: `${item.progrm_prc.toLocaleString()}원`,
        capacity: item.progrm_rcrit_nmpr_co > 0 ? `${item.progrm_rcrit_nmpr_co}명` : '마감',
        location: `${item.region} ${item.facility_name}`,
        link: item.hmpg_url,
      }))
      setCardsData(formattedData) // 상태 업데이트
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppWrapper>
      <Header>한번에 찾는 전국 체육시설 스포츠강좌 리스트</Header>
      <SearchBar />
      {cardsData.map((data, index) => (
        <Card key={index} title={data.title} time={data.time} tag={data.tag} price={data.price} capacity={data.capacity} location={data.location} link={data.link} />
      ))}
      <TopButton onClick={handleScrollToTop} />
    </AppWrapper>
  )
}

export default App
