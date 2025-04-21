
export async function connect() {
  if (!window.solana) {
    alert('Please install Phantom Wallet!');
    return null;
  }

  const resp = await window.solana.connect();
  return resp.publicKey.toString();
}

export async function sendTransaction(amount, toPubkey) {
  try {
    const provider = window.solana;
    const connection = new window.solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
    const fromPubkey = provider.publicKey;
    const to = new window.solanaWeb3.PublicKey(toPubkey);

    const tx = new window.solanaWeb3.Transaction().add(
      window.solanaWeb3.SystemProgram.transfer({
        fromPubkey,
        toPubkey: to,
        lamports: parseFloat(amount) * 1e9
      })
    );

    tx.feePayer = fromPubkey;
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

    const signed = await provider.signTransaction(tx);
    const sig = await connection.sendRawTransaction(signed.serialize());
    await connection.confirmTransaction(sig);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
