import React, { useState } from "react";
import "./Styles.css";
import {
  fetchCarrierQuotes,
  hsCodeAutocomplete,
  bestValueSelection,
  trackByAWB,
} from "./CarrierService";

export default function App() {
  const [description, setDescription] = useState("");
  const [hsSuggestions, setHsSuggestions] = useState([]);

  const [form, setForm] = useState({
    from: "",
    to: "",
    weight: "",
    demoMode: true,
  });

  const [quotes, setQuotes] = useState([]);
  const [bestOption, setBestOption] = useState(null);

  const [trackingInput, setTrackingInput] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  // HS Autocomplete
  const handleHSInput = (value) => {
    setDescription(value);
    setHsSuggestions(hsCodeAutocomplete(value));
  };

  // Quote Fetch
  const handleSubmitQuotes = async () => {
    const carrierQuotes = await fetchCarrierQuotes(form);
    setQuotes(carrierQuotes);
    setBestOption(bestValueSelection(carrierQuotes));
  };

  // Tracking
  const handleTrackingSearch = () => {
    setTrackingResult(trackByAWB(trackingInput));
  };

  return (
    <div className="app-container">
      <header className="header">Adora‑RealTime Shipping Aggregator</header>

      {/* HS CODE */}
      <section className="card">
        <h2 className="section-title">HS Code Autocomplete</h2>
        <input
          className="input"
          placeholder="Enter product description…"
          value={description}
          onChange={(e) => handleHSInput(e.target.value)}
        />
        {hsSuggestions.length > 0 && (
          <ul className="suggestions">
            {hsSuggestions.map((s) => (
              <li key={s.code}>
                {s.code} — {s.label}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* SHIPPING QUOTES */}
      <section className="card">
        <h2 className="section-title">Get Shipping Quotes</h2>
        <div className="flex-row">
          <input
            className="input"
            placeholder="From Country"
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />
          <input
            className="input"
            placeholder="To Country"
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />
        </div>

        <div className="flex-row">
          <input
            className="input"
            placeholder="Weight (kg)"
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />
          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.demoMode}
              onChange={() =>
                setForm({ ...form, demoMode: !form.demoMode })
              }
            />
            Demo Mode
          </label>
        </div>

        <button className="btn" onClick={handleSubmitQuotes}>
          Fetch Rates
        </button>

        {quotes.length > 0 && (
          <div>
            <h3 className="section-sub">Carrier Results</h3>
            <ul className="list">
              {quotes.map((q, idx) => (
                <li key={idx}>
                  <strong>{q.carrier}</strong>: ${q.price} — {q.edt} days
                  <br />
                  Reliability: {q.reliability}/100
                </li>
              ))}
            </ul>

            {bestOption && (
              <div className="best-option">
                ⭐ Best Value: {bestOption.carrier} — {bestOption.price} USD
              </div>
            )}
          </div>
        )}
      </section>

      {/* TRACKING */}
      <section className="card">
        <h2 className="section-title">Unified Tracking</h2>
        <input
          className="input"
          placeholder="Enter AWB Number…"
          value={trackingInput}
          onChange={(e) => setTrackingInput(e.target.value)}
        />
        <button className="btn" onClick={handleTrackingSearch}>
          Track
        </button>

        {trackingResult && (
          <div className="timeline">
            <h3 className="section-sub">Tracking Timeline</h3>
            {trackingResult.timeline.map((t, index) => (
              <div key={index} className="timeline-item">
                <strong>{t.status}</strong>
                <div>{t.date}</div>
                <div>{t.location}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
