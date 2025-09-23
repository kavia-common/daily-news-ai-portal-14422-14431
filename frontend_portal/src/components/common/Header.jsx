/**
 * Header with logo/title, date/time/location, search, and language switcher.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useState } from "react";
import "./header.css";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// PUBLIC_INTERFACE
export default function Header() {
  const now = useClock();
  const [lang, setLang] = useState("EN");
  const [query, setQuery] = useState("");

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
    <header className="gx-header">
      <div className="container gx-header-inner">
        <div className="brand">
          <div className="logo">GE</div>
          <div className="meta">
            <div className="title">GLOBAL EXPRESS</div>
            <div className="sub">
              <span>{dateStr}</span>
              <span className="dot">•</span>
              <span>{timeStr}</span>
              <span className="dot">•</span>
              <span>Worldwide</span>
            </div>
          </div>
        </div>

        <div className="actions">
          <div className="search">
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, topics, authors..."
              aria-label="Search"
            />
            <button className="btn" aria-label="Search">
              🔍
            </button>
          </div>
          <div className="lang-switch">
            <button
              className={`btn ${lang === "EN" ? "active" : ""}`}
              onClick={() => setLang("EN")}
            >
              EN
            </button>
            <button
              className={`btn ${lang === "ES" ? "active" : ""}`}
              onClick={() => setLang("ES")}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
