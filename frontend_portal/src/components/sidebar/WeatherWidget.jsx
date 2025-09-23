/**
 * Mock Weather Widget
 */
// PUBLIC_INTERFACE
import React from "react";
import "./widget.css";

// PUBLIC_INTERFACE
export default function WeatherWidget() {
  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">Weather</span>
      </div>
      <div className="widget-body">
        <div className="weather">
          <div className="temp">22°</div>
          <div className="desc">
            <strong>Partly Cloudy</strong>
            <div>New York, NY</div>
          </div>
        </div>
        <div className="forecast">
          {["Mon", "Tue", "Wed", "Thu"].map((d, i) => (
            <div className="day" key={i}>
              <div className="name">{d}</div>
              <div className="icon">⛅</div>
              <div className="range">18° / 25°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
