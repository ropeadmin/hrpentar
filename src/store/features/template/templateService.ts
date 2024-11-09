import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/config/auth-config'
import type { TemplateRequestType, TemplateResponseType } from './type'



export const templateApi = createApi({
  baseQuery,
  tagTypes: ["Template"],
  reducerPath: 'templateApi',
  endpoints: (builder) => ({
    createTemplate: builder.mutation<TemplateResponseType, TemplateRequestType>(
    {
      query: (credentials) => ({
        url: '/utilities/forms/templates',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["Template"]
    }),
    getTemplate: builder.query<TemplateResponseType, void>(
      {
        query: () => ({
          url: '/utilities/forms/templates',
          method: 'GET',
        }),
        providesTags: ["Template"]
      }), 
    deleteTemplate: builder.mutation<any, string[]>({
      query: (templateIds) => ({
        url: `/utilities/forms/templates?ids[]=${templateIds.join('&id[]=')}`,
        method: 'DELETE'
      }),
      invalidatesTags: ["Template"]
    })
  }),
})

export const {  
 useCreateTemplateMutation,  
 useDeleteTemplateMutation,
 useGetTemplateQuery
} = templateApi
