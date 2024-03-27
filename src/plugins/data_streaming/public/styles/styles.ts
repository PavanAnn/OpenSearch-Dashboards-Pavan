import styled from 'styled-components';
import { EuiButtonIcon, EuiSwitch } from '@elastic/eui';

export const BtnDataStreaming = styled.button`
  border-radius: 100px;
  background-color: #837ff6;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  padding: 10px 24px;
  border: none;
  transition: 0.3s;

  a {
    text-decoration: none;
    color: #ffffff;
  }

  &:hover {
    transition: 0.3s;
    list-style: none;
    text-decoration: none;
    background-color: #a3a1ee;
  }
  &:disabled {
    cursor: not-allowed;

    background-color:#c4c4c4 ;
    color: #fff;
    border: none;
    pointer-events: none;
  }
`;

export const ModeButton = styled(EuiButtonIcon)`
  &.euiButtonIcon--primary {
    border: 1px solid #837ff6;
    border-radius: 50%;
    padding: 10px;

    &:hover {
      list-style: none;
      text-decoration: none;
      background-color: #dfdefc;
    }
  }
`;

export const ContainerStreaming = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 16px;
`;

export const Cards = styled.div`
  min-width: 300px;
  border: 1px solid #808080;
  border-radius: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
  background-color: white;
  border: 1px solid #eeeeee;
  transition: all 300ms ease 0s;
  align-content: flex-start;
  height: 410px;

  &:hover {
    border-color: #837ff6;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.18);
  }

  svg {
    cursor: pointer;
  }
`;

export const CardsTitle = styled.div`
  color: #2c2c2c;
  font-size: 16px;
  line-height: 17px;
  font-weight: 500;
`;

export const CardsSwitch = styled(EuiSwitch)`
  margin: auto 0px;

  .euiSwitch__body {
    background-color: #837ff6;
    width: 34px !important;
  }

  .euiSwitch__button[aria-checked='true'] .euiSwitch__thumb {
    left: 19px !important;
  }
`;

export const StatusDiv = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;

  font-size: 14px;
  text-transform: uppercase;

  height: 26px;
  width: ${({ active }) => (active ? `82px` : `97px`)};
  border-radius: 100px;
  margin-left: 16px;

  background: ${({ active }) => (active ? `#a2f5b6` : `#ffdadb`)};
  color: ${({ active }) => (active ? `#107b3b` : `#d70026`)};
`;

export const StatusContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const CardsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 32px;
  flex-flow: row wrap;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const DetailTitle = styled.div`
  color: #808080;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  justify-content: center;
  align-self: center;
  line-height: 15.6px;
`;

export const DetailInfo = styled.div`
  color: #808080;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 24px;
  /* width: 50%; */
  line-height: 20px;
`;

export const EditDeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 24px;
`;

export const WrapperTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 5px;
`;

export const FilterContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 32px;
  flex-flow: row wrap;
  background-color: #fff;
  height: 100px;
  justify-content: center;
  border-radius: 15px;
  border: 1px #eeeeee solid;
`;

export const NoResult = styled.p`
  color: #808080;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.5px;
  justify-content: center;
  align-self: center;
  line-height: 15.6px;
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
export const Button = styled.button`
  color: #ffffff;
  background-color: #837ff6;
  border-radius: 100px;
  transition: 0.3s;

  padding: 10px 24px;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;
