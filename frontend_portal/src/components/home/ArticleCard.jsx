/**
 * Article card preview
 */
// PUBLIC_INTERFACE
import React from "react";
import "./articleCard.css";

// PUBLIC_INTERFACE
export default function ArticleCard({ item }) {
  return (
    <a href={`/article/${item.id}`} className="article-card card shadow-card">
      <div className="media">
        <img src={item.image} alt={item.title} />
        <span className="badge cat">{item.category}</span>
      </div>
      <div className="content">
        <h3 className="title">{item.title}</h3>
        <p className="excerpt">{item.excerpt}</p>
        <div className="meta">
          <span>{item.author}</span>
          <span>•</span>
          <span>{item.timestamp}</span>
        </div>
      </div>
    </a>
  );
}
