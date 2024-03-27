import styled from 'styled-components';
import { EuiFieldText, EuiSelect, EuiBadge } from '@elastic/eui';

export const Container = styled.div``;

export const InputEl = styled(EuiFieldText)`
  border: none;
  box-shadow: none;
  border-bottom: 1px solid #c4c4c4;
  background-color: transparent;
  font-style: normal;
  letter-spacing: 0em;
  text-align: left;
  width: 100%;
  max-width: 100%;
  padding: 0;
  &:focus,
  &:active {
    outline: none !important;
    box-shadow: none !important;
    border: none;
    background-color: transparent;
    border-bottom: 1px solid #c4c4c4 !important;
    background-image: none !important;
    animation: none !important;
    transition: none !important;
  }
  .euiFormControlLayoutClearButton {
    display: none !important;
  }

  &::placeholder {
    font-style: italic;
    color: #808080;
    padding-left: 8px;
    background-color: transparent;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 70%;
  align-items: center;
  gap: 5px;
  input {
    margin-right: 24px;
  }

  @media screen and (max-width: 768px) {
    width: 99%;
    flex-wrap: wrap;
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
  margin-left: 10px;
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

export const Btn = styled.button`
  border-radius: 100px;
  border: 1px solid #837ff6;
  color: #837ff6;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 24px;
  box-shadow: none;
  outline: none !important;
  margin-left: 10px;
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

    background-color: #c4c4c4;
    color: #fff;
    border: none;
    pointer-events: none;
  }
  a {
    color: #fff;
  }
`;

export const EuiSelectMod = styled(EuiSelect)`
  width: 95%;
  margin: 0 5%;
  cursor: pointer;

  box-shadow: 0 1px 1px -1px rgba(196, 196, 196, 0.2), 0 3px 0px -2px rgb(196 196 196);

  &.euiSelect {
    background-color: transparent;
    :focus {
      background-image: none;
      box-shadow: 0 1px #c4c4c4;
    }
  }

  @media screen and (max-width: 768px) {
    margin: 2px;
    width: 100%;
  }
`;

export const ModalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  width: 720px;
  margin-top: 20px;
  .euiFormControlLayout {
    max-width: 100%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  label {
    width: 232px;
    height: 16px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 130%;
    color: #2c2c2c;
    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  .euiSelect {
    :nth-child(1)#severity_text {
      font-size: 0.875;
      font-style: normal;
      font-weight: 400;
      color: #2c2c2c;
    }
  }

  label {
    width: 180px;
    height: 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 130%;
    color: #2c2c2c;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  @media screen and (max-width: 768px) {
    width: auto !important;
    margin: 0 !important;
    gap: 0;
  }
`;
export const PickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;

  .preset-time-title {
    color: #2c2c2c;
    font-size: 12px;
    padding-left: 10px;
  }

  .euiFormControlLayout--group {
    box-shadow: 0 1px #c4c4c4;
    background-color: transparent !important;

    .euiDatePickerRange {
      background-color: transparent;
    }

    &.euiFormControlLayout {
      height: 43px;
    }

    :focus {
      background-image: none;
      box-shadow: 0 1px #c4c4c4;
    }

    .euiButtonEmpty {
      border-right: none;
    }

    .euiButtonEmpty--primary {
      color: #837ff6;
    }

    .euiSuperDatePicker__prettyFormatLink {
      color: #837ff6;
    }
  }

  label {
    width: 150px;
    height: 16px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 130%;
    color: #2c2c2c;
    flex: none;
    order: 0;
    flex-grow: 0;
  }

  @media screen and (max-width: 768px) {
    width: 30% !important;
    padding-left: 10px;
  }
`;

export const BoxBadger = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
  max-width: 720px;
  flex-wrap: wrap;
`;

export const Badge = styled(EuiBadge)`
  border-radius: 15px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #2c2c2c;
  span.euiBadge__text {
    display: flex;
    align-items: center;
  }
`;

export const ErrorMessage = styled.div`
  margin: 8px 0;
  p {
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
  }
`;
