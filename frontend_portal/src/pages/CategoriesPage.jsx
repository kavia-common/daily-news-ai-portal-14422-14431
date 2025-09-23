import React from "react";
import { useTranslation } from "react-i18next";
import { categories } from "../data/mockData";

export default function CategoriesPage() {
  const { t } = useTranslation();
  return (
    <main className="page-offset">
      <div className="container">
        <h2 className="section-title">{t("categories")}</h2>
        <div className="grid grid-3">
          {categories.map((c) => (
            <div key={c.name} className="card" style={{ padding: 12 }}>
              <h3 style={{ marginTop: 0 }}>{c.name}</h3>
              <ul>
                {c.sub?.map((s) => (
                  <li key={s}><a href="#">{s}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
