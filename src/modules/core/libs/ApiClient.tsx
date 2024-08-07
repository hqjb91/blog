import Axios, { InternalAxiosRequestConfig } from 'axios';

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = (baseURL:string) => {
    
    const apiClient = Axios.create({
        baseURL,
    })

    apiClient.interceptors.request.use(authRequestInterceptor);
    apiClient.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const message = error.response?.data?.message || error.message;
        console.error(message);
    
        return Promise.reject(error);
      },
    );

    return apiClient;
};

