/**
 * HomePage layout combining main modules.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useMemo, useState } from "react";
import FeaturedCarousel from "../components/home/FeaturedCarousel";
import TrendingList from "../components/home/TrendingList";
import ArticleCard from "../components/home/ArticleCard";
import Sidebar from "../components/sidebar/Sidebar";
import { articles as mockArticles } from "../data/mockData";
import "./home.css";
import { useSearchParams } from "react-router-dom";
import { fetchPoliticalNews } from "../services/api";

/**
 * PUBLIC_INTERFACE
 * HomePage renders:
 * - Featured carousel and sidebar widgets
 * - Main feed that supports:
 *   - Live Politics news when ?cat=Politics
 *   - Local filtering by category and text for mock content otherwise
 */
export default function HomePage() {
  const [searchParams] = useSearchParams();
  const cat = searchParams.get("cat") || "";
  const q = searchParams.get("q") || "";
  const [loading, setLoading] = useState(false);
  const [liveNews, setLiveNews] = useState([]);

  // Fetch live political news when category is Politics
  useEffect(() => {
    let ignore = false;
    async function run() {
      if (cat === "Politics") {
        setLoading(true);
        const items = await fetchPoliticalNews({ query: q || "politics" });
        if (!ignore) {
          setLiveNews(items || []);
          setLoading(false);
        }
      } else {
        setLiveNews([]);
      }
    }
    run();
    return () => {
      ignore = true;
    };
  }, [cat, q]);

  const localFiltered = useMemo(() => {
    // For non-politics categories, filter mock content by category and q
    const base =
      cat && cat !== "Politics"
        ? mockArticles.filter((a) => a.category === cat)
        : mockArticles;
    if (!q.trim()) return base;
    const qq = q.toLowerCase();
    return base.filter(
      (a) =>
        a.title.toLowerCase().includes(qq) ||
        a.excerpt.toLowerCase().includes(qq) ||
        a.author.toLowerCase().includes(qq) ||
        a.category.toLowerCase().includes(qq)
    );
  }, [cat, q]);

  const showLive = cat === "Politics";

  return (
    <main className="page-offset">
      <div className="container">
        <section className="hero-grid">
          <div className="hero-main">
            <FeaturedCarousel />
            <div className="multimedia-bar">
              <a href="/photos">Photos</a>
              <a href="/videos">Videos</a>
              <a href="/podcasts">Podcasts</a>
            </div>
          </div>
          <div className="hero-side">
            <TrendingList />
          </div>
        </section>

        <section className="content-grid">
          <div className="main-feed">
            <h2 className="section-title">
              {showLive ? "Politics • Live" : cat ? cat : "Latest"}
              {q ? ` — “${q}”` : ""}
            </h2>
            {loading && <p>Loading latest political headlines…</p>}
            {!loading && showLive && liveNews.length === 0 && (
              <p>No political headlines found right now. Try adjusting your search.</p>
            )}
            <div className="grid grid-3">
              {showLive
                ? liveNews.map((a) => <ArticleCard item={a} key={a.id} />)
                : localFiltered.map((a) => <ArticleCard item={a} key={a.id} />)}
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
