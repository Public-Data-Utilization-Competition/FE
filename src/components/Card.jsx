import React from "react";
import styled from "styled-components";
import Label from "./Label";
import LinkButton from "./LinkButton";

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
  box-shadow: 0 2px 8px #CCCCCC;
  margin-bottom: 16px;
  background-color: #fff;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 80px;
  max-height: 80px
  align-items: center;
  background-color: #f4f4f4;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 328px;
  margin: 0 16px 0 20px
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 4px 0;
`;

const SubInfo = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #555;
  margin: 0;
`;

const Time = styled.p`
  font-size: 13px;
  color: #555;
  margin: 0 0 4px 0;
`;

const Location = styled.p`
  font-size: 13px;
  color: #777;
  margin: 0 0 4px 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = ({ logo, title, time, location, tag, price, capacity, link }) => (
  <CardWrapper>
    {/* 왼쪽: 이미지 */}
    <ImageWrapper>
      <Image src={logo} alt="logo" />
    </ImageWrapper>

    {/* 중간: 텍스트 정보 */}
    <ContentWrapper>
      <Title>{title}</Title>
      <Time>{time}</Time>
      <Location>{location}</Location>
      <SubInfo>{price}원 | {capacity}명</SubInfo>
    </ContentWrapper>

    {/* 오른쪽: 신청 버튼 */}
    <Footer>
      <LinkButton text="신청 링크" url={link} />
    </Footer>
  </CardWrapper>
);

export default Card;
