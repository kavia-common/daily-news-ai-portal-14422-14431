/**
 * Article card preview
 */
// PUBLIC_INTERFACE
import React, { useContext } from "react";
import "./articleCard.css";
import { LanguageContext } from "../../context/LanguageContext";

// PUBLIC_INTERFACE
export default function ArticleCard({ item }) {
  const { lang } = useContext(LanguageContext);
  const title = item.title?.[lang] ?? item.title;
  const excerpt = item.excerpt?.[lang] ?? item.excerpt;
  const time = item.timestamp ? new Date(item.timestamp).toLocaleString() : "";

  return (
    <a href={`/article/${item.id}`} className="article-card card shadow-card">
      <div className="media">
        <img src={item.image} alt={typeof title === "string" ? title : ""} />
        <span className="badge cat">{item.category}</span>
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="excerpt">{excerpt}</p>
        <div className="meta">
          <span>{item.author}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </a>
  );
}
