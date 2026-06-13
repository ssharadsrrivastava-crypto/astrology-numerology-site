import { useState, useMemo } from "react";

const ANIMALS = [
  { name: "Rat", years: "2024, 2012, 2000, 1988, 1976", emoji: "🐀", element: "Water", traits: "Quick-witted, resourceful, versatile, kind." },
  { name: "Ox", years: "2021, 2009, 1997, 1985, 1973", emoji: "🐂", element: "Earth", traits: "Diligent, dependable, strong, determined." },
  { name: "Tiger", years: "2022, 2010, 1998, 1986, 1974", emoji: "🐅", element: "Wood", traits: "Brave, confident, charismatic, authoritative." },
  { name: "Rabbit", years: "2023, 2011, 1999, 1987, 1975", emoji: "🐇", element: "Wood", traits: "Gentle, elegant, kind, responsible." },
  { name: "Dragon", years: "2024, 2012, 2000, 1988, 1976", emoji: "🐉", element: "Earth", traits: "Confident, intelligent, enthusiastic, ambitious." },
  { name: "Snake", years: "2025, 2013, 2001, 1989, 1977", emoji: "🐍", element: "Fire", traits: "Enigmatic, intelligent, wise, graceful." },
  { name: "Horse", years: "2026, 2014, 2002, 1990, 1978", emoji: "🐎", element: "Fire", traits: "Energetic, independent, impatient, cheerful." },
  { name: "Goat", years: "2027, 2015, 2003, 1991, 1979", emoji: "🐐", element: "Earth", traits: "Calm, creative, empathetic, gentle." },
  { name: "Monkey", years: "2028, 2016, 2004, 1992, 1980", emoji: "🐒", element: "Metal", traits: "Witty, curious, adaptable, sociable." },
  { name: "Rooster", years: "2029, 2017, 2005, 1993, 1981", emoji: "🐓", element: "Metal", traits: "Observant, hardworking, courageous, talented." },
  { name: "Dog", years: "2030, 2018, 2006, 1994, 1982", emoji: "🐕", element: "Earth", traits: "Loyal, honest, cautious, responsible." },
  { name: "Pig", years: "2031, 2019, 2007, 1995, 1983", emoji: "🐖", element: "Water", traits: "Compassionate, generous, diligent, peaceful." },
];

const COMPATIBILITY = {
  Rat: { best: ["Dragon", "Monkey"], worst: ["Horse", "Goat"], score: { Dragon: 95, Monkey: 90, Ox: 85, Rooster: 80, Dog: 65, Snake: 60, Rabbit: 55, Tiger: 50, Pig: 45, Horse: 30, Goat: 25 } },
  Ox: { best: ["Rat", "Snake"], worst: ["Goat", "Horse"], score: { Rat: 85, Snake: 90, Rooster: 80, Dog: 70, Rabbit: 65, Tiger: 60, Monkey: 55, Dragon: 50, Pig: 45, Horse: 30, Goat: 25 } },
  Tiger: { best: ["Horse", "Dog"], worst: ["Monkey", "Snake"], score: { Horse: 90, Dog: 85, Pig: 75, Rabbit: 70, Rooster: 65, Rat: 50, Ox: 60, Dragon: 55, Goat: 45, Snake: 30, Monkey: 25 } },
  Rabbit: { best: ["Goat", "Pig"], worst: ["Rooster", "Rat"], score: { Goat: 90, Pig: 85, Dog: 80, Tiger: 70, Monkey: 65, Ox: 65, Horse: 55, Dragon: 50, Snake: 45, Rat: 30, Rooster: 25 } },
  Dragon: { best: ["Rat", "Monkey"], worst: ["Dog", "Rabbit"], score: { Rat: 95, Monkey: 90, Rooster: 80, Snake: 75, Tiger: 55, Ox: 50, Horse: 45, Goat: 40, Pig: 35, Rabbit: 30, Dog: 25 } },
  Snake: { best: ["Ox", "Rooster"], worst: ["Tiger", "Pig"], score: { Ox: 90, Rooster: 85, Monkey: 75, Dragon: 75, Rabbit: 45, Horse: 40, Rat: 60, Goat: 55, Dog: 50, Pig: 30, Tiger: 25 } },
  Horse: { best: ["Tiger", "Dog"], worst: ["Rat", "Ox"], score: { Tiger: 90, Dog: 85, Rabbit: 55, Goat: 75, Dragon: 45, Snake: 40, Rooster: 50, Monkey: 35, Pig: 60, Rat: 30, Ox: 25 } },
  Goat: { best: ["Rabbit", "Horse"], worst: ["Ox", "Dog"], score: { Rabbit: 90, Horse: 75, Pig: 80, Monkey: 65, Dragon: 40, Snake: 55, Tiger: 45, Rat: 25, Rooster: 60, Ox: 25, Dog: 25 } },
  Monkey: { best: ["Rat", "Dragon"], worst: ["Tiger", "Pig"], score: { Rat: 90, Dragon: 90, Snake: 75, Ox: 55, Rabbit: 65, Horse: 35, Goat: 65, Rooster: 70, Dog: 50, Tiger: 25, Pig: 25 } },
  Rooster: { best: ["Ox", "Snake"], worst: ["Rabbit", "Dog"], score: { Ox: 80, Snake: 85, Dragon: 80, Monkey: 70, Rat: 80, Tiger: 65, Horse: 50, Goat: 60, Pig: 45, Rabbit: 25, Dog: 25 } },
  Dog: { best: ["Tiger", "Horse"], worst: ["Dragon", "Goat"], score: { Tiger: 85, Horse: 85, Rabbit: 80, Ox: 70, Rat: 65, Monkey: 50, Snake: 50, Pig: 45, Rooster: 25, Dragon: 25, Goat: 25 } },
  Pig: { best: ["Rabbit", "Goat"], worst: ["Snake", "Monkey"], score: { Rabbit: 85, Goat: 80, Tiger: 75, Ox: 45, Dragon: 35, Rat: 45, Rooster: 45, Horse: 60, Dog: 45, Snake: 30, Monkey: 25 } },
};

