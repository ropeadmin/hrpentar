import { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosProgressEvent } from 'axios';

export interface AxiosBaseQueryArgs {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export interface AxiosBaseQueryConfig {
  baseUrl: string;
}

export interface AxiosBaseQueryResult<T> {
  data?: T;
  error?: {
    status: number;
    data: any;
  };
}