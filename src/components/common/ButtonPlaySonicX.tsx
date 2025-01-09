"use client";

import { Button } from "@/components/ui/button";
import sonicx from "../../../public/images/sonicx.png";
import Image from "next/image";
import { useUser } from "@/store/user";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { DialogHeader } from "../ui/dialog";
import { XIcon } from "lucide-react";
import { AuthProvider } from "@prisma/client";
import { toast } from "@/hooks/use-toast";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletName } from "@solana/wallet-adapter-base";
import { iframeWallet } from "@/lib/solana-wallet";
import Link from "next/link";
import SelectGameDialog from "./SelectGameDialog";
import { SONIC_APP_URL } from "@/constants";

export default function ButtonPlaySonicX() {
  const user = useUser();
  const [openModalConnectSonicX, setOpenModalConnectSonicX] = useState(false);
  const [openSelectGameModal, setOpenSelectGameModal] = useState(false);

  const handleClickPlay = () => {
    if (!user) {
      setOpenModalConnectSonicX(true);
      return;
    }

    if (user.provider !== AuthProvider.sonicx) {
      return toast({
        title: "Error",
        description: "You must connect your SonicX wallet to play",
        variant: "destructive",
        duration: 2000,
      });
    }
    setOpenSelectGameModal(true);
  };

  const buttonLabel = useMemo(() => {
    if (!user || user.provider !== AuthProvider.sonicx) {
      return "Play with SonicX";
    }
    return "Enter the Game";
  }, [user]);

  return (
    <>
      <Button
        className="mx-auto h-12 w-[200px] bg-yellow-500 text-lg"
        onClick={handleClickPlay}
      >
        <Image src={sonicx} alt="FoMoney2048" width={20} />
        {buttonLabel}
      </Button>
      <ModalConnectSonicX
        open={openModalConnectSonicX}
        onOpenChange={setOpenModalConnectSonicX}
      />
      <SelectGameDialog
        open={openSelectGameModal}
        onOpenChange={setOpenSelectGameModal}
      />
    </>
  );
}

const ModalConnectSonicX = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
}) => {
  const { select, connect } = useWallet();

  const handleConnectSonicX = async () => {
    const linkSonicXApp = SONIC_APP_URL;

    if (iframeWallet.readyState !== "Installed") {
      return toast({
        title: "Error",
        description: (
          <p>
            Please visit{" "}
            <Link className="underline" href={linkSonicXApp} target={"_blank"}>
              {linkSonicXApp}
            </Link>
          </p>
        ),
        variant: "destructive",
      });
    }
    onOpenChange(false);
    select(iframeWallet.name as WalletName);
    await connect();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/60" />
        <DialogContent
          className={`fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#10141f] py-4 shadow-lg`}
        >
          <DialogHeader className="flex w-full justify-end">
            <DialogClose className="flex justify-end px-4 text-right">
              <XIcon />
            </DialogClose>
            <DialogTitle className="mt-2 text-center text-2xl">
              Connect your SonicX wallet <br />
              to continue
            </DialogTitle>
          </DialogHeader>
          <div
            className="mt-10 flex cursor-pointer gap-2 px-4 py-2 hover:bg-[#1a1f2e]"
            onClick={handleConnectSonicX}
          >
            <Image src={sonicx} alt="SonicX" width={28} />
            <p className="text-center text-lg">SonicX</p>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
