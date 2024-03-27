import './index.scss';

import { HomeAnalyticsPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new HomeAnalyticsPlugin();
}
export { HomeAnalyticsPluginSetup, HomeAnalyticsPluginStart } from './types';
