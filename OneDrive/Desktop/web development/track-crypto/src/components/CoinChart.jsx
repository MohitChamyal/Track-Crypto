import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import './CoinChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

const CoinChart = ({ id, currency }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7); 
  const [error, setError] = useState("");

  const marketChartUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(marketChartUrl);
        setChartData(data.prices);
        setError("");
      } catch (error) {
        setError("Failed to fetch chart data.");
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [id, currency, days]); 

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="error">{error}</p>;

  const formattedData = chartData
    ? {
        labels: chartData.map((value) => {
          const date = new Date(value[0]);
          const time = date.getHours() > 12 
            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
            : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            label: `Price in last ${days} days (${currency.toUpperCase()})`,
            data: chartData.map((value) => value[1]),
            borderColor: "orange",
            borderWidth: 3,
          },
        ],
      }
    : null;

  return (
    <div className="chart-container">
      {chartData ? <Line data={formattedData} options={{ elements: { point: { radius: 2 } } }} /> : <p>No data available</p>}

      <div className="chart-controls">
        {[{ label: "1D", value: 1 }, { label: "7D", value: 7 }, { label: "1M", value: 30 }, { label: "3M", value: 90 }, { label: "1Y", value: 365 }]
          .map((option) => (
            <button
              key={option.value}
              className={`chart-btn ${days === option.value ? "active" : ""}`}
              onClick={() => setDays(option.value)}
            >
              {option.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default CoinChart;
