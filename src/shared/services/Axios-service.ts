import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useCookies } from '@vueuse/integrations/useCookies';
import { BACKEND_API_URL } from '../constants';

// Define the structure of the error response if needed
interface AxiosErrorResponse {
  message: string;
  code?: string;
}

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_API_URL, // Set the base URL for the requests
      timeout: 10000, // Set a timeout for the requests
    });

    // Add request interceptor to handle Authorization token
    this.axiosInstance.interceptors.request.use(
      this.addAuthToken,
      this.handleError
    );

    // Add response interceptor to handle errors
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  // Add the token from cookies to the request headers
  private addAuthToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const cookies = useCookies([]);
    const token = cookies.get('auth_token');
    if (token) {
      if (!config.headers) {
        config.headers = new axios.AxiosHeaders();
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  // Handle successful responses
  private handleResponse(response: AxiosResponse): AxiosResponse {
    return response;
  }

  // Handle errors (request or response)
  private handleError(error: unknown): Promise<never> {
    // Check if the error is an AxiosError
    if (axios.isAxiosError(error)) {
      const axiosError = error as { response?: AxiosErrorResponse };
      // Handle known Axios error responses
      if (axiosError.response) {
        console.error('Axios Error:', axiosError.response.message);
      }
    } else {
      // Handle non-Axios errors
      console.error('Unknown Error:', error);
    }
    return Promise.reject(error);
  }

  // Public method to make GET requests
  public async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Public method to make POST requests
  public async post<T>(url: string, data: Record<string, unknown>): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // You can add other HTTP methods (PUT, DELETE) if needed
}

export default new AxiosService();
