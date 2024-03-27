/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';

export const AppLoader = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: #303030 !important;

  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 400ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 400ms ease-in;
  }
`;

export const BoxIcon = styled.div`
  height: 100%;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  & svg {
    width: 45px;
    height: 45px;
    margin: 20px;
    position: absolute;
    fill: #fff;
  }

  & i {
    position: absolute;

    & svg {
      width: 45px;
      height: 45px;
      margin: 20px;
      position: static;
      fill: #fff;
    }
  }

  .loadingBar {
    width: 150px;
    height: 150px;
    margin: 20px;
    display: inline-block;
  }
`;
