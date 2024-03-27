import { NavigationPublicPluginStart } from '../../navigation/public';

export interface LogSearchingPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LogSearchingPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

// TYPES LOG SEARCHING

export type Pagination = {
  size: number;
  page: number;
  sort: string;
  order: 'asc' | 'desc';
};

export type FormProps = {
  product_name: ProductName;
  start_timestamp?: string;
  end_timestamp?: string;
  trace_id?: string;
  span_id?: string;
  severity_text?: string;
  severity_number?: string;
  body?: string;
  resource_attributes: any;
  log_attributes?: any;
  service_name?: string;
};
export interface TableProps {
  trace_id?: string;
  severity_text: string;
  severity_number: string | number;
  timestamp: string | undefined;
  resource_attributes: any;
  body?: string;
  service_name: string | undefined;
  actions?: any;
}

export interface MainTableProps {
  pageIndex: number;
  onPageChange: any;
}

export type ProductName =
  | ''
  | 'api-governance'
  | 'api-gateway'
  | 'developer-portal'
  | 'events-hub'
  | 'flexible-actions'
  | 'integrations'
  | 'open-finance'
  | 'open-insurance'
  | 'service-mesh';
