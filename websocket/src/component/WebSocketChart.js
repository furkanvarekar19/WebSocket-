import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const WebSocketChart = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const wsRef = useRef(null);
  
  useEffect(() => {
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${interval}`;
    wsRef.current = new WebSocket(wsUrl);
    
    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const candle = data.k;
      if (candle.x) { // If candle is closed
        setChartData((prevData) => [...prevData, candle.c]);
        setChartLabels((prevLabels) => [...prevLabels, new Date(candle.t).toLocaleTimeString()]);
      }
    };
    

    return () => {
      wsRef.current.close();
    };
  }, [symbol, interval]);

  const data = {
    labels: chartLabels,
    datasets: [{
      label: `${symbol} Price`,
      data: chartData,
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  };


  return (
    <div>
      <Line data={data} />
    </div>
  );
};

export default WebSocketChart;
