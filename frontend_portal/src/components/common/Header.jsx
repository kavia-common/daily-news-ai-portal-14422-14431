 /** 
  * Header with logo/title, date/time/location, search, and language switcher.
  */
 // PUBLIC_INTERFACE
 import React, { useEffect, useState } from "react";
 import "./header.css";
 import { useNavigate, useSearchParams } from "react-router-dom";
 import { getReadableLocationString } from "../../services/news";
 
 function useClock() {
   const [now, setNow] = useState(new Date());
   useEffect(() => {
     const id = setInterval(() => setNow(new Date()), 1000);
     return () => clearInterval(id);
   }, []);
   return now;
 }
 
 // PUBLIC_INTERFACE
 export default function Header() {
   const now = useClock();
   const [lang, setLang] = useState("EN");
   const [query, setQuery] = useState("");
   const [locationText, setLocationText] = useState("Detecting location…");
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
 
   // Sync search input with ?q
   useEffect(() => {
     const q = searchParams.get("q") || "";
     setQuery(q);
   }, [searchParams]);
 
   // Geolocation on load: show detected coords prominently (no API key)
   useEffect(() => {
     if (!navigator?.geolocation) {
       setLocationText("Location unavailable");
       return;
     }
     navigator.geolocation.getCurrentPosition(
       (pos) => setLocationText(getReadableLocationString(pos.coords)),
       () => setLocationText("Location permission denied"),
       { enableHighAccuracy: false, maximumAge: 300000, timeout: 8000 }
     );
   }, []);
 
   const dateStr = now.toLocaleDateString("en-IN", {
     weekday: "long",
     year: "numeric",
     month: "long",
     day: "numeric",
   });
   const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
 
   // Streamlined search that always works and clears confusing states
   const performSearch = () => {
     const next = new URLSearchParams();
     const cat = searchParams.get("cat");
     if (cat) next.set("cat", cat);
     if (query?.trim()) next.set("q", query.trim());
     navigate({ pathname: "/", search: `?${next.toString()}` });
   };
 
   const onKeyDown = (e) => {
     if (e.key === "Enter") performSearch();
   };
 
   return (
     <header className="gx-header" role="banner">
       <div className="container gx-header-inner">
         <div className="brand" aria-label="Site branding">
           <div className="logo" aria-hidden>GE</div>
           <div className="meta">
             <div className="title">GLOBAL EXPRESS</div>
             <div className="sub" aria-live="polite">
               <span>{dateStr}</span>
               <span className="dot">•</span>
               <span>{timeStr}</span>
               <span className="dot">•</span>
               <span>{locationText}</span>
             </div>
           </div>
         </div>
 
         <div className="actions">
           <div className="search" role="search">
             <input
               className="input"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               onKeyDown={onKeyDown}
               placeholder="Search news..."
               aria-label="Search news"
             />
             <button className="btn btn-primary" aria-label="Search" onClick={performSearch}>
               Search
             </button>
           </div>
           <div className="lang-switch" aria-label="Language (UI only)">
             <button
               className={`btn ${lang === "EN" ? "active" : ""}`}
               onClick={() => setLang("EN")}
             >
               EN
             </button>
           </div>
         </div>
       </div>
     </header>
   );
 }
