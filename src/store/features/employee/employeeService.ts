import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/config/auth-config';
import { IEmployeeRequestProps } from '@/types/employee.type';

export const employeeApi = createApi({
  baseQuery,
  reducerPath: 'employeeApi',
  tagTypes: ['Employee'],
  endpoints: (builder) => ({
    addEmployee: builder.mutation<any, IEmployeeRequestProps>({
      query: (credentials) => ({
        url: '/auth/employee/create',
        method: 'POST',
        body: credentials,
      }),
    }),
    getEmployees: builder.query<any, void>({
      query: () => ({
        url: '/auth/employees/all',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAddEmployeeMutation } = employeeApi;
