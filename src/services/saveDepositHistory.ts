import { CreateDepositHistory } from "@/types/season";

export const saveDepositHistory = async ({
  amount,
  wallet,
  season,
  accessToken,
}: {
  amount: number;
  wallet: string;
  season: string;
  accessToken: string | null;
}) => {
  const url = "/api/deposit-history";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const body: CreateDepositHistory = {
    amount,
    season,
    wallet,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  return response.json();
};
