/**
 * Article Page skeleton: headline, featured media, meta, share, related, comments
 */
// PUBLIC_INTERFACE
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { articles } from "../data/mockData";
import "./article.css";
import { useTranslation } from "react-i18next";
import { LanguageContext } from "../context/LanguageContext";

// PUBLIC_INTERFACE
export default function ArticlePage() {
  const { id } = useParams();
  const item = articles.find((a) => a.id === id) || articles[0];
  const { t } = useTranslation();
  const { lang } = useContext(LanguageContext);

  const title = item.title?.[lang] ?? item.title;
  const time = item.timestamp ? new Date(item.timestamp).toLocaleString() : "";
  const byText = t("by_author", { name: item.author });
  const readText = t("min_read", { minutes: 6 });

  return (
    <main className="page-offset">
      <div className="container article-wrap">
        <article className="article">
          <div className="category-line">
            <span className="badge">{item.category}</span>
          </div>
          <h1 className="article-title">{title}</h1>
          <div className="article-meta">
            <img className="avatar" src={`https://i.pravatar.cc/64?u=${item.author}`} alt={item.author} />
            <div className="meta-block">
              <div className="author">{byText}</div>
              <div className="time">{time} • {readText}</div>
            </div>
            <div className="share">
              <button className="btn">Share ⤴</button>
              <button className="btn">Bookmark ☆</button>
            </div>
          </div>
          <figure className="feature">
            <img src={item.image} alt={typeof title === "string" ? title : ""} />
            <figcaption>Image credit: Placeholder Photography</figcaption>
          </figure>

          <div className="article-body">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
              ante at sapien posuere lacinia. Integer volutpat, neque a
              vehicula sagittis, nibh turpis scelerisque velit, a semper orci
              orci at ipsum.
            </p>
            <p>
              Donec nec semper mauris. Aliquam vulputate sapien nec risus
              aliquam, ac tempus dui pharetra. Vivamus tempus efficitur nunc,
              non congue erat faucibus non.
            </p>
            <blockquote>
              "Great journalism clarifies complexity and empowers communities."
            </blockquote>
            <p>
              Suspendisse in iaculis ligula. Nulla facilisi. Duis porta tortor
              a risus congue, vitae malesuada ipsum laoreet.
            </p>
          </div>

          <section className="comments card">
            <h3>{t("comments")}</h3>
            <div className="comment-box">
              <input className="input" placeholder={t("join_discussion")} />
              <button className="btn btn-primary">{t("post")}</button>
            </div>
            <div className="comment-thread">
              <div className="comment">
                <strong>Reader1</strong> Great analysis, thanks!
              </div>
              <div className="comment">
                <strong>Reader2</strong> I'd love more data on this.
              </div>
            </div>
          </section>
        </article>

        <aside className="related">
          <h3>{t("related_articles")}</h3>
          <ul>
            {articles.slice(0, 5).map((r) => (
              <li key={r.id}>
                <a href={`/article/${r.id}`}>{r.title?.[lang] ?? r.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
