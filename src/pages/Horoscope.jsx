import { useState } from "react";
import { dailyHoroscope, weeklyHoroscope, monthlyHoroscope, yearlyHoroscope } from "../api/vedika";

const zodiacSigns = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

const periods = [
  { key: "daily", label: "Daily", fn: dailyHoroscope },
  { key: "weekly", label: "Weekly", fn: weeklyHoroscope },
  { key: "monthly", label: "Monthly", fn: monthlyHoroscope },
  { key: "yearly", label: "Yearly", fn: yearlyHoroscope },
];

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Section({ title, score, highlights, summary, children }) {
  return (
    <div className="h-section">
      <div className="h-section-header">
        <h3>{title}</h3>
        {score !== undefined && <span className={`h-score ${score >= 70 ? "good" : score >= 50 ? "avg" : "low"}`}>{score}/100</span>}
      </div>
      {summary && <p className="h-summary">{summary}</p>}
      {children}
      {highlights && highlights.length > 0 && (
        <ul className="h-highlights">
          {highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      )}
    </div>
  );
}

export default function Horoscope() {
  const [sign, setSign] = useState("aries");
  const [period, setPeriod] = useState("daily");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const p = periods.find((p) => p.key === period);
      const res = await p.fn(sign);
      setResult(res.data || res);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const d = result;

  return (
    <div className="page horoscope-page">
      <section className="intro-section">
        <h1>Horoscope</h1>
        <p>Get your daily, weekly, monthly, or yearly horoscope predictions powered by Vedika Astrology API.</p>
      </section>

      <section className="calculator-section">
        <div className="calculator horoscope-calc">
          <div className="calc-form-group">
            <label htmlFor="h-sign">Your Zodiac Sign</label>
            <select id="h-sign" value={sign} onChange={(e) => setSign(e.target.value)}>
              {zodiacSigns.map((s) => (
                <option key={s} value={s}>{capitalize(s)}</option>
              ))}
            </select>
          </div>
          <div className="calc-form-group">
            <label>Period</label>
            <div className="period-buttons">
              {periods.map((p) => (
                <button key={p.key} className={`period-btn ${period === p.key ? "active" : ""}`} onClick={() => setPeriod(p.key)}>{p.label}</button>
              ))}
            </div>
          </div>
          <button className="btn" onClick={handleFetch} disabled={loading}>
            {loading ? "Loading..." : "Get Horoscope"}
          </button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {d && (
          <div className="horoscope-report">
            <div className="h-report-header">
              <h2>{capitalize(sign)} — {capitalize(period)} Horoscope</h2>
              {d.date && <span className="h-report-date">{d.date}</span>}
              {d.overallScore !== undefined && (
                <div className="h-overall">
                  <span className="h-overall-label">Overall Score</span>
                  <span className={`h-overall-value ${d.overallScore >= 70 ? "good" : d.overallScore >= 50 ? "avg" : "low"}`}>{d.overallScore}/100</span>
                </div>
              )}
              {d.rashi && <p className="h-rashi">Rashi: <strong>{d.rashi}</strong> ({d.rashiNumber}), Lord: {d.rashiLord}</p>}
              {(d.moonSign || d.nakshatra) && <p className="h-astro-detail">Moon Sign: {d.moonSign} — Nakshatra: {d.nakshatra} — Tithi: {d.tithi}</p>}
              {(d.currentDasha || d.currentAntardasha) && <p className="h-dasha">Dasha: {d.currentDasha} — Antardasha: {d.currentAntardasha}</p>}
            </div>

            <div className="h-sections">
              {d.career && <Section title="Career" score={d.career.score} highlights={d.career.highlights} summary={d.career.summary} />}
              {d.finance && <Section title="Finance" score={d.finance.score} highlights={d.finance.highlights} summary={d.finance.summary} />}
              {d.health && <Section title="Health" score={d.health.score} highlights={d.health.highlights} summary={d.health.summary} />}
              {d.relationships && <Section title="Relationships" score={d.relationships.score} highlights={d.relationships.highlights} summary={d.relationships.summary} />}
            </div>

            {d.remedies && d.remedies.length > 0 && (
              <div className="h-section h-remedies">
                <h3>Suggested Remedies</h3>
                <ul className="h-highlights">
                  {d.remedies.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}

            {d.health?.remedies && d.health.remedies.length > 0 && (
              <div className="h-section h-remedies">
                <h3>Health Remedies</h3>
                <ul className="h-highlights">
                  {d.health.remedies.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}

            {d.auspiciousTimeWindows && d.auspiciousTimeWindows.length > 0 && (
              <div className="h-section h-times">
                <h3>Auspicious Times</h3>
                {d.auspiciousTimeWindows.map((t, i) => (
                  <p key={i} className="h-time-item">{t.start}–{t.end} — {t.activity}</p>
                ))}
                {d.inauspiciousTimeWindows?.map((t, i) => (
                  <p key={i} className="h-time-item caution">{t.start}–{t.end} — {t.label}</p>
                ))}
              </div>
            )}

            {d.careerInsight && <div className="h-section h-insight"><h3>Career Insight</h3><p>{d.careerInsight}</p></div>}
          </div>
        )}

        {!d && !loading && !error && (
          <div className="horoscope-placeholder">
            <p>Select your zodiac sign and period, then click "Get Horoscope".</p>
          </div>
        )}
      </section>
    </div>
  );
}
