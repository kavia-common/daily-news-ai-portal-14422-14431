/**
 * Photo gallery page
 */
// PUBLIC_INTERFACE
import React from "react";
import { multimedia } from "../../data/mockData";
import "./media.css";

// PUBLIC_INTERFACE
export default function PhotosPage() {
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">Photo Gallery</h2>
        <div className="grid grid-3">
          {multimedia.photos.map((p) => (
            <figure key={p.id} className="card shadow-card media-card">
              <img src={p.src} alt={p.title} />
              <figcaption>{p.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
