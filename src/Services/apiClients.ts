import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { handleRejectNavigation } from '../Utilities/commonFunctions';
import Cookies from 'js-cookie';
// import { registerApplication } from '../Store/Thunk/AuthThunk';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { REACT_APP_BASE_URL, NODE_ENV } = process.env;

// Token refresh state
let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

export const createApiClient = (
  authTokenApi?: string,
  dispatch?: any
): {
  get: <T = any>(
    endpoint: string,
    params?: Record<string, unknown>
  ) => Promise<AxiosResponse<T>>;
  post: <T = any>(
    endpoint: string,
    data: Record<string, unknown>
  ) => Promise<AxiosResponse<T>>;
  put: <T = any>(
    endpoint: string,
    data: Record<string, unknown>
  ) => Promise<AxiosResponse<T>>;
  patch: <T = any>(
    endpoint: string,
    data: Record<string, unknown>
  ) => Promise<AxiosResponse<T>>;
  delete: <T = any>(
    endpoint: string,
    data?: Record<string, unknown>
  ) => Promise<AxiosResponse<T>>;
} => {
  const client: AxiosInstance = axios.create({
    baseURL: REACT_APP_BASE_URL,
    withCredentials: NODE_ENV === 'production', // ✅ Only `withCredentials` in prod
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(NODE_ENV === 'development' && authTokenApi
        ? { Authorization: `Bearer ${authTokenApi}` }
        : {}),
      'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
    },
  });

  // ✅ Request Interceptor: Attach token only in development
  client.interceptors.request.use(
    (config) => {
      if (NODE_ENV === 'development') {
        const token = authTokenApi || Cookies.get('AccessToken');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Response Interceptor: Handle 401 errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;

      // 🚀 DEVELOPMENT MODE: Redirect on failure
      if (error.response?.status === 401 && NODE_ENV === 'development') {
        handleRejectNavigation(dispatch);
        return Promise.reject(error);
      }

      // 🚀 PRODUCTION MODE: Handle Token Refresh
      if (
        error.response?.status === 401 &&
        NODE_ENV === 'production' &&
        !error.config.url?.includes('login-prod')
      ) {
        if (!isRefreshing) {
          isRefreshing = true;

          refreshPromise = (async () => {
            try {
              await client.get(
                `${REACT_APP_BASE_URL}Authentication/refresh-token-prod`
              );
            } catch (err) {
              handleRejectNavigation(dispatch);
              throw err;
            } finally {
              isRefreshing = false;
              refreshPromise = null;
            }
          })();
        }

        try {
          await refreshPromise;
          if (originalRequest._retry) return Promise.reject(error);
          originalRequest._retry = true; // Prevent infinite retry loops
          return client(originalRequest);
        } catch (refreshError) {
          handleRejectNavigation(dispatch);

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return {
    get: (endpoint, params) => client.get(endpoint, { params }),
    post: (endpoint, data) => client.post(endpoint, data),
    put: (endpoint, data) => client.put(endpoint, data),
    patch: (endpoint, data) => client.patch(endpoint, data),
    delete: (endpoint, data) => client.delete(endpoint, { data }),
  };
};
