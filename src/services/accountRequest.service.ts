import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { store, useAppSelector } from "../store";
import {
  ProfileState,
  profileLoginAction,
  profileLogoutAction,
  profileUpdateAction,
} from "../store/profile.slice";
import API, { API_ACCOUNT_HOST } from "@/constants/api.constant";
import { useSnackbar } from "notistack";

interface IRequestState<T> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error?: AxiosError<T>;
  data?: T;
}

interface IRequestConfig extends AxiosRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

const useAccountRequest = () => {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { accessToken: token, refreshToken: refresh } = useAppSelector(
    (state) => state.profile
  ) as ProfileState;

  const [source] = useState(axios.CancelToken.source());

  const [requestState, setRequestState] = useState<IRequestState<any>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  useEffect(
    () => () => {
      requestState.isLoading && source.cancel("This was cancelled!");
    },
    []
  );

  const logout = () => {
    dispatch(profileLogoutAction());
    navigate.push("/");
  };

  const makeRequest = useCallback(
    async (config: IRequestConfig) => {
      setRequestState({ isLoading: true, isSuccess: false, isError: false });

      const axiosInstance = axios.create({
        baseURL: API_ACCOUNT_HOST,
        cancelToken: source.token,
      });

      const promise = new Promise<AxiosResponse | AxiosError>((res, rej) => {
        const rejectErr = (error: AxiosError | any) => {
          setRequestState({
            isLoading: false,
            isSuccess: false,
            isError: true,
            error,
          });
          rej(error);
        };

        const retryRequest = (
          config: IRequestConfig,
          user: { accessToken: string; refreshToken: string }
        ) => {
          axiosInstance.defaults.headers.common.Authorization = token
            ? `Bearer ${token}`
            : "";
          axiosInstance
            .request(config)
            .then((response) => {
              setRequestState({
                isLoading: false,
                isSuccess: true,
                isError: false,
                data: response.data,
              });
              res(response);
            })
            .catch((err) => {
              rej(err);
            });
        };

        // eslint-disable-next-line consistent-return
        const request = async () => {
          try {
            const {
              accessToken,
              refreshToken: refresh,
            } = store.getState().profile;
            axiosInstance.defaults.headers.common.Authorization = accessToken
              ? `Bearer ${accessToken}`
              : "";

            const response: AxiosResponse<any> = await axiosInstance.request(
              config
            );
            setRequestState({
              isLoading: false,
              isSuccess: true,
              isError: false,
              data: response.data,
            });

            res(response);
          } catch (error: AxiosError | any) {
            const { code } = error;
            const networkErrorCodes = ["ERR_CONNECTION_REFUSED", "ERR_NETWORK"];

            // global error
            if (networkErrorCodes.includes(code))
              enqueueSnackbar(
                "Make sure you have a proper internet connection!",
                {
                  variant: "rope_snackbar",
                  error: true,
                }
              );

            if (!axios.isCancel(error)) {
              // reject returns catch
              if (!token) return rejectErr(error);

              // Authentication Checker...
              const authTokenErrors = [401, 403];
              const data = error.response;
              if (authTokenErrors.includes(error.response)) {
                enqueueSnackbar(
                  "You are not authorized to make this request!",
                  {
                    variant: "rope_snackbar",
                    autoHideDuration: 5000,
                    error: true,
                  }
                );
                logout();
              } else if (
                authTokenErrors.includes(error.response) ||
                data?.message === "invalid signature"
              ) {
                logout();
              } else {
                rejectErr(error);
              }
            }
          }
        };

        request();
      });

      return promise as unknown as Promise<AxiosResponse>;
    },
    [navigate, source]
  );

  return { makeRequest, ...requestState };
};

export default useAccountRequest;
