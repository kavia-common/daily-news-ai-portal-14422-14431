import React from "react";
import { useTranslation } from "react-i18next";

export default function SavedPage() {
  const { t } = useTranslation();
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">{t("saved")}</h2>
        <p>{t("coming_soon")}.</p>
      </div>
    </main>
  );
}
