import { FomoneyStaking } from "@/utils/smart-contracts/fomoney_staking";
import { Program, web3 } from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { BN } from "bn.js";

export const depositHandler = async ({
  amount,
  signer,
  program,
}: {
  amount: number;
  signer: web3.PublicKey;
  program: Program<FomoneyStaking>;
}) => {
  const { blockhash, lastValidBlockHeight } =
    await program.provider.connection.getLatestBlockhash("confirmed");

  const transaction = new Transaction({
    blockhash,
    lastValidBlockHeight,
    feePayer: signer,
  });

  const depositInstruction = await program.methods
    .deposit(new BN(amount * LAMPORTS_PER_SOL))
    .accounts({
      signer,
    })
    .instruction();

  transaction.add(depositInstruction);

  const result = await program?.provider?.sendAndConfirm?.(transaction, [], {
    commitment: "finalized",
  });

  return result;
};
