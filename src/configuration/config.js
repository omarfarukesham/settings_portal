import { getEnv } from '@/utilities/getEnv';

//Portal Name
export const PORTAL_NAME = 'SETTINGS_PORTAL';

// Redirect after login or default redirection url
export const DEFAULT_REDIRECTION_PATH = '/admin/dashboard';

// Token key for localStorage
export const TOKEN_KEY = 'token';

// Master Portal URL
export const MASTER_PORTAL_URL = getEnv('VITE_MASTER_PORTAL_URL');

// Dashboard URL
export const DASHBOARD_URL = getEnv('VITE_DASHBOARD_URL');

// Marketplace URL
export const MARKETPLACE_URL = getEnv('VITE_MARKETPLACE_URL');
export const MARKETPLACE_PDP_URL = MARKETPLACE_URL + '/products/';

// API BASE URL (service wise)
export const API_BASE_URL = getEnv('VITE_API_BASE_URL');
export const API_SERVICE_MODE = getEnv('VITE_API_SERVICE_MODE');
const isGatewayMode = API_SERVICE_MODE === 'gateway';

export const SETTINGS_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/settings/api/v1' : ':9090/api/v1');
export const CATALOG_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/soldfy-catalog/api/' : ':9091/api');
export const GLOBAL_CONFIGURATION_SERVICE_BASE_URL =
  API_BASE_URL +
  (isGatewayMode ? '/soldfy-global-configuration/api' : ':9092/api');
export const SELLER_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/soldfy-seller/api/' : ':9093/api');
export const CONTENT_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/contentservice/api/' : ':9094/api');
export const CAMPAIGN_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/soldfycompaign/api/' : ':9095/api');
export const USER_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/soldfy-user/api/' : ':9097/api');
export const ORDER_SERVICE_BASE_URL =
  API_BASE_URL + (isGatewayMode ? '/soldfy-order/api/' : ':9099/api');
