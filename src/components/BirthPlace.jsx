import { useState, useRef } from "react";
import CITIES from "../data/cities";

export default function BirthPlace({ place, setPlace, setLat, setLng, setTz }) {
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  const handleChange = (val) => {
    setPlace(val);
    if (val.length < 2) {
      setSuggestions([]);
      return;
    }
    const q = val.toLowerCase();
    const matches = CITIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
    setSuggestions(matches);
  };

  const handleSelect = (city) => {
    setPlace(city.name);
    setLat(String(city.lat));
    setLng(String(city.lng));
    if (setTz) setTz(city.tz);
    setSuggestions([]);
    ref.current?.blur();
  };

  const handleClear = () => {
    setPlace("");
    setSuggestions([]);
  };

  return (
    <div className="calc-form-group" style={{ position: "relative" }}>
      <label>Birth Place (City)</label>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        <input
          ref={ref}
          type="text"
          value={place}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Start typing a city name..."
          style={{ flex: 1 }}
        />
        {place && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              color: "var(--muted)",
              cursor: "pointer",
              padding: "0 0.6rem",
              fontSize: "0.9rem",
            }}
            title="Clear"
          >
            ✕
          </button>
        )}
      </div>
      {focused && suggestions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            marginTop: "2px",
            maxHeight: "240px",
            overflowY: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {suggestions.map((c) => (
            <button
              key={c.name}
              type="button"
              onMouseDown={() => handleSelect(c)}
              style={{
                display: "block",
                width: "100%",
                padding: "0.55rem 0.8rem",
                background: "transparent",
                border: "none",
                color: "var(--soft-glow)",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "0.85rem",
                borderBottom: "1px solid var(--glass-border)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              <span style={{ color: "var(--muted)", marginLeft: "0.5rem", fontSize: "0.75rem" }}>
                {c.lat}°, {c.lng}° — UTC{c.tz}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
