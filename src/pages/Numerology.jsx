import { useState } from "react";

function sumDigits(n) {
  let total = 0;
  while (n) { total += n % 10; n = Math.floor(n / 10); }
  return total;
}

function sumDigitsRecursively(n) {
  let sum = sumDigits(Number(n));
  if (sum < 10) return sum;
  return sumDigitsRecursively(sum);
}

function lifeP(date, month, year) {
  const d = sumDigitsRecursively(date);
  const m = sumDigitsRecursively(month);
  const y = sumDigitsRecursively(year);
  return sumDigitsRecursively(d + m + y);
}

function destinyN(name) {
  const chars = name.toUpperCase().split("");
  let soul = 0, total = 0;
  for (const ch of chars) {
    if (ch === " ") { total += soul; soul = 0; continue; }
    if ("AIJQY".includes(ch)) soul += 1;
    else if ("BKR".includes(ch)) soul += 2;
    else if ("CGLS".includes(ch)) soul += 3;
    else if ("DMT".includes(ch)) soul += 4;
    else if ("EHNX".includes(ch)) soul += 5;
    else if ("UVW".includes(ch)) soul += 6;
    else if ("OZ".includes(ch)) soul += 7;
    else if ("FP".includes(ch)) soul += 8;
  }
  total += soul;
  return { compound: total, destiny: sumDigitsRecursively(total) };
}

const luckyCombinations = new Set([
  "999","998","996","995","993","991","989","986","985","983","981","976","975","973","971","969","966","965","961","959","956","955","953","951","946","945","941","939","935","933","931","929","926","925","923","922","921","919","916","915","913","911","899","896","895","893","891","889","886","885","883","881","878","876","875","873","871","869","868","866","865","861","856","855","853","851","846","845","841","838","835","833","831","826","825","823","821","816","815","813","811","796","795","793","791","788","786","785","783","781","777","776","775","774","773","771","767","766","765","764","761","757","756","755","754","751","747","746","745","741","737","735","733","731","726","725","723","721","716","715","714","713","711","699","696","695","691","689","688","686","685","681","677","676","675","674","671","669","667","666","665","664","661","659","657","656","655","654","651","647","646","645","641","639","637","635","631","626","625","622","621","619","617","616","615","611","599","596","595","593","591","586","585","583","581","577","576","575","574","571","569","567","566","565","564","561","559","556","555","553","551","547","546","545","541","539","535","533","531","526","525","523","522","521","519","516","515","513","512","511","496","495","491","486","485","481","477","476","475","471","467","466","465","461","457","456","455","451","447","446","445","441","437","435","431","426","425","421","417","416","415","411","399","395","393","391","388","385","383","381","377","375","373","371","369","367","365","361","359","357","355","353","351","347","345","343","341","339","337","335","333","331","329","325","323","321","319","317","315","313","311","299","296","295","293","292","291","286","285","283","281","276","275","273","271","266","265","262","261","256","255","253","251","247","246","245","241","239","235","233","231","226","225","223","221","219","216","215","213","211","199","196","195","193","191","186","185","183","181","176","175","174","173"
]);

const planetNames = ["Sun", "Moon", "Jupiter", "Rahu", "Mercury", "Venus", "Ketu", "Saturn", "Mars"];

const lifePathMeanings = {
  1: "The Leader — Independent, ambitious, and pioneering.",
  2: "The Diplomat — Cooperative, intuitive, and peace-loving.",
  3: "The Creative — Expressive, optimistic, and artistic.",
  4: "The Builder — Practical, disciplined, and hardworking.",
  5: "The Adventurer — Freedom-loving, versatile, and curious.",
  6: "The Nurturer — Responsible, compassionate, and family-oriented.",
  7: "The Seeker — Analytical, spiritual, and introspective.",
  8: "The Achiever — Ambitious, authoritative, and goal-driven.",
  9: "The Humanitarian — Generous, wise, and selfless.",
  11: "The Intuitive — A master number of enlightenment and spiritual insight.",
  22: "The Master Builder — A master number of vision and practicality.",
  33: "The Master Teacher — A master number of unconditional love and healing.",
};

