import { useState } from "react";
import { birthChart, planetaryPositions } from "../api/vedika";
import BirthPlace from "../components/BirthPlace";

function PlanetsTable({ planets }) {
  return (
    <table className="result-table bc-planets-table">
      <thead><tr><th>Planet</th><th>Sign</th><th>Degree</th><th>House</th><th>Nakshatra</th><th>R</th></tr></thead>
      <tbody>
        {planets.map((p, i) => (
          <tr key={i} className={p.isRetrograde || p.retrograde ? "retrograde" : ""}>
            <td><strong>{p.name}</strong></td>
            <td>{p.sign} {p.signLord ? `(${p.signLord})` : ""}</td>
            <td>{p.degree}°</td>
            <td>{p.house}</td>
            <td>{p.nakshatra}{p.pada ? `/${p.pada}` : ""}</td>
            <td>{p.isRetrograde || p.retrograde ? "R" : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function BirthChart() {
  const [place, setPlace] = useState("Delhi");
  const [date, setDate] = useState("1990-06-15");
  const [time, setTime] = useState("10:30");
  const [lat, setLat] = useState("28.7041");
  const [lng, setLng] = useState("77.1025");
  const [tz, setTz] = useState("+05:30");
  const [chart, setChart] = useState(null);
  const [positions, setPositions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setChart(null);
    setPositions(null);
    try {
      const dt = `${date}T${time}:00`;
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const [bc, pp] = await Promise.all([
        birthChart(dt, latNum, lngNum, tz),
        planetaryPositions(dt, latNum, lngNum, tz),
      ]);
      setChart(bc.data || bc);
      setPositions(pp.data || pp);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const a = chart?.ascendant;
  const planetsList = chart?.planets || positions?.planets || [];
  const housesList = chart?.houses || [];
  const dashas = chart?.dashas;
  const yogas = chart?.yogas || [];

  return (
    <div className="page birth-chart-page">
      <section className="intro-section">
        <h1>Birth Chart Calculator</h1>
        <p>Generate your detailed birth chart and planetary positions using the Vedika Astrology API.</p>
      </section>

      <section className="calculator-section bc-section-calc">
        <div className="calculator birth-chart-calc">
          <BirthPlace place={place} setPlace={setPlace} setLat={setLat} setLng={setLng} setTz={setTz} />
          <div className="calc-form-group">
            <label htmlFor="bc-date">Date of Birth</label>
            <input type="date" id="bc-date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="calc-form-group">
            <label htmlFor="bc-time">Time of Birth</label>
            <input type="time" id="bc-time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="calc-row">
            <div className="calc-form-group">
              <label htmlFor="bc-lat">Latitude</label>
              <input type="text" id="bc-lat" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g. 28.6139" />
            </div>
            <div className="calc-form-group">
              <label htmlFor="bc-lng">Longitude</label>
              <input type="text" id="bc-lng" value={lng} onChange={(e) => setLng(e.target.value)} placeholder="e.g. 77.209" />
            </div>
          </div>
          <div className="calc-form-group">
            <label htmlFor="bc-tz">Timezone</label>
            <select id="bc-tz" value={tz} onChange={(e) => setTz(e.target.value)}>
              <option value="-12:00">UTC-12</option><option value="-11:00">UTC-11</option>
              <option value="-10:00">UTC-10</option><option value="-09:00">UTC-9</option>
              <option value="-08:00">UTC-8</option><option value="-07:00">UTC-7</option>
              <option value="-06:00">UTC-6</option><option value="-05:00">UTC-5</option>
              <option value="-04:00">UTC-4</option><option value="-03:00">UTC-3</option>
              <option value="-02:00">UTC-2</option><option value="-01:00">UTC-1</option>
              <option value="+00:00">UTC+0</option><option value="+01:00">UTC+1</option>
              <option value="+02:00">UTC+2</option><option value="+03:00">UTC+3</option>
              <option value="+04:00">UTC+4</option><option value="+05:00">UTC+5</option>
              <option value="+05:30">UTC+5:30 (India)</option>
              <option value="+05:45">UTC+5:45 (Nepal)</option>
              <option value="+06:00">UTC+6</option><option value="+07:00">UTC+7</option>
              <option value="+08:00">UTC+8</option><option value="+09:00">UTC+9</option>
              <option value="+10:00">UTC+10</option><option value="+11:00">UTC+11</option>
              <option value="+12:00">UTC+12</option>
            </select>
          </div>
          <button className="btn" onClick={handleFetch} disabled={loading}>
            {loading ? "Calculating..." : "Generate Birth Chart"}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {chart && (
          <div className="bc-report">
            <h2>Birth Chart Report</h2>

            {chart.birth_details && (
              <div className="bc-section bc-birth-details">
                <h3>Birth Details</h3>
                <div className="bc-detail-grid">
                  <span><strong>Date:</strong> {chart.birth_details.date}</span>
                  <span><strong>Time:</strong> {chart.birth_details.time}</span>
                  <span><strong>Place:</strong> {chart.birth_details.place}</span>
                  <span><strong>Lat/Lng:</strong> {chart.birth_details.latitude}, {chart.birth_details.longitude}</span>
                  <span><strong>Timezone:</strong> {chart.birth_details.timezone} (UTC{chart.birth_details.timezone_offset >= 0 ? "+" : ""}{chart.birth_details.timezone_offset})</span>
                </div>
              </div>
            )}

            {a && (
              <div className="bc-section bc-ascendant">
                <h3>Ascendant (Lagna)</h3>
                <div className="bc-ascendant-value">
                  <span className="bc-sign-badge">{a.sign}</span>
                  <span className="bc-detail"><strong>Degree:</strong> {a.degree}°</span>
                  {a.nakshatra && <span className="bc-detail"><strong>Nakshatra:</strong> {a.nakshatra}</span>}
                  {a.pada && <span className="bc-detail"><strong>Pada:</strong> {a.pada}</span>}
                </div>
              </div>
            )}

            {planetsList.length > 0 && (
              <div className="bc-section">
                <h3>Planetary Positions</h3>
                <PlanetsTable planets={planetsList} />
              </div>
            )}

            {housesList.length > 0 && (
              <div className="bc-section">
                <h3>Houses (Bhavas)</h3>
                <table className="result-table bc-houses-table">
                  <thead><tr><th>House</th><th>Sign</th><th>Degree</th></tr></thead>
                  <tbody>
                    {housesList.map((h, i) => (
                      <tr key={i} className={h.house === a?.sign ? "ascendant-house" : ""}>
                        <td><strong>{h.house}</strong></td>
                        <td>{h.sign}</td>
                        <td>{h.degree}°</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {dashas && (
              <div className="bc-section bc-dashas">
                <h3>Current Dasha</h3>
                <div className="bc-dasha-current">
                  <div className="bc-dasha-item"><strong>Mahadasha:</strong> {dashas.current.mahadasha}</div>
                  <div className="bc-dasha-item"><strong>Antardasha:</strong> {dashas.current.antardasha}</div>
                  {dashas.current.pratyantardasha && <div className="bc-dasha-item"><strong>Pratyantardasha:</strong> {dashas.current.pratyantardasha}</div>}
                  <div className="bc-dasha-item"><strong>Period:</strong> {dashas.current.startDate} to {dashas.current.endDate}</div>
                </div>
                {dashas.upcoming && dashas.upcoming.length > 0 && (
                  <>
                    <h4 style={{ marginTop: "0.75rem", fontSize: "0.9rem", color: "var(--muted)" }}>Upcoming Dashas</h4>
                    {dashas.upcoming.map((d, i) => (
                      <div key={i} className="bc-dasha-item">{d.mahadasha} / {d.antardasha}: {d.startDate} – {d.endDate}</div>
                    ))}
                  </>
                )}
              </div>
            )}

            {yogas.length > 0 && (
              <div className="bc-section bc-yogas">
                <h3>Yogas Formed</h3>
                {yogas.filter(y => y.present).map((y, i) => (
                  <div key={i} className={`bc-yoga-card ${y.strength?.toLowerCase() || ""}`}>
                    <div className="bc-yoga-header">
                      <strong>{y.name}</strong>
                      {y.strength && <span className={`bc-yoga-strength ${y.strength.toLowerCase()}`}>{y.strength}</span>}
                    </div>
                    {y.description && <p className="bc-yoga-desc">{y.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {positions?.ayanamsa && (
              <div className="bc-section bc-ayanamsa">
                <p><strong>Ayanamsa:</strong> {positions.ayanamsa} ({positions.ayanamsa_value}°)</p>
              </div>
            )}
          </div>
        )}

        {!chart && !loading && !error && (
          <div className="horoscope-placeholder">
            <p>Enter your birth details and click "Generate Birth Chart".</p>
          </div>
        )}
      </section>
    </div>
  );
}
