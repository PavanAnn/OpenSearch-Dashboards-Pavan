/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled, { css } from 'styled-components';

interface Sidebar extends React.HtmlHTMLAttributes<HTMLDivElement> {
  open: boolean;
}

export const Indicator = styled.div`
  position: absolute;
  width: 4px;
  height: 0;
  opacity: 0;
  background-color: #9290e2;
  border-radius: 0px 3px 3px 0px;
  transition: all 200ms ease-out;
`;

export const DivIndicator = styled.li`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  &:hover {
    ${Indicator} {
      opacity: 1;
      height: 31px;
    }
  }
`;

export const SideBorder = styled.div`
  z-index: 10000;
  margin-left: 180px;
  position: fixed;
  top: 0px !important;
  width: 20px;
  height: 100vh;
  background-color: #f9f9f9;
  border-radius: 16px 0 0 16px;
`;

export const ContainerSidebar = styled.div<Sidebar>`
  z-index: 10000;
  background-color: rgb(48, 48, 48);
  padding-right: 20px;
  top: 0;
  left: 0;
  position: fixed;
  width: 200px;
  height: 101vh;
  transition: all 0.5s ease-in-out;
  overflow-x: auto;
  min-height: 100%;
`;

export const Text = styled.span`
  margin-left: 20px;
`;

export const LinkItemStyle = styled.li<{ open?: boolean }>`
  width: 100%;
  position: relative;
  list-style: none;

  .euiListGroupItem-isActive {
    border-left: 3px solid #6d63db;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 15px 0 15px 0;
    color: #ffffff;
    line-height: 1.2;
    font-weight: 500;
    font-size: 13px;
    transition: all 0.2s ease-in-out;
    letter-spacing: 1px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: none;
      ${Indicator} {
        opacity: 1;
        height: 20px;
      }
    }

    & svg {
      width: 20px;
      position: absolute;
      right: 5px;
      fill: #9290e2;
    }

    &.dropdown {
      &::after {
        content: '';
        border: solid #9290e2;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        margin-right: 10px;
        margin-top: ${({ open }) => (open ? `3px` : `-3px`)};
        transform: ${({ open }) => (open ? css`rotate(-135deg)` : css`rotate(45deg)`)};
        transition: transform 200ms ease;
      }
    }

    &.active {
      background: rgba(0, 0, 0, 0.4);

      ${Indicator} {
        opacity: 1;
        height: 35px;
      }
    }

    &.dropdown-active {
      background: rgba(0, 0, 0, 0.4);
    }

    &.dropdown-open {
      background: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const DropdownLinkStyle = styled.li<{ open?: boolean }>`
  width: 100%;
  position: relative;
  list-style: none;

  .euiListGroupItem-isActive {
    border-left: 3px solid #6d63db;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 15px 0 15px 0;
    color: #ffffff;
    line-height: 1.2;
    font-weight: 500;
    font-size: 13px;
    transition: all 0.2s ease-in-out;
    letter-spacing: 1px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
      text-decoration: none;
      ${Indicator} {
        opacity: 1;
        height: 20px;
      }
    }

    &.dropdown {
      &::after {
        content: '';
        border: solid #9290e2;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        margin-right: 10px;
        margin-top: ${({ open }) => (open ? `3px` : `-3px`)};
        transform: ${({ open }) => (open ? css`rotate(-135deg)` : css`rotate(45deg)`)};
        transition: transform 200ms ease;
      }
    }

    &.active {
      background: rgba(0, 0, 0, 0.4);

      ${Indicator} {
        opacity: 0;
        height: 35px;
      }
    }

    &.dropdown-active {
      background: rgba(0, 0, 0, 0.4);
    }

    &.dropdown-open {
      background: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const DropdownContainer = styled.ul<{ open: boolean }>`
  background: rgba(0, 0, 0, 0.15);
  display: ${({ open }) => (open ? 'block' : 'none')};

  a {
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.25);
      ${Indicator} {
        opacity: 1;
        height: 20px;
      }
    }

    &.active {
      background: #302c2c;
      text-decoration: none;
      ${Indicator} {
        opacity: 1;
        height: 35px;
      }
    }
  }
`;

export const CollapseButton = styled.div`
  position: fixed;
  margin-left: 130px;
  z-index: 4;
`;
