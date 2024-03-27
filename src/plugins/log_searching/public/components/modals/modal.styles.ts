import { EuiModal, EuiOverlayMask } from '@elastic/eui';
import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ModalBlock = styled(EuiModal)`
  border-radius: 16px !important;
  border: none !important;

  button {
    :nth-child(1) {
      svg {
        display: none;
      }
    }
  }
`;

export const ModalOverlay = styled(EuiOverlayMask)`
  background: rgba(0, 0, 0, 0.53);
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #303742;
`;

export const ModalTitle = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #808080;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-style: normal;
  font-weight: 400;
  font-size: 1rem;
  color: #303030;

  p:nth-of-type(2) {
    padding-top: 16px;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 0 0;
  text-align: right;
`;

export const Button = styled.button`
  color: #ffffff;
  background-color: #837ff6;
  border-radius: 100px;
  transition: 0.3s;
  width: 115px;
  padding: 10px 24px;
  :hover {
    opacity: 0.8;
    transition: 0.3s;
  }
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
