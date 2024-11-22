import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/config/auth-config';
import { IEmployeeRequestProps } from '@/types/employee.type';
import { LoginRequest } from '@/types/auth.type';

export const employeeApi = createApi({
  baseQuery,
  reducerPath: 'employeeApi',
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    createPassword: builder.mutation<any, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/employee/create-password',
        method: 'POST',
        body: credentials,
      }),
    }),
    addEmployee: builder.mutation<any, IEmployeeRequestProps>({
      query: (credentials) => ({
        url: '/auth/employee/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    getEmployees: builder.query<any, void>({
      query: () => ({
        url: '/employees/employee/all',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useCreatePasswordMutation,
} = employeeApi;
