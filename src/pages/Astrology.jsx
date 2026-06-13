import { Link } from "react-router-dom";

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 – Apr 19", element: "Fire", symbol: "♈" },
  { name: "Taurus", dates: "Apr 20 – May 20", element: "Earth", symbol: "♉" },
  { name: "Gemini", dates: "May 21 – Jun 20", element: "Air", symbol: "♊" },
  { name: "Cancer", dates: "Jun 21 – Jul 22", element: "Water", symbol: "♋" },
  { name: "Leo", dates: "Jul 23 – Aug 22", element: "Fire", symbol: "♌" },
  { name: "Virgo", dates: "Aug 23 – Sep 22", element: "Earth", symbol: "♍" },
  { name: "Libra", dates: "Sep 23 – Oct 22", element: "Air", symbol: "♎" },
  { name: "Scorpio", dates: "Oct 23 – Nov 21", element: "Water", symbol: "♏" },
  { name: "Sagittarius", dates: "Nov 22 – Dec 21", element: "Fire", symbol: "♐" },
  { name: "Capricorn", dates: "Dec 22 – Jan 19", element: "Earth", symbol: "♑" },
  { name: "Aquarius", dates: "Jan 20 – Feb 18", element: "Air", symbol: "♒" },
  { name: "Pisces", dates: "Feb 19 – Mar 20", element: "Water", symbol: "♓" },
];

export default function Astrology() {
  return (
    <div className="page astrology-page">
      <section className="intro-section">
        <h1>Astrology</h1>
        <p>
          Astrology is the study of the movements and relative positions of
          celestial bodies interpreted as having an influence on human affairs
          and the natural world. Your birth chart is a cosmic snapshot of the
          sky at the moment you were born.
        </p>
      </section>

      <section className="zodiac-grid">
        <h2>The 12 Zodiac Signs</h2>
        <div className="signs-container">
          {zodiacSigns.map((sign) => (
            <div key={sign.name} className="sign-card">
              <span className="sign-symbol">{sign.symbol}</span>
              <h3>{sign.name}</h3>
              <p className="sign-dates">{sign.dates}</p>
              <p className="sign-element">{sign.element}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>The Big Three</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Sun Sign</h3>
            <p>
              Your core identity, ego, and conscious self. This is what most
              people refer to as your "zodiac sign."
            </p>
          </div>
          <div className="info-card">
            <h3>Moon Sign</h3>
            <p>
              Your emotional nature, inner world, and subconscious. It reveals
              how you process feelings.
            </p>
          </div>
          <div className="info-card">
            <h3>Rising Sign</h3>
            <p>
              The mask you wear in public, your first impressions, and how
              others perceive you.
            </p>
          </div>
        </div>
        <div className="cta-link">
          <Link to="/contact" className="btn">Book a Reading</Link>
        </div>
      </section>
    </div>
  );
}
