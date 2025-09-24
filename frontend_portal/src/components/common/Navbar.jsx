/**
 * Sticky navigation navbar with categories and dropdown subcategories.
 */
// PUBLIC_INTERFACE
import React, { useState } from "react";
import { categories } from "../../data/mockData";
import "./navbar.css";
import { useTranslation } from "../../react-i18next-shim.js";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Navbar exposes navigation to categories. Selecting "Politics" triggers a Home feed filter via query param (?cat=Politics)
 * which HomePage reads to fetch live political news. Other categories leave current mocked behavior intact.
 */
export default function Navbar() {
  const [openIdx, setOpenIdx] = useState(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onCategoryClick = (name) => {
    if (name === "Politics") {
      // Navigate to home with category param. HomePage will fetch politics.
      navigate({ pathname: "/", search: "?cat=Politics" });
      return;
    }
    // Default navigate to home with local filter category (for future extension)
    navigate({ pathname: "/", search: `?cat=${encodeURIComponent(name)}` });
  };

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
              <button className="nav-link" onClick={() => onCategoryClick(c.name)}>{c.name}</button>
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
