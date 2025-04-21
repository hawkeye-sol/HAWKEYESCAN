import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, []);

  const fetchCoins = async () => {
    try {
      const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 20,
          page: 1,
          sparkline: false,
          category: "memes"
        }
      });
      setCoins(res.data);
    } catch (error) {
      console.error("Error loading coins:", error);
    }
  };

  return (
    <div>
      <h1>HawkScan – MemeCoin Tracker</h1>
      {coins.map((coin) => (
        <div className="coin-card" key={coin.id}>
          <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
          <p>Price: ${coin.current_price.toFixed(4)}</p>
          <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
          <p style={{ color: coin.price_change_percentage_24h > 10 ? "lime" : "white" }}>
            {coin.price_change_percentage_24h > 10 ? "BUY SIGNAL" : "HOLD"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
