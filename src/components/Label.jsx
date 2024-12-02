import React from "react";
import styled from "styled-components";

const LabelWrapper = styled.span`
  background-color: #ffeb3b;
  color: #333;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
`;

const Label = ({ text }) => <LabelWrapper>{text}</LabelWrapper>;

export default Label;
