import React, { useState } from 'react';
import WebSocketChart from './component/WebSocketChart'

const App = () => {
  const [selectedCoin, setSelectedCoin] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setInterval(event.target.value);
  };

  return (
    <div className="App">
      <h1>Binance Market Data</h1>
      <select onChange={handleCoinChange} value={selectedCoin}>
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </select>

      <select onChange={handleIntervalChange} value={interval}>
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minute</option>
        <option value="5m">5 Minute</option>
      </select>

      <WebSocketChart symbol={selectedCoin} interval={interval} />
    </div>
  );
};

export default App;
