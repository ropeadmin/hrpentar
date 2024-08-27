'use client';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { deleteItem, getItem, saveItem } from '../helpers/storage.helper';
import { profileStorageKey, userStorageKey } from '../constants/index.constant';

export const sliceName = 'profile';

export interface RopeSubscription {
  id?: string;
  _id?: string;
  start: string;
  end: string;
  active: boolean;
}

export interface ProfileState {
  id?: string;
  _id?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  company?: string;
  title?: string;
  profilePic?: string;
  email?: string;
  email_confirm_code?: string;
  username?: string;
  accessToken?: string;
  refreshToken?: string;
  subscription?: any;
  createdAt?: string;
  [key: string]: any;
}

interface IProfileLoginAction {
  accessToken?: string;
  refreshToken?: string;
  [key: string]: any;
}

const initialState: any = {
  ...((getItem(profileStorageKey) || {}) as any),
};

const initialUserState: any = {
  ...((getItem(userStorageKey) || {}) as any),
};

export const profileSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    profileLoginAction: (state, action: PayloadAction<IProfileLoginAction>) => {
      saveItem(profileStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
    profileLogoutAction: (state) => {
      deleteItem(profileStorageKey);
      // location.reload();
      return {};
    },
    profileUpdateAction: (state, action) => {
      saveItem(profileStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
    profileUserAction: (state, action) => {
      saveItem(userStorageKey, { ...state, ...action.payload });
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { profileLoginAction, profileLogoutAction, profileUpdateAction, profileUserAction } = profileSlice.actions;

export default profileSlice.reducer;
