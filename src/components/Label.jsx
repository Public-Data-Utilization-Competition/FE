import React from "react";
import styled from "styled-components";

const LabelWrapper = styled.span`
  background-color: #fff;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px solid #CCCCCC;
  // font-weight: bold;
  height: 18px;
`;

const Label = ({ text }) => <LabelWrapper>{text}</LabelWrapper>;

export default Label;
