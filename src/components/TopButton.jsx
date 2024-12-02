import React from "react";
import styled from "styled-components";

const Button = styled.button`
  position: fixed;
  bottom: 16px;
  right: 16px;
  background-color: white;
  color: black;
  border: 1px solid #CCCCCC;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 2px 3px 4px #CCCCCC;
`;

const TopButton = ({ onClick }) => (
  <Button onClick={onClick}>↑</Button>
);

export default TopButton;
