import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../core/server';

import { DataStreamingPluginSetup, DataStreamingPluginStart } from './types';
import { defineRoutes } from './routes';

export class DataStreamingPlugin
  implements Plugin<DataStreamingPluginSetup, DataStreamingPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('data-streaming: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('data-streaming: Started');
    return {};
  }

  public stop() {}
}
