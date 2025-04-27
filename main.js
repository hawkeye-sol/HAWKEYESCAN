
async function pay(months) {
    const amount = months === '1' ? 0.25 : 0.5;
    const recipient = "2ymfWmDGtvqpTWhHFn2pxhDiTLpStphVFaJDnwjSMTsi";
    try {
        // Hier würde normalerweise Phantom Wallet Connect und Payment aufgerufen
        alert("Simulating payment of " + amount + " SOL to " + recipient);
        window.location.href = "info.html";
    } catch (error) {
        console.error(error);
    }
}
    