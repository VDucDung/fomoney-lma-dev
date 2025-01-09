"use client";

import { Button } from "../ui/button";
import { WalletIcon } from "lucide-react";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { useMemo, useState } from "react";
import { useUser } from "@/store/user";
import { AuthProvider } from "@prisma/client";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useMutation } from "@tanstack/react-query";
import { consumeKeyHandler } from "@/services/consumeKey";
import { useAnchor } from "@/hooks/use-anchor";
import { web3 } from "@coral-xyz/anchor";
import { toast } from "@/hooks/use-toast";
import { useFetchUserSeasonInfo } from "@/hooks/use-fetch-user-season-info";
import { useRouter } from "next/navigation";
import { useSetAllowPlay } from "@/store/game";
import { APP_URL } from "@/constants";

export default function ButtonPlayKey() {
  const user = useUser();
  const { setVisible } = useWalletModal();
  const { program } = useAnchor();
  const { refetch: refetchUserSeasonInfo, data } = useFetchUserSeasonInfo();
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const router = useRouter();
  const setAllowPlay = useSetAllowPlay();

  const handleClickPlayWithKey = () => {
    // Check if user is using app via SonicX.app or via mobile.fomoney.app
    if (window.self !== window.top) {
      window.open(APP_URL, "_blank");
      return;
    }

    // Open modal connnect Solana Wallet
    if (!user || user.provider !== AuthProvider.solana) {
      setVisible(true);
    } else {
      setOpenConfirmationModal(true);
    }
  };

  const buttonLabel = useMemo(() => {
    if (!user || user.provider !== AuthProvider.solana) {
      return "Play with Key";
    }
    return "Enter the Game";
  }, [user]);

  const mutateConsumeKey = useMutation({
    mutationFn: consumeKeyHandler,
    mutationKey: ["consumeKeyJoinGame"],
    onSuccess: () => {
      setAllowPlay(true);
      refetchUserSeasonInfo();
      setOpenConfirmationModal(false);
      router.push("/game");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 1500,
      });
    },
  });

  const handleConsumeKey = () => {
    if (!user || user.provider !== AuthProvider.solana) {
      return toast({
        title: "Error",
        description: "Please connect your Solana wallet first",
        variant: "destructive",
        duration: 2000,
      });
    }
    if ((data?.key.toNumber() ?? 0) < 1) {
      return toast({
        title: "Error",
        description: "You don't have enough KEY. Please deposit to get more.",
        variant: "destructive",
        duration: 2000,
      });
    }
    mutateConsumeKey.mutate({
      program,
      signer: new web3.PublicKey(user.address!),
    });
  };

  return (
    <>
      <Button
        onClick={handleClickPlayWithKey}
        className="mx-auto h-12 w-[200px] bg-[#512ca9] text-lg"
      >
        <WalletIcon />
        {buttonLabel}
      </Button>
      <ConfirmationDialog
        closeOnOutsideClick={false}
        open={openConfirmationModal}
        onOpenChange={setOpenConfirmationModal}
        onConfirm={handleConsumeKey}
        description="This will consume your balance of 1 KEY."
        confirmText="Play"
        confirmLoading={mutateConsumeKey.isPending}
        closeOnConfirm={false}
      />
    </>
  );
}
