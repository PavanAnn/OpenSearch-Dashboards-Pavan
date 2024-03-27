import { NavigationPublicPluginStart } from '../../navigation/public';

export interface HomeAnalyticsPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomeAnalyticsPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
