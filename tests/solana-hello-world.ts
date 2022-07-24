import * as anchor from "@project-serum/anchor";
import { Program, BN } from "@project-serum/anchor";
import { SolanaHelloWorld } from "../target/types/solana_hello_world";
import { expect, assert } from 'chai'

describe("solana-hello-world", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaHelloWorld as Program<SolanaHelloWorld>;

  it("Hello World Test Version", async () => {
    // Add your test here.
    const baseAccount = anchor.web3.Keypair.generate();
    console.log(baseAccount);
    const wallet = (program.provider as anchor.AnchorProvider).wallet
    console.log(wallet)
    const tx = await program.methods.create().accounts({
      baseAccount: baseAccount.publicKey,
      user: wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    }).signers([baseAccount]).rpc();
    console.log("Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(baseAccount.publicKey)
    expect(new BN(account.count)).to.equal(new BN("0"))
  });
});