function getAnimalByYear(year) {
  const animals = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
  return animals[(year - 4) % 12];
}

export default function ChineseZodiac() {
  const [selected, setSelected] = useState(null);
  const [comp1, setComp1] = useState("Rat");
  const [comp2, setComp2] = useState("Dragon");

  const currentYearAnimal = useMemo(() => getAnimalByYear(new Date().getFullYear()), []);

  const compScore = useMemo(() => {
    if (!COMPATIBILITY[comp1] || !COMPATIBILITY[comp1].score[comp2]) return null;
    return COMPATIBILITY[comp1].score[comp2];
  }, [comp1, comp2]);

  const compVerdict = compScore >= 80 ? "high" : compScore >= 50 ? "medium" : "low";
  const compText = compScore >= 80 ? "Excellent match! You two have great cosmic harmony." : compScore >= 50 ? "Good compatibility with room to grow together." : "Challenging match. Requires understanding and compromise.";

  return (
    <div className="page chinese-zodiac-page">
      <section className="intro-section">
        <h1>Chinese Zodiac</h1>
        <p>Discover the 12 animal signs of the Chinese zodiac. Each animal represents distinct personality traits and destinies.</p>
      </section>

      <section className="cz-section">
        <h2>The 12 Animals</h2>
        <p style={{ textAlign: "center", marginBottom: "1rem", fontSize: "0.85rem" }}>Current year: <strong style={{ color: "var(--gold)" }}>{currentYearAnimal}</strong></p>
        <div className="cz-grid">
          {ANIMALS.map((a) => (
            <div
              key={a.name}
              className={`cz-card ${selected === a.name ? "selected" : ""}`}
              onClick={() => setSelected(selected === a.name ? null : a.name)}
            >
              <span className="cz-animal">{a.emoji}</span>
              <h3>{a.name}</h3>
              <p className="cz-years">{a.years}</p>
            </div>
          ))}
        </div>
      </section>

      {selected && (() => {
        const a = ANIMALS.find((x) => x.name === selected);
        return (
          <section className="info-section" style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
            <div className="info-card" style={{ textAlign: "center" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>{a.emoji}</span>
              <h3>{a.name}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Element: {a.element}</p>
              <p>{a.traits}</p>
            </div>
          </section>
        );
      })()}

      <section className="cz-comp-section">
        <h2>Chinese Zodiac Compatibility</h2>
        <p style={{ fontSize: "0.85rem" }}>Check how two animal signs match</p>
        <div className="cz-comp-form">
          <div className="calc-form-group">
            <label>Sign 1</label>
            <select value={comp1} onChange={(e) => setComp1(e.target.value)}>
              {ANIMALS.map((a) => <option key={a.name} value={a.name}>{a.emoji} {a.name}</option>)}
            </select>
          </div>
          <div className="calc-form-group">
            <label>Sign 2</label>
            <select value={comp2} onChange={(e) => setComp2(e.target.value)}>
              {ANIMALS.map((a) => <option key={a.name} value={a.name}>{a.emoji} {a.name}</option>)}
            </select>
          </div>
        </div>
        {compScore !== null && (
          <div className="cz-comp-result">
            <div className={`cz-comp-score ${compVerdict}`}>{compScore}%</div>
            <p style={{ marginTop: "0.5rem" }}>{compText}</p>
          </div>
        )}
      </section>
    </div>
  );
}
