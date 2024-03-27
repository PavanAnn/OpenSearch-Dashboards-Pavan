/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import styled from 'styled-components';

const IntroduceSection = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-flow: column nowrap;
  margin-right: 50px;
`;

const AboutSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 30px;
`;

const PoweredByText = styled.span`
  font-size: 13px;
  color: #7b7b7b;
  font-weight: normal;
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: center;
`;

const TitleControl = styled.span`
  color: #3d3d3d;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  font-weight: bold;
  justify-content: center;
  margin-top: 7px;
`;

const TitleVersion = styled.span`
  font-size: 1.45rem;
  color: #3d3d3d;
  font-weight: normal;
  text-align: center;
  text-transform: capitalize;
  width: 100%;
  overflow-wrap: break-word;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  justify-content: left;
  word-break: break-word;
`;

const LinkGuide = styled.a`
  font-weight: 400;
  line-height: 20px;
  color: #3689b3;
  font-size: 13px;
  text-transform: none;
  letter-spacing: 0.5px;
  cursor: pointer;
`;

const ButtonZendesk = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  height: 42px;
  padding: 0px 24px;
  min-width: 100px;
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  overflow-wrap: break-word;
  background-color: rgb(124, 179, 66);
  color: rgb(255, 255, 255);
  transition: all 300ms ease 0s;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }
`;

const LabelProduct = styled.div`
  display: flex;
  text-transform: capitalize;
  letter-spacing: normal;
  line-height: 20px;
  color: rgb(123, 123, 123);
  font-size: 0.8rem;
  font-weight: bold;
`;

const NameProduct = styled.p`
  font-weight: 400;
  line-height: 20px;
  color: rgb(123, 123, 123);
  font-size: 0.8rem;
  text-transform: none;
  margin-left: 10px;
`;

const SectionDescription = styled.div`
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  align-items: start;
  flex-flow: column nowrap;
  gap: 12px;
`;

const CloseModal = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  font-weight: bold;
  color: #6d63db;
  font-size: 1.25rem;
  -webkit-box-pack: flex-end;
  justify-content: flex-end;
  -webkit-box-align: center;
  flex-flow: row nowrap;
  margin: 0.6rem 0.6rem 0;
`;

export { CloseModal };

export {
  LabelProduct,
  SectionDescription,
  AboutSection,
  PoweredByText,
  TitleControl,
  TitleVersion,
  LinkGuide,
  ButtonZendesk,
  IntroduceSection,
  NameProduct,
};
