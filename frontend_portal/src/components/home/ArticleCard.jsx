 /** 
  * Article card preview
  */
 // PUBLIC_INTERFACE
 import React from "react";
 import "./articleCard.css";
 
 /**
  * PUBLIC_INTERFACE
  * Renders a distinct, short, bold headline and a separate blurb for readability.
  */
 export default function ArticleCard({ item }) {
   return (
     <a href={`/article/${encodeURIComponent(item.id)}`} className="article-card card shadow-card">
       <div className="media">
         <img src={item.image} alt={item.title} loading="lazy" />
         <span className="badge cat">{item.category}</span>
       </div>
       <div className="content">
         <h3 className="headline">{item.title}</h3>
         {item.excerpt ? <p className="blurb">{item.excerpt}</p> : null}
         <div className="meta" aria-label="Article metadata">
           <span>{item.author}</span>
           <span aria-hidden>•</span>
           <time dateTime={new Date().toISOString()}>{item.timestamp}</time>
         </div>
       </div>
     </a>
   );
 }
