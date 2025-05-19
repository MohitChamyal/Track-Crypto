import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CoinsDetail.css";
import Header from "./Header";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from "./CoinChart";
import Footer from './Footer'

const CoinsDetail = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [symbol, setSymbol] = useState("$");

  const baseUrl = "https://api.coingecko.com/api/v3/coins";

  const currencySymbols = {
    inr: "₹",
    usd: "$",
    rub: "₽",
    jpy: "¥",
    brl: "R$",
  };

  useEffect(() => {
    const getCoin = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${baseUrl}/${id}`, {
          params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
          },
        });
        setCoin(data);
        setError("");
      } catch (error) {
        setError("Failed to fetch coin details.");
        console.error("Error fetching coin details:", error);
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, [id]);

  const priceChange = coin?.market_data?.price_change_percentage_24h;
  const arrowColor = priceChange > 0 ? "green" : "red";

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    setSymbol(currencySymbols[newCurrency]);
  };

  return (
    <>
      <Header />
      <div className="coin-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <div className="coin-detail">
              <div className="currency">
                <label>Choose a currency:</label>
                <select value={currency} onChange={handleCurrencyChange}>
                  {Object.keys(currencySymbols).map((cur) => (
                    <option key={cur} value={cur}>{cur.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="time">Last Updated: {new Date(coin.last_updated).toLocaleString()}</div>
              <div className="coin-image">
                <img src={coin.image.large} alt={coin.name} />
              </div>
              <div className="coin-name">{coin.name} ({coin.symbol.toUpperCase()})</div>
              <div className="coin-price">
                Price: {symbol} {coin.market_data.current_price[currency]?.toLocaleString()}
              </div>
              <div className="coin-profit">
                {priceChange > 0 ? (
                  <BiSolidUpArrow style={{ color: arrowColor }} />
                ) : (
                  <BiSolidDownArrow style={{ color: arrowColor }} />
                )}
                <span style={{ color: arrowColor }}>{priceChange?.toFixed(2)}%</span>
              </div>
              <div className="market-rank">
                <IoPulseOutline/> #{coin.market_cap_rank}
              </div>
              <div className="coin-desc">{coin.description.en.split(".")[0]}</div>
            </div>

            <div className="coin-chart">
              <CoinChart id={id} currency={currency} />
            </div>
          </>
        )}
      </div>
      <Footer></Footer>
    </>
  );
};

export default CoinsDetail;
