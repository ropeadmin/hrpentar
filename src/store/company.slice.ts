'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { deleteItem, getItem, saveItem } from '../helpers/storage.helper';
import { companyStorageKey, userStorageKey } from '../constants/index.constant';

export const sliceName = 'company';

export interface companyState {
  main?: string;
  account?: string;
  businessName?: string;
  registrationNumber?: string;
  size?: string;
  businessType?: string;
  subsidiary?: string;
  status?: string;
  address?: any;
  director?: any;
  prefix?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  id?: string;
  [key: string]: any;
}


const initialState: any = {
  ...((getItem(companyStorageKey) || {}) as any),
};

export const companySlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    saveCompany: (state, action: PayloadAction<any>) => {
      saveItem(companyStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
    updateCompany: (state, action) => {
      saveItem(companyStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCompany, updateCompany } = companySlice.actions;

export default companySlice.reducer;
