/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';

export const Nav = styled.nav`
  background-color: #f9f9f9;
  border-radius: 16px 0 0 0;
  top: 0px;
  padding: 20px 40px 20px 0px;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const BreadCrumb = styled.div`
  margin-left: 40px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-top: 10px;
  font-style: normal;
  font-weight: 700 !important;
  font-size: 0.875rem;
  color: #6d63db;
  text-transform: uppercase;
  text-decoration: none;

  nav {
    margin-right: 0;
    margin-left: 0;
  }
  a {
    font-weight: 700 !important;
  }
  span {
    font-style: normal;
    font-weight: 700 !important;
    font-size: 0.875rem;
    color: #6d63db;
    text-transform: uppercase;
  }
  .euiLink.euiLink--subdued {
    text-decoration: none;
  }
  .euiBreadcrumb--last {
    font-style: normal;
    font-weight: 500;
    font-size: 1rem;
    color: #837ff6;
    list-style: none;
    text-decoration: none;

    &:hover {
      color: #837ff6;
      cursor: default;
      background: none !important;
      text-decoration: none;
      cursor: pointer;
    }
  }

  .euiBreadcrumbs.euiHeaderBreadcrumbs.euiBreadcrumbs--truncate {
    .euiBreadcrumbSeparator {
      transform: translateY(-2px) rotate(270deg);
      width: 0;
      height: 0;
      border-left: 4px solid rgb(249, 249, 249);
      border-right: 4px solid rgb(249, 249, 249);
      border-color: rgb(249, 249, 249);
      border-top: 4px solid #808080;
      margin-left: 10px;
      margin-right: 15px;
      border-top-right-radius: 2px;
      border-top-left-radius: 2px;
    }
  }
`;

export const InfoMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: inherit;
  gap: 40px;
  padding-right: 50px;
  border-right: 1px solid #e2e2e2;
  padding-top: 4px;
`;

export const UserMenu = styled.button`
  padding-top: 10px;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 0.85rem;
  color: #6a6a6a;
  font-weight: 550;
  overflow-wrap: break-word;
  word-break: break-word;
  padding: 8px;
  margin-left: 30px;
  margin-right: 30px;
  width: max-content;
  transition: all 0.3s;

  &:hover {
    border-radius: 28px;
    background: rgb(224, 224, 224);
    padding: 8px;
    margin-left: 30px;
    margin-right: 30px;
    min-width: auto;
    transition: all 0.3s;
  }
`;

export const DropdownMenu = styled.nav`
  background: #ffffff;
  border-radius: 8px;
  position: absolute;
  top: 60px;
  right: 180px;
  width: 300px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-25px, 0);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 11.5em;
    margin-top: -36px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
  }

  &.active {
    opacity: 1;
    visibility: visible;
    transform: translate(-25px, 0);
    padding: 30px;
  }

  ul {
    display: grid;
    grid-gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const UserName = styled.span`
  font-size: 1rem;
  color: rgb(48, 48, 48);
  font-weight: 900;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  word-break: break-word;
`;

export const UserEmail = styled.span`
  font-size: 0.9rem;
  color: rgb(184, 184, 184);
  font-weight: normal;
  text-align: center;
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
  word-break: break-word;
`;

export const AccountSettings = styled.button`
  padding-top: 10px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 42px;
  padding: 0px 24px;
  min-width: 100px;
  border-radius: 22px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: break-word;
  background-color: transparent;
  color: #837ff6;
  transition: all 300ms ease 0s;
  border: 1px solid #837ff6;

  &:hover {
    background: #dfdefc;
  }
`;

export const UserLogout = styled.button`
  color: #837ff6;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 42px;
  padding: 0px 24px;
  min-width: 100px;
  border-radius: 22px;
  text-transform: uppercase;
  font-family: Roboto, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: break-word;
  background-color: transparent;
  transition: all 300ms ease 0s;

  &:hover {
    background: #dfdefc;
  }
`;

export const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
`;

export const SpaceLeft = styled.div`
  margin-left: 8px;
`;

export const SpaceRight = styled.div`
  margin-right: 8px;
`;
