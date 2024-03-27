/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import './collapsible_nav.scss';
import { i18n } from '@osd/i18n';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Indicator, LinkItemStyle, Text } from './custom/styles';
import { Sidebar } from './custom';
import { useWindowDimensions } from './hooks/useWindowSize';
import { Logo } from './assets/Logo';
import { SensediaLogo } from './assets/SensediaLogo';
import { MobileContext } from '../../../../public/context_mobile';

interface SidebarProps {
  policies: any;
}

export function Navbar({ policies }: SidebarProps) {
  const mapSidebar = [
    {
      name: 'General Trace',
      link: '/app/discover',
    },
    {
      name: 'Dashboards',
      link: '/app/dashboards',
    },
    {
      name: 'Visualize',
      link: '/app/visualize',
    },
    {
      name: 'Log Searching',
      link: '/app/logSearching',
    },
    {
      name: 'Data Streaming',
      link: '/app/data-streaming',
    },
  ];

  const { width } = useWindowDimensions();

  const { open, handleSideChanges } = useContext(MobileContext);

  const [widthSidebar, setWidthSidebar] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setWidthSidebar(true);
    } else {
      setWidthSidebar(false);
    }
  }, [width]);

  useEffect(() => {
    if (open) handleSideChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {widthSidebar && !open ? (
        ''
      ) : (
        <Sidebar
          open={true}
          data-test-subj="collapsibleNav"
          aria-label={i18n.translate('core.ui.primaryNav.screenReaderLabel', {
            defaultMessage: 'Primary',
          })}
        >
          <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div
              style={{
                height: 66,
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Link
                to={{ pathname: '/app/home' }}
                className={window.location.pathname.includes('home') ? 'active' : ''}
                onClick={handleSideChanges}
              >
                <Indicator />
                <Logo />
              </Link>
            </div>

            <div style={{ flex: '1' }}>
              {mapSidebar.map((elemen, index) => (
                <LinkItemStyle key={index}>
                  <Link
                    onClick={handleSideChanges}
                    to={elemen.link}
                    className={
                      window.location.pathname.includes(elemen.link) &&
                      !window.location.pathname.includes('opensearch')
                        ? 'active'
                        : ''
                    }
                  >
                    <Indicator />
                    <Text>{elemen.name}</Text>
                  </Link>
                </LinkItemStyle>
              ))}
            </div>
            <div style={{ textAlign: 'center', margin: '20px' }}>
              <SensediaLogo />
            </div>
          </div>
        </Sidebar>
      )}
    </>
  );
}
