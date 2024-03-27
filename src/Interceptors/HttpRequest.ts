/* eslint-disable @osd/eslint/require-license-header */
import axios from 'axios';
import jwt from 'jwt-decode';

import { URL_SIGNIN, URL_TOKEN } from '../core/public';

const getUser = () => {
  const idToken = getCookie('id_token');
  if (idToken) {
    try {
      const jwtDecoded: any = jwt(idToken);
      const userObj: any = {
        name: jwtDecoded.name,
        email: jwtDecoded.email,
        username: jwtDecoded['cognito:username'],
        language: jwtDecoded['custom:language'],
        lastLogin: jwtDecoded['custom:lastLogin'],
        tenantAlias: jwtDecoded['custom:tenantAlias'],
        tenantId: jwtDecoded['custom:tenantId'],
        lastPasswordChange: jwtDecoded['custom:lastPasswordChange'],
        userProfile: jwtDecoded['custom:userProfile'],
        isLegacy: false,
      };

      return userObj;
    } catch (error) {
      return new Error('Invalid cookie');
    }
  }
};

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts[1].split(';')[0];
  return '';
};

export const deleteAllCookies = () => {
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    const urlAlias = window.location.hostname
      .split('.')
      .splice(window.location.hostname.split('.').length - 2)
      .join('.');
    document.cookie = `${name}=;domain=${urlAlias};path=/;max-age=0`;
    const redirect = URL_SIGNIN;
    if (urlAlias !== 'localhost') window.location.href = redirect;
  });
};

export const setCookie = (name: string, value: string, domain: string) => {
  document.cookie = `${name}=${value}; path=/; domain=${domain}`;
};

export const getTenantAlias = () => {
  try {
    const idToken: any = jwt(getCookie('id_token'));
    if (!!idToken['custom:tenantAlias']) {
      return idToken['custom:tenantAlias'];
    }
    return '';
  } catch (e) {
    return '';
  }
};

export function getUrl() {
  if (getCookie('id_token')) {
    if (window.location.hostname.includes('staging') || window.location.hostname.includes('stg')) {
      return 'https://internal-apis.platform-sbox-staging.sensedia-eng.com/';
    } else if (window.location.hostname.includes('sbox')) {
      return 'https://sbox-internal-services-analytics.sensedia-eng.com/';
    } else if (
      window.location.hostname.includes('prd') ||
      window.location.hostname.includes('production')
    ) {
      return 'https://internal-apis.platform-production.sensedia.com/';
    }
    return 'https://internal-apis.platform-sbox-testing.sensedia-eng.com/';
  } else {
    return `${window.location.origin}/`;
  }
}

export const resolveSignInUrl = (tenantAlias: string) => {
  const { origin } = window.location;
  if (!tenantAlias) return origin.replace(`https://`, `https://signin.`);
  return origin.replace(`https://`, `https://${tenantAlias}.signin.`);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getClientId = (id_token: string, access_token: string) => {
  const idToken: any = jwt(id_token);
  const accessToken: any = jwt(access_token);

  if (!!accessToken.client_id) {
    return accessToken.client_id;
  }
  if (!!idToken.aud) {
    return idToken.aud;
  }
  return '';
};

export function getEnvironment() {
  if (window.location.hostname.includes('staging')) {
    return 'staging';
  } else if (window.location.hostname.includes('testing')) {
    return 'testing';
  } else if (window.location.hostname.includes('tst')) {
    return 'tst';
  } else if (window.location.hostname.includes('stg')) {
    return 'stg';
  } else if (window.location.hostname.includes('sbox')) {
    return 'sbox';
  } else if (window.location.hostname.includes('prd')) {
    return 'prd';
  }
  return 'tst';
}

export const currentUser = getUser();

// const tenant_id = await getTenant();
export const Axios = axios.create({
  baseURL: getUrl(),
  headers: getCookie('id_token')
    ? {
        tenantId: currentUser.tenantId,
        Authorization: ('Bearer ' + getCookie('id_token')) as string,
        'Content-Type': 'application/json',
      }
    : {
        'Sensedia-Auth': localStorage.getItem('ls.Sensedia-Auth')
          ? (localStorage.getItem('ls.Sensedia-Auth') as string)
          : '',
        'xsrf-token': localStorage.getItem('ls.xsrf-token')
          ? (localStorage.getItem('ls.xsrf-token') as string)
          : '',
        userLogin: JSON.parse(localStorage.getItem('ls.user') as string)!.login
          ? JSON.parse(localStorage.getItem('ls.user') as string)!.login
          : '',
      },
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401, 402].includes(error.response.status)) {
      if (getCookie('id_token')) {
        const idToken = await refreshToken(error);
        const { headers, ...config } = error.config;

        return axios.request({
          ...config,
          headers: {
            ...headers,
            Authorization: `Bearer ${idToken}`,
          },
        });
      } else {
        window.location.href = window.location.origin + '/api-manager/login.html#/login';
      }
    }
    return error;
  }
);

export async function refreshToken(err: any) {
  const params = new URLSearchParams();
  const tenantAlias = getTenantAlias();

  const urlAlias = window.location.hostname
    .split('.')
    .splice(window.location.hostname.split('.').length - 2)
    .join('.');

  const config = {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      tenantAlias,
    },
  };
  return new Promise((resolve, reject) => {
    try {
      const idToken = getCookie('id_token');

      const accessToken = getCookie('access_token');
      // eslint-disable-next-line no-shadow
      const refreshToken = getCookie('refresh_token');
      params.append('grant_type', 'refresh_token');
      params.append('client_id', getClientId(idToken, accessToken));
      params.append('refresh_token', refreshToken);

      axios
        .post(URL_TOKEN, params, config)
        .then(({ data }) => {
          Object.keys(data).forEach((key) => {
            const arr = data;
            setCookie(key, arr[key], urlAlias);
          });

          return resolve(data.id_token);
        })
        .catch(() => {
          return reject(err);
        });
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      urlAlias !== 'localhost' && deleteAllCookies();
      return reject(e);
    }
  });
}

// eslint-disable-next-line import/no-default-export
export default Axios;
