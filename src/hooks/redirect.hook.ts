"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../store";
import useGlobalState from "./globalstate.hook";

export const useAuthRedirect = () => {
  const { profile } = useGlobalState();
  const router = useRouter();
  const isAuth = useAppSelector((store) => store.profile.accessToken);

  useEffect(() => {
    if (isAuth) {
      if (profile?.role === "Customer") {
        router.replace("/dashboard");
      } else {
        router.replace("/admin/dashboard");
      }
    } else {
      router.replace("/login");
    }
  }, []);

  return isAuth;
};