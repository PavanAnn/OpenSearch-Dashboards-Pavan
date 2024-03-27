import { EuiFieldText, EuiFormRow, EuiSelect } from '@elastic/eui';
import styled from 'styled-components';

export const ContainerDelivery = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 55%;
  margin: auto;
  position: relative;
  top: 30px;
  border: 1px solid #eeeeee;
  @media (max-width: 768px) {
    width: 80%;
    /* left: 13%; */
  }

  svg {
    cursor: pointer;
  }
`;

export const Content = styled.div`
  margin: 0 40px 60px;
  padding: 3em 0 0 0;
  gap: 30px;
`;

export const Label = styled(EuiFormRow)`
  label {
    font-style: normal;
    font-size: 0.75rem;
    line-height: 130%;
    color: #2c2c2c;
  }

  > :first-child {
    display: flex;
    justify-content: flex-start !important;
    align-items: center !important;
    margin-bottom: 0.5em !important;
    margin-left: 0.7em !important;
  }

  strong {
    margin-left: 5px;
    color: #ff0000;
  }

  svg {
    margin-left: 10px;
  }
`;

export const LabelDisabled = styled(EuiFormRow)`
  label {
    color: #b0b0b0 !important;
  }

  strong {
    margin-left: 5px;
    color: #ff0000;
  }
`;

export const TextField = styled(EuiFieldText)`
  background-color: #ffffff;
  box-shadow: 0 1px #c4c4c4;

  &:disabled {
    background-color: #ffffff;
    box-shadow: 0 1px #c4c4c4;
  }

  &:focus {
    background-image: linear-gradient(
      to top,
      #837ff6,
      #837ff6 2px,
      transparent 2px,
      transparent 100%
    );
    box-shadow: 0 1px #c4c4c4;
  }
`;

export const Select = styled(EuiSelect)`
  box-shadow: 0 1px #c4c4c4;
  background-color: #ffffff;
  font-style: italic;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: #808080;

  option {
    font-style: normal;
    color: #303030;
    font-weight: 500;
    font-size: 0.875rem;
  }

  &:focus {
    background-image: linear-gradient(
      to top,
      #837ff6,
      #837ff6 2px,
      transparent 2px,
      transparent 100%
    );
    box-shadow: 0 1px #c4c4c4;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff0000;
  font-style: normal;
  font-size: 12px;
  font-weight: 300;
  margin: 7px 12px 0;
`;

export const BtnCancel = styled.button`
  color: #837ff6;
  width: 110px;
  padding: 15px;
  transition: 0.3s;
  margin-right: 15px;
  :hover {
    transition: 0.3s;
    background-color: #fafafa;
    color: #837ff6;
    border-radius: 100px;
  }
`;

export const BtnSave = styled.button`
  color: #ffffff;
  background-color: #837ff6;
  border-radius: 100px;
  transition: 0.3s;
  width: 110px;
  padding: 10px 24px;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;

export const BtnSaveInactive = styled.button`
  color: #ffffff;
  background-color: #c4c4c4;
  border-radius: 100px;
  transition: 0.3s;
  width: 110px;
  padding: 10px 24px;
`;

export const BottomSubmit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
`;

export const CardStatus = styled.div`
  display: flex;
  justify-content: flex-end;
  border: 1px solid #eeeeee;
  border-radius: 8px;
  padding: 20px;
`;

export const BadgeStatusInactive = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100px;
  background: #eeeeee;
  padding: 4px 16px;
  font-style: normal;
  width: 97px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  color: #b0b0b0;
  text-transform: uppercase;
`;

export const BadgeStatusActive = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 100px;
  background: #ffdadb;
  padding: 4px 16px;
  font-style: normal;
  width: 97px;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  color: #d70026;
  text-transform: uppercase;
`;
