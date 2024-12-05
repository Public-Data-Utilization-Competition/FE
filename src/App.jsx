import { useEffect, useState } from 'react'
import React from 'react'
import styled from 'styled-components'
import Card from './components/Card'
import TopButton from './components/TopButton'
import SearchBar from './components/SearchBar'
import axios from 'axios'
import Filter from './components/Filter'

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
  const [cardsData, setCardsData] = useState([])

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

      // const allResults = response.data.flatMap((item) => item.results)

      const formattedData = response.data.results.map((item) => ({
        logo: item.logo,
        title: item.progrm_nm,
        time: `${item.days_display} ${item.time_range} ${item.progrm_begin_de} - ${item.progrm_end_de}`,
        tag: item.category_name,
        price: `${item.progrm_prc.toLocaleString()}원`,
        capacity: item.progrm_rcrit_nmpr_co > 0 ? `${item.progrm_rcrit_nmpr_co}명` : '마감',
        location: `${item.region} ${item.facility_name}`,
        link: item.hmpg_url,
      }))

      setCardsData(formattedData) // Update state with formatted data
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <AppWrapper>
      <Header>한번에 찾는 전국 체육시설 스포츠강좌 리스트</Header>
      <Filter />
      <SearchBar />
      {cardsData.map((data, index) => (
        <Card key={index} logo={data.logo} title={data.title} time={data.time} tag={data.tag} price={data.price} capacity={data.capacity} location={data.location} link={data.link} />
      ))}
      <TopButton onClick={handleScrollToTop} />
    </AppWrapper>
  )
}

export default App
