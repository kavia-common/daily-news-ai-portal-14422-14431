/**
 * Header with logo/title, date/time/location, search, and language switcher.
 */
// PUBLIC_INTERFACE
import React, { useContext, useEffect, useState } from "react";
import "./header.css";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

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
  const { lang, setLang } = useContext(LanguageContext);
  const { t } = useTranslation();
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
            <div className="title">{t("brand")}</div>
            <div className="sub">
              <span>{dateStr}</span>
              <span className="dot">•</span>
              <span>{timeStr}</span>
              <span className="dot">•</span>
              <span>{t("worldwide")}</span>
            </div>
          </div>
        </div>

        <div className="actions">
          <div className="search">
            <input
              className="input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              aria-label="Search"
            />
            <button className="btn" aria-label="Search">
              🔍
            </button>
          </div>
          <div className="lang-switch">
            {[
              { code: "en", label: "EN" },
              { code: "ta", label: "TA" },
              { code: "te", label: "TE" },
              { code: "kn", label: "KN" },
              { code: "hi", label: "HI" }
            ].map((l) => (
              <button
                key={l.code}
                className={`btn ${lang === l.code ? "active" : ""}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
