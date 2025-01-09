import { useWallet } from "@solana/wallet-adapter-react";
import { EContractSeeds, EQueryKey } from "@/constants";
import { PublicKey } from "@solana/web3.js";
import { useQuery } from "@tanstack/react-query";
import { useAnchor } from "./use-anchor";
import { BN } from "bn.js";

export const useFetchUserSeasonInfo = () => {
  const { program } = useAnchor();
  const { publicKey } = useWallet();

  const fetchSeasonUserInfo = useQuery({
    queryKey: [EQueryKey.seasonUserInfo, publicKey],
    queryFn: async () => {
      if (!publicKey)
        return {
          deposited: new BN(0),
          staked: new BN(0),
          key: new BN(0),
          point: new BN(0),
          userPubkey: "",
          seasonId: new BN(0),
          usedKey: new BN(0),
        };
      const [masterAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from(EContractSeeds.authority)],
        program.programId,
      );
      const masterData = await program.account.master.fetch(masterAccount);

      const [seasonUserInfo] = PublicKey.findProgramAddressSync(
        [
          Buffer.from(EContractSeeds.user_seanonal_info_seed),
          masterData.seasonId.toArrayLike(Buffer, "le", 8),
          publicKey.toBuffer(),
        ],
        program.programId,
      );

      const seasonUserData =
        await program.account.userSeasonalInfo.fetch(seasonUserInfo);
      return seasonUserData;
    },
    enabled: !!publicKey,
  });

  return fetchSeasonUserInfo;
};
