import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { EndPoints } from '../Utilities/EndPoints';

const { REACT_APP_BASE_URL } = process.env;
const { NODE_ENV } = process.env;

// Function to create an API client
export const createApiClient = (
  authTokenApi?: string,
  refreshTokenStringApi?: string
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
  client.interceptors.request.use((config) => {
    if (NODE_ENV === 'development') {
      const token = Cookies.get('AccessToken') || authTokenApi; // Get the access token from cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  // Add response interceptors for handling errors
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;
      const refreshToken = Cookies.get('RefreshToken') || refreshTokenStringApi; // Get the refresh token from cookies

      // Handle token expiration and refresh
      if (error.response?.status === 401 && refreshToken) {
        try {
          const response = await axios.post(
            `${REACT_APP_BASE_URL}${EndPoints.refreshToken}`
          );
          const newAccessToken = response.data.accessToken;
          Cookies.set('AccessToken', newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(refreshError);
        }
      }

      // Format and reject the error
      return Promise.reject({
        message:
          error?.response?.data?.message ||
          error.message ||
          'An error occurred',
        status: error?.response?.status,
        data: error?.response?.data,
      });
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