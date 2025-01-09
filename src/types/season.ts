export interface CreateSeasonRequest {
  name: string;
}

export interface UpdatePointRequest {
  point: number;
  season: string;
}

export interface CreateDepositHistory {
  amount: number;
  wallet: string;
  season: string;
}
