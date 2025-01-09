import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import { ArrowBigUpIcon, Gamepad2Icon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { PRICE_PER_KEY } from "@/constants";

interface DepositResultDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  value: number;
}

export default function DepositResultDialog({
  open,
  value,
  onOpenChange,
}: DepositResultDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/70" />
        <DialogContent className="fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-4 shadow-lg">
          <DialogHeader className="flex flex-row justify-between">
            <DialogTitle className="text-left text-lg font-bold text-black">
              Deposit Successful
            </DialogTitle>

            <XIcon
              size={20}
              className="cursor-pointer text-gray-600"
              onClick={() => onOpenChange(false)}
            />
          </DialogHeader>
          <p className="mt-2 text-sm text-gray-600">
            Your deposit has been completed.
          </p>
          <div className="mt-4 rounded-lg border-2 border-yellow-500 px-4 py-2 text-black">
            <div className="text-center">
              <p className="text-sm font-bold text-red-500">Earned Points</p>
              <div className="flex items-center justify-center gap-2 text-5xl font-bold text-yellow-400">
                {(value / PRICE_PER_KEY) * 100}
              </div>
            </div>
            <div className="my-2 h-[2px] w-full bg-yellow-500" />
            <div className="text-center">
              <p className="text-sm font-bold text-red-500">Ranking</p>
              <div className="flex items-center justify-center gap-1 text-3xl font-bold text-green-500">
                <ArrowBigUpIcon size={32} />
                Up
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg border-2 border-yellow-500 bg-gradient-to-br from-purple-300 to-yellow-400 px-4 py-2">
            <Gamepad2Icon className="mx-auto size-28 -rotate-[20deg] text-purple-700" />
            <div>
              <p className="flex-1 font-mono font-bold text-black">
                Earn more points by playing our{" "}
                <span className="text-red-600">GAME!</span>
              </p>
              <Link href="/">
                <Button className="bg-red-500">Play now!</Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
