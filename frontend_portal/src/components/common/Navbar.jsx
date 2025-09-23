/**
 * Sticky navigation navbar with categories and dropdown subcategories.
 */
// PUBLIC_INTERFACE
import React, { useContext, useState } from "react";
import { categories } from "../../data/mockData";
import "./navbar.css";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "react-i18next";

// PUBLIC_INTERFACE
export default function Navbar() {
  const [openIdx, setOpenIdx] = useState(null);
  const { lang } = useContext(LanguageContext);
  const { t } = useTranslation();

  const catLabel = (c) => (c.i18n?.[lang] ?? c.name);

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
              <button className="nav-link">{catLabel(c)}</button>
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
          <span className="badge">{t("subscribe")}</span>
        </div>
      </div>
    </nav>
  );
}
