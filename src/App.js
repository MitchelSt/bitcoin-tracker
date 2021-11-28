import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [currency, setCurrency] = useState("EUR");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBitcoinValue = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`);

        const data = await response.json();
        setPrice(data.bpi[currency].rate_float);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    getBitcoinValue();
  }, [currency]);

  return (
    <div className="card">
      <p className="title">Bitcoin Prijs Tracker</p>

      <p>1 Bitcoin</p>
      <p>=</p>

      <form>
        <div className="priceData">
          <select className="currency" onChange={e => setCurrency(e.target.value)}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="JPY">JPY</option>
          </select>
          <p className="price">{loading ? "Laden..." : error ? "-" : price}</p>
        </div>
      </form>

      {error && <p className="error">Oops er is iets fout gegaan, probeer het later opnieuw.</p>}
    </div>
  );
}

export default App;
