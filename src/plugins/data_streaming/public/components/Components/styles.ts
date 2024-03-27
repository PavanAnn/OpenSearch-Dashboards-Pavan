/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled, { css } from 'styled-components';

export const FieldsetContainer = styled.div<{
  error: boolean;
  disabled?: boolean;
}>`
  border: none;
  border-bottom: 1px solid #71716f;
  border-bottom-style: ${({ disabled }) => (disabled ? 'dashed' : 'solid')};
  background: transparent;
  border-radius: 4px 4px 0px 0px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.875rem;
  margin-top: 0px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  label {
    position: absolute;
    pointer-events: none;
    color: #71716f;
    transition: bottom 300ms ease-in-out;
    bottom: 10px;
    left: 8px;
    animation: wait 500ms ease;

    span {
      color: #f44336;
    }
  }

  @keyframes wait {
    0% {
      opacity: 0;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & input:focus ~ label {
    color: ${({ error }) => (error ? '#f44336' : '#837ff6')};
  }

  &:focus-within {
    transition: bottom 300ms ease-in-out;
    border-bottom: 1px solid ${({ error }) => (error ? '#f44336' : '#837ff6')};
  }
  ${({ disabled }) =>
    disabled &&
    css`
      & input,
      & label,
      ${Prepend},${Append} {
        opacity: 0.5;
      }
    `}
`;

export const Fieldset = styled.fieldset`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  flex: 1;
  border: none;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  height: 38px;
  color: #a9a9a9;
  font-size: 1rem;
  padding: 4px 8px;

  &:not([value='']) ~ label {
    bottom: 36px;
    left: 8px;
    font-size: 0.75rem;
  }

  &:focus ~ label {
    bottom: 36px;
    font-size: 0.75rem;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const TextHelper = styled.div`
  padding: 0 8px;
  height: 0;
  font-size: '0.875rem';
  word-break: break-all;
  position: absolute;
  bottom: -6px;
  width: 100%;
  display: flow-root;
  align-items: center;

  .error {
    flex: 1;
    position: relative;
    color: ${({ theme }) => '#f44336'};
    word-break: break-word;
    justify-self: flex-start;
  }

  .help {
    flex: 1;
    position: relative;
    color: #71716f;
    word-break: break-word;
    justify-self: flex-start;
  }

  .character-count {
    position: relative;
    font-size: 0.75rem;
    line-height: 14px;
    letter-spacing: 0.9px;
    transition: all 300ms ease;
    opacity: 1;
    float: right;
    word-break: break-word;
    align-self: center;
  }
`;

const Pend = styled.div`
  display: flex;
  padding: 0 8px;
  height: 24px;
  align-items: center;
  color: #71716f;
  * {
    display: flex;
    align-items: center;
  }
`;
export const Prepend = styled(Pend)`
  border-right: 1px solid #c0c0c0;
`;

export const Append = styled(Pend)`
  border-left: 1px solid #c0c0c0;
`;
