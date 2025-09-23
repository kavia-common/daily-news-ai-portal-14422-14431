/**
 * Article Page skeleton: headline, featured media, meta, share, related, comments
 */
// PUBLIC_INTERFACE
import React from "react";
import { useParams } from "react-router-dom";
import { articles } from "../data/mockData";
import "./article.css";

// PUBLIC_INTERFACE
export default function ArticlePage() {
  const { id } = useParams();
  const item = articles.find((a) => a.id === id) || articles[0];

  return (
    <main className="page-offset">
      <div className="container article-wrap">
        <article className="article">
          <div className="category-line">
            <span className="badge">{item.category}</span>
          </div>
          <h1 className="article-title">{item.title}</h1>
          <div className="article-meta">
            <img className="avatar" src={`https://i.pravatar.cc/64?u=${item.author}`} alt={item.author} />
            <div className="meta-block">
              <div className="author">By {item.author}</div>
              <div className="time">{item.timestamp} • 6 min read</div>
            </div>
            <div className="share">
              <button className="btn">Share ⤴</button>
              <button className="btn">Bookmark ☆</button>
            </div>
          </div>
          <figure className="feature">
            <img src={item.image} alt={item.title} />
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
            <h3>Comments</h3>
            <div className="comment-box">
              <input className="input" placeholder="Join the discussion..." />
              <button className="btn btn-primary">Post</button>
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
          <h3>Related Articles</h3>
          <ul>
            {articles.slice(0, 5).map((r) => (
              <li key={r.id}>
                <a href={`/article/${r.id}`}>{r.title}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
