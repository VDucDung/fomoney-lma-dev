import { auth } from "@/services/user";
import { useUserActions } from "@/store/user";
import { AuthProvider } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SONICX_IFRAME_WALLET_NAME } from "@/constants";

export const useAuth = () => {
  const { updateUser, setAccessToken } = useUserActions();

  const { wallet, publicKey, disconnect } = useWallet();

  const mutateAuth = useMutation({
    mutationKey: ["auth"],
    mutationFn: auth,
    onSuccess: (data, variables) => {
      updateUser({
        provider: variables.provider!,
        address: variables.credential!,
        point: data.user.point,
        season: data.user.season,
      });
      setAccessToken(data.accessToken);
    },
    onError: () => {
      disconnect();
    },
  });

  const handleLogin = useCallback(
    async (walletAddress: string, walletName?: string) => {
      const response = await mutateAuth.mutateAsync({
        provider:
          walletName === SONICX_IFRAME_WALLET_NAME
            ? AuthProvider.sonicx
            : AuthProvider.solana,
        credential: walletAddress,
      });
      return response.accessToken;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (publicKey) {
      handleLogin(publicKey.toBase58(), wallet?.adapter.name);
    }
  }, [wallet, publicKey, handleLogin]);
};
