/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { redirectTo } from '../enum_links/enum_links';
import {
  AboutSection,
  ButtonZendesk,
  IntroduceSection,
  LabelProduct,
  LinkGuide,
  NameProduct,
  PoweredByText,
  SectionDescription,
  TitleControl,
  TitleVersion,
} from './styles';
import { AnalyticsLogo } from '../assets/AnalyticsLogo';

const ModalHelp = () => {
  return (
    <>
      <AboutSection data-testid={'about-section'}>
        <IntroduceSection>
          <AnalyticsLogo />
          <TitleControl data-testid="title-analytics">{'ANALYTICS'}</TitleControl>
          <PoweredByText>{'Powered by Sensedia'}</PoweredByText>
        </IntroduceSection>
        <SectionDescription data-testid="description-product">
          <TitleVersion>{'About This Version'}</TitleVersion>
          <LinkGuide onClick={() => redirectTo('redirect_guide')}>
            {'Analytics - User Guide'}
          </LinkGuide>
          <LabelProduct>
            {'Name'}: <NameProduct>{'Analytics'}</NameProduct>
          </LabelProduct>
          <LabelProduct>
            {'version'}: <NameProduct>{'1.0.0'}</NameProduct>
          </LabelProduct>
          <LabelProduct>
            {'Sensedia:'} <NameProduct>{'0800 9413322'}</NameProduct>
          </LabelProduct>
          <ButtonZendesk onClick={() => redirectTo('redirect_zendesk')}>
            {'SENSEDIA ZENDESK'}
          </ButtonZendesk>
        </SectionDescription>
      </AboutSection>
    </>
  );
};

export { ModalHelp };
