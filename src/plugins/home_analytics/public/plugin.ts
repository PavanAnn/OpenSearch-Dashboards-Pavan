import { i18n } from '@osd/i18n';
import {
  AppMountParameters,
  CoreSetup,
  CoreStart,
  DEFAULT_APP_CATEGORIES,
  Plugin,
} from '../../../core/public';
import {
  HomeAnalyticsPluginSetup,
  HomeAnalyticsPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class HomeAnalyticsPlugin
  implements Plugin<HomeAnalyticsPluginSetup, HomeAnalyticsPluginStart> {
  public setup(core: CoreSetup): HomeAnalyticsPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'home',
      title: PLUGIN_NAME,
      order: 1000,
      category: DEFAULT_APP_CATEGORIES.home,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in opensearch_dashboards.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('homeAnalytics.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): HomeAnalyticsPluginStart {
    return {};
  }

  public stop() {}
}
