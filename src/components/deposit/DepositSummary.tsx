"use client";

import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import sonicx from "../../../public/images/sonicx.png";
import solana from "../../../public/images/solana.png";
import ring from "../../../public/images/ring.png";
import { useFetchTotalValueLocked } from "@/hooks/use-fetch-total-value-locked";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { PRIZED_POOL } from "@/constants";
import { useToken } from "@/store/user";
import { Token } from "@prisma/client";

export default function DepositSummary() {
  const tvlPoolData = useFetchTotalValueLocked();
  const selectedToken = useToken();

  const depositAmount =
    (tvlPoolData.data?.deposited.toNumber() ?? 0) / LAMPORTS_PER_SOL;
  return (
    <div>
      <SectionTitle label="Deposit" />
      <div className="rounded-lg border-2 border-yellow-500 p-4">
        <div className="text-center">
          <p className="text-xl font-bold">Total Value Locked</p>
          <div className="flex items-center justify-center gap-2 text-5xl font-bold text-yellow-500">
            {selectedToken === Token.solana ? (
              <Image src={solana} alt="Solana" width={40} height={40} />
            ) : (
              <Image src={sonicx} alt="Sonic" width={48} height={48} />
            )}
            <span className="font-digital text-shadow-blue">
              {depositAmount.toLocaleString("en-US")}
            </span>
          </div>
        </div>
        <div className="my-4 h-[2px] w-full bg-yellow-500" />
        <div className="text-center">
          <p className="text-xl font-bold">Prized Pool</p>
          <div className="flex items-center justify-center gap-2 text-5xl font-bold text-yellow-500">
            <Image src={ring} width={40} height={40} alt="Sonic X" />
            <span className="font-digital text-shadow-blue">
              {PRIZED_POOL.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
