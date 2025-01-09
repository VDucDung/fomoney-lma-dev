"use client";

import { useUserActions } from "@/store/user";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState, useRef } from "react";
import { authLine } from "@/services/user";
import liff from "@line/liff";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; 

export const useAuthLine = () => {
  const LIFF_ID = process.env.NEXT_PUBLIC_LIFF_ID as string;
  const { updateUser, setAccessToken } = useUserActions();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const retryCount = useRef(0);
  const initializeTimeout = useRef<NodeJS.Timeout | null>(null);

  const initializeLiff = useCallback(async () => {
    try {
      if (!isInitialized) { 
        await liff.init({ liffId: LIFF_ID });
        setIsInitialized(true);
        retryCount.current = 0; 
  
        if (liff.isLoggedIn()) {
          setIsLoggedIn(true);
        } else {
          liff.login();
        }
      }
    } catch (error) {
      console.error("Failed to initialize LIFF:", error);
  
      if (retryCount.current < MAX_RETRIES) {
        retryCount.current += 1;
        console.log(`Retrying initialization (${retryCount.current}/${MAX_RETRIES})...`);
  
        initializeTimeout.current = setTimeout(initializeLiff, RETRY_DELAY);
      } else {
        console.error(`Failed to initialize after ${MAX_RETRIES} attempts`);
      }
    }
  }, [LIFF_ID, isInitialized]);
  

  useEffect(() => {
    return () => {
      if (initializeTimeout.current) {
        clearTimeout(initializeTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      initializeLiff();
    }
  }, [initializeLiff, isInitialized]);
  

  const mutateAuth = useMutation({
    mutationKey: ["auth_line"],
    mutationFn: authLine,
    retry: MAX_RETRIES, 
    retryDelay: RETRY_DELAY,
    onSuccess: (data) => {
      updateUser({
        provider: data.user.provider,
        address: data.user.address,
        point: data.user.point,
        season: data.user.season,
        lineUser: data.lineUser,
      });
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
    },
    onError: (error) => {
      console.error("Auth API error:", error);
      localStorage.removeItem("accessToken");
    },
  });

  const handleLogin = useCallback(
    async (accessToken: string) => {
      try {
        await mutateAuth.mutateAsync({ accessToken });
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [mutateAuth],
  );

  useEffect(() => {
    const verifyAccessToken = async () => {
      if (!isInitialized) return;
  
      const liffAccessToken = liff.getAccessToken();
      const storedAccessToken = localStorage.getItem("accessToken");
      console.log("Auth success:", liffAccessToken);

      const accessToken = liffAccessToken || storedAccessToken;
  
      if (accessToken) {
        try {
          await handleLogin(accessToken);
        } catch (error) {
          console.error("Error verifying access token:", error);
        }
      }
    };
  
    verifyAccessToken();
  }, [isInitialized]); 
  

  return { 
    isLoggedIn, 
    isInitialized,
    isLoading: mutateAuth.isPending,
    error: mutateAuth.error
  };
};
