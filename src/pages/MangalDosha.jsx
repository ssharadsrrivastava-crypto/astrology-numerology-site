import { useState } from "react";
import { mangalDosha } from "../api/vedika";
import BirthPlace from "../components/BirthPlace";

export default function MangalDosha() {
  const [place, setPlace] = useState("Delhi");
  const [date, setDate] = useState("1990-06-15");
  const [time, setTime] = useState("10:30");
  const [lat, setLat] = useState("28.7041");
  const [lng, setLng] = useState("77.1025");
  const [tz, setTz] = useState("+05:30");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const dt = `${date}T${time}:00`;
      const res = await mangalDosha(dt, parseFloat(lat), parseFloat(lng), tz);
      setResult(res.data || res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const d = result;

  return (
    <div className="page mangal-dosha-page">
      <section className="intro-section">
        <h1>Mangal Dosha Check</h1>
        <p>Check if you have Mangal Dosha (Manglik) in your birth chart. Enter your birth details to analyze the position of Mars.</p>
      </section>

      <section className="calculator-section">
        <div className="calculator birth-chart-calc">
          <BirthPlace place={place} setPlace={setPlace} setLat={setLat} setLng={setLng} setTz={setTz} />
          <div className="calc-form-group">
            <label htmlFor="md-date">Date of Birth</label>
            <input type="date" id="md-date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="calc-form-group">
            <label htmlFor="md-time">Time of Birth</label>
            <input type="time" id="md-time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="calc-row">
            <div className="calc-form-group">
              <label>Latitude</label>
              <input type="text" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="28.6139" />
            </div>
            <div className="calc-form-group">
              <label>Longitude</label>
              <input type="text" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="77.209" />
            </div>
          </div>
          <div className="calc-form-group">
            <label>Timezone</label>
            <select value={tz} onChange={(e) => setTz(e.target.value)}>
              <option value="+05:30">UTC+5:30 (India)</option>
              <option value="+00:00">UTC+0</option>
              <option value="-05:00">UTC-5</option>
              <option value="-08:00">UTC-8</option>
            </select>
          </div>
          <button className="btn" onClick={handleFetch} disabled={loading}>
            {loading ? "Checking..." : "Check Mangal Dosha"}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {d && (
          <div className="md-report">
            <h2>Mangal Dosha Report</h2>

            <div className={`md-verdict ${d.hasMangalDosha ? "dosha-present" : "dosha-absent"}`}>
              <div className="md-verdict-icon">{d.hasMangalDosha ? "🔴" : "🟢"}</div>
              <div className="md-verdict-text">
                <h3>{d.hasMangalDosha ? "Mangal Dosha Present" : "No Mangal Dosha"}</h3>
                {d.hasMangalDosha && <p>Severity: <strong>{d.severity}</strong></p>}
                {d.percentage !== undefined && (
                  <div className="md-pct-bar">
                    <div className="md-pct-fill" style={{ width: `${d.percentage}%` }}></div>
                    <span>{d.percentage}%</span>
                  </div>
                )}
              </div>
            </div>

            {d.isCancelled !== undefined && (
              <div className={`md-cancelled ${d.isCancelled ? "cancelled" : ""}`}>
                <p><strong>Cancellation:</strong> {d.isCancelled ? "Yes — Dosha is cancelled/neutralized" : "No cancellation applicable"}</p>
              </div>
            )}

            <div className="md-section">
              <h3>Mars Position Analysis</h3>
              <table className="result-table md-table">
                <tbody>
                  <tr><td><strong>Mars Sign</strong></td><td>{d.marsSign}</td></tr>
                  <tr><td><strong>Mars House (from Lagna)</strong></td><td>{d.marsHouse}</td></tr>
                  <tr><td><strong>Mars House (from Moon)</strong></td><td>{d.marsHouseFromMoon}</td></tr>
                  <tr><td><strong>Mars House (from Venus)</strong></td><td>{d.marsHouseFromVenus}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="md-section">
              <h3>Dosha Breakdown</h3>
              <table className="result-table md-table">
                <tbody>
                  <tr className={d.doshaFromLagna ? "dosha-yes" : "dosha-no"}>
                    <td><strong>From Lagna</strong></td>
                    <td>{d.doshaFromLagna ? "Yes" : "No"}</td>
                  </tr>
                  <tr className={d.doshaFromMoon ? "dosha-yes" : "dosha-no"}>
                    <td><strong>From Moon</strong></td>
                    <td>{d.doshaFromMoon ? "Yes" : "No"}</td>
                  </tr>
                  <tr className={d.doshaFromVenus ? "dosha-yes" : "dosha-no"}>
                    <td><strong>From Venus</strong></td>
                    <td>{d.doshaFromVenus ? "Yes" : "No"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {d.cancellationReasons?.length > 0 && (
              <div className="md-section">
                <h3>Cancellation Reasons</h3>
                <ul className="md-list good-list">{d.cancellationReasons.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}

            {d.exceptions?.length > 0 && (
              <div className="md-section">
                <h3>Exceptions</h3>
                <ul className="md-list">{d.exceptions.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>
            )}

            {d.remedies?.length > 0 && (
              <div className="md-section">
                <h3>Suggested Remedies</h3>
                <ul className="md-list remedies-list">{d.remedies.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}
          </div>
        )}

        {!d && !loading && !error && (
          <div className="horoscope-placeholder">
            <p>Enter your birth details and click "Check Mangal Dosha".</p>
          </div>
        )}
      </section>
    </div>
  );
}
