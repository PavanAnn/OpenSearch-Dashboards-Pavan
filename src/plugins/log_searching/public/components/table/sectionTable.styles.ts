import styled from 'styled-components';

export const SectionTable = styled.div`
  margin-top: 24px;
  padding: 0px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #eeeeee;

  .euiTableHeaderCell {
    border-bottom: 1px solid #eeeeee;
  }

  .euiTableRowCell {
    border-top: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
  }

  .euiTableCellContent {
    margin-bottom: 5px;
    .euiTableCellContent__text {
      color: #808080;
    }
  }

  .euiFlexGroup--gutterLarge {
    margin: 0;
  }
`;

export const HeaderLog = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px;

  .close-button-modal {
    display: flex;
    justify-content: flex-end;
    width: auto;
    margin-bottom: auto;
    color: #2d2d2d;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    .close-button-modal {
      margin-top: 40px;
      margin-right: 130px;
    }
  }

  .data-log {
    font-weight: 550;
    font-size: 0.875rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: #808080;
  }
  b {
    font-style: normal;
    font-weight: 400;
    color: #808080;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 11px;
  max-width: 90%;
  align-items: center;

  .eui-custom-badge {
    border-radius: 8px;
    margin: 4px;
    border-radius: 8px;
    padding: 4px 8px;
  }

  .custom-text-badge {
    color: #ffffff;
    font-style: normal;
    font-weight: 550;
    font-size: 0.75rem;
    text-align: center;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
`;

export const ModalContent = styled.div`
  width: 760px;
`;

export const ContainerFilterListing = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 5px;
  padding: 15px;

  .button-clear {
    color: #837ff6;
    font-weight: 500;

    &.euiButtonEmpty .euiButtonEmpty__content {
      margin: 0 24px 0 0 !important;
    }
  }

  .close-icon {
    margin-left: 5px;
    margin-top: 3px;
    padding: 4px;
    cursor: pointer;
  }

  .tag-badge {
    width: 100px !important;
  }
`;

export const BlockRightFilter = styled.div`
  float: right;
  flex-grow: 1;
  position: absolute;
  right: 10px;
  top: 9px;
`;

export const BlockLeftFilter = styled.div`
  .no-filters {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: #808080;
  }
  width: 90%;
  float: left;
`;
