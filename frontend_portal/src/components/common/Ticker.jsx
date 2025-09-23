/**
 * Breaking News Ticker across the top.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useRef, useState } from "react";
import { breakingNews } from "../../data/mockData";
import "./ticker.css";
import { useTranslation } from "../../react-i18next-shim.js";

// PUBLIC_INTERFACE
export default function Ticker() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);
  const { t, i18n } = useTranslation();

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
        <a className="headline" href={current.link}>
          {current.title?.[i18n?.language] ?? current.title?.en ?? current.title}
        </a>
      </div>
    </div>
  );
}
