import { useState } from "react";

function sumDigits(n) {
  let total = 0;
  while (n) { total += n % 10; n = Math.floor(n / 10); }
  return total;
}
function sumDigitsRecursively(n) {
  const s = sumDigits(Number(n));
  return s < 10 ? s : sumDigitsRecursively(s);
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

const planetNames = ["Sun", "Moon", "Jupiter", "Rahu", "Mercury", "Venus", "Ketu", "Saturn", "Mars"];

const gridPlanets = ["Rahu", "Mars", "Moon", "Jupiter", "Mercury", "Ketu", "Saturn", "Sun", "Venus"];

const luckyCombinations = new Set([
  "999","998","996","995","993","991","989","986","985","983","981","976","975","973","971","969","966","965","961","959","956","955","953","951","946","945","941","939","935","933","931","929","926","925","923","922","921","919","916","915","913","911","899","896","895","893","891","889","886","885","883","881","878","876","875","873","871","869","868","866","865","861","856","855","853","851","846","845","841","838","835","833","831","826","825","823","821","816","815","813","811","796","795","793","791","788","786","785","783","781","777","776","775","774","773","771","767","766","765","764","761","757","756","755","754","751","747","746","745","741","737","735","733","731","726","725","723","721","716","715","714","713","711","699","696","695","691","689","688","686","685","681","677","676","675","674","671","669","667","666","665","664","661","659","657","656","655","654","651","647","646","645","641","639","637","635","631","626","625","622","621","619","617","616","615","611","599","596","595","593","591","586","585","583","581","577","576","575","574","571","569","567","566","565","564","561","559","556","555","553","551","547","546","545","541","539","535","533","531","526","525","523","522","521","519","516","515","513","512","511","496","495","491","486","485","481","477","476","475","471","467","466","465","461","457","456","455","451","447","446","445","441","437","435","431","426","425","421","417","416","415","411","399","395","393","391","388","385","383","381","377","375","373","371","369","367","365","361","359","357","355","353","351","347","345","343","341","339","337","335","333","331","329","325","323","321","319","317","315","313","311","299","296","295","293","292","291","286","285","283","281","276","275","273","271","266","265","262","261","256","255","253","251","247","246","245","241","239","235","233","231","226","225","223","221","219","216","215","213","211","199","196","195","193","191","186","185","183","181","176","175","174","173","171","169","167","166","165","161","159","156","155","153","151","147","146","145","141","139","135","133","131","126","125","123","121","119","116","115","113","111"
]);

export default function LoShuGrid() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!name || !date || !month || !year) return;
    const dd = parseInt(date, 10);
    const mm = parseInt(month, 10);
    const yy = parseInt(year, 10);
    const mainPlanet = sumDigitsRecursively(dd);
    const lifePath = lifeP(dd, mm, yy);
    const dest = destinyN(name);

    const data = {
      name: name.toUpperCase(),
      mainPlanet,
      planet: planetNames[mainPlanet - 1],
      lifePath,
      lifePathPlanet: planetNames[lifePath - 1],
      destiny: dest.destiny,
      destinyPlanet: planetNames[dest.destiny - 1],
      compoundDestiny: dest.compound,
    };

    const dobStr = `${date}${month}${year}`;
    let gridStr;
    if (dd > 9) {
      gridStr = dobStr + mainPlanet + lifePath + dest.destiny;
    } else {
      gridStr = dobStr + lifePath + dest.destiny;
    }

    const counts = {};
    for (const ch of gridStr) {
      if (ch >= "1" && ch <= "9") {
        counts[ch] = (counts[ch] || 0) + 1;
      }
    }

    const grid = {};
    for (let i = 1; i <= 9; i++) {
      grid[i] = counts[i] || 0;
    }

    const present = Object.entries(grid).filter(([, v]) => v > 0).map(([k]) => Number(k));
    const missing = Object.entries(grid).filter(([, v]) => v === 0).map(([k]) => Number(k));
    const repeating = Object.entries(grid).filter(([, v]) => v > 1).map(([k, v]) => `${k}×${v}`);

    const combo = `${mainPlanet}${lifePath}${dest.destiny}`;
    const isLucky = luckyCombinations.has(combo);

    data.grid = grid;
    data.present = present;
    data.missing = missing;
    data.repeating = repeating;
    data.combo = combo;
    data.isLucky = isLucky;

    setResult(data);
  };

  const handleWhatsApp = () => {
    if (!result) return;
    const text = `*Lo Shu Grid Analysis*
Name: ${result.name}
Main Planet: ${result.mainPlanet} (${result.planet})
Life Path: ${result.lifePath} (${result.lifePathPlanet})
Destiny Number: ${result.destiny} (${result.destinyPlanet})
Compound Destiny: ${result.compoundDestiny}

Grid Present: ${result.present.join(", ") || "None"}
Grid Missing: ${result.missing.join(", ") || "None"}
Repeating: ${result.repeating.join(", ") || "None"}

Name Combination: ${result.combo}
Result: ${result.isLucky ? "✅ Your Name is lucky for you" : "❌ Your Name is not coming on your favourable number"}

Get your analysis at: ${window.location.origin}/loshu-grid`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getGridCell = (num) => {
    const count = result?.grid[num] || 0;
    return { count, label: count > 0 ? String(num).repeat(count) : "" };
  };

  return (
    <div className="page loshu-grid-page">
      <section className="intro-section">
        <h1>Lo Shu Grid Calculator</h1>
        <p>Generate your personalized Lo Shu Grid chart based on your name and date of birth. Discover which numbers are present, missing, or repeating.</p>
      </section>

      <div className="loshu-layout">
        <div className="loshu-input-panel">
          <h2>Enter Your Details</h2>
          <div className="calculator loshu-calc">
            <div className="calc-form-group">
              <label htmlFor="ls-name">Full Name</label>
              <input type="text" id="ls-name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="calc-form-group">
              <label>Date of Birth</label>
              <div className="date-inputs">
                <input type="text" placeholder="DD" maxLength="2" value={date} onChange={(e) => setDate(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="MM" maxLength="2" value={month} onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))} />
                <input type="text" placeholder="YYYY" maxLength="4" value={year} onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))} />
              </div>
            </div>
            <button className="btn" onClick={handleCalculate}>Calculate</button>
          </div>
        </div>

        {result && (
          <div className="loshu-result-panel">
            <h2>Your Lo Shu Grid</h2>
            <div className="loshu-grid-container">
              <div className="loshu-grid">
                {[
                  [4, 9, 2],
                  [3, 5, 7],
                  [8, 1, 6],
                ].map((row, ri) => (
                  <div className="loshu-row" key={ri}>
                    {row.map((num) => {
                      const cell = getGridCell(num);
                      return (
                        <div key={num} className={`loshu-cell ${cell.count > 0 ? "filled" : "empty"} ${cell.count > 1 ? "repeating" : ""}`}>
                          <span className="cell-number">{num}</span>
                          <span className="cell-planet">{gridPlanets[num - 1]}</span>
                          {cell.count > 0 && <span className="cell-digits">{cell.label}</span>}
                          {cell.count === 0 && <span className="cell-empty-mark">—</span>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="loshu-numbers-table">
              <table className="result-table">
                <thead><tr><th>Numerology Numbers</th><th>Value</th><th>Planet</th></tr></thead>
                <tbody>
                  <tr><td>Main Planet (DD)</td><td>{result.mainPlanet}</td><td>{result.planet}</td></tr>
                  <tr><td>Life Path</td><td>{result.lifePath}</td><td>{result.lifePathPlanet}</td></tr>
                  <tr><td>Compound Destiny</td><td>{result.compoundDestiny}</td><td>{planetNames[(sumDigitsRecursively(result.compoundDestiny)) - 1]}</td></tr>
                  <tr><td>Destiny Number</td><td>{result.destiny}</td><td>{result.destinyPlanet}</td></tr>
                </tbody>
              </table>
            </div>

            <div className="loshu-analysis">
              <div className="analysis-block">
                <h3>Present Numbers</h3>
                <div className="analysis-chips">
                  {result.present.length > 0 ? result.present.map((n) => <span key={n} className="chip chip-present">{n}</span>) : <span className="chip">None</span>}
                </div>
              </div>
              <div className="analysis-block">
                <h3>Missing Numbers</h3>
                <div className="analysis-chips">
                  {result.missing.length > 0 ? result.missing.map((n) => <span key={n} className="chip chip-missing">{n}</span>) : <span className="chip">None</span>}
                </div>
              </div>
              <div className="analysis-block">
                <h3>Repeating Numbers</h3>
                <div className="analysis-chips">
                  {result.repeating.length > 0 ? result.repeating.map((r, i) => <span key={i} className="chip chip-repeating">{r}</span>) : <span className="chip">None</span>}
                </div>
              </div>
            </div>

            <div className={`verdict ${result.isLucky ? "lucky" : "unlucky"}`}>
              <p>Name Combination: <strong>{result.combo}</strong></p>
              <h3>{result.isLucky ? "✅ Your Name is lucky for you" : "❌ Your Name is not coming on your favourable number"}</h3>
            </div>

            <button className="btn btn-secondary whatsapp-btn" onClick={handleWhatsApp}>Send to WhatsApp</button>
          </div>
        )}
      </div>
    </div>
  );
}
