/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

enum Links {
  'api_platform' = 'https://platform-ephemeral.sensedia-eng.com/api-manager/',
  'events_hub' = 'https://platform-ephemeral.sensedia-eng.com/events-hub',
  'mesh_services' = 'https://br.sensedia.com/microservices-and-service-mesh',
  'flexible_actions' = 'https://platform-ephemeral.sensedia-eng.com/flex-actions',
  'access_control' = 'https://platform-ephemeral.sensedia-eng.com/access-control',
  'online_help' = 'https://docs.sensedia.com/en/analytics-guide/Latest/index.html',
  'redirect_guide' = 'https://docs.sensedia.com/en/analytics-guide/Latest/index.html',
  'redirect_zendesk' = 'https://sensedia.zendesk.com/hc/en-us',
}

type LINKS = keyof typeof Links;

export const redirectTo = (param: LINKS) => {
  return window.open(Links[param]);
};

export const pathAccountSettings = () => {
  const link = document.createElement('a');
  link.href = `https://platform-sbox-staging.sensedia-eng.com/access-control/account-settings`;
  link.target = '_blank';
  link.click();
  return link.href;
};
