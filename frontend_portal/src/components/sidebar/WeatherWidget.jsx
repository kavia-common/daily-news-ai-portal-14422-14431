/**
 * Weather Widget - requests location permission and fetches live weather for user's coordinates.
 */
// PUBLIC_INTERFACE
import React, { useEffect, useState } from "react";
import "./widget.css";
import { fetchWeatherByCoords } from "../../services/api";

/**
 * PUBLIC_INTERFACE
 * Displays location prompt, live temperature/conditions and basic details when permission granted.
 */
export default function WeatherWidget() {
  const [status, setStatus] = useState("idle"); // idle | locating | fetching | ready | error | denied
  const [error, setError] = useState("");
  const [weather, setWeather] = useState(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords || {};
        setStatus("fetching");
        const res = await fetchWeatherByCoords(latitude, longitude);
        if (res.ok) {
          setWeather(res.data);
          setStatus("ready");
        } else {
          setError(res.error || "Failed to fetch weather.");
          setStatus("error");
        }
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setStatus("denied");
          setError("Location access was denied.");
        } else {
          setStatus("error");
          setError(err?.message || "Failed to get your location.");
        }
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
    );
  };

  // auto-prompt on mount to improve UX
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBody = () => {
    if (status === "idle" || status === "locating" || status === "fetching") {
      return <p>Fetching local weather...</p>;
    }
    if (status === "denied") {
      return (
        <div>
          <p>We need your location to show weather for your area.</p>
          <button className="btn btn-primary" onClick={requestLocation}>Allow Location</button>
          {error && <p style={{ color: "var(--ocean-error)" }}>{error}</p>}
        </div>
      );
    }
    if (status === "error") {
      return (
        <div>
          <p>Unable to load weather right now.</p>
          {error && <p style={{ color: "var(--ocean-error)" }}>{error}</p>}
          <button className="btn" onClick={requestLocation}>Retry</button>
        </div>
      );
    }
    if (status === "ready" && weather) {
      const temp = Math.round(weather.main?.temp);
      const cond = weather.weather?.[0]?.description ?? "Conditions";
      const city = weather.name || "Your area";
      const icon = weather.weather?.[0]?.icon; // e.g., 10d
      const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

      return (
        <>
          <div className="weather">
            <div className="temp">{isFinite(temp) ? `${temp}°` : "--"}</div>
            <div className="desc">
              <strong style={{ textTransform: "capitalize" }}>{cond}</strong>
              <div>{city}</div>
            </div>
            {iconUrl && <img src={iconUrl} alt={cond} width={48} height={48} style={{ marginLeft: "auto" }} />}
          </div>
          <div className="forecast" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            <div className="day">
              <div className="name">Feels</div>
              <div className="icon">🌡️</div>
              <div className="range">{Math.round(weather.main?.feels_like)}°C</div>
            </div>
            <div className="day">
              <div className="name">Wind</div>
              <div className="icon">💨</div>
              <div className="range">{Math.round(weather.wind?.speed)} m/s</div>
            </div>
            <div className="day">
              <div className="name">Humid</div>
              <div className="icon">💧</div>
              <div className="range">{Math.round(weather.main?.humidity)}%</div>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">Weather</span>
      </div>
      <div className="widget-body">{renderBody()}</div>
    </div>
  );
}
