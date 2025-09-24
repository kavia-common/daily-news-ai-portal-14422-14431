//
// PUBLIC INTERFACE
// News fetching helpers: India-focused defaults (English), headline normalization, and keyword search.
//

/**
 * Normalize heterogeneous article payloads into a unified shape consumed by ArticleCard.
 * Ensures short, clear, prominent headline text and safe fallbacks for missing fields.
 */
function normalizeArticles(arr = [], overrides = {}) {
  return (arr || [])
    .filter(Boolean)
    .map((a, idx) => {
      const id = a.url || a.id || `news-${Date.now()}-${idx}`;
      const rawTitle = a.title || a.name || "Untitled";
      // Keep headline short and readable: trim excessive suffixes and limit length
      const title = trimHeadline(rawTitle);

      const description =
        a.description ||
        a.content ||
        a.excerpt ||
        "";

      const image =
        a.urlToImage ||
        a.image ||
        (a.media && (a.media.image || a.media.thumbnail)) ||
        `https://picsum.photos/seed/in-${idx}/640/420`;

      const author =
        (a.source && (a.source.name || a.source.id)) ||
        a.author ||
        "Newswire";

      const publishedAt =
        a.publishedAt ||
        a.date ||
        a.published ||
        a.updated ||
        new Date().toISOString();

      return {
        id,
        title,
        excerpt: description,
        category: overrides.category || a.category || "General",
        author,
        timestamp: timeAgo(publishedAt),
        image,
      };
    });
}

/**
 * Trim common long headline suffix patterns and enforce a readable max length (~110 chars).
 */
function trimHeadline(text, maxLen = 110) {
  if (!text || typeof text !== "string") return "Untitled";
  let t = text.replace(/\s*[-–—|]\s*(?:The\s+Hindu|Times\s+of\s+India|Hindustan\s+Times|Indian\s+Express|NDTV|Mint|ET|Economic\s+Times|LiveMint|BBC\s+News|CNN|Reuters|AP|Al\s+Jazeera)\s*$/i, "");
  if (t.length > maxLen) {
    const cut = t.slice(0, maxLen - 1);
    const lastSpace = cut.lastIndexOf(" ");
    t = (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim() + "…";
  }
  return t;
}

/**
 * Format relative time for headlines, e.g., "2h ago".
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

/**
 * Build a NewsAPI endpoint for top-headlines with India defaults.
 * Note: Requires REACT_APP_NEWS_API_KEY in environment. No secret hardcoding.
 */
function buildNewsApiTopHeadlinesUrl({ country = "in", category = "general", q = "", pageSize = 24 } = {}) {
  const endpoint = new URL("https://newsapi.org/v2/top-headlines");
  endpoint.searchParams.set("country", country);
  // NewsAPI categories: business, entertainment, general, health, science, sports, technology
  if (category) endpoint.searchParams.set("category", category);
  if (q?.trim()) endpoint.searchParams.set("q", q.trim());
  endpoint.searchParams.set("pageSize", String(pageSize));
  return endpoint.toString();
}

/**
 * Try NewsAPI first; optional GNews fallback if configured.
 */
async function fetchViaNewsProviders({ country = "in", category = "general", q = "", pageSize = 24 } = {}) {
  const NEWS_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const GNEWS_KEY = process.env.REACT_APP_GNEWS_API_KEY;

  // Provider 1: NewsAPI
  if (NEWS_KEY) {
    try {
      const url = buildNewsApiTopHeadlinesUrl({ country, category, q, pageSize });
      const res = await fetch(url, { headers: { "X-Api-Key": NEWS_KEY } });
      if (!res.ok) throw new Error(`NewsAPI HTTP ${res.status}`);
      const data = await res.json();
      if (data?.articles?.length) return normalizeArticles(data.articles, { category: "General" });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("NewsAPI fallback due to:", e?.message);
    }
  }

  // Provider 2: GNews (English only for our UX)
  if (GNEWS_KEY) {
    try {
      const endpoint = new URL("https://gnews.io/api/v4/top-headlines");
      endpoint.searchParams.set("lang", "en");
      endpoint.searchParams.set("country", "in");
      if (q?.trim()) endpoint.searchParams.set("q", q.trim());
      if (category) endpoint.searchParams.set("topic", category.toLowerCase() === "general" ? "breaking-news" : category.toLowerCase());
      endpoint.searchParams.set("max", String(Math.min(pageSize, 50)));
      endpoint.searchParams.set("apikey", GNEWS_KEY);

      const res = await fetch(endpoint.toString());
      if (!res.ok) throw new Error(`GNews HTTP ${res.status}`);
      const data = await res.json();
      if (data?.articles?.length) return normalizeArticles(data.articles, { category: "General" });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("GNews fallback failed:", e?.message);
    }
  }

  return [];
}

// PUBLIC_INTERFACE
export async function fetchDefaultIndiaHeadlines() {
  /** Fetch latest India headlines in English (category general, country=in). */
  return fetchViaNewsProviders({ country: "in", category: "general", q: "", pageSize: 24 });
}

// PUBLIC_INTERFACE
export async function searchIndiaNewsByKeyword(keyword) {
  /** Fetch India news in English filtered by the given keyword. */
  const q = (keyword || "").trim();
  return fetchViaNewsProviders({ country: "in", category: "general", q, pageSize: 24 });
}

// PUBLIC_INTERFACE
export function getReadableLocationString(coords) {
  /** Creates a succinct location string from coordinates. */
  if (!coords) return "Locating…";
  const { latitude, longitude } = coords;
  // Keep precise yet short for display
  return `Your location: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
}
