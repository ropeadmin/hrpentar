import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { authApi } from "./authService";
import { AdminBusinessData, AdminData } from "@/types/auth.type";


type AuthState = {
  user: AdminBusinessData | null;
  token: string | null;
  profile: AdminData | null;
  formData: {
    businessName: string;
    businessEmail: string;
    allowBorrowAsYouEarn: boolean;
    allowTermLoan: boolean;
    password: string;
    businessOtp: string;
    businessCountry: string;
    businessId: string;
    businessSize: string;
    businessType: string;
    payDay: string;
    nin: string;
    taxId: string;
    phoneNumber: string;
    businessRegNumber: string;
    businessAddress: string;
    address: string;
    logo: string;
    cacDoc: string,
    utilityBillDoc: string, 
    taxIdDoc: string, 
    ninDoc: string
  };
};

const slice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
    profile: null,
    formData: {
      businessId: "",
      businessName: "",
      businessEmail: "",
      businessOtp: "",
      businessCountry: "",
      businessSize: "",
      businessType: "",
      allowBorrowAsYouEarn: false,
      allowTermLoan: false,
      password: "",
      cacDoc: "",
      utilityBillDoc: "", 
      taxIdDoc: "",
      ninDoc: "",
      logo:'',
      payDay: "",
      nin: "",
      taxId: "",
      phoneNumber: "",
      businessRegNumber: "",
      businessAddress: "",
      address: ""
      // Add more fields as needed
    },
  } as AuthState,
  reducers: {
    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    updateBusinessId(state, action) {
      state.formData.businessId = action.payload;
    },
    logout(state) {
      state.token = "";
      state.user = null;

      // Remove the cookie
      document.cookie = `authData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.adminLogin.matchFulfilled,
      (state, { payload }) => {
        console.log(payload)
        const { data } = payload;
        const { accessToken } = data;
        state.token = accessToken;
        // state.user = payload?.data.adminData.business;
        // state.profile = payload?.data.adminData;
        // console.log(payload)

        document.cookie = `authData=${JSON.stringify({
           accessToken 
          })}; path=/`;
      }
    )
    // builder.addMatcher(
    //   authApi.endpoints.otpVerifyEmail.matchFulfilled,
    //   (state, { payload }) => {
    //     const { data } = payload;
    //     const { accessToken } = data
    //     console.log(accessToken)
    //     state.token = payload?.data.accessToken;
    //     document.cookie = `authData=${JSON.stringify({
    //       accessToken,
    //     })}; path=/`;
    //   }
    // )
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const { data } = payload;
        const { accessToken } = data;
        state.token = payload?.data.accessToken;
        state.user = data?.business

        document.cookie = `authData=${JSON.stringify({
          accessToken,
        })}; path=/`;
      }
    )
  },
});
export const { updateFormData, updateBusinessId, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.authSlice.user;
export const selectCurrentProfile = (state: RootState) => state.authSlice.profile;

