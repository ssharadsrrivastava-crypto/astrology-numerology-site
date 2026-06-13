import { useState, useMemo } from "react";

const signs = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", element: "Fire", quality: "Cardinal", ruler: "Mars", numbers: [1, 9], strengths: ["Courageous", "Determined", "Confident"], challenges: ["Impulsive", "Impatient"], compatible: ["Leo", "Sagittarius", "Gemini", "Aquarius"], description: "Aries is the first sign of the zodiac, symbolizing new beginnings, leadership, and initiative." },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", element: "Earth", quality: "Fixed", ruler: "Venus", numbers: [2, 6], strengths: ["Reliable", "Patient", "Practical"], challenges: ["Stubborn", "Possessive"], compatible: ["Virgo", "Capricorn", "Cancer", "Pisces"], description: "Taurus represents stability, sensuality, and a deep connection to the physical world." },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", element: "Air", quality: "Mutable", ruler: "Mercury", numbers: [3, 5], strengths: ["Adaptable", "Intellectual", "Versatile"], challenges: ["Inconsistent", "Indecisive"], compatible: ["Libra", "Aquarius", "Aries", "Leo"], description: "Gemini embodies curiosity, communication, and the dual nature of the mind." },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", element: "Water", quality: "Cardinal", ruler: "Moon", numbers: [2, 7], strengths: ["Intuitive", "Nurturing", "Protective"], challenges: ["Moody", "Over-sensitive"], compatible: ["Scorpio", "Pisces", "Taurus", "Virgo"], description: "Cancer is the sign of home, family, and emotional depth, ruled by the ever-changing Moon." },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", element: "Fire", quality: "Fixed", ruler: "Sun", numbers: [1, 5], strengths: ["Generous", "Creative", "Charismatic"], challenges: ["Arrogant", "Dramatic"], compatible: ["Sagittarius", "Aries", "Gemini", "Libra"], description: "Leo shines with warmth, creativity, and a natural flair for leadership and self-expression." },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", element: "Earth", quality: "Mutable", ruler: "Mercury", numbers: [5, 6], strengths: ["Analytical", "Detail-oriented", "Helpful"], challenges: ["Critical", "Overthinking"], compatible: ["Capricorn", "Taurus", "Cancer", "Scorpio"], description: "Virgo seeks perfection through analysis, service, and meticulous attention to detail." },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", element: "Air", quality: "Cardinal", ruler: "Venus", numbers: [2, 6], strengths: ["Diplomatic", "Charming", "Fair-minded"], challenges: ["Indecisive", "People-pleasing"], compatible: ["Aquarius", "Gemini", "Leo", "Sagittarius"], description: "Libra strives for balance, harmony, and beauty in all relationships and endeavors." },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", element: "Water", quality: "Fixed", ruler: "Pluto", numbers: [8, 9], strengths: ["Resourceful", "Passionate", "Brave"], challenges: ["Secretive", "Jealous"], compatible: ["Pisces", "Cancer", "Virgo", "Capricorn"], description: "Scorpio dives deep into the mysteries of life, transformation, and emotional power." },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", element: "Fire", quality: "Mutable", ruler: "Jupiter", numbers: [3, 5], strengths: ["Optimistic", "Adventurous", "Honest"], challenges: ["Restless", "Blunt"], compatible: ["Aries", "Leo", "Libra", "Aquarius"], description: "Sagittarius is the seeker of truth, wisdom, and expansion through exploration and philosophy." },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", element: "Earth", quality: "Cardinal", ruler: "Saturn", numbers: [4, 8], strengths: ["Disciplined", "Responsible", "Ambitious"], challenges: ["Pessimistic", "Rigid"], compatible: ["Taurus", "Virgo", "Scorpio", "Pisces"], description: "Capricorn builds toward success through patience, discipline, and unwavering determination." },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", element: "Air", quality: "Fixed", ruler: "Uranus", numbers: [1, 7], strengths: ["Innovative", "Humanitarian", "Independent"], challenges: ["Detached", "Unpredictable"], compatible: ["Gemini", "Libra", "Aries", "Sagittarius"], description: "Aquarius looks to the future with visionary ideas and a deep commitment to collective well-being." },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", element: "Water", quality: "Mutable", ruler: "Neptune", numbers: [3, 9], strengths: ["Compassionate", "Artistic", "Intuitive"], challenges: ["Escapist", "Overly trusting"], compatible: ["Cancer", "Scorpio", "Taurus", "Capricorn"], description: "Pisces dissolves boundaries, connecting to the universal through art, dreams, and empathy." },
];

const elements = ["All", "Fire", "Earth", "Air", "Water"];
const qualities = ["All", "Cardinal", "Fixed", "Mutable"];

function getLifePathMatch(lifePathNum) {
  return signs.filter((s) => s.numbers.includes(lifePathNum));
}

