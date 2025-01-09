"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import SelectGameDialog from "./SelectGameDialog";
import { useAuthLine } from "@/hooks/use-auth-line";

export default function ButtonPlayLine() {
  useAuthLine();
  const [openSelectGameModal, setOpenSelectGameModal] = useState(false);

  const handleClickPlay = () => {
    setOpenSelectGameModal(true);
  };

  return (
    <>
      <Button
        className="mx-auto h-12 w-[200px] bg-green-500 text-lg"
        onClick={handleClickPlay}
      >
        Enter the Game
      </Button>

      <SelectGameDialog
        open={openSelectGameModal}
        onOpenChange={setOpenSelectGameModal}
      />
    </>
  );
}
