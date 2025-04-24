
<script src="https://cdn.jsdelivr.net/npm/@solana/web3.js@latest/lib/index.iife.js"></script>
<script>
async function pay(amountSol) {
    const recipient = new solanaWeb3.PublicKey("2ymfWmDGtvqpTWhHFn2pxhDiTLpStphVFaJDnwjSMTsi");
    const provider = window.solana;

    if (!provider?.isPhantom) {
        alert("Phantom Wallet not found!");
        return;
    }

    try {
        await provider.connect();
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: provider.publicKey,
                toPubkey: recipient,
                lamports: amountSol * solanaWeb3.LAMPORTS_PER_SOL
            })
        );

        const { signature } = await provider.signAndSendTransaction(transaction);
        await connection.confirmTransaction(signature, "processed");

        alert("Payment successful! Redirecting...");
        window.location.href = "dashboard.html";

    } catch (err) {
        console.error("Transaction failed", err);
        alert("Transaction failed. Please try again.");
    }
}
</script>
