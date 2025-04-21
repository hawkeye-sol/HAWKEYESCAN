
async function paySol(amount) {
    try {
        const provider = window.phantom?.solana;
        if (!provider) {
            alert('Phantom Wallet not found');
            return;
        }
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const fromPubkey = provider.publicKey;
        const toPubkey = new solanaWeb3.PublicKey('2ymfWmDGtvqpTWhHFn2pxhDiTLpStphVFaJDnwjSMTsi');
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey,
                toPubkey,
                lamports: amount * solanaWeb3.LAMPORTS_PER_SOL,
            })
        );
        const signed = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error(error);
        alert("Payment failed.");
    }
}
