/**
 * Featured News Carousel for top stories
 */
// PUBLIC_INTERFACE
import React, { useContext, useEffect, useState } from "react";
import { featuredStories } from "../../data/mockData";
import "./featuredCarousel.css";
import { LanguageContext } from "../../context/LanguageContext";

// PUBLIC_INTERFACE
export default function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const { lang } = useContext(LanguageContext);
  const next = () => setIndex((i) => (i + 1) % featuredStories.length);
  const prev = () => setIndex((i) => (i - 1 + featuredStories.length) % featuredStories.length);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="featured-carousel card shadow-card">
      <button className="nav-btn left" onClick={prev} aria-label="Previous">‹</button>
      <button className="nav-btn right" onClick={next} aria-label="Next">›</button>
      {featuredStories.map((s, i) => (
        <a
          href={`/article/${s.id}`}
          className={`slide ${i === index ? "active" : ""}`}
          key={s.id}
          aria-hidden={i !== index}
        >
          <img src={s.image} alt={typeof s.title === "string" ? s.title : (s.title?.[lang] ?? "")} />
          <div className="overlay">
            <span className="badge">{s.category}</span>
            <h2 className="title">{s.title?.[lang] ?? s.title}</h2>
            <div className="meta">
              <span>{s.author?.[lang] ?? s.author?.en ?? s.author}</span>
              <span>•</span>
              <span>{new Date(s.timestamp).toLocaleString()}</span>
            </div>
          </div>
        </a>
      ))}
      <div className="dots">
        {featuredStories.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
