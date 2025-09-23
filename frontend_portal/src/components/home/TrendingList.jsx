/**
 * Trending/Most Read section widget
 */
// PUBLIC_INTERFACE
import React from "react";
import { trending } from "../../data/mockData";
import "./trendingList.css";

// PUBLIC_INTERFACE
export default function TrendingList() {
  return (
    <aside className="trending card shadow-card">
      <div className="header">
        <span className="badge">Most Read</span>
      </div>
      <ol className="items">
        {trending.map((t, i) => (
          <li key={t.id} className="item">
            <a href={`/article/${t.id}`} className="link">
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <span className="title">{t.title}</span>
              <span className="reads">{t.reads}</span>
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
