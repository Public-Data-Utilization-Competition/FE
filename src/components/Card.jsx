import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import LinkButton from './LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

// 브레이크포인트 설정
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 528px;
  min-height: 80px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #cccccc;
  margin-bottom: 16px;
  background-color: #fff;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 75px;
  max-height: 75px;
  background-color: #f4f4f4;
  border-radius: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 60px;
    max-height: 60px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 50px;
    max-height: 50px;
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 370px;
  margin-left: 8px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    margin-left: 0;
    margin-top: 12px;
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
`

const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

const SubInfo = styled.p`
  font-size: 14px;
  margin: 0;

  span.price {
    font-weight: bold;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

const Time = styled.p`
  font-size: 13px;
  color: #555;
  margin: 0 0 4px 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

const Location = styled.p`
  font-size: 13px;
  color: #777;
  margin: 0 0 4px 0;
  word-wrap: break-word;
  line-height: 1;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  flex-shrink: 0;
  width: 100px;

  @media (max-width: ${breakpoints.tablet}) {
    width: 100%;
    justify-content: flex-start;
    margin-top: 12px;
  }
`

const Card = ({ logo, title, time, location, tag, price, capacity, link, target }) => {
  const isTimeOverflow = time.length > 15

  return (
    <CardWrapper>
      {/* 왼쪽: 이미지 */}
      <ImageWrapper>
        <Image src={logo || '/default-logo.png'} alt="logo" loading="lazy" />
      </ImageWrapper>

      {/* 중간: 텍스트 정보 */}
      <ContentWrapper>
        <TitleWrapper>
          <Title>{title || '제목 없음'}</Title>
          <Label>{tag || '카테고리 없음'}</Label>
        </TitleWrapper>
        <Time isOverflow={isTimeOverflow}>{time || '시간 정보 없음'}</Time>
        <Location>{location || '위치 정보 없음'}</Location>
        <SubInfo>
          <span className="price">{price || '가격 미정'}</span> <FontAwesomeIcon icon={faUser} style={{ margin: '0 1px 0 5px', height: '13px' }} />
          {Number(capacity) > 0 ? `${capacity}명` : '마감'} | {target === '공백' ? ' ' : target}
        </SubInfo>
      </ContentWrapper>

      {/* 오른쪽: 신청 버튼 */}
      <Footer>
        <LinkButton text="신청링크" url={link} />
      </Footer>
    </CardWrapper>
  )
}

export default Card
