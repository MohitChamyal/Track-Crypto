import { useState, useEffect } from "react";
import Header from "./Header";
import "./Coins.css";
import CoinSummary from "./CoinSummary";
import axios from "axios";
import Footer from "./Footer";

const Coins = () => {
  const baseUrl = "https://api.coingecko.com/api/v3/coins/markets";
  const [exchanges, setExchanges] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [symbol, setSymbol] = useState("₹");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [sortType, setSortType] = useState("all");
  const [visibleCount, setVisibleCount] = useState(15);

  const currencySymbols = {
    inr: "₹",
    usd: "$",
    rub: "₽",
    jpy: "¥",
    brl: "R$",
  };

  useEffect(() => {
    const getExchangesData = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}?vs_currency=${currency}`);
        setExchanges(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error("Error fetching exchanges data:", error);
      }
    };
    getExchangesData();
  }, [currency]);

  const handleCurrencyChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    setSymbol(currencySymbols[selectedCurrency]);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredCoins(exchanges);
      return;
    }

    const filtered = exchanges.filter((coin) =>
      coin.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCoins(filtered);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortType(sortValue);

    if (sortValue === "positive") {
      const positiveCoins = exchanges.filter(
        (coin) => coin.price_change_percentage_24h >= 0
      );
      setFilteredCoins(positiveCoins);
    } else if (sortValue === "negative") {
      const negativeCoins = exchanges.filter(
        (coin) => coin.price_change_percentage_24h < 0
      );
      setFilteredCoins(negativeCoins);
    } else {
      setFilteredCoins(exchanges);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCoins(exchanges);
    } else {
      const filtered = exchanges.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCoins(filtered);
    }
  }, [exchanges, searchQuery]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <Header />
      <div className="content">
        <div className="selectItem">

          <div className="currency">
            <label>Choose a currency:</label>
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="inr">INR</option>
              <option value="usd">USD</option>
              <option value="rub">RUB</option>
              <option value="jpy">YEN</option>
              <option value="brl">BRL</option>
            </select>
          </div>

          <div className="searchBar">
            <input
              type="text"
              placeholder="Search for a cryptocurrency..."
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          <div className="sort">
            <label>Sort By Change:</label>
            <select value={sortType} onChange={handleSortChange}>
              <option value="all">ALL</option>
              <option value="positive">POSITIVE</option>
              <option value="negative">NEGATIVE</option>
            </select>
          </div>
        </div>

        <div className="coinSummary">
          {filteredCoins.slice(0, visibleCount).map((item, i) => (
            <CoinSummary
              key={i}
              name={item.name}
              price={`${symbol}${item.current_price}`}
              image={item.image}
              id={item.id}
              change={item.price_change_percentage_24h.toFixed(2)}
            />
          ))}
        </div>

        {filteredCoins.length === 0 && (
          <p className="no-results">No coins match your search.</p>
        )}

        {visibleCount < filteredCoins.length && (
          <button className="load-more-btn" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Coins;
