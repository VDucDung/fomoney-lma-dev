"use client";

import { useSetToken, useToken } from "@/store/user";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Token } from "@prisma/client";
import solana from "../../../public/images/solana.png";
import sonic from "../../../public/images/sonicx.png";
import Image from "next/image";

export default function SelectToken() {
  const selectedToken = useToken();
  const setToken = useSetToken();

  return (
    <Select onValueChange={(value) => setToken(value as Token)}>
      <SelectTrigger className="h-10 border-none bg-[#512DA8] px-2 font-bold">
        {selectedToken === Token.solana ? (
          <Image src={solana} alt="Solana" width={24} height={24} />
        ) : (
          <Image src={sonic} alt="Sonic" width={24} height={24} />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Token.solana}>Solana</SelectItem>
        <SelectItem value={Token.sonic}>Sonic</SelectItem>
      </SelectContent>
    </Select>
  );
}
