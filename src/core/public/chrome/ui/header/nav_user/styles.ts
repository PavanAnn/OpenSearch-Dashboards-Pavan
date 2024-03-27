/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';

export const HelpOption = styled.li`
  color: rgb(48, 48, 48);
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  overflow: hidden;
  width: 100%;
  cursor: pointer;
  word-break: break-word;
  transition: 0.3s;

  &:hover {
    background-color: #837ff6;
    transition: 0.3s;
    &:first-child {
      border-radius: 8px 8px 0 0;
    }
    &:last-child {
      border-radius: 0 0 8px 8px;
    }
  }
`;

export const DropdownMenuOption = styled.nav`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  width: auto;
  opacity: 0;
  visibility: hidden;
  transform: translate(-85px, 0);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 5.5em;
    margin-top: -6px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const DropdownMenuApps = styled.nav`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  width: auto;
  opacity: 0;
  visibility: hidden;
  transform: translate(-335px, 0);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 1;
  padding: 25px;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 21em;
    margin-top: -31px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
  }

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

export const ContainerApps = styled.div`
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  flex-flow: row nowrap;
  padding: 0;
  width: 325px;
`;

export const RowApps = styled.div`
  display: flex;
  -webkit-box-pack: start;
  justify-content: start;
  flex-wrap: wrap;
  text-align: center;
  gap: 10px;
`;

export const TitleApp = styled.span`
  letter-spacing: 0px;
  font-size: 0.8rem;
  margin-top: 10px;
  width: max-content;
  font-weight: 400;
  color: rgb(123, 123, 123);
`;

export const UserMenuOption = styled.button``;

export const UserMenuApps = styled.button``;

export const RedirectApp = styled.div`
  width: 98px;
  height: 72px;
  margin: 10px 0px;
  border-radius: 4px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: rgba(171, 186, 214, 0.4);
  }
`;
