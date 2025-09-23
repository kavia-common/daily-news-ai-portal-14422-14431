/**
 * HomePage layout combining main modules.
 */
// PUBLIC_INTERFACE
import React from "react";
import FeaturedCarousel from "../components/home/FeaturedCarousel";
import TrendingList from "../components/home/TrendingList";
import ArticleCard from "../components/home/ArticleCard";
import Sidebar from "../components/sidebar/Sidebar";
import { articles } from "../data/mockData";
import "./home.css";

// PUBLIC_INTERFACE
export default function HomePage() {
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
            <h2 className="section-title">Latest</h2>
            <div className="grid grid-3">
              {articles.map((a) => (
                <ArticleCard item={a} key={a.id} />
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
