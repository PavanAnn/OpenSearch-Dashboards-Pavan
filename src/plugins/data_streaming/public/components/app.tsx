// @ts-nocheck
import React from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import '../index.scss';
import { I18nProvider } from '@osd/i18n/react';
import { AppMountParameters, CoreStart } from '../../../../core/public';
import { NavigationPublicPluginStart } from '../../../navigation/public';
import { EditDelivery } from './formDelivery/EditDelivery';
import { List } from './list';
import { FormDelivery } from './formDelivery/FormDelivery';
import { i18n } from '@osd/i18n';
interface DataStreamingAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
  application: CoreStart['application'];
  chrome: CoreStart['chrome'];
  history: AppMountParameters['history']
}

export const DataStreamingApp = ({
  basename,
  notifications,
  application,
  history,
  chrome
}: DataStreamingAppDeps) => {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact>
          <List basename={basename} notifications={notifications} application={application} chrome={chrome} history={history} />
        </Route>
        <Route path="/create-a-delivery-stream" exact>
          <FormDelivery basename={basename} application={application} chrome={chrome} notifications={notifications} />
        </Route>
        <Route path="/edit-delivery-stream/:id" exact>
          <EditDelivery basename={basename} application={application} chrome={chrome} notifications={notifications}/>
        </Route>
      </Switch>
    </Router>
  );
};
