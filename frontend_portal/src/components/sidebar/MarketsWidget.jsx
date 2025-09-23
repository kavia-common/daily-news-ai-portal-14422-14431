/**
 * Market and Currency Widget
 */
// PUBLIC_INTERFACE
import React from "react";
import { markets } from "../../data/mockData";
import "./widget.css";
import { useTranslation } from "../../react-i18next-shim";

// PUBLIC_INTERFACE
export default function MarketsWidget() {
  const { t } = useTranslation();
  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">{t("markets")}</span>
      </div>
      <div className="widget-body">
        <div className="market-section">
          {markets.stocks.map((s) => (
            <div className="row" key={s.symbol}>
              <span>{s.name}</span>
              <span className={`change ${s.change.startsWith("-") ? "down" : "up"}`}>{s.change}</span>
            </div>
          ))}
        </div>
        <div className="divider" />
        <div className="market-section">
          {markets.fx.map((f) => (
            <div className="row" key={f.pair}>
              <span>{f.pair}</span>
              <span className={`change ${f.change.startsWith("-") ? "down" : "up"}`}>
                {f.value} ({f.change})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
