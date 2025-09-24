 /** 
  * HomePage layout combining main modules.
  */
 // PUBLIC_INTERFACE
 import React, { useEffect, useMemo, useState } from "react";
 import FeaturedCarousel from "../components/home/FeaturedCarousel";
 import TrendingList from "../components/home/TrendingList";
 import ArticleCard from "../components/home/ArticleCard";
 import Sidebar from "../components/sidebar/Sidebar";
 import "./home.css";
 import { useSearchParams } from "react-router-dom";
 import { fetchDefaultIndiaHeadlines, searchIndiaNewsByKeyword } from "../services/news";
 
 /**
  * PUBLIC_INTERFACE
  * HomePage renders:
  * - Featured carousel and sidebar widgets
  * - Main feed that by default shows India "general" headlines in English
  * - Keyword search (?q=...) fetches relevant India news in English
  */
 export default function HomePage() {
   const [searchParams] = useSearchParams();
   const q = (searchParams.get("q") || "").trim();
   const [loading, setLoading] = useState(true);
   const [items, setItems] = useState([]);
   const [errorText, setErrorText] = useState("");
 
   useEffect(() => {
     let ignore = false;
     async function run() {
       setLoading(true);
       setErrorText("");
       try {
         const data = q ? await searchIndiaNewsByKeyword(q) : await fetchDefaultIndiaHeadlines();
         if (!ignore) {
           setItems(Array.isArray(data) ? data : []);
         }
       } catch (e) {
         if (!ignore) setErrorText("Unable to load news right now. Please try again.");
       } finally {
         if (!ignore) setLoading(false);
       }
     }
     run();
     return () => {
       ignore = true;
     };
   }, [q]);
 
   const hasResults = useMemo(() => items && items.length > 0, [items]);
 
   return (
     <main className="page-offset">
       <div className="container">
         <section className="hero-grid">
           <div className="hero-main">
             <FeaturedCarousel />
             <div className="multimedia-bar">
               <a href="/photos">Photos</a>
               <a href="/videos">Videos</a>
               <a href="/podcasts">Podcasts</a>
             </div>
           </div>
           <div className="hero-side">
             <TrendingList />
           </div>
         </section>
 
         <section className="content-grid">
           <div className="main-feed">
             <h2 className="section-title">
               {q ? `Latest in India — “${q}”` : "Latest in India"}
             </h2>
             {loading && <p>Loading top headlines…</p>}
             {!loading && errorText && <p style={{ color: "var(--ocean-error)" }}>{errorText}</p>}
             {!loading && !errorText && !hasResults && (
               <p>No results right now. Try another keyword.</p>
             )}
             <div className="grid grid-3">
               {items.map((a) => (
                 <ArticleCard item={a} key={a.id} />
               ))}
             </div>
           </div>
           <div className="sidebar-wrap">
             <Sidebar />
           </div>
         </section>
       </div>
     </main>
   );
 }
