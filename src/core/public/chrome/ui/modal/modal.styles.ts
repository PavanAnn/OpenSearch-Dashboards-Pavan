/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';

export const ModalBlock = styled.div`
  align-items: center;
  bottom: 0;
  justify-content: center;
  left: 0;
  overflow: hidden;
  padding: 0.4rem;
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  opacity: 1;
  z-index: 9999;
`;

export const ModalOverlay = styled.a`
  background: rgba(0, 0, 0, 0.55);
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

export const ModalClose = styled.a`
  display: flex;
  justify-content: flex-end;
  padding: 0.8em 0 0;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: #837ff6;
`;

export const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  padding: 0 0.8rem;
  width: 100%;
  transition: all 0.2s;
  z-index: 1;
  border: 1px solid #837ff6;
  box-shadow: rgb(0 0 0 / 25%) 0px 4px 14px;
  margin-bottom: 30rem;
`;
