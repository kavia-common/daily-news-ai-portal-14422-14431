/**
 * Trending/Most Read section widget
 */
// PUBLIC_INTERFACE
import React, { useContext } from "react";
import { trending } from "../../data/mockData";
import "./trendingList.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../../context/LanguageContext";

// PUBLIC_INTERFACE
export default function TrendingList() {
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);

  return (
    <aside className="trending card shadow-card">
      <div className="header">
        <span className="badge">{t("most_read")}</span>
      </div>
      <ol className="items">
        {trending.map((tItem, i) => (
          <li key={tItem.id} className="item">
            <a href={`/article/${tItem.id}`} className="link">
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <span className="title">{tItem.title?.[lang] ?? tItem.title}</span>
              <span className="reads">{tItem.reads}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
