/**
 * HomePage layout combining main modules.
 */
// PUBLIC_INTERFACE
import React, { useContext, useMemo, useState } from "react";
import FeaturedCarousel from "../components/home/FeaturedCarousel";
import TrendingList from "../components/home/TrendingList";
import ArticleCard from "../components/home/ArticleCard";
import Sidebar from "../components/sidebar/Sidebar";
import { articles } from "../data/mockData";
import "./home.css";
import { useTranslation } from "../react-i18next-shim";
import { LanguageContext } from "../context/LanguageContext";

// PUBLIC_INTERFACE
export default function HomePage() {
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);
  const [date, setDate] = useState("");

  const filtered = useMemo(() => {
    if (!date) return articles;
    const d = new Date(date);
    return articles.filter((a) => {
      const ad = new Date(a.timestamp);
      return ad.toDateString() === d.toDateString();
    });
  }, [date]);

  return (
    <main className="page-offset">
      <div className="container">
        <section className="hero-grid">
          <div className="hero-main">
            <FeaturedCarousel />
            <div className="multimedia-bar">
              <a href="/photos">{t("photos")}</a>
              <a href="/videos">{t("videos")}</a>
              <a href="/podcasts">{t("podcasts")}</a>
            </div>
          </div>
          <div className="hero-side">
            <TrendingList />
          </div>
        </section>

        <section className="content-grid">
          <div className="main-feed">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 className="section-title">{t("latest")}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label htmlFor="dateFilter" className="btn" style={{ background: "transparent" }}>
                  {t("date_filter")}
                </label>
                <input
                  id="dateFilter"
                  type="date"
                  className="input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: 180 }}
                />
                {date && (
                  <button className="btn" onClick={() => setDate("")}>{t("clear")}</button>
                )}
              </div>
            </div>
            <div className="grid grid-3">
              {filtered.map((a) => (
                <ArticleCard item={{ ...a, title: a.title?.[lang] ?? a.title, excerpt: a.excerpt?.[lang] ?? a.excerpt }} key={a.id} />
              ))}
            </div>
          </div>
          <div className="sidebar-wrap">
            <Sidebar />
          </div>
        </section>
      </div>
    </main>
  );
}
