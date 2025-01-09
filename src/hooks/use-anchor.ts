import { web3, AnchorProvider, setProvider, Program } from "@coral-xyz/anchor";
import idl from "@/utils/smart-contracts/fomoney_staking.json";
import { FomoneyStaking } from "@/utils/smart-contracts/fomoney_staking";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { endpoint } from "@/lib/solana-wallet";

export const useAnchor = () => {
  const wallet = useAnchorWallet();

  const provider = new AnchorProvider(new web3.Connection(endpoint), wallet!);
  setProvider(provider);

  const program = new Program<FomoneyStaking>(idl as FomoneyStaking, provider);

  const [master] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("master")],
    program.programId,
  );
  return { program, provider, wallet, masterProgramAddress: master };
};
