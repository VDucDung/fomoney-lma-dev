import { AuthProvider } from "./../../node_modules/.prisma/client/index.d";
import { LineUser, RankingResponse, User } from "@/types/user";
import axios from "axios";

export const fetchRankings = async (
  provider: AuthProvider,
): Promise<RankingResponse> => {
  const response = await axios.get("/api/ranking", {
    params: {
      provider,
    },
  });
  return response.data;
};

export const auth = async ({
  provider,
  credential,
}: {
  provider: AuthProvider;
  credential?: string;
}): Promise<{ accessToken: string; user: User }> => {
  const response = await axios.post("/api/auth", {
    provider,
    credential,
  });
  return response.data;
};

export const authLine = async ({
  accessToken
}: {
  accessToken: string;
}): Promise<{ accessToken: string; user: User, lineUser: LineUser }> => {
  const response = await axios.post("/api/verify-line", {
    accessToken
  });
  return response.data;
};

export const fetchUserInfo = async ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const response = await axios.get("/api/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
