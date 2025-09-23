/**
 * Sticky navigation navbar with categories and dropdown subcategories.
 */
// PUBLIC_INTERFACE
import React, { useState } from "react";
import { categories } from "../../data/mockData";
import "./navbar.css";
import { useTranslation } from "../../react-i18next-shim.js";

// PUBLIC_INTERFACE
export default function Navbar() {
  const [openIdx, setOpenIdx] = useState(null);
  const { t } = useTranslation();

  return (
    <nav className="gx-navbar">
      <div className="container nav-inner">
        <ul className="nav-list">
          {categories.map((c, idx) => (
            <li
              className="nav-item"
              key={c.name}
              onMouseEnter={() => setOpenIdx(idx)}
              onMouseLeave={() => setOpenIdx(null)}
            >
              <button className="nav-link">{c.name}</button>
              {openIdx === idx && c.sub?.length > 0 && (
                <div className="dropdown">
                  {c.sub.map((s) => (
                    <a key={s} href="#" className="dropdown-item">
                      {s}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <span className="badge">Subscribe</span>
        </div>
      </div>
    </nav>
  );
}