const destinyMeanings = {
  1: "The Pioneer — Natural leader, innovative, and determined.",
  2: "The Peacemaker — Diplomatic, sensitive, and cooperative.",
  3: "The Communicator — Creative, optimistic, and expressive.",
  4: "The Organizer — Practical, disciplined, and trustworthy.",
  5: "The Freedom Seeker — Adventurous, versatile, and progressive.",
  6: "The Nurturer — Responsible, loving, and community-focused.",
  7: "The Analyst — Intellectual, spiritual, and introspective.",
  8: "The Achiever — Ambitious, efficient, and goal-oriented.",
  9: "The Humanitarian — Compassionate, generous, and selfless.",
};

const mainPlanetMeanings = {
  1: "Sun — Leadership, vitality, confidence, and authority.",
  2: "Moon — Emotion, intuition, nurturing, and sensitivity.",
  3: "Jupiter — Wisdom, expansion, optimism, and abundance.",
  4: "Rahu — Ambition, innovation, materialism, and desires.",
  5: "Mercury — Communication, intellect, adaptability, and wit.",
  6: "Venus — Love, beauty, harmony, creativity, and relationships.",
  7: "Ketu — Spirituality, detachment, mysticism, and insight.",
  8: "Saturn — Discipline, responsibility, structure, and karma.",
  9: "Mars — Courage, energy, action, and determination.",
};

const keyNumbersDescriptions = {
  lifePath: "Derived from your birth date. It represents your life's purpose and the lessons you are here to learn.",
  mainPlanet: "Calculated from your birth day. Represents your core personality and ruling planetary energy.",
  destiny: "Derived from your full name. It reveals your talents, abilities, and ultimate goals.",
};

