/**
 * Header with logo/title, date/time/location, search, and language switcher.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useState } from "react";
import "./header.css";
import { useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // keep header input in sync with current q param
    const q = searchParams.get("q") || "";
    setQuery(q);
  }, [searchParams]);

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  const performSearch = () => {
    const cat = searchParams.get("cat"); // preserve category if any
    const next = new URLSearchParams();
    if (cat) next.set("cat", cat);
    if (query?.trim()) next.set("q", query.trim());
    navigate({ pathname: "/", search: `?${next.toString()}` });
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") performSearch();
  };

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
              onKeyDown={onKeyDown}
              placeholder="Search articles, topics, authors..."
              aria-label="Search"
            />
            <button className="btn" aria-label="Search" onClick={performSearch}>
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
