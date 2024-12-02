import React from "react";
import styled from "styled-components";

const Button = styled.a`
  display: inline-block;
  color: black;
  text-align: center;
  padding: 11px 14px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  &:hover {
   background-color: #EEEEEE;
  }
`;

const LinkButton = ({ text, url }) => (
  <Button href={url} target="_blank" rel="noopener noreferrer">
    {text}
  </Button>
);

export default LinkButton;
