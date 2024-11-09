import {  BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { AxiosBaseQueryArgs, AxiosBaseQueryConfig } from './types';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';


export const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_PENTA_BASE_URL}`,
  prepareHeaders: (headers) => {
    const cookieValue = Cookies.get('authData');
    let accessToken;

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      accessToken = parsedCookie.accessToken;
    }

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    return headers;
  }
});

//  redux toolkit can't handle onprogress state for upload i.e 10%, 20% 
export const axiosBaseQuery =
  ({ baseUrl }: AxiosBaseQueryConfig): BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown> =>
  async ({ url, method, data, onUploadProgress }) => {
    const cookieValue = Cookies.get('authData');
    let headers: Record<string, string> = {};

    if (cookieValue) {
      const parsedCookie = JSON.parse(cookieValue);
      const accessToken = parsedCookie.accessToken;
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
      const result: AxiosResponse<unknown> = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        onUploadProgress,
      } as AxiosRequestConfig);

      return { data: result.data };
    } catch (axiosError: any) {
      let err: AxiosError = axiosError;
      return {
        error: {
          status: err.response?.status ?? 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
