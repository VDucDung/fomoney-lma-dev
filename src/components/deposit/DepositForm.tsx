"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import DepositResultDialog from "./DepositResultDialog";
import { useToast } from "@/hooks/use-toast";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { useMutation } from "@tanstack/react-query";
import { depositHandler } from "@/services/deposit";
import { useAnchor } from "@/hooks/use-anchor";
import { web3 } from "@coral-xyz/anchor";
import { LoaderCircle } from "lucide-react";
import { PRICE_PER_KEY } from "@/constants";
import { useFetchTotalValueLocked } from "@/hooks/use-fetch-total-value-locked";
import { useFetchUserSeasonInfo } from "@/hooks/use-fetch-user-season-info";
import { useAccessToken, useToken, useUser } from "@/store/user";
import { AuthProvider, Token } from "@prisma/client";
import { saveDepositHistory } from "@/services/saveDepositHistory";
import { updatePoint } from "@/services/updatePoint";

export default function DepositForm() {
  const [openResultModal, setOpenResultModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const user = useUser();
  const { program } = useAnchor();
  const { refetch: refetchTvl } = useFetchTotalValueLocked();
  const { refetch: refetchUserSeasonInfo, data: userInfoSeason } =
    useFetchUserSeasonInfo();
  const accessToken = useAccessToken();
  const selectedToken = useToken();

  const handleClickDeposit = () => {
    if (!user || user.provider !== AuthProvider.solana) {
      return toast({
        title: "Error",
        description: "Please connect your Solana wallet first",
        variant: "destructive",
        duration: 2000,
      });
    }

    if (!value || +value < PRICE_PER_KEY) {
      return toast({
        title: "Error",
        description:
          "Please enter a valid amount to deposit. Minimum amount is 0.01 SOL",
        variant: "destructive",
        duration: 2000,
      });
    }

    if (Math.abs(+value % PRICE_PER_KEY) > Number.EPSILON) {
      return toast({
        title: "Error",
        description: `Please enter a multiple of ${PRICE_PER_KEY} SOL`,
        variant: "destructive",
        duration: 2000,
      });
    }

    setOpenConfirmationModal(true);
  };

  const mutateDeposit = useMutation({
    mutationFn: depositHandler,
    onSuccess: () => {
      setOpenResultModal(true);
      refetchTvl();
      refetchUserSeasonInfo();
      saveDepositHistory({
        amount: +value,
        season: userInfoSeason?.seasonId.toString() ?? "0",
        wallet: user?.address ?? "",
        accessToken: accessToken ?? "",
      });
      updatePoint(
        accessToken,
        Math.floor(+value / PRICE_PER_KEY) * 100,
        userInfoSeason?.seasonId.toString() ?? "0",
      );
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

  const startDeposit = async () => {
    if (!user) {
      return;
    }
    await mutateDeposit.mutateAsync({
      program,
      amount: +value,
      signer: new web3.PublicKey(user.address!),
    });
  };

  return (
    <div className="relative rounded-lg border-[1px] border-gray-500 p-4">
      <p className="mb-4 text-xl font-bold">Deposit</p>
      <div className="relative w-full">
        <Input
          type="number"
          placeholder="Enter amount to deposit"
          className="pr-10"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min={0.01}
          required
        />
        <p className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-gray-400 px-2 text-sm text-white">
          {selectedToken === Token.solana ? "SOL" : "Sonic"}
        </p>
      </div>
      <Button
        disabled={mutateDeposit.isPending}
        className="mt-4 w-full bg-yellow-600 hover:bg-yellow-600 hover:opacity-80"
        onClick={handleClickDeposit}
      >
        {mutateDeposit.isPending ? (
          <>
            <LoaderCircle className="animate-spin" />
            Processing...
          </>
        ) : (
          "Deposit"
        )}
      </Button>
      <ConfirmationDialog
        open={openConfirmationModal}
        onOpenChange={setOpenConfirmationModal}
        onConfirm={startDeposit}
        width="max-w-sm"
        description={`You are about to deposit ${value} SOL.`}
      />
      <DepositResultDialog
        value={+value}
        open={openResultModal}
        onOpenChange={setOpenResultModal}
      />
    </div>
  );
}
