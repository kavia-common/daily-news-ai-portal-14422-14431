/**
 * Podcasts / Audio streaming page
 */
// PUBLIC_INTERFACE
import React from "react";
import { multimedia } from "../../data/mockData";
import "./media.css";

// PUBLIC_INTERFACE
export default function PodcastsPage() {
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">Podcasts</h2>
        <div className="podcasts">
          {multimedia.podcasts.map((p) => (
            <div key={p.id} className="card shadow-card podcast-row">
              <div className="title">{p.title}</div>
              <div className="controls">
                <button className="btn btn-primary">► Play</button>
                <span className="length">{p.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
