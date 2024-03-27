import './index.scss';

import { DataStreamingPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new DataStreamingPlugin();
}
export { DataStreamingPluginSetup, DataStreamingPluginStart } from './types';
