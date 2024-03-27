/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { AppLoader, BoxIcon } from './styles';

const Loading = () => {
  return (
    <AppLoader>
      <BoxIcon
        id="icon-load"
        style={{
          display: 'flex !important',
          justifyContent: 'center !important',
          alignItems: 'center !important',
        }}
      >
        <i style={{ position: 'absolute' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ width: '45px', height: '45px', marginTop: '3px' }}
          >
            <path
              fill="#FFF"
              fillRule="evenodd"
              d="M.023 12C-.167 8.077.737.185 5.867.005 12.28-.22 23.756 7.006 23.756 12c0 4.994-11.476 12.22-17.889 11.995C.737 23.815-.167 15.923.023 12zm7.355-8.646l12.991 8.86a.624.624 0 01-.703 1.031L6.654 4.371l.1.589a.624.624 0 11-1.23.208l-.34-2.012a.626.626 0 01-.01-.129c-.02-.314.202-.6.52-.653l2.038-.345a.624.624 0 11.208 1.23l-.562.095zm8.243 9.581v5.817c-.98.608-1.99 1.152-2.994 1.618V12.586h2.994v.35zM3.643 18.709v2.021c.64.925 1.406 1.364 2.29 1.395.225.008.46.004.705-.01V6.898H3.643V18.708zm7.486 2.3V9.519H8.135v12.39c.935-.19 1.949-.496 2.994-.901zm5.99-3.255c1.123-.805 2.112-1.652 2.899-2.487h-2.9v2.487z"
              clipRule="evenodd"
            />
          </svg>
        </i>
        <IconSVG />
      </BoxIcon>
    </AppLoader>
  );
};

const IconSVG = () => (
  <>
    <svg
      version="1.1"
      id="L3"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      className="loadingBar"
      style={{ width: '150px', height: '150px', margin: '20px', display: 'inline-block' }}
    >
      <path
        fill="#6D63DB"
        d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="2s"
          from="0 50 50"
          to="360 50 50"
          repeatCount="indefinite"
        />
      </path>

      <path
        fill="#413F7B"
        d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="2s"
          from="360 50 50"
          to="0 50 50"
          repeatCount="indefinite"
        />
      </path>

      <path
        fill="#6D63DB"
        d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
        L82,35.7z"
        style={{ opacity: '0.5' }}
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="360 50 50"
          to="0 50 50"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </>
);

export default Loading;
