import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import profileReducer, { sliceName as profileSliceName } from './profile.slice';
import companyReducer, { sliceName as companySliceName } from './company.slice';
import { authApi } from './features/auth/authService';
import authReducer from './features/auth/authSlice';
import { formBuilderApi } from './features/form-builder/formBuilderService';
import { templateApi } from './features/template/templateService';
import { employeeApi } from './features/employee/employeeService';

export const store = configureStore({
  reducer: {
    [profileSliceName]: profileReducer,
    [companySliceName]: companyReducer,
    [authApi.reducerPath]: authApi.reducer,
    [formBuilderApi.reducerPath]: formBuilderApi.reducer,
    [templateApi.reducerPath]: templateApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    authSlice: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const authApiMiddleware = authApi.middleware;
    const formBuilderApiMiddleware = formBuilderApi.middleware;
    const templateApiMiddleware = templateApi.middleware;
    const employeeApiMiddleware = employeeApi.middleware;
    // const employeeApiMiddleware = employeeApi.middleware;
    // const departmentApiMiddleware = departmentApi.middleware;
    // const transactionApiMiddleware = transactionApi.middleware;
    // const payrollApiMiddleware = payrollApi.middleware;
    // const miscellaneousApiMiddleware = miscellaneousApi.middleware;
    // const dummyMiscellaneousApiMiddleware = dummyMiscellaneousApi.middleware;
    // const settingApiMiddleware = settingApi.middleware;
    return getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(formBuilderApiMiddleware)
      .concat(templateApiMiddleware)
      .concat(employeeApiMiddleware);
    // .concat(employeeApiMiddleware)
    // .concat(departmentApiMiddleware)
    // .concat(payrollApiMiddleware)
    // .concat(miscellaneousApiMiddleware)
    // .concat(settingApiMiddleware)
    // .concat(uploadApiMiddleware)
    // .concat(dummyMiscellaneousApiMiddleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector<RootState>;
export default store;
