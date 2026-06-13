const BASE = import.meta.env.DEV ? "/api/vedika" : "https://api.vedika.io/sandbox";

async function post(endpoint, data) {
  const res = await fetch(`${BASE}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Vedika API error: ${res.status}`);
  return res.json();
}

async function get(endpoint) {
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Vedika API error: ${res.status}`);
  return res.json();
}

export function birthChart(datetime, latitude, longitude, timezone) {
  return post("/birth-chart", { datetime, latitude, longitude, timezone });
}

export function kundli(datetime, latitude, longitude, timezone) {
  return post("/kundli", { datetime, latitude, longitude, timezone });
}

export function planetaryPositions(datetime, latitude, longitude, timezone) {
  return post("/planetary-positions", { datetime, latitude, longitude, timezone });
}

export function dailyHoroscope(sign) {
  return get(`/prediction/daily?sign=${sign}`);
}

export function weeklyHoroscope(sign) {
  return get(`/prediction/weekly?sign=${sign}`);
}

export function monthlyHoroscope(sign) {
  return get(`/prediction/monthly?sign=${sign}`);
}

export function yearlyHoroscope(sign) {
  return get(`/prediction/yearly?sign=${sign}`);
}

export function gunaMilan(boy, girl) {
  return post("/astrology/guna-milan", { boy, girl });
}

export function mangalDosha(datetime, latitude, longitude, timezone) {
  return post("/astrology/mangal-dosha", { datetime, latitude, longitude, timezone });
}

export function panchang(datetime, latitude, longitude, timezone) {
  return post("/panchang", { datetime, latitude, longitude, timezone });
}

export function chatAsk(question, birthDetails, conversationId) {
  const body = { question, birthDetails };
  if (conversationId) body.conversationId = conversationId;
  return post("/chat/ask", body);
}
