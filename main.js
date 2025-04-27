
async function autoConnect() {
    if (window.solana && window.solana.isPhantom) {
        try {
            await window.solana.connect({ onlyIfTrusted: false });
            console.log("Wallet connected automatically.");
        } catch (err) {
            console.error("Auto-connection failed:", err);
        }
    } else {
        alert("Phantom Wallet not found. Please install it.");
    }
}

async function pay(months) {
    if (!window.solana || !window.solana.isPhantom) {
        alert("Phantom Wallet not found! Please install it.");
        return;
    }

    try {
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const provider = window.solana;

        const publicKey = provider.publicKey;
        const transaction = new solanaWeb3.Transaction();
        const receiver = new solanaWeb3.PublicKey("2ymfWmDGtvqpTWhHFn2pxhDiTLpStphVFaJDnwjSMTsi");

        let lamports = 0;
        if (months === '1') {
            lamports = 0.25 * solanaWeb3.LAMPORTS_PER_SOL;
        } else {
            lamports = 0.5 * solanaWeb3.LAMPORTS_PER_SOL;
        }

        const instruction = solanaWeb3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: receiver,
            lamports: lamports,
        });

        transaction.add(instruction);
        transaction.feePayer = publicKey;
        let { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;

        const signed = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        await connection.confirmTransaction(signature);

        // Nach Zahlung weiterleiten
        window.location.href = "info.html";
    } catch (err) {
        console.error("Transaction Failed: ", err);
        alert("Transaction cancelled or failed.");
    }
}
