import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../core/public';
import { AppPluginStartDependencies } from './types';
import { LogSearchingApp } from './components/app';

export const renderApp = (
  { notifications, http, application, chrome }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element, history }: AppMountParameters
) => {
  ReactDOM.render(
    <LogSearchingApp
      basename={appBasePath}
      notifications={notifications}
      http={http}
      navigation={navigation}
      application={application}
      chrome={chrome}
      history={history}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
