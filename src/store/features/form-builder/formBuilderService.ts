import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'
import type { FormApiResponseType, FormType } from './type'



export const formBuilderApi = createApi({
  baseQuery,
  tagTypes: ["Builder"],
  reducerPath: 'formBuilderApi',
  endpoints: (builder) => ({
    createForm: builder.mutation<FormApiResponseType, FormType>(
    {
      query: (credentials) => ({
        url: '/utilities/forms',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["Builder"]
    }),
    getForm: builder.query<FormApiResponseType, void>(
      {
        query: () => ({
          url: '/utilities/forms',
          method: 'GET',
        }),
        providesTags: ["Builder"]
      }), 
    deleteForm: builder.mutation<any, string>({
      query: (formId) => ({
        url: `/utilities/forms/${formId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Builder"]
    })
  }),
})

export const {  
 useCreateFormMutation,  
 useGetFormQuery,
 useDeleteFormMutation
} = formBuilderApi
