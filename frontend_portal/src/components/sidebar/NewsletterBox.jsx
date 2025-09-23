/**
 * Newsletter subscription box
 */
// PUBLIC_INTERFACE
import React from "react";
import "./widget.css";
import { useTranslation } from "../../react-i18next-shim.js";

// PUBLIC_INTERFACE
export default function NewsletterBox() {
  const { t } = useTranslation();
  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">{t("newsletter")}</span>
      </div>
      <div className="widget-body">
        <p>{t("newsletter_sub")}</p>
        <div className="newsletter-form">
          <input className="input" placeholder={t("newsletter_input")} />
          <button className="btn btn-primary">{t("newsletter_cta")}</button>
        </div>
      </div>
    </div>
  );
}
