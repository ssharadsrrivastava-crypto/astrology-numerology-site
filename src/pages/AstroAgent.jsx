import { useState, useRef, useEffect } from "react";
import { chatAsk } from "../api/vedika";
import BirthPlace from "../components/BirthPlace";

function formatResponse(text) {
  const lines = text.split("\n");
  const html = [];
  let inTable = false;
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("|") && line.endsWith("|")) {
      if (!inTable) { inTable = true; tableRows = []; }
      const cells = line.split("|").filter(Boolean).map(c => c.trim());
      if (line.includes("---")) continue;
      tableRows.push(cells);
      continue;
    }

    if (inTable && !line.startsWith("|")) {
      inTable = false;
      html.push("<table class='chat-table'><tbody>");
      tableRows.forEach((row, ri) => {
        const tag = ri === 0 ? "th" : "td";
        html.push("<tr>" + row.map(c => `<${tag}>${c}</${tag}>`).join("") + "</tr>");
      });
      html.push("</tbody></table>");
      tableRows = [];
    }

    if (line.startsWith("---")) continue;
    if (line.startsWith("**") && line.endsWith("**")) {
      html.push(`<p class='chat-bold'>${line.slice(2, -2)}</p>`);
    } else if (line.startsWith("- ")) {
      html.push(`<li class='chat-li'>${line.slice(2)}</li>`);
    } else if (line.match(/^\d+\.\s/)) {
      html.push(`<li class='chat-li'>${line.replace(/^\d+\.\s/, "")}</li>`);
    } else if (line.trim() === "") {
      if (html.length && html[html.length - 1] !== "<br>") html.push("<br>");
    } else {
      html.push(`<p class='chat-p'>${line}</p>`);
    }
  }
  if (inTable && tableRows.length) {
    html.push("<table class='chat-table'><tbody>");
    tableRows.forEach((row, ri) => {
      const tag = ri === 0 ? "th" : "td";
      html.push("<tr>" + row.map(c => `<${tag}>${c}</${tag}>`).join("") + "</tr>");
    });
    html.push("</tbody></table>");
  }
  return html.join("\n");
}

const defaultBirthDetails = { date: "1990-06-15", time: "10:30", latitude: 28.7041, longitude: 77.1025, timezone: "+05:30", place: "Delhi" };

