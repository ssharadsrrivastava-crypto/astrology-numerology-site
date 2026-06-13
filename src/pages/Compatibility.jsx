import { useState } from "react";
import { gunaMilan } from "../api/vedika";
import BirthPlace from "../components/BirthPlace";

const defaultDetails = { datetime: "1990-06-15T10:30:00", latitude: 28.7041, longitude: 77.1025, timezone: "+05:30", place: "Delhi" };

export default function Compatibility() {
  const [boy, setBoy] = useState(defaultDetails);
  const [girl, setGirl] = useState({ ...defaultDetails, datetime: "1995-03-22T08:15:00", latitude: 19.076, longitude: 72.877, place: "Mumbai" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await gunaMilan(boy, girl);
      setResult(res.data || res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const d = result;

  return (
    <div className="page compatibility-page">
      <section className="intro-section">
        <h1>Compatibility Check</h1>
        <p>Kundali matching using Ashtakoot Guna Milan system. Enter birth details of both partners to check compatibility.</p>
      </section>

      <section className="calculator-section cmp-section">
        <div className="cmp-form-grid">
          <div className="cmp-form-panel">
            <h3>Partner 1 (Boy)</h3>
            <div className="cmp-form">
              <BirthPlace
                place={boy.place}
                setPlace={(v) => setBoy({...boy, place: v})}
                setLat={(v) => setBoy({...boy, latitude: parseFloat(v) || 0})}
                setLng={(v) => setBoy({...boy, longitude: parseFloat(v) || 0})}
                setTz={(v) => setBoy({...boy, timezone: v})}
              />
              <div className="calc-form-group">
                <label>Date & Time</label>
                <input type="datetime-local" value={boy.datetime.slice(0, 16)} onChange={(e) => setBoy({...boy, datetime: e.target.value + ":00"})} />
              </div>
              <div className="calc-row">
                <div className="calc-form-group">
                  <label>Latitude</label>
                  <input type="text" value={boy.latitude} onChange={(e) => setBoy({...boy, latitude: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="calc-form-group">
                  <label>Longitude</label>
                  <input type="text" value={boy.longitude} onChange={(e) => setBoy({...boy, longitude: parseFloat(e.target.value) || 0})} />
                </div>
              </div>
              <div className="calc-form-group">
                <label>Timezone</label>
                <select value={boy.timezone} onChange={(e) => setBoy({...boy, timezone: e.target.value})}>
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
            </div>
          </div>

          <div className="cmp-form-panel">
            <h3>Partner 2 (Girl)</h3>
            <div className="cmp-form">
              <BirthPlace
                place={girl.place}
                setPlace={(v) => setGirl({...girl, place: v})}
                setLat={(v) => setGirl({...girl, latitude: parseFloat(v) || 0})}
                setLng={(v) => setGirl({...girl, longitude: parseFloat(v) || 0})}
                setTz={(v) => setGirl({...girl, timezone: v})}
              />
              <div className="calc-form-group">
                <label>Date & Time</label>
                <input type="datetime-local" value={girl.datetime.slice(0, 16)} onChange={(e) => setGirl({...girl, datetime: e.target.value + ":00"})} />
              </div>
              <div className="calc-row">
                <div className="calc-form-group">
                  <label>Latitude</label>
                  <input type="text" value={girl.latitude} onChange={(e) => setGirl({...girl, latitude: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="calc-form-group">
                  <label>Longitude</label>
                  <input type="text" value={girl.longitude} onChange={(e) => setGirl({...girl, longitude: parseFloat(e.target.value) || 0})} />
                </div>
              </div>
              <div className="calc-form-group">
                <label>Timezone</label>
                <select value={girl.timezone} onChange={(e) => setGirl({...girl, timezone: e.target.value})}>
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
            </div>
          </div>
        </div>

        <button className="btn cmp-btn" onClick={handleFetch} disabled={loading}>
          {loading ? "Checking Compatibility..." : "Check Compatibility"}
        </button>

        {error && <div className="error-msg">{error}</div>}

        {d && (
          <div className="cmp-report">
            <h2>Guna Milan Report</h2>

            <div className="cmp-score-card">
              <div className="cmp-score-main">
                <span className={`cmp-score-value ${d.percentage >= 60 ? "good" : d.percentage >= 36 ? "avg" : "low"}`}>{d.total_points}/{d.maximum_points}</span>
                <span className={`cmp-score-pct ${d.percentage >= 60 ? "good" : d.percentage >= 36 ? "avg" : "low"}`}>{d.percentage}%</span>
              </div>
              <div className={`cmp-verdict ${d.match_result === "Highly Compatible" || d.match_result === "Compatible" ? "good" : "avg"}`}>
                <strong>{d.match_result}</strong> — {d.recommendation}
              </div>
            </div>

            {d.interpretation && (
              <div className="cmp-section">
                <h3>Overview</h3>
                <p className="cmp-summary">{d.interpretation.summary}</p>
                {d.interpretation.marriageProspects && <p className="cmp-summary"><strong>Marriage:</strong> {d.interpretation.marriageProspects}</p>}
                {d.interpretation.strengths && (
                  <>
                    <h4>Strengths</h4>
                    <ul className="cmp-list good-list">{d.interpretation.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </>
                )}
                {d.interpretation.challenges && (
                  <>
                    <h4>Challenges</h4>
                    <ul className="cmp-list bad-list">{d.interpretation.challenges.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </>
                )}
                {d.interpretation.guidance && (
                  <>
                    <h4>Guidance</h4>
                    <ul className="cmp-list">{d.interpretation.guidance.map((s, i) => <li key={i}>{s}</li>)}</ul>
                  </>
                )}
              </div>
            )}

            {d.remedies && d.remedies.length > 0 && (
              <div className="cmp-section">
                <h3>Remedies</h3>
                <ul className="cmp-list">{d.remedies.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            )}

            <div className="cmp-section">
              <h3>Ashtakoot Scores</h3>
              <table className="result-table cmp-table">
                <thead><tr><th>Guna</th><th>His</th><th>Hers</th><th>Score</th><th>Max</th></tr></thead>
                <tbody>
                  {d.guna_kootas?.map((g, i) => (
                    <tr key={i} className={g.points >= g.maximum_points ? "full-marks" : g.points === 0 ? "zero" : ""}>
                      <td><strong>{g.name}</strong></td>
                      <td>{g.male_koot}</td>
                      <td>{g.female_koot}</td>
                      <td>{g.points}</td>
                      <td>{g.maximum_points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {d.male_info && (
              <div className="cmp-section">
                <h3>Partner Details</h3>
                <p><strong>Partner 1:</strong> Moon Sign: {d.male_info.moon_sign}, Nakshatra: {d.male_info.moon_nakshatra}</p>
                <p><strong>Partner 2:</strong> Moon Sign: {d.female_info.moon_sign}, Nakshatra: {d.female_info.moon_nakshatra}</p>
              </div>
            )}

            {d.gunaDetails && (
              <div className="cmp-section">
                <h3>Detailed Guna Analysis</h3>
                {Object.entries(d.gunaDetails).map(([key, g]) => (
                  <div key={key} className="cmp-guna-card">
                    <div className="cmp-guna-header">
                      <strong>{g.name}</strong>
                      <span className={`cmp-guna-score ${g.score >= g.maxPoints ? "full" : g.score === 0 ? "zero" : "partial"}`}>{g.score}/{g.maxPoints}</span>
                    </div>
                    <p className="cmp-guna-desc">{g.significance}</p>
                    <p className="cmp-guna-interp">{g.interpretation}</p>
                    {g.tips?.length > 0 && (
                      <ul className="cmp-list">{g.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {!d && !loading && !error && (
          <div className="horoscope-placeholder">
            <p>Enter birth details of both partners and click "Check Compatibility".</p>
          </div>
        )}
      </section>
    </div>
  );
}
