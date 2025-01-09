/* eslint-disable no-unused-vars */
export const PRICE_PER_KEY = 0.01;

export enum EQueryKey {
  tvlPoolData = "tvlPoolData",
  seasonUserInfo = "seasonUserInfo",
}

export enum EContractSeeds {
  user_seanonal_info_seed = "user_seanonal_info_seed",
  authority = "authority",
  seasonal_tvl_pool_seed = "seasonal_tvl_pool_seed",
  seasonal_pool_prize_seed = "seasonal_pool_prize_seed",
}

export const PRIZED_POOL = 6000;

export const SONICX_IFRAME_WALLET_NAME = "SonicX";

// 7 days
export const SEASON_DURATION = 7 * 24 * 60 * 60 * 1000;

export const DAPP_QUERY_KEY = "dapp";

export enum EGameType {
  inner = "inner",
  embed = "embed",
}

export const APP_URL = "https://mobile.fomoney.io/";
export const SONIC_APP_URL = `https://sonicx.app/dapp?url=%20${APP_URL}`;