export default function Numerology() {
  const [activeTab, setActiveTab] = useState("life-path");

  // Life Path
  const [lpBirthdate, setLpBirthdate] = useState("");
  const [lpResult, setLpResult] = useState(null);

  // Mobile Number
  const [mnDate, setMnDate] = useState("");
  const [mnMonth, setMnMonth] = useState("");
  const [mnYear, setMnYear] = useState("");
  const [mnNumber, setMnNumber] = useState("");
  const [mnResult, setMnResult] = useState(null);

  // Key Numbers
  const [knDate, setKnDate] = useState("");
  const [knMonth, setKnMonth] = useState("");
  const [knYear, setKnYear] = useState("");
  const [knName, setKnName] = useState("");
  const [knResult, setKnResult] = useState(null);

  const handleLifePathCalc = () => {
    if (!lpBirthdate) return;
    const parts = lpBirthdate.split("-");
    if (parts.length !== 3) return;
    const num = lifeP(parseInt(parts[2]), parseInt(parts[1]), parseInt(parts[0]));
    setLpResult(num);
  };

  const handleMobileCalc = () => {
    if (!mnDate || !mnMonth || !mnYear || !mnNumber) return;
    const dd = parseInt(mnDate, 10);
    const mm = parseInt(mnMonth, 10);
    const yy = parseInt(mnYear, 10);
    const mainPlanet = sumDigitsRecursively(dd);
    const lifePath = lifeP(dd, mm, yy);
    const mobileTotal = sumDigitsRecursively(mnNumber.replace(/\D/g, ""));
    const combo = `${mainPlanet}${lifePath}${mobileTotal}`;
    const isLucky = luckyCombinations.has(combo);
    setMnResult({ mainPlanet, lifePath, mobileTotal, isLucky, combo });
  };

  const handleKeyNumbersCalc = () => {
    if (!knDate || !knMonth || !knYear || !knName) return;
    const dd = parseInt(knDate, 10);
    const mm = parseInt(knMonth, 10);
    const yy = parseInt(knYear, 10);
    const lifePath = lifeP(dd, mm, yy);
    const mainPlanet = sumDigitsRecursively(dd);
    const dest = destinyN(knName);
    setKnResult({ lifePath, mainPlanet, destiny: dest.destiny, compoundDestiny: dest.compound });
  };

  const handleWhatsAppMobile = () => {
    if (!mnResult) return;
    const text = `*Mobile Number Numerology Analysis*
Main Planet: ${mnResult.mainPlanet} (${planetNames[mnResult.mainPlanet - 1]})
Life Path: ${mnResult.lifePath}
Mobile Number Total: ${mnResult.mobileTotal}
Combination: ${mnResult.combo}
Result: ${mnResult.isLucky ? "✅ This Mobile Number is lucky for you" : "❌ Not coming on your favourable number"}

Check yours at: ${window.location.origin}/numerology`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="page numerology-page">
      <section className="intro-section">
        <h1>Numerology Calculators</h1>
        <p>Use our free numerology tools to calculate your Life Path Number and check if your mobile number is lucky.</p>
      </section>

      <div className="calc-tabs">
        <button className={`calc-tab ${activeTab === "life-path" ? "active" : ""}`} onClick={() => setActiveTab("life-path")}>Life Path Number</button>
        <button className={`calc-tab ${activeTab === "mobile" ? "active" : ""}`} onClick={() => setActiveTab("mobile")}>Lucky Mobile Number</button>
        <button className={`calc-tab ${activeTab === "key-numbers" ? "active" : ""}`} onClick={() => setActiveTab("key-numbers")}>Key Numbers</button>
      </div>

      {activeTab === "life-path" && (
        <section className="calculator-section">
          <h2>Life Path Number Calculator</h2>
          <p>Your Life Path Number is the most important number in your numerology chart. It reveals the path you are meant to walk.</p>
          <div className="calculator">
            <label htmlFor="lp-birthdate">Enter your birth date:</label>
            <input type="date" id="lp-birthdate" value={lpBirthdate} onChange={(e) => setLpBirthdate(e.target.value)} />
            <button onClick={handleLifePathCalc} className="btn">Calculate</button>
          </div>
          {lpResult !== null && (
            <div className="result-card">
              <h3>Your Life Path Number: {lpResult}</h3>
              <p>{lifePathMeanings[lpResult] || "Discover your unique path."}</p>
            </div>
          )}
        </section>
      )}

      {activeTab === "mobile" && (
        <section className="calculator-section">
          <h2>Lucky Mobile Number Calculator</h2>
          <p>Check if your mobile number aligns with your numerology based on your date of birth.</p>
          <div className="calculator mobile-calc">
            <div className="calc-form-group">
              <label>Your Date of Birth</label>
              <div className="date-inputs">
                <input type="text" placeholder="DD" maxLength="2" value={mnDate} onChange={(e) => setMnDate(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="MM" maxLength="2" value={mnMonth} onChange={(e) => setMnMonth(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="YYYY" maxLength="4" value={mnYear} onChange={(e) => setMnYear(e.target.value.replace(/\D/g, ""))} />
              </div>
            </div>
            <div className="calc-form-group">
              <label htmlFor="mn-number">Mobile Number</label>
              <input type="text" id="mn-number" placeholder="Enter mobile number without country code" value={mnNumber} onChange={(e) => setMnNumber(e.target.value.replace(/\D/g, ""))} />
            </div>
            <button onClick={handleMobileCalc} className="btn">Calculate</button>
          </div>

          {mnResult && (
            <div className="mobile-result">
              <table className="result-table">
                <thead><tr><th>Numerology Numbers</th><th>Value</th><th>Planet</th></tr></thead>
                <tbody>
                  <tr><td>Main Planet</td><td>{mnResult.mainPlanet}</td><td>{planetNames[mnResult.mainPlanet - 1]}</td></tr>
                  <tr><td>Life Path</td><td>{mnResult.lifePath}</td><td>{planetNames[mnResult.lifePath - 1]}</td></tr>
                  <tr><td>Mobile Number Total</td><td>{mnResult.mobileTotal}</td><td>{planetNames[mnResult.mobileTotal - 1]}</td></tr>
                </tbody>
              </table>
              <div className={`verdict ${mnResult.isLucky ? "lucky" : "unlucky"}`}>
                <p>Your Mobile Number combination: <strong>{mnResult.combo}</strong></p>
                <h3>{mnResult.isLucky ? "✅ This Mobile Number is lucky for you" : "❌ This Mobile Number is not coming on your favourable number"}</h3>
              </div>
              <button className="btn btn-secondary whatsapp-btn" onClick={handleWhatsAppMobile}>
                Send to WhatsApp
              </button>
            </div>
          )}
        </section>
      )}

      {activeTab === "key-numbers" && (
        <section className="calculator-section">
          <h2>Key Numbers in Your Chart</h2>
          <p>Enter your date of birth and full name to calculate the three core numbers in your numerology chart.</p>
          <div className="calculator">
            <div className="calc-form-group">
              <label>Your Date of Birth</label>
              <div className="date-inputs">
                <input type="text" placeholder="DD" maxLength="2" value={knDate} onChange={(e) => setKnDate(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="MM" maxLength="2" value={knMonth} onChange={(e) => setKnMonth(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="YYYY" maxLength="4" value={knYear} onChange={(e) => setKnYear(e.target.value.replace(/\D/g, ""))} />
              </div>
            </div>
            <div className="calc-form-group">
              <label htmlFor="kn-name">Your Full Name (as on birth certificate)</label>
              <input type="text" id="kn-name" placeholder="Enter your full name" value={knName} onChange={(e) => setKnName(e.target.value)} />
            </div>
            <button onClick={handleKeyNumbersCalc} className="btn">Calculate My Numbers</button>
          </div>

          {knResult && (
            <div className="kn-report">
              <table className="result-table">
                <thead><tr><th>Key Number</th><th>Value</th><th>Meaning</th></tr></thead>
                <tbody>
                  <tr>
                    <td><strong>Life Path</strong></td>
                    <td>{knResult.lifePath}</td>
                    <td><span className="kn-planet">{planetNames[knResult.lifePath - 1]}</span> — {lifePathMeanings[knResult.lifePath]}</td>
                  </tr>
                  <tr>
                    <td><strong>Main Planet</strong></td>
                    <td>{knResult.mainPlanet}</td>
                    <td><span className="kn-planet">{planetNames[knResult.mainPlanet - 1]}</span> — {mainPlanetMeanings[knResult.mainPlanet]}</td>
                  </tr>
                  <tr>
                    <td><strong>Destiny</strong></td>
                    <td>{knResult.destiny}</td>
                    <td><span className="kn-planet">{planetNames[knResult.destiny - 1]}</span> — {destinyMeanings[knResult.destiny]}</td>
                  </tr>
                </tbody>
              </table>
              <div className="result-card kn-summary">
                <h3>Your Numerology Profile</h3>
                <p><strong>Life Path {knResult.lifePath}</strong> — You are here to learn the lessons of the {lifePathMeanings[knResult.lifePath]?.split("—")[0]?.trim() || "this path"}.</p>
                <p><strong>Main Planet {knResult.mainPlanet} ({planetNames[knResult.mainPlanet - 1]})</strong> — Your core personality is ruled by {planetNames[knResult.mainPlanet - 1]} energy.</p>
                <p><strong>Destiny {knResult.destiny} ({planetNames[knResult.destiny - 1]})</strong> — Your life's ultimate goal is expressed through {planetNames[knResult.destiny - 1]} energy.</p>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="numbers-section">
        <h2>Understanding Your Numbers</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>Life Path Number</h3>
            <p>{keyNumbersDescriptions.lifePath}</p>
            {knResult && <p className="kn-your-number">Your Life Path: <strong>{knResult.lifePath}</strong> ({planetNames[knResult.lifePath - 1]})</p>}
          </div>
          <div className="info-card">
            <h3>Main Planet Number</h3>
            <p>{keyNumbersDescriptions.mainPlanet}</p>
            {knResult && <p className="kn-your-number">Your Main Planet: <strong>{knResult.mainPlanet}</strong> ({planetNames[knResult.mainPlanet - 1]})</p>}
          </div>
          <div className="info-card">
            <h3>Destiny Number</h3>
            <p>{keyNumbersDescriptions.destiny}</p>
            {knResult && <p className="kn-your-number">Your Destiny: <strong>{knResult.destiny}</strong> ({planetNames[knResult.destiny - 1]})</p>}
          </div>
        </div>
      </section>
    </div>
  );
}
