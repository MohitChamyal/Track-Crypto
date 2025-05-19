import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Coins from "./components/Coins";
import CoinsDetail from "./components/CoinsDetail";
import LandingPage from "./components/LandingPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coins/:id" element={<CoinsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
