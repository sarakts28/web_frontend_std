import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const { REACT_APP_BASE_URL } = process.env;
const { NODE_ENV } = process.env;

// Function to create an API client
export const createApiClient = (
  authTokenApi?: string
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
    withCredentials: NODE_ENV === 'production',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization:
        NODE_ENV === 'development' && authTokenApi
          ? `Bearer ${authTokenApi}`
          : '',
      'ngrok-skip-browser-warning': 'ngrok-skip-browser-warning',
    },
  });

  // Request interceptor to include Authorization header
  client.interceptors.request.use(
    async (config) => {
      if (NODE_ENV === 'development') {
        const token = Cookies.get('AccessToken') || authTokenApi; // Get the access token from cookies
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }

      if (
        config.url === '/api/Authentication/refresh-token-prod' ||
        config.url === '/api/Authentication/login-prod'
      ) {
        return config;
      }

      try {
        // Try to refresh token before each request
        await client.get('/api/Authentication/refresh-token-prod');
        return config;
      } catch (error) {
        Cookies.remove('AccessToken');
        Cookies.remove('RefreshToken');
        return Promise.reject(error);
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptors for handling errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = Cookies.get('RefreshToken');

      console.log('Error:', error, originalRequest);

      // Handle token expiration and refresh
      if (error.response?.status === 401 && NODE_ENV === 'development') {
        localStorage.clear();
        return;
      } else if (
        error.response?.status === 401 &&
        NODE_ENV === 'production' &&
        refreshToken
      ) {
        try {
          const response = await client.get(
            '/api/Authentication/refresh-token-prod'
          );
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          Cookies.set('AccessToken', newAccessToken);
          Cookies.set('RefreshToken', newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return client(originalRequest);
        } catch (error) {
          Cookies.remove('AccessToken');
          Cookies.remove('RefreshToken');
          return Promise.reject(error);
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
