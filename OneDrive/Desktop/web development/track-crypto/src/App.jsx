import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Coins from "./components/Coins";
import CoinsDetail from "./components/CoinsDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:id" element={<CoinsDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
