import { PublicKey } from "@solana/web3.js";
import { useAnchor } from "./use-anchor";
import { useQuery } from "@tanstack/react-query";
import { EContractSeeds, EQueryKey } from "@/constants";

export const useFetchTotalValueLocked = () => {
  const { program } = useAnchor();

  const fetchTvlPoolData = useQuery({
    queryKey: [EQueryKey.tvlPoolData],
    queryFn: async () => {
      const [masterAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from(EContractSeeds.authority)],
        program.programId,
      );
      const masterData = await program.account.master.fetch(masterAccount);

      const [seasonalTvlPool] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(EContractSeeds.seasonal_tvl_pool_seed),
          masterData.seasonId.toArrayLike(Buffer, "le", 8),
        ],
        program.programId,
      );
      const seasonalTvlPoolData =
        await program.account.seasonTvlPool.fetch(seasonalTvlPool);

      return seasonalTvlPoolData;
    },
  });

  return fetchTvlPoolData;
};
