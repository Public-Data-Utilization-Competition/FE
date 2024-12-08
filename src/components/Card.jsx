import React from 'react'
import styled from 'styled-components'
import Label from './Label'
import LinkButton from './LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 528px;
  min-height: 80px;
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
  align-items: center;
  max-width: 75px;
  max-height: 75px
  background-color: #f4f4f4;
  border-radius: 8px;
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
  font-size: 13px;
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
  margin: 0px;
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
          <span className="price">{price || '가격 미정'}</span> <FontAwesomeIcon icon={faUser} style={{ margin: "0 1px 0 5px", height: "13px" }} />
          {Number(capacity) > 0 ? `${capacity}명` : '마감'} | {target == '공백' ? ' ' : target}
        </SubInfo>
      </ContentWrapper>

      {/* 오른쪽: 신청 버튼 */}
      <LinkButton text="신청링크" url={link} />
    </CardWrapper>
  )
}

export default Card
