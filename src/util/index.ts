/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import Axios, { getCookie, getEnvironment } from '../Interceptors/HttpRequest';
// @ts-ignore
import { UrlPolicies } from './policies';

export function getUrl() {
  if (window.location.hostname.includes('staging') || window.location.hostname.includes('stg')) {
    return 'https://internal-apis.platform-sbox-staging.sensedia-eng.com/';
  } else if (window.location.hostname.includes('prd')) {
    return 'https://internal-apis.platform-production.sensedia.com/';
  } else if (window.location.hostname.includes('sbox')) {
    return 'https://sbox-internal-services-analytics.sensedia-eng.com/';
  }

  return 'https://internal-apis.platform-sbox-testing.sensedia-eng.com/';
}

export const getUrlPolicies = () => {
  if (window.location.hostname.includes('staging') || window.location.hostname.includes('stg')) {
    return 'https://internal-apis.platform-sbox-staging.sensedia-eng.com/user-management/v1/account-settings/permissions?productName=Analytics';
  } else if (window.location.hostname.includes('sbox')) {
    return 'https://sbox-internal-services-analytics.sensedia-eng.com/user-management/v1/account-settings/permissions?productName=Analytics';
  } else if (
    window.location.hostname.includes('prd') ||
    window.location.hostname.includes('production')
  ) {
    return 'https://platform-production.sensedia.com/user-management/v1/account-settings/permissions?productName=Analytics';
  }
  return 'https://internal-apis.platform-sbox-testing.sensedia-eng.com/user-management/v1/account-settings/permissions?productName=Analytics';
};

export const checkPolicies = async (key: string) => {
  switch (key) {
    case 'analytics.general-traces.view':
      return 'discover';
    case 'analytics.data-streaming.view':
      return 'data-streaming';
    case 'analytics.logs.view':
      return 'logSearching';
    default:
      return '';
  }
};

export const loadPermission = async () => {
  if (
    window.location.hostname.includes('sandbox') ||
    window.location.hostname.includes('sbox') ||
    localStorage.getItem('ls.Sensedia-Auth')
  ) {
    return [
      'home',
      'management',
      'visualize',
      'dashboards',
      'traces',
      'discover',
      'data-streaming',
      'login',
      'logSearching',
      'management/opensearch-dashboards/objects',
    ];
  }

  if (!getCookie('id_token')) {
    window.location.href = `https://${getEnvironment()}.signin.platform-${getEnvironment()}.sensedia-eng.com/login`;
  }

  const response = await Axios.get(getUrlPolicies());
  const policy: UrlPolicies[] = [
    'home',
    'management',
    'visualize',
    'dashboards',
    'traces',
    'login',
    'logSearching',
    'management/opensearch-dashboards/objects',
  ];
  let tmp: any = '';
  response.data.forEach(async (value: string) => {
    tmp = await checkPolicies(value);
    if (tmp) policy.push(tmp);
  });

  return policy;
};
