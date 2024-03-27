import styled from 'styled-components';
import { EuiFieldSearch } from '@elastic/eui';

export const Container = styled.div``;

export const InputEl = styled(EuiFieldSearch)`
  border: none;
  box-shadow: none;
  border-bottom: 1px solid #c4c4c4;
  background-color: #f9f9f9;

  font-family: 'Roboto';
  font-size: 18px !important;
  font-style: italic;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
    border: none;
    background-color: #f9f9f9;
    border-bottom: 1px solid #c4c4c4 !important;
    background-image: none !important;
    animation: none !important;
    transition: none !important;
  }
  .euiFormControlLayoutClearButton {
    display: none !important;
  }

  &::placeholder {
    font-size: 18px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  input {
    margin-right: 24px;
  }
`;

export const BtnOutline = styled.button`
  border-radius: 100px;
  border: 1px solid #837ff6;
  color: #837ff6;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 24px;
  box-shadow: none;
  outline: none !important;
  margin-left: 24px;
  &:hover {
    list-style: none;
    text-decoration: none;
    background-color: transparent;
  }

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const BtnEmpty = styled.button`
  border-radius: 100px;
  background-color: transparent;
  color: #837ff6;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 24px;
  border: none;
  box-shadow: none !important;
  outline: none !important;
  &:hover {
    list-style: none;
    text-decoration: none;
    box-shadow: none;
    background-color: transparent;
  }
  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;

export const BtnDataStreaming = styled.button`
  border-radius: 100px;
  border: 1px solid #837ff6;
  background-color: #837ff6;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 0px;
  width: 212px;
  box-shadow: none;
  outline: none !important;
  margin-left: 24px;
  &:hover {
    list-style: none;
    text-decoration: none;
  }

  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
  }
  &:disabled {
    cursor: not-allowed;

    background-color:#c4c4c4 ;
    color: #fff;
    border: none;
    pointer-events: none;
  }
  a{
    color: #fff;
   }
`;
