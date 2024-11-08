import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'
import type { signupRequest, signupResponse } from './type'

export interface AdminBusinessData {
  id: string;
  logo: string;
}

export interface AdminData  {
  id?:       string
  email?:    string
  business: AdminBusinessData
}

export interface UserResponse {
  data:  {accessToken: string, adminData: AdminData}
}


export interface LoginRequest {
  email:    string
  password: string
}


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
    // adminLogin: builder.mutation<SuperAdminUserResponse, AdminLoginRequest>({
    //   query: (credentials) => ({
    //     url: '/super-admin/login',
    //     method: 'POST',
    //     body: credentials,
    //   }),
    // })
  })
})

export const {  
 useSignupMutation,
 useAdminLoginMutation,
  
} = authApi
