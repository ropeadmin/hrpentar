import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'
import type { signupResponse } from './type'
import { LoginRequest, UserResponse } from '@/types/auth.type';

export const authApi = createApi({
  baseQuery,
  tagTypes: ["Profile", "kyc"],
  endpoints: (builder) => ({
    signup: builder.mutation<signupResponse, LoginRequest>(
    {
      query: (credentials) => ({
        url: '/auth/admins/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    adminLogin: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/account/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    employeeLogin: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/employee/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    employeeCreatePassword: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/employee/create-password',
        method: 'POST',
        body: credentials,
      }),
    }),
  })
})

export const {  
 useSignupMutation,
 useAdminLoginMutation,
 useEmployeeLoginMutation,
 useEmployeeCreatePasswordMutation,
 
  
} = authApi
