import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
];

const ZODIAC_COMPAT = {
  Aries: { Leo: 90, Sagittarius: 85, Aquarius: 65, Gemini: 60, Libra: 45, Capricorn: 30 },
  Taurus: { Virgo: 90, Capricorn: 85, Cancer: 75, Pisces: 70, Scorpio: 40, Aquarius: 25 },
  Gemini: { Libra: 90, Aquarius: 85, Aries: 60, Leo: 55, Virgo: 35, Pisces: 25 },
  Cancer: { Scorpio: 90, Pisces: 85, Taurus: 75, Virgo: 60, Capricorn: 30, Aries: 25 },
  Leo: { Aries: 90, Sagittarius: 85, Gemini: 55, Libra: 50, Scorpio: 30, Taurus: 25 },
  Virgo: { Taurus: 90, Capricorn: 85, Cancer: 60, Scorpio: 55, Sagittarius: 30, Pisces: 25 },
  Libra: { Gemini: 90, Aquarius: 85, Leo: 50, Sagittarius: 45, Capricorn: 30, Cancer: 25 },
  Scorpio: { Cancer: 90, Pisces: 85, Virgo: 55, Capricorn: 50, Leo: 30, Taurus: 25 },
  Sagittarius: { Aries: 85, Leo: 85, Aquarius: 75, Libra: 45, Virgo: 30, Taurus: 25 },
  Capricorn: { Taurus: 85, Virgo: 85, Scorpio: 50, Pisces: 45, Aries: 30, Libra: 25 },
  Aquarius: { Gemini: 85, Libra: 85, Sagittarius: 75, Aries: 65, Taurus: 25, Cancer: 25 },
  Pisces: { Cancer: 85, Scorpio: 85, Taurus: 70, Capricorn: 45, Gemini: 25, Virgo: 25 },
};

const AFFIRMATIONS = [
  { text: "The cosmos aligns in your favor today. Trust the journey, even when you cannot see the destination.", source: "Cosmic Wisdom" },
  { text: "Your intuition is a direct line to the universe. Listen closely.", source: "Lunar Guidance" },
  { text: "Every ending is a new beginning written in the stars.", source: "Stellar Insight" },
  { text: "You are made of stardust and infinite possibility.", source: "Cosmic Truth" },
  { text: "The planets are shifting to support your highest good.", source: "Celestial Forecast" },
  { text: "What you seek is seeking you. Stay open to signs.", source: "Rumi, via the Stars" },
  { text: "Your energy creates your reality. Choose wisely.", source: "Astral Wisdom" },
  { text: "The moon reminds us that even in darkness, we can shine.", source: "Lunar Reflection" },
];

const todayAffirmation = AFFIRMATIONS[new Date().toDateString().split(" ").join("").length % AFFIRMATIONS.length];

