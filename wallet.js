
async function pay(amount) {
  if (!window.solana || !window.solana.isPhantom) {
    alert("Phantom Wallet not found!");
    return;
  }
  try {
    const resp = await window.solana.connect();
    const provider = window.solana;
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: new solanaWeb3.PublicKey("2ymfWmDGtvqpTWhHFn2pxhDiTLpStphVFaJDnwjSMTsi"),
        lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
      })
    );
    const { blockhash } = await new solanaWeb3.Connection("https://api.mainnet-beta.solana.com").getRecentBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = provider.publicKey;
    const signed = await provider.signTransaction(transaction);
    const signature = await new solanaWeb3.Connection("https://api.mainnet-beta.solana.com").sendRawTransaction(signed.serialize());
    alert("Payment successful! Redirecting...");
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Payment failed or canceled.");
  }
}
