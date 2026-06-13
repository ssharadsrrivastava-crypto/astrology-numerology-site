import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Astrology from "./pages/Astrology";
import Numerology from "./pages/Numerology";
import Tarot from "./pages/Tarot";
import Grid from "./pages/Grid";
import LoShuGrid from "./pages/LoShuGrid";
import Horoscope from "./pages/Horoscope";
import BirthChart from "./pages/BirthChart";
import AstroAgent from "./pages/AstroAgent";
import Compatibility from "./pages/Compatibility";
import Panchang from "./pages/Panchang";
import MangalDosha from "./pages/MangalDosha";
import ChineseZodiac from "./pages/ChineseZodiac";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="astrology" element={<Astrology />} />
        <Route path="numerology" element={<Numerology />} />
        <Route path="tarot" element={<Tarot />} />
        <Route path="grid" element={<Grid />} />
        <Route path="loshu-grid" element={<LoShuGrid />} />
        <Route path="horoscope" element={<Horoscope />} />
        <Route path="birth-chart" element={<BirthChart />} />
        <Route path="astro-agent" element={<AstroAgent />} />
        <Route path="compatibility" element={<Compatibility />} />
        <Route path="panchang" element={<Panchang />} />
        <Route path="mangal-dosha" element={<MangalDosha />} />
        <Route path="chinese-zodiac" element={<ChineseZodiac />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
