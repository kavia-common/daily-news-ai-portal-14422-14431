/**
 * Video clips page
 */
// PUBLIC_INTERFACE
import React from "react";
import { multimedia } from "../../data/mockData";
import "./media.css";

// PUBLIC_INTERFACE
export default function VideosPage() {
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">Video Clips</h2>
        <div className="grid grid-3">
          {multimedia.videos.map((v) => (
            <a href="#" key={v.id} className="card shadow-card media-card">
              <div className="video-thumb">
                <img src={v.thumbnail} alt={v.title} />
                <div className="play">▶</div>
                <div className="duration">{v.duration}</div>
              </div>
              <div className="media-meta">{v.title}</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
