import React from "react";
import { NavLink } from "react-router-dom";
import "./bottomTabs.css";
import { useTranslation } from "react-i18next";

/**
 * Bottom tab bar for mobile-first UX
 */
export default function BottomTabs() {
  const { t } = useTranslation();
  return (
    <nav className="bottom-tabs">
      <NavLink to="/" className="tab" end>
        <span className="icon">🏠</span>
        <span className="label">{t("home")}</span>
      </NavLink>
      <NavLink to="/categories" className="tab">
        <span className="icon">🗂</span>
        <span className="label">{t("categories")}</span>
      </NavLink>
      <NavLink to="/saved" className="tab">
        <span className="icon">⭐</span>
        <span className="label">{t("saved")}</span>
      </NavLink>
      <NavLink to="/profile" className="tab">
        <span className="icon">👤</span>
        <span className="label">{t("profile")}</span>
      </NavLink>
    </nav>
  );
}
