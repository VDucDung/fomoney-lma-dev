import { AuthProvider, Season } from "@prisma/client";

export interface Ranking {
  point: number;
  User: {
    id: string;
    wallet: string;
  };
}

export interface AuthRequest {
  provider: AuthProvider;
  credential: string;
}

export interface LineUser{
  userLineId: string;
  displayName: string;
  pictureUrl: string;
}

export interface User {
  address: string;
  provider: AuthProvider;
  point?: number;
  season: string;
  lineUser?: LineUser;
}

export interface RankingResponse {
  rankings: Ranking[];
  season: Season;
}
