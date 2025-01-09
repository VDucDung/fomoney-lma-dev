"use client";

import { DAPP_QUERY_KEY } from "@/constants";
import { useSearchParams } from "next/navigation";

export default function DappGamePage() {
  const searchParams = useSearchParams();
  const dappUrl = searchParams.get(DAPP_QUERY_KEY);

  if (!dappUrl) {
    return "Game not found";
  }

  return <iframe src={dappUrl} width="100%" height={"80%"} />;
}
