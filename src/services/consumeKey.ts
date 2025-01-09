import { FomoneyStaking } from "@/utils/smart-contracts/fomoney_staking";
import { Program, web3 } from "@coral-xyz/anchor";
import { Transaction } from "@solana/web3.js";

export const consumeKeyHandler = async ({
  signer,
  program,
}: {
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

  const consumeKeyInstruction = await program.methods
    .joinGame()
    .accounts({
      signer,
    })
    .instruction();

  transaction.add(consumeKeyInstruction);

  const result = await program?.provider?.sendAndConfirm?.(transaction, [], {
    commitment: "finalized",
  });

  return result;
};
