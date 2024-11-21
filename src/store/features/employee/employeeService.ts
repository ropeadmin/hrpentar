import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'
import { LoginRequest, UserResponse } from '@/types/auth.type';

export const authApi = createApi({
  baseQuery,
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    addEmployee: builder.mutation<any, LoginRequest>(
    {
      query: (credentials) => ({
        url: '/auth/admins/sign-up',
        method: 'POST',
        body: credentials,
      }),
    }),
    })
})

export const {  
    useAddEmployeeMutation
  
} = authApi