export default function AstroAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [birthDetails, setBirthDetails] = useState(defaultBirthDetails);
  const chatEnd = useRef(null);

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const addMessage = (role, text, extra) => {
    setMessages(prev => [...prev, { role, text, extra, id: Date.now() + Math.random() }]);
  };

  const handleSend = async (question) => {
    const q = (question || input).trim();
    if (!q || loading) return;
    setInput("");
    addMessage("user", q);
    setLoading(true);
    setSuggestions([]);
    try {
      const bd = showDetails ? birthDetails : undefined;
      const res = await chatAsk(q, bd, convId);
      const data = res;
      addMessage("assistant", data.response || "No response received.");
      if (data.conversationId) setConvId(data.conversationId);
      if (data.followUpSuggestions) setSuggestions(data.followUpSuggestions);
    } catch (e) {
      addMessage("assistant", `Error: ${e.message}. Please try again.`);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleNewChat = () => {
    setMessages([]);
    setConvId(null);
    setSuggestions([]);
    setInput("");
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <div className="page astro-agent-page">
      <section className="intro-section">
        <h1>Astro Agent</h1>
        <p>Ask your astrology and numerology questions to our AI-powered astrologer. Get personalized insights based on your birth chart.</p>
      </section>

      <section className="aa-layout">
        <div className="aa-chat-container">
          <div className="aa-chat-header">
            <h2>Ask the Astro Agent</h2>
            <button className="btn-small" onClick={handleNewChat}>New Chat</button>
          </div>

          <div className="aa-messages">
            {messages.length === 0 && (
              <div className="aa-welcome">
                <div className="aa-welcome-icon">✦</div>
                <h3>Welcome to Astro Agent!</h3>
                <p>Ask me anything about astrology, numerology, or your birth chart. For example:</p>
                <div className="aa-examples">
                  <button className="aa-example-btn" onClick={() => handleSend("What does my Sun sign say about me?")}>What does my Sun sign say about me?</button>
                  <button className="aa-example-btn" onClick={() => handleSend("Explain my 10th house planets")}>Explain my 10th house planets</button>
                  <button className="aa-example-btn" onClick={() => handleSend("What is a Gaja Kesari Yoga?")}>What is a Gaja Kesari Yoga?</button>
                  <button className="aa-example-btn" onClick={() => handleSend("How do I calculate my Life Path Number?")}>How do I calculate my Life Path Number?</button>
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`aa-msg ${m.role}`}>
                <div className="aa-msg-avatar">{m.role === "user" ? "U" : "✦"}</div>
                <div className="aa-msg-content">
                  <div className="aa-msg-text" dangerouslySetInnerHTML={{ __html: formatResponse(m.text) }} />
                </div>
              </div>
            ))}

            {loading && (
              <div className="aa-msg assistant">
                <div className="aa-msg-avatar">✦</div>
                <div className="aa-msg-content">
                  <div className="aa-typing"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}

            {suggestions.length > 0 && !loading && (
              <div className="aa-suggestions">
                <p className="aa-suggestions-label">Suggested follow-up questions:</p>
                <div className="aa-suggestions-list">
                  {suggestions.map((s, i) => (
                    <button key={i} className="aa-suggestion-btn" onClick={() => handleSend(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div ref={chatEnd} />
          </div>

          <div className="aa-input-area">
            <textarea
              className="aa-input"
              placeholder="Ask your astrology question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
            />
            <button className="btn aa-send-btn" onClick={() => handleSend()} disabled={loading || !input.trim()}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>

        <div className="aa-sidebar">
          <button className="btn btn-secondary aa-toggle-details" onClick={toggleDetails}>
            {showDetails ? "Hide" : "Add"} Birth Details
          </button>

          {showDetails && (
            <div className="aa-details-panel">
              <h3>Your Birth Details</h3>
              <p className="aa-details-hint">Add your birth details for personalized responses.</p>
              <div className="aa-details-form">
                <BirthPlace
                  place={birthDetails.place || ""}
                  setPlace={(v) => setBirthDetails({...birthDetails, place: v})}
                  setLat={(v) => setBirthDetails({...birthDetails, latitude: parseFloat(v) || 0})}
                  setLng={(v) => setBirthDetails({...birthDetails, longitude: parseFloat(v) || 0})}
                  setTz={(v) => setBirthDetails({...birthDetails, timezone: v})}
                />
                <div className="calc-form-group">
                  <label>Date</label>
                  <input type="date" value={birthDetails.date} onChange={(e) => setBirthDetails({...birthDetails, date: e.target.value})} />
                </div>
                <div className="calc-form-group">
                  <label>Time</label>
                  <input type="time" value={birthDetails.time} onChange={(e) => setBirthDetails({...birthDetails, time: e.target.value})} />
                </div>
                <div className="calc-form-group">
                  <label>Latitude</label>
                  <input type="text" value={birthDetails.latitude} onChange={(e) => setBirthDetails({...birthDetails, latitude: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="calc-form-group">
                  <label>Longitude</label>
                  <input type="text" value={birthDetails.longitude} onChange={(e) => setBirthDetails({...birthDetails, longitude: parseFloat(e.target.value) || 0})} />
                </div>
                <div className="calc-form-group">
                  <label>Timezone</label>
                  <select value={birthDetails.timezone} onChange={(e) => setBirthDetails({...birthDetails, timezone: e.target.value})}>
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
          )}

          <div className="aa-info">
            <h3>About Astro Agent</h3>
            <p>Powered by Vedika AI — your personal Vedic astrology assistant. Ask about birth charts, planetary positions, yogas, dashas, numerology, and more.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
