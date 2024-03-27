import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { AppMountParameters, CoreStart } from '../../../../core/public';
import { NavigationPublicPluginStart } from '../../../navigation/public';
import { Filter } from './filter';
import { LogSearchTable } from './table';
import store from './store/store';

interface LogSearchingAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart['chrome'];
  history: AppMountParameters['history'];
}

export const LogSearchingApp = ({
  basename,
  notifications,
  application,
  history,
  chrome,
}: LogSearchingAppDeps) => {
  React.useEffect(() => {
    chrome.setBreadcrumbs([
      {
        text: 'Log Searching',
      },
    ]);
  }, [history.location]);

  return (
    <Router basename={basename}>
      <Provider store={store}>
        <Filter notifications={notifications} application={application} />
        <LogSearchTable />
      </Provider>
    </Router>
  );
};
