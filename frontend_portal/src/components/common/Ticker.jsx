/**
 * Breaking News Ticker across the top.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useRef, useState } from "react";
import { breakingNews } from "../../data/mockData";
import "./ticker.css";

// PUBLIC_INTERFACE
export default function Ticker() {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % breakingNews.length);
    }, 3500);
    return () => clearInterval(timer.current);
  }, []);

  const current = breakingNews[index];

  return (
    <div className="gx-ticker">
      <div className="container ticker-inner">
        <span className="label">Breaking</span>
        <a className="headline" href={current.link}>{current.title}</a>
      </div>
    </div>
  );
}
