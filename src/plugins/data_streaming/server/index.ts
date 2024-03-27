import { PluginInitializerContext } from '../../../core/server';
import { DataStreamingPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new DataStreamingPlugin(initializerContext);
}

export { DataStreamingPluginSetup, DataStreamingPluginStart } from './types';
