import { useState, useCallback } from "react";

const TAROT_CARDS = [
  { name: "The Fool", symbol: "🎭", type: "Major Arcana", meaning: "New beginnings, innocence, spontaneity. A leap of faith awaits you.", keywords: ["New Beginnings", "Spontaneity", "Adventure"] },
  { name: "The Magician", symbol: "🪄", type: "Major Arcana", meaning: "Manifestation, resourcefulness, power. You have all the tools you need.", keywords: ["Manifestation", "Willpower", "Skill"] },
  { name: "The High Priestess", symbol: "🌙", type: "Major Arcana", meaning: "Intuition, mystery, subconscious. Trust your inner voice.", keywords: ["Intuition", "Mystery", "Wisdom"] },
  { name: "The Empress", symbol: "👑", type: "Major Arcana", meaning: "Abundance, nurturing, femininity. Growth and beauty surround you.", keywords: ["Abundance", "Nurturing", "Nature"] },
  { name: "The Emperor", symbol: "⚜️", type: "Major Arcana", meaning: "Authority, structure, stability. Take charge of your domain.", keywords: ["Authority", "Structure", "Protection"] },
  { name: "The Hierophant", symbol: "⛪", type: "Major Arcana", meaning: "Wisdom, tradition, spiritual guidance. Seek knowledge from elders.", keywords: ["Tradition", "Wisdom", "Guidance"] },
  { name: "The Lovers", symbol: "💞", type: "Major Arcana", meaning: "Love, harmony, choices. Follow your heart's true desire.", keywords: ["Love", "Harmony", "Choices"] },
  { name: "The Chariot", symbol: "🏆", type: "Major Arcana", meaning: "Victory, determination, willpower. Push forward with confidence.", keywords: ["Victory", "Determination", "Control"] },
  { name: "Strength", symbol: "🦁", type: "Major Arcana", meaning: "Courage, inner strength, compassion. You are stronger than you know.", keywords: ["Courage", "Patience", "Compassion"] },
  { name: "The Hermit", symbol: "🏮", type: "Major Arcana", meaning: "Soul-searching, introspection, solitude. Seek answers within.", keywords: ["Introspection", "Wisdom", "Solitude"] },
  { name: "Wheel of Fortune", symbol: "🎡", type: "Major Arcana", meaning: "Change, cycles, destiny. Your luck is about to turn.", keywords: ["Change", "Luck", "Destiny"] },
  { name: "Justice", symbol: "⚖️", type: "Major Arcana", meaning: "Fairness, truth, balance. The universe will restore equilibrium.", keywords: ["Justice", "Truth", "Accountability"] },
  { name: "The Hanged Man", symbol: "🙃", type: "Major Arcana", meaning: "Surrender, new perspective, pause. Look at things differently.", keywords: ["Surrender", "Perspective", "Patience"] },
  { name: "Death", symbol: "💀", type: "Major Arcana", meaning: "Transformation, endings, new beginnings. Embrace necessary change.", keywords: ["Transformation", "Endings", "Rebirth"] },
  { name: "Temperance", symbol: "⚗️", type: "Major Arcana", meaning: "Balance, moderation, patience. Find the middle path.", keywords: ["Balance", "Moderation", "Peace"] },
  { name: "The Devil", symbol: "😈", type: "Major Arcana", meaning: "Bondage, materialism, shadow. Break free from what holds you.", keywords: ["Shadow", "Liberation", "Materialism"] },
  { name: "The Tower", symbol: "🗼", type: "Major Arcana", meaning: "Upheaval, revelation, awakening. Destruction paves the way for renewal.", keywords: ["Upheaval", "Revelation", "Awakening"] },
  { name: "The Star", symbol: "⭐", type: "Major Arcana", meaning: "Hope, inspiration, serenity. Trust the universe's plan for you.", keywords: ["Hope", "Inspiration", "Healing"] },
  { name: "The Moon", symbol: "🌑", type: "Major Arcana", meaning: "Illusion, fear, subconscious. Face your shadows with courage.", keywords: ["Illusion", "Fear", "Intuition"] },
  { name: "The Sun", symbol: "☀️", type: "Major Arcana", meaning: "Joy, success, vitality. Radiate your inner light.", keywords: ["Joy", "Success", "Vitality"] },
  { name: "Judgement", symbol: "📯", type: "Major Arcana", meaning: "Reflection, reckoning, inner calling. Rise to your higher purpose.", keywords: ["Judgment", "Rebirth", "Purpose"] },
  { name: "The World", symbol: "🌍", type: "Major Arcana", meaning: "Completion, accomplishment, fulfillment. A cycle ends successfully.", keywords: ["Completion", "Wholeness", "Achievement"] },
];

const DAILY_CARD = TAROT_CARDS[new Date().toDateString().split(" ").join("").length % TAROT_CARDS.length];

export default function Tarot() {
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState(DAILY_CARD);
  const [drew, setDrew] = useState(false);

  const drawCard = useCallback(() => {
    const idx = Math.floor(Math.random() * TAROT_CARDS.length);
    setCard(TAROT_CARDS[idx]);
    setFlipped(false);
    setDrew(true);
    setTimeout(() => setFlipped(true), 300);
  }, []);

  return (
    <div className="page tarot-page">
      <section className="intro-section">
        <h1>Tarot Card of the Day</h1>
        <p>Draw a card for daily guidance. Each Major Arcana card carries a message from the universe.</p>
      </section>

      <section className="tarot-layout">
        {!drew && (
          <div className="daily-affirmation">
            <h3>Today's Card</h3>
            <p>Your card today is {DAILY_CARD.name}</p>
            <p className="affirmation-source">Click the card to reveal its meaning</p>
          </div>
        )}

        <div className={`tarot-card ${flipped ? "flipped" : ""}`} onClick={() => !flipped && setFlipped(true)}>
          <div className="tarot-card-inner">
            <div className="tarot-card-face tarot-card-back">
              <p>Tap to reveal</p>
            </div>
            <div className="tarot-card-face tarot-card-front">
              <span className="tarot-card-symbol">{card.symbol}</span>
              <h3>{card.name}</h3>
              <span className="tarot-type">{card.type}</span>
            </div>
          </div>
        </div>

        {flipped && (
          <div className="tarot-meaning">
            <h3>{card.name}</h3>
            <p>{card.meaning}</p>
            <div className="tarot-keywords">
              {card.keywords.map((kw) => (
                <span key={kw} className="tarot-keyword">{kw}</span>
              ))}
            </div>
          </div>
        )}

        {flipped && (
          <button className="btn tarot-draw-btn" onClick={drawCard}>
            Draw New Card
          </button>
        )}
      </section>
    </div>
  );
}
