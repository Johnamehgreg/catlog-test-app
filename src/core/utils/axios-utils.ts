import { useUserStore } from '@core/store/user.store';
import axios, { AxiosInstance } from 'axios';
import { handleLogOut } from './helpers';

// API Base URLs
export const BASE_URLS = {
  dev: 'https://api.stx.catlog.shop',
  prod: 'https://api.stx.catlog.shop',
};

/**
 * Creates an Axios instance with optional authentication.
 * @param baseURL - The base URL for API requests.
 * @param withAuth - Whether to include Authorization header.
 */
const createAxiosInstance = (
  baseURL: string,
  withAuth = false,
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    responseType: 'json',
  });

  if (withAuth) {
    instance.interceptors.request.use(
      async config => {
        const token =useUserStore.getState().token as string
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
  }

  instance.interceptors.response.use(
    response => {
      // console.log('Response:', response?.config?.url || 'Unknown URL');
      return response;
    },
    async error => {
      console.error('Response Error:', {...error});

      if (error?.response?.status === 401 && withAuth) {
        const token =useUserStore.getState().token as string
        if (token) {
          handleLogOut();
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// Getter functions — these will always use the latest production state
export const getServer = () => {
  const isProduction = true;
  const baseURL = isProduction ? BASE_URLS.prod : BASE_URLS.dev;
  return createAxiosInstance(baseURL, true); // Authenticated
};

export const getServerPublic = () => {
  const isProduction = true;
  const baseURL = isProduction ? BASE_URLS.prod : BASE_URLS.dev;
  return createAxiosInstance(baseURL, false); // Public
};