export default function Grid() {
  const [elementFilter, setElementFilter] = useState("All");
  const [qualityFilter, setQualityFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [lifePathInput, setLifePathInput] = useState("");
  const [lifePathResult, setLifePathResult] = useState(null);

  const filtered = useMemo(() => {
    return signs.filter((s) => {
      const matchEl = elementFilter === "All" || s.element === elementFilter;
      const matchQ = qualityFilter === "All" || s.quality === qualityFilter;
      return matchEl && matchQ;
    });
  }, [elementFilter, qualityFilter]);

  const handleLifePathSearch = () => {
    const num = parseInt(lifePathInput, 10);
    if (num >= 1 && num <= 9) {
      setLifePathResult(getLifePathMatch(num));
    } else if ([11, 22, 33].includes(num)) {
      setLifePathResult(getLifePathMatch(num));
    } else {
      setLifePathResult(null);
    }
  };

  return (
    <div className="page grid-page">
      <section className="intro-section">
        <h1>Zodiac &amp; Numerology Matrix</h1>
        <p>
          Discover the powerful connection between the 12 zodiac signs and their
          corresponding numerology numbers. Filter, explore, and find your cosmic
          match.
        </p>
      </section>

      <section className="grid-filters">
        <div className="filter-group">
          <span className="filter-label">Element:</span>
          <div className="filter-buttons">
            {elements.map((el) => (
              <button
                key={el}
                className={`filter-btn ${elementFilter === el ? "active" : ""}`}
                onClick={() => setElementFilter(el)}
              >
                {el}
              </button>
            ))}
          </div>
        </div>
        <div className="filter-group">
          <span className="filter-label">Quality:</span>
          <div className="filter-buttons">
            {qualities.map((q) => (
              <button
                key={q}
                className={`filter-btn ${qualityFilter === q ? "active" : ""}`}
                onClick={() => setQualityFilter(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="matrix-grid">
        {filtered.map((sign) => (
          <div
            key={sign.name}
            className="matrix-card"
            onClick={() => setSelected(sign)}
          >
            <span className="matrix-symbol">{sign.symbol}</span>
            <h3>{sign.name}</h3>
            <p className="matrix-dates">{sign.dates}</p>
            <span className={`matrix-element element-${sign.element.toLowerCase()}`}>
              {sign.element}
            </span>
            <span className="matrix-quality">{sign.quality}</span>
            <div className="matrix-numbers">
              {sign.numbers.map((n) => (
                <span key={n} className="number-badge">{n}</span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {filtered.length === 0 && (
        <p className="no-results">No signs match your filters.</p>
      )}

      <section className="life-path-section">
        <h2>Match Your Life Path Number</h2>
        <p>Enter your Life Path Number (1–9, 11, 22, or 33) to find your most aligned zodiac signs.</p>
        <div className="life-path-input-group">
          <input
            type="number"
            min="1"
            max="33"
            placeholder="e.g. 7"
            value={lifePathInput}
            onChange={(e) => setLifePathInput(e.target.value)}
          />
          <button className="btn" onClick={handleLifePathSearch}>Find Matches</button>
        </div>
        {lifePathResult && (
          <div className="life-path-results">
            {lifePathResult.map((s) => (
              <div key={s.name} className="match-chip" onClick={() => setSelected(s)}>
                {s.symbol} {s.name}
              </div>
            ))}
          </div>
        )}
        {lifePathResult !== null && lifePathResult.length === 0 && (
          <p className="no-results">No direct sign matches for this number.</p>
        )}
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            <span className="modal-symbol">{selected.symbol}</span>
            <h2>{selected.name}</h2>
            <p className="modal-dates">{selected.dates}</p>
            <p className="modal-description">{selected.description}</p>
            <div className="modal-details">
              <div className="modal-detail"><strong>Element:</strong> {selected.element}</div>
              <div className="modal-detail"><strong>Quality:</strong> {selected.quality}</div>
              <div className="modal-detail"><strong>Ruling Planet:</strong> {selected.ruler}</div>
              <div className="modal-detail"><strong>Numbers:</strong> {selected.numbers.join(", ")}</div>
            </div>
            <div className="modal-section">
              <h4>Strengths</h4>
              <div className="tag-list">{selected.strengths.map((s) => <span key={s} className="tag tag-strength">{s}</span>)}</div>
            </div>
            <div className="modal-section">
              <h4>Challenges</h4>
              <div className="tag-list">{selected.challenges.map((c) => <span key={c} className="tag tag-challenge">{c}</span>)}</div>
            </div>
            <div className="modal-section">
              <h4>Most Compatible With</h4>
              <div className="tag-list">{selected.compatible.map((c) => <span key={c} className="tag tag-compatible">{c}</span>)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
