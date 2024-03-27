/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable no-console */

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

import classnames from 'classnames';
import React, { useContext, useEffect, useRef, useState } from 'react';
import useObservable from 'react-use/lib/useObservable';
import { Observable } from 'rxjs';
import { EuiButtonIcon, EuiToolTip } from '@elastic/eui';
import { EuiHeaderSection, EuiHeaderSectionItem } from '@elastic/eui';
import { MobileContext } from '../../../../public/context_mobile';
import { LoadingIndicator } from '..';
import {
  Nav,
  NavMenu,
  InfoMenu,
  UserMenu,
  DropdownMenu,
  UserName,
  UserEmail,
  AccountSettings,
  UserLogout,
  BreadCrumb,
} from './breadcrumb/styles';
import {
  HelpOption,
  DropdownMenuOption,
  UserMenuOption,
  UserMenuApps,
  DropdownMenuApps,
  ContainerApps,
  RowApps,
  TitleApp,
  RedirectApp,
} from './nav_user/styles';
import {
  ChromeBadge,
  ChromeBreadcrumb,
  ChromeNavControl,
  ChromeNavLink,
  ChromeRecentlyAccessedHistoryItem,
} from '../..';
import { InternalApplicationStart } from '../../../application/types';
import { HttpStart } from '../../../http';
import { ChromeHelpExtension, ChromeBranding } from '../../chrome_service';
import { OnIsLockedUpdate } from '.';
import { InfoMenuIcon } from './assets/InfoMenuIcon';
import { AppsMenu } from './assets/AppsMenu';
import { ApiPlatformIcon } from './assets/ApiPlatformIcon';
import { EventsHubIcon } from './assets/EventsHubIcon';
import { ServiceMeshIcon } from './assets/ServiceMeshIcon';
import { FlexibleActionsIcon } from './assets/FlexibleActionsIcon';
import { AccessControlIcon } from './assets/AccessControlIcon';
import { redirectTo } from './enum_links/enum_links';
import { Modal } from '../modal/modal.component';
import { useDetectOutsideClick } from './nav_user/useDetectOutsideClick';
// import { HeaderBreadcrumbs } from './breadcrumb';
import { HeaderActionMenu } from './header_action_menu';
import { useWindowDimensions } from './hooks/useWindowSize';
import { HeaderBreadcrumbs } from './header_breadcrumbs';

export interface HeaderProps {
  opensearchDashboardsVersion: string;
  application: InternalApplicationStart;
  appTitle$: Observable<string>;
  badge$: Observable<ChromeBadge | undefined>;
  breadcrumbs$: Observable<ChromeBreadcrumb[]>;
  customNavLink$: Observable<ChromeNavLink | undefined>;
  homeHref: string;
  isVisible$: Observable<boolean>;
  opensearchDashboardsDocLink: string;
  navLinks$: Observable<ChromeNavLink[]>;
  recentlyAccessed$: Observable<ChromeRecentlyAccessedHistoryItem[]>;
  forceAppSwitcherNavigation$: Observable<boolean>;
  helpExtension$: Observable<ChromeHelpExtension | undefined>;
  helpSupportUrl$: Observable<string>;
  navControlsLeft$: Observable<readonly ChromeNavControl[]>;
  navControlsCenter$: Observable<readonly ChromeNavControl[]>;
  navControlsRight$: Observable<readonly ChromeNavControl[]>;
  basePath: HttpStart['basePath'];
  isLocked$: Observable<boolean>;
  loadingCount$: ReturnType<HttpStart['getLoadingCount$']>;
  onIsLockedUpdate: OnIsLockedUpdate;
  branding: ChromeBranding;
}

