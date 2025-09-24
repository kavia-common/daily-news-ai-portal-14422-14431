//
// PUBLIC INTERFACE
// Simple API helpers for the frontend_portal to fetch live news and weather.
// Uses environment variables for API keys. Never hardcode secrets.
//

/**
 * Get political news using available providers, preferring NewsAPI.org
 * Falls back to GNews if NEWS_API is not configured.
 * @param {Object} opts
 * @param {string} [opts.query] optional query to refine political results
 * @param {string} [opts.country] two-letter country code for localization (e.g., 'us', 'in')
 * @returns {Promise<Array>} list of normalized articles
 */
export async function fetchPoliticalNews({ query = "", country = "us" } = {}) {
  // PUBLIC_INTERFACE
  /** Fetch political news articles (normalized). */
  const NEWS_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const GNEWS_KEY = process.env.REACT_APP_GNEWS_API_KEY;

  // Normalize function to a common shape used by ArticleCard
  const normalize = (arr = []) =>
    arr
      .filter(Boolean)
      .map((a, idx) => ({
        id: a.url ?? `news-${idx}`,
        title: a.title ?? "Untitled",
        excerpt: a.description ?? "",
        category: "Politics",
        author: a.source?.name || a.author || "Newswire",
        timestamp: a.publishedAt ? timeAgo(a.publishedAt) : "",
        image:
          a.urlToImage ||
          a.image ||
          `https://picsum.photos/seed/politics${idx}/640/420`,
      }));

  // Provider 1: NewsAPI.org - top-headlines category=politics (some markets use 'general' + q=politics)
  if (NEWS_KEY) {
    try {
      const endpoint = new URL("https://newsapi.org/v2/top-headlines");
      // Many regions don't support 'politics' category directly. Use 'general' + q as a safe approach.
      endpoint.searchParams.set("category", "general");
      endpoint.searchParams.set("q", query?.trim() ? query : "politics");
      endpoint.searchParams.set("pageSize", "20");
      endpoint.searchParams.set("country", country || "us");

      const res = await fetch(endpoint.toString(), {
        headers: { "X-Api-Key": NEWS_KEY },
      });
      if (!res.ok) throw new Error(`NewsAPI HTTP ${res.status}`);
      const data = await res.json();
      if (data?.articles?.length) return normalize(data.articles);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("NewsAPI fetch failed, will try GNews fallback:", err?.message);
    }
  }

  // Provider 2: GNews - supports topic=politics & q
  if (GNEWS_KEY) {
    try {
      const endpoint = new URL("https://gnews.io/api/v4/top-headlines");
      endpoint.searchParams.set("topic", "politics");
      endpoint.searchParams.set("lang", "en");
      if (query?.trim()) endpoint.searchParams.set("q", query.trim());
      endpoint.searchParams.set("max", "20");
      endpoint.searchParams.set("apikey", GNEWS_KEY);

      const res = await fetch(endpoint.toString());
      if (!res.ok) throw new Error(`GNews HTTP ${res.status}`);
      const data = await res.json();
      if (data?.articles?.length) return normalize(data.articles);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("GNews fetch failed:", err?.message);
    }
  }

  // Final fallback: empty array
  return [];
}

/**
 * Get weather by geo coordinates using OpenWeatherMap.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{ ok: boolean, data?: any, error?: string }>}
 */
export async function fetchWeatherByCoords(lat, lon) {
  // PUBLIC_INTERFACE
  /** Fetch weather using OpenWeatherMap for given coordinates. */
  const KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
  if (!KEY) {
    return { ok: false, error: "Missing REACT_APP_OPENWEATHER_API_KEY" };
  }
  try {
    const endpoint = new URL("https://api.openweathermap.org/data/2.5/weather");
    endpoint.searchParams.set("lat", String(lat));
    endpoint.searchParams.set("lon", String(lon));
    endpoint.searchParams.set("units", "metric");
    endpoint.searchParams.set("appid", KEY);

    const res = await fetch(endpoint.toString());
    if (!res.ok) throw new Error(`OpenWeather HTTP ${res.status}`);
    const json = await res.json();
    return { ok: true, data: json };
  } catch (e) {
    return { ok: false, error: e?.message || "Weather fetch failed" };
  }
}

/**
 * small helper to format times (e.g., "2h ago")
 * @param {string|number|Date} iso
 */
function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const min = Math.round(diff / 60000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.round(hr / 24);
  return `${d}d ago`;
}
