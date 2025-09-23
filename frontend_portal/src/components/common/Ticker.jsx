/**
 * Breaking News Ticker across the top.
 */
// PUBLIC_INTERFACE
import React, { useContext, useEffect, useRef, useState } from "react";
import { breakingNews } from "../../data/mockData";
import "./ticker.css";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

// PUBLIC_INTERFACE
export default function Ticker() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % breakingNews.length);
    }, 3500);
    return () => clearInterval(timer.current);
  }, []);

  const current = breakingNews[index];

  return (
    <div className="gx-ticker">
      <div className="container ticker-inner">
        <span className="label">{t("breaking")}</span>
        <a className="headline" href={current.link}>{current.title?.[lang] ?? current.title}</a>
      </div>
    </div>
  );
}
