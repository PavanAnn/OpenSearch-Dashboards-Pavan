import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '../../../core/public';
import { AppPluginStartDependencies } from './types';
import { DataStreamingApp } from './components/app';
import { GlobalContext } from './context';
import { ChromeStart } from '../../../core/public';
import { i18n } from '@osd/i18n';

function setBreadcrumbs(chrome: ChromeStart) {
  chrome.setBreadcrumbs([
    {
      text: i18n.translate('devTools.k7BreadcrumbsDevToolsLabel', {
        defaultMessage: 'Data Streaming',
      }),
      href: '/app/data-streaming',
    },
  ]);
}

export const renderApp = (
  { notifications, http, application, chrome }: CoreStart,
  { navigation }: AppPluginStartDependencies,
  { appBasePath, element, history }: AppMountParameters
) => {
  setBreadcrumbs(chrome)
  ReactDOM.render(
    <GlobalContext>
      <DataStreamingApp
        basename={appBasePath}
        notifications={notifications}
        http={http}
        navigation={navigation}
        application={application}
        chrome={chrome}
        history={history}
      />
    </GlobalContext>,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
