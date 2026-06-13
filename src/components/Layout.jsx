import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Stars from "./Stars";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-layout">
      <Stars />
      <header className="header">
        <NavLink to="/" className="logo" onClick={closeMenu}>
          <span className="logo-symbol">✦</span> Cosmic Insights
        </NavLink>
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
        <div className={`nav-wrap ${menuOpen ? "open" : ""}`}>
          <nav className="nav" onClick={closeMenu}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/astrology">Astrology</NavLink>
            <NavLink to="/numerology">Numerology</NavLink>
            <NavLink to="/tarot">Tarot</NavLink>
            <NavLink to="/horoscope">Horoscope</NavLink>
            <NavLink to="/astro-agent">Astro Agent</NavLink>
            <NavLink to="/birth-chart">Birth Chart</NavLink>
            <NavLink to="/compatibility">Compatibility</NavLink>
            <NavLink to="/chinese-zodiac">Chinese Zodiac</NavLink>
            <NavLink to="/panchang">Panchang</NavLink>
            <NavLink to="/mangal-dosha">Mangal Dosha</NavLink>
            <NavLink to="/loshu-grid">Lo Shu Grid</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Cosmic Insights. All rights reserved.</p>
      </footer>
    </div>
  );
}
