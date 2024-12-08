import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import LinkButton from './LinkButton'
import avartarIcon from '../images/avatar.png'

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: flex-end;
  max-width: 528px;
  max-height: 80px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #cccccc;
  margin-bottom: 16px;
  background-color: #fff;
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80px;
  max-height: 80px
  align-items: center;
  background-color: #f4f4f4;
`

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 328px;
  margin: 0 16px 0 20px;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
`

const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
`

const SubInfo = styled.p`
  font-size: 14px;
  // font-weight: 700;
  // color: #555;
  margin: 0;

  span.price {
    font-weight: bold; /* price 부분만 볼드체 */
  }
`
const Time = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOverflow',
})`
  font-size: ${(props) => (props.isOverflow ? '11px' : '13px')};
  color: #555;
  margin: 0 0 4px 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Location = styled.p`
  font-size: 13px;
  color: #777;
  margin: 0 0 4px 0;
  word-wrap: break-word; /* 긴 단어를 줄 바꿈 */
  line-height: 1; /* 줄 간격 */
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0; /* 크기 줄어들지 않음 */
  width: 100px; /* 고정 너비 설정 */
`

const Card = ({ logo, title, time, location, tag, price, capacity, link, target }) => {
  const isTimeOverflow = time.length > 15 // 글자 길이가 15 이상인 경우 overflow로 간주

  return (
    <CardWrapper>
      {/* 왼쪽: 이미지 */}
      <ImageWrapper>
        <Image src={logo || '/default-logo.png'} alt="logo" />
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
          <span className="price">{price || '가격 미정'}</span> <img src={avartarIcon} style={{ margin: '0px 2.5px' }} />
          {Number(capacity) > 0 ? `${capacity}명` : '마감'} | {target == '공백' ? ' ' : target}
        </SubInfo>
      </ContentWrapper>

      {/* 오른쪽: 신청 버튼 */}
      <Footer>{link ? <LinkButton text="신청 링크" url={link} /> : <span>링크 없음</span>}</Footer>
    </CardWrapper>
  )
}

export default Card
