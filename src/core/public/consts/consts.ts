/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export function getUrl() {
  const urlMap: Record<string, string> = {
    dev: 'https://platform-sbox-testing.sensedia-eng.com/',
    stg: 'https://platform-sbox-staging.sensedia-eng.com/',
    prd: 'https://platform-production.sensedia.com/',
  };

  for (const key in urlMap) {
    if (window.location.href.includes(key)) {
      return urlMap[key];
    }
  }

  return 'https://platform-sbox-testing.sensedia-eng.com/';
}

export function getUrlSign() {
  const urlMap: Record<string, string> = {
    dev: 'https://analytics-sbox-tst.signin.platform-sbox-testing.sensedia-eng.com/login',
    stg: 'https://analytics-sbox-stg.signin.platform-sbox-staging.sensedia-eng.com/login',
    prd: 'https://sensedia.signin.platform-production.sensedia.com/login',
    sbox: 'https://sbox-analytics-ac-mock.sensedia-eng.com/',
  };

  for (const key in urlMap) {
    if (window.location.href.includes(key)) {
      return urlMap[key];
    }
  }

  return 'https://analytics-sbox-tst.signin.platform-sbox-testing.sensedia-eng.com/login';
}

export function getUrlToken() {
  const urlMap: Record<string, string> = {
    dev: 'https://analytics-sbox-tst.signin.platform-sbox-testing.sensedia-eng.com/oauth2/token',
    stg: 'https://analytics-sbox-stg.signin.platform-sbox-staging.sensedia-eng.com/oauth2/token',
    prd: 'https://sensedia.signin.platform-production.sensedia.com/oauth2/token',
    sbox: 'https://sbox-internal-services-analytics.sensedia-eng.com/oauth2/token',
  };

  for (const key in urlMap) {
    if (window.location.href.includes(key)) {
      return urlMap[key];
    }
  }

  return 'https://analytics-sbox-tst.signin.platform-sbox-testing.sensedia-eng.com/oauth2/token';
}

export function getTagConfig() {
  if (window.location.href.includes('sensedia.com')) {
    return {
      gtmId: 'GTM-5MNQXCD',
      auth: 'lHl3f8J_DA6Auld9tEaXOg',
      preview: 'env-1',
    };
  } else if (window.location.href.includes('sbox') || window.location.href.includes('sandbox')) {
    return {
      gtmId: 'GTM-5MNQXCD',
      auth: 'vCyl6eNCMdhnX_DY59CMVg',
      preview: 'env-8',
    };
  } else {
    return {
      gtmId: '',
      auth: '',
      preview: '',
    };
  }
}

export const URL_REDIRECT = getUrl() as string;

export const URL_SIGNIN = getUrlSign() as string;

export const URL_TOKEN = getUrlToken() as string;

export const tagConfig = getTagConfig();
