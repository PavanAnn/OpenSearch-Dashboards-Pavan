import './index.scss';

import { LogSearchingPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new LogSearchingPlugin();
}
export { LogSearchingPluginSetup, LogSearchingPluginStart } from './types';
