import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../core/public';
import { AppPluginStartDependencies } from './types';
import { HomeAnalyticsApp } from './components/app';

export const renderApp = (
  { notifications, http, application, chrome }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element }: AppMountParameters
) => {
  ReactDOM.render(
    <HomeAnalyticsApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      application={application}
      chrome={chrome}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
