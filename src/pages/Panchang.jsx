import { useState } from "react";
import { panchang } from "../api/vedika";
import BirthPlace from "../components/BirthPlace";

export default function Panchang() {
  const [date, setDate] = useState("2026-06-13");
  const [time, setTime] = useState("10:30");
  const [place, setPlace] = useState("Delhi");
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
      const res = await panchang(dt, parseFloat(lat), parseFloat(lng), tz);
      setResult(res.data || res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const d = result;

  return (
    <div className="page panchang-page">
      <section className="intro-section">
        <h1>Panchang</h1>
        <p>The daily Hindu calendar based on five astrological elements. Get tithi, nakshatra, yoga, karana, and auspicious timings.</p>
      </section>

      <section className="calculator-section">
        <div className="calculator birth-chart-calc">
          <BirthPlace place={place} setPlace={setPlace} setLat={setLat} setLng={setLng} setTz={setTz} />
          <div className="calc-form-group">
            <label htmlFor="p-date">Date</label>
            <input type="date" id="p-date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="calc-form-group">
            <label htmlFor="p-time">Time</label>
            <input type="time" id="p-time" value={time} onChange={(e) => setTime(e.target.value)} />
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
            {loading ? "Loading..." : "Get Panchang"}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {d && (
          <div className="panchang-report">
            <h2>Daily Panchang</h2>
            <p className="panchang-datetime">{d.datetime?.replace("T", " ")}</p>

            <div className="panchang-grid">
              {d.tithi && (
                <div className="panchang-item">
                  <span className="panchang-icon">🌙</span>
                  <div>
                    <strong>Tithi</strong>
                    <p>{d.tithi.name} ({d.tithi.paksha?.name} Paksha) — Lord: {d.tithi.lord}</p>
                    {d.tithi.interpretation && <p className="panchang-detail">{d.tithi.interpretation.meaning}</p>}
                  </div>
                </div>
              )}
              {d.nakshatra && (
                <div className="panchang-item">
                  <span className="panchang-icon">⭐</span>
                  <div>
                    <strong>Nakshatra</strong>
                    <p>{d.nakshatra.name} — Lord: {d.nakshatra.lord}, Deity: {d.nakshatra.deity}, Gana: {d.nakshatra.gana}</p>
                    {d.nakshatra.interpretation && <p className="panchang-detail">{d.nakshatra.interpretation.meaning}</p>}
                  </div>
                </div>
              )}
              {d.yoga && (
                <div className="panchang-item">
                  <span className="panchang-icon">🔮</span>
                  <div>
                    <strong>Yoga</strong>
                    <p>{d.yoga.name} — {d.yoga.quality}</p>
                    {d.yoga.interpretation && <p className="panchang-detail">{d.yoga.interpretation.effect}</p>}
                  </div>
                </div>
              )}
              {d.karana && (
                <div className="panchang-item">
                  <span className="panchang-icon">⏳</span>
                  <div>
                    <strong>Karana</strong>
                    <p>{d.karana.name} — Type: {d.karana.type} ({d.karana.nature})</p>
                    {d.karana.interpretation && <p className="panchang-detail">{d.karana.interpretation.meaning}</p>}
                  </div>
                </div>
              )}
              {d.vaara && (
                <div className="panchang-item">
                  <span className="panchang-icon">📅</span>
                  <div>
                    <strong>Vaara (Day)</strong>
                    <p>{d.vaara.name} ({d.vaara.englishName}) — Lord: {d.vaara.lord}</p>
                    {d.vaara.interpretation && <p className="panchang-detail">{d.vaara.interpretation.meaning}. Lucky Color: {d.vaara.interpretation.luckyColor}</p>}
                  </div>
                </div>
              )}
            </div>

            {d.guidance && (
              <div className="panchang-guidance">
                <h3>Today's Guidance</h3>
                <p className="panchang-summary">{d.guidance.summary}</p>
                <div className="panchang-guidance-grid">
                  <div className="panchang-guidance-col">
                    <h4>Best Activities</h4>
                    <ul className="panchang-list good">
                      {d.guidance.bestActivities?.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                  <div className="panchang-guidance-col">
                    <h4>Avoid</h4>
                    <ul className="panchang-list bad">
                      {d.guidance.activitiesToAvoid?.map((a, i) => <li key={i}>{a}</li>)}
                    </ul>
                  </div>
                </div>
                <h4>Tips</h4>
                <ul className="panchang-list">
                  {d.guidance.tips?.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}

            {d.tithi?.interpretation && (
              <div className="panchang-details-section">
                <h3>Detailed Interpretations</h3>

                {d.tithi.interpretation.bestFor && (
                  <div className="panchang-interp-block">
                    <h4>{d.tithi.name} Tithi — Best For</h4>
                    <ul className="panchang-list good">{d.tithi.interpretation.bestFor.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}
                {d.tithi.interpretation.avoid && (
                  <div className="panchang-interp-block">
                    <h4>{d.tithi.name} Tithi — Avoid</h4>
                    <ul className="panchang-list bad">{d.tithi.interpretation.avoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}

                {d.nakshatra?.interpretation?.bestFor && (
                  <div className="panchang-interp-block">
                    <h4>{d.nakshatra.name} Nakshatra — Best For</h4>
                    <ul className="panchang-list good">{d.nakshatra.interpretation.bestFor.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}
                {d.nakshatra?.interpretation?.avoid && (
                  <div className="panchang-interp-block">
                    <h4>{d.nakshatra.name} Nakshatra — Avoid</h4>
                    <ul className="panchang-list bad">{d.nakshatra.interpretation.avoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}

                {d.vaara?.interpretation?.bestFor && (
                  <div className="panchang-interp-block">
                    <h4>{d.vaara.englishName} — Best For</h4>
                    <ul className="panchang-list good">{d.vaara.interpretation.bestFor.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}
                {d.vaara?.interpretation?.avoid && (
                  <div className="panchang-interp-block">
                    <h4>{d.vaara.englishName} — Avoid</h4>
                    <ul className="panchang-list bad">{d.vaara.interpretation.avoid.map((a, i) => <li key={i}>{a}</li>)}</ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!d && !loading && !error && (
          <div className="horoscope-placeholder">
            <p>Enter date, time, and location to get your daily Panchang.</p>
          </div>
        )}
      </section>
    </div>
  );
}
