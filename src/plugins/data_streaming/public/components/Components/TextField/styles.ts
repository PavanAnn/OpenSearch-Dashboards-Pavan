/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';
import {
  FieldsetContainer as FieldsetContainerBase,
  Fieldset as FieldsetBase,
  Input as InputBase,
} from '../styles';

export const FieldsetContainer = styled(FieldsetContainerBase)``;

export const Input = styled(InputBase)`
  width: 100%;
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  &[type='number']:hover::-webkit-inner-spin-button,
  &[type='number']:hover::-webkit-outer-spin-button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
`;

export const Fieldset = styled(FieldsetBase)`
  display: flex;
`;

const NumberButtonBase = styled.button`
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 8px;
  height: 38px;
  cursor: pointer;
  background: #c0c0c0;
  transition: background-color 300ms ease;

  &:hover {
    background: #c0c0c0;
  }
`;
export const Increase = styled(NumberButtonBase)`
  border-radius: 0 4px 0 0;
`;

export const Decrease = styled(NumberButtonBase)`
  border-radius: 4px 0 0 0;
`;
