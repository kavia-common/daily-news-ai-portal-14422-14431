/**
 * Photo gallery page
 */
// PUBLIC_INTERFACE
import React from "react";
import { multimedia } from "../../data/mockData";
import "./media.css";
import { useTranslation } from "../../react-i18next-shim.js";

// PUBLIC_INTERFACE
export default function PhotosPage() {
  const { t } = useTranslation();
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">{t("photos")}</h2>
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