export default function Home() {
  const [z1, setZ1] = useState("Aries");
  const [z2, setZ2] = useState("Leo");

  const matchScore = useMemo(() => {
    const scores = ZODIAC_COMPAT[z1];
    if (!scores) return null;
    const score = scores[z2];
    if (score === undefined) return null;
    return score;
  }, [z1, z2]);

  return (
    <div className="page home-page">
      <section className="hero-section">
        <h1>Discover the Universe Within You</h1>
        <p>
          Explore the ancient wisdom of astrology, numerology, and tarot to understand
          your true self, your purpose, and the cosmic forces that shape your life.
        </p>
        <div className="hero-cta">
          <Link to="/astrology" className="btn">Explore Astrology</Link>
          <Link to="/horoscope" className="btn btn-secondary">Daily Horoscope</Link>
          <Link to="/tarot" className="btn btn-secondary">Tarot of the Day</Link>
        </div>
      </section>

      <div className="daily-affirmation">
        <h3>Daily Affirmation</h3>
        <p>"{todayAffirmation.text}"</p>
        <p className="affirmation-source">— {todayAffirmation.source}</p>
      </div>

      <section className="cards-section">
        <div className="card">
          <h2>Astrology</h2>
          <p>Discover how celestial bodies influence your personality, relationships, and life path through the 12 zodiac signs.</p>
          <Link to="/astrology" className="btn-small">Learn More</Link>
        </div>
        <div className="card">
          <h2>Horoscope</h2>
          <p>Get daily, weekly, monthly, and yearly predictions powered by the Vedika Astrology API with detailed life-area scores.</p>
          <Link to="/horoscope" className="btn-small">Get Horoscope</Link>
        </div>
        <div className="card">
          <h2>Birth Chart</h2>
          <p>Generate your detailed birth chart with planetary positions, houses, dashas, and yogas based on your exact birth data.</p>
          <Link to="/birth-chart" className="btn-small">Generate Chart</Link>
        </div>
        <div className="card">
          <h2>Numerology</h2>
          <p>Unlock the hidden meanings behind numbers. Calculate your Life Path Number and check if your mobile number is lucky.</p>
          <Link to="/numerology" className="btn-small">Calculate</Link>
        </div>
        <div className="card">
          <h2>Tarot</h2>
          <p>Draw a daily tarot card for guidance. Explore the 22 Major Arcana cards and their messages from the universe.</p>
          <Link to="/tarot" className="btn-small">Draw a Card</Link>
        </div>
        <div className="card">
          <h2>Lo Shu Grid</h2>
          <p>Generate your personalized Lo Shu Grid based on your name and birth date. Discover present, missing, and repeating numbers.</p>
          <Link to="/loshu-grid" className="btn-small">View Grid</Link>
        </div>
        <div className="card">
          <h2>Astro Agent</h2>
          <p>Ask your astrology and numerology questions to our AI-powered astrologer. Get personalized insights based on your birth chart.</p>
          <Link to="/astro-agent" className="btn-small">Ask Now</Link>
        </div>
        <div className="card">
          <h2>Compatibility</h2>
          <p>Check Kundali matching using Ashtakoot Guna Milan. Discover compatibility across 8 dimensions including Varna, Yoni, and Nadi.</p>
          <Link to="/compatibility" className="btn-small">Check Match</Link>
        </div>
        <div className="card">
          <h2>Chinese Zodiac</h2>
          <p>Discover the 12 animal signs and their personality traits. Check compatibility between any two Chinese zodiac signs.</p>
          <Link to="/chinese-zodiac" className="btn-small">Explore</Link>
        </div>
        <div className="card">
          <h2>Panchang</h2>
          <p>Get the daily Hindu calendar with tithi, nakshatra, yoga, karana, and auspicious timings based on your location.</p>
          <Link to="/panchang" className="btn-small">View Today</Link>
        </div>
        <div className="card">
          <h2>Mangal Dosha</h2>
          <p>Check if you have Mangal Dosha based on Mars placement in your birth chart. Get remedies and cancellation details.</p>
          <Link to="/mangal-dosha" className="btn-small">Check Now</Link>
        </div>
      </section>

      <section className="quick-zodiac">
        <h2>Zodiac Match</h2>
        <p>Quick sun-sign compatibility check. See how two signs align.</p>
        <div className="zodiac-match-form">
          <div className="calc-form-group">
            <label>Sign 1</label>
            <select value={z1} onChange={(e) => setZ1(e.target.value)}>
              {ZODIAC_SIGNS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="calc-form-group">
            <label>Sign 2</label>
            <select value={z2} onChange={(e) => setZ2(e.target.value)}>
              {ZODIAC_SIGNS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
        {matchScore !== null && (
          <div className="zodiac-match-result">
            <div className={`zm-score ${matchScore >= 70 ? "high" : matchScore >= 45 ? "medium" : "low"}`}>
              {matchScore}%
            </div>
            <p className="zm-verdict">
              {matchScore >= 70 ? "Highly Compatible — A natural cosmic connection!" : matchScore >= 45 ? "Moderately Compatible — Some harmony, some challenges." : "Less Compatible — Opposites may attract, but require work."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