export function Header({
  opensearchDashboardsVersion,
  opensearchDashboardsDocLink,
  application,
  basePath,
  onIsLockedUpdate,
  homeHref,
  branding,
  ...observables
}: HeaderProps) {
  const isVisible = useObservable(observables.isVisible$, false);

  const { handleSideChanges, open } = useContext(MobileContext);

  const dropdownRef = useRef(null);
  const dropdownOptionRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [optionMenu, setOptionMenu] = useDetectOutsideClick(dropdownOptionRef, false);
  const [optionMenuApp, setOptionMenuApp] = useDetectOutsideClick(dropdownOptionRef, false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleMenuUser = () => setIsActive(!isActive);
  const toggleOptionMenu = () => setOptionMenu(!optionMenu);
  const toggleOptionMenuApp = () => setOptionMenuApp(!optionMenuApp);
  const handleShowModal = () => setShowModal(!showModal);

  const redirect = async (path: string) => {
    window.open(`${window.location.origin}/${path}`);
  };

  const currentUser = {
    name: 'Lucca',
    email: 'lucca@lucca.lucca',
  };

  const { width } = useWindowDimensions();

  const [widthSidebar, setWidthSidebar] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setWidthSidebar(true);
    } else {
      setWidthSidebar(false);
    }
  }, [width]);

  if (!isVisible) {
    return <LoadingIndicator loadingCount$={observables.loadingCount$} showAsBar />;
  }

  const className = classnames('hide-for-sharing', 'headerGlobalNav');

  return (
    <>
      <header
        className={className}
        data-test-subj="headerGlobalNav"
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          marginLeft: widthSidebar && !open ? '0px' : '180px',
          paddingRight: widthSidebar && !open ? '0px' : '180px',
        }}
      >
        <div id="globalHeaderBars">
          <Nav>
            <NavMenu>
              <div
                style={{
                  marginLeft:
                    widthSidebar && !open ? '0px' : widthSidebar && !open ? '-140px' : '0px',
                  maxWidth: widthSidebar && open ? '45%' : '100%',
                }}
              >
                {widthSidebar ? (
                  <div
                    className="nav-mobile-styles"
                    style={{ zIndex: 2, position: 'fixed', marginTop: '9px' }}
                  >
                    <EuiButtonIcon
                      size="m"
                      iconType={'menu'}
                      style={{ height: '23px', width: '23px' }}
                      onClick={handleSideChanges}
                    />
                  </div>
                ) : (
                  ''
                )}
                <BreadCrumb>
                  <HeaderBreadcrumbs
                    appTitle$={observables.appTitle$}
                    breadcrumbs$={observables.breadcrumbs$}
                  />
                </BreadCrumb>
              </div>

              <InfoMenu>
                <div style={{ cursor: 'pointer' }}>
                  <UserMenuOption onClick={toggleOptionMenu}>
                    <EuiToolTip position="bottom" content="Help">
                      <InfoMenuIcon />
                    </EuiToolTip>
                  </UserMenuOption>
                  <DropdownMenuOption
                    ref={dropdownOptionRef}
                    className={`${optionMenu ? 'active' : 'inactive'}`}
                  >
                    <ul>
                      <HelpOption onClick={handleShowModal}>About</HelpOption>
                      <HelpOption onClick={() => redirectTo('online_help')}>Online Help</HelpOption>
                    </ul>
                  </DropdownMenuOption>
                </div>

                {!window.location.href.includes('sbox') && (
                  <div style={{ cursor: 'pointer' }}>
                    <UserMenuApps onClick={toggleOptionMenuApp}>
                      <div data-tooltip="Apps" className="tooltip">
                        <EuiToolTip position="bottom" content="Apps">
                          <AppsMenu />
                        </EuiToolTip>
                      </div>
                    </UserMenuApps>
                    <DropdownMenuApps
                      ref={dropdownOptionRef}
                      className={`${optionMenuApp ? 'active' : 'inactive'}`}
                    >
                      <ContainerApps>
                        <RowApps>
                          <RedirectApp onClick={() => redirect('api-manager')}>
                            <ApiPlatformIcon />
                            <TitleApp>{'API Platform'}</TitleApp>
                          </RedirectApp>
                          <RedirectApp onClick={() => redirect('events-hub')}>
                            <EventsHubIcon />
                            <TitleApp>{'Events Hub'}</TitleApp>
                          </RedirectApp>
                          <RedirectApp onClick={() => redirect('mesh')}>
                            <ServiceMeshIcon />
                            <TitleApp>{'Service Mesh'}</TitleApp>
                          </RedirectApp>
                          <RedirectApp onClick={() => redirect('flex-actions')}>
                            <FlexibleActionsIcon />
                            <TitleApp>{'Flexible Actions'}</TitleApp>
                          </RedirectApp>
                          {currentUser?.name !== undefined && (
                            <RedirectApp onClick={() => redirect('access-control')}>
                              <AccessControlIcon />
                              <TitleApp>{'Access Control'}</TitleApp>
                            </RedirectApp>
                          )}
                        </RowApps>
                      </ContainerApps>
                    </DropdownMenuApps>
                  </div>
                )}
              </InfoMenu>

              <EuiToolTip
                position="bottom"
                content={
                  currentUser?.name !== undefined
                    ? currentUser?.name
                    : (JSON.parse(localStorage.getItem('ls.user') as string).login as string) !== ''
                    ? (JSON.parse(localStorage.getItem('ls.user') as string).login as string)
                    : 'Error'
                }
              >
                <UserMenu onClick={toggleMenuUser}>
                  {currentUser?.name !== undefined
                    ? currentUser?.name
                    : (JSON.parse(localStorage.getItem('ls.user') as string).login as string) !== ''
                    ? (JSON.parse(localStorage.getItem('ls.user') as string).login as string)
                    : 'Error'}
                </UserMenu>
              </EuiToolTip>
              <DropdownMenu
                style={{
                  right:
                    widthSidebar && !open
                      ? '0px'
                      : widthSidebar && open
                      ? '180px'
                      : !widthSidebar
                      ? '180px'
                      : '0px',
                }}
                ref={dropdownRef}
                className={`${isActive ? 'active' : 'inactive'}`}
              >
                <ul>
                  <UserName>
                    {currentUser?.name !== undefined
                      ? currentUser?.name
                      : (JSON.parse(localStorage.getItem('ls.user') as string).login as string)}
                  </UserName>
                  <UserEmail>
                    {currentUser?.email !== undefined
                      ? currentUser?.email
                      : (JSON.parse(localStorage.getItem('ls.user') as string).email as string)}
                  </UserEmail>
                  {currentUser?.name !== undefined ? (
                    <AccountSettings
                      onClick={() => {
                        redirect('access-control/account-settings');
                      }}
                    >
                      Account Settings
                    </AccountSettings>
                  ) : (
                    <AccountSettings
                      onClick={() => {
                        redirect('api-manager/#/users/list');
                      }}
                    >
                      Account Settings
                    </AccountSettings>
                  )}

                  <UserLogout onClick={() => console.log('Uwu')}>Logout</UserLogout>
                </ul>
              </DropdownMenu>
            </NavMenu>

            <EuiHeaderSection side="right">
              <EuiHeaderSectionItem border="none">
                <HeaderActionMenu actionMenu$={application.currentActionMenu$} />
              </EuiHeaderSectionItem>
            </EuiHeaderSection>
          </Nav>
        </div>
      </header>
      <Modal active={showModal} hideModal={() => setShowModal(false)} />
    </>
  );
}
