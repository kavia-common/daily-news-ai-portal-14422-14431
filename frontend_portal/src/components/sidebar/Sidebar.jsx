/**
 * Sidebar with weather, market/currency, newsletter, polls/interactive
 */
// PUBLIC_INTERFACE
import React from "react";
import WeatherWidget from "./WeatherWidget";
import MarketsWidget from "./MarketsWidget";
import NewsletterBox from "./NewsletterBox";
import EngagementWidget from "./EngagementWidget";
import "./sidebar.css";

// PUBLIC_INTERFACE
export default function Sidebar() {
  return (
    <aside className="sidebar">
      <WeatherWidget />
      <MarketsWidget />
      <NewsletterBox />
      <EngagementWidget />
    </aside>
  );
}
