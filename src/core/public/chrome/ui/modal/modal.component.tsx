/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ModalHelp } from '../header/modal_product';
import { ModalBlock, ModalClose, ModalContainer, ModalOverlay } from './modal.styles';

export const Modal = ({ active, hideModal }: any) => {
  return (
    <>
      {active && (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()} />
          <ModalContainer>
            <ModalClose onClick={() => hideModal()}>X</ModalClose>
            <ModalHelp />
          </ModalContainer>
        </ModalBlock>
      )}
    </>
  );
};
