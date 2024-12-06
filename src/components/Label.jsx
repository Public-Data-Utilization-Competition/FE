import React from 'react'
import styled from 'styled-components'

const LabelWrapper = styled.span`
  background-color: #fff;
  font-size: 12px;
  margin-left: 6px;
  padding: 2px 6px;
  border: 1px solid #cccccc;
  border-radius: 12px;
  // font-weight: bold;
  // height: 18px;
`

const Label = ({ children }) => <LabelWrapper>{children}</LabelWrapper>

export default Label
