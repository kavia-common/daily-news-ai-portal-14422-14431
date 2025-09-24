//
//
// PUBLIC INTERFACE
// News fetching helpers: India-focused defaults (English) using open/public RSS feeds (no API keys).
//

/**
 * PUBLIC_INTERFACE
 * Normalize items into ArticleCard shape.
 */
function normalizeArticles(arr = [], overrides = {}) {
  return (arr || [])
    .filter(Boolean)
    .map((a, idx) => {
      const id = a.url || a.link || a.guid || a.id || `news-${Date.now()}-${idx}`;
      const rawTitle = a.title || a.name || "Untitled";
      const title = trimHeadline(rawTitle);

      const description =
        a.description ||
        a.summary ||
        a.content ||
        a.excerpt ||
        "";

      const image =
        a.image ||
        a.enclosure?.url ||
        // Extract first <img src="..."> from content/summary if present
        extractFirstImageFromHtml(a.content || a.summary || a.description) ||
        `https://picsum.photos/seed/in-${idx}/640/420`;

      const author =
        a.creator ||
        a.author ||
        (a.source && (a.source.name || a.source.id)) ||
        "Newswire";

      const publishedAt =
        a.publishedAt ||
        a.pubDate ||
        a.published ||
        a.updated ||
        new Date().toISOString();

      return {
        id,
        title,
        excerpt: stripHtml(description).trim(),
        category: overrides.category || a.category || "General",
        author,
        timestamp: timeAgo(publishedAt),
        image,
        url: a.url || a.link || a.guid || undefined
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
 * Strip HTML tags for safe text previews.
 */
function stripHtml(html = "") {
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent || el.innerText || "";
  }
  // SSR-safe fallback
  return html.replace(/<[^>]+>/g, " ");
}

/**
 * Extract first image URL from an HTML string.
 */
function extractFirstImageFromHtml(html = "") {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i);
  return match ? match[1] : null;
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
 * Lightweight RSS/Atom fetcher that uses no API keys.
 * Attempts CORS-friendly public endpoints.
 * Defaults to Times of India Top Stories in English.
 */
async function fetchRssFeedItems({ rssUrl }) {
  const res = await fetch(rssUrl, {
    // Rely on server providing CORS headers; many major RSS feeds include it.
    // No-cors would hide body; avoid that to ensure we can parse XML.
    method: "GET",
  });
  if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);
  const text = await res.text();

  // Parse XML
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");

  // Detect parsing errors
  const parserError = xml.querySelector("parsererror");
  if (parserError) {
    throw new Error("Failed to parse RSS XML.");
  }

  // Try RSS 2.0 <item>, then Atom <entry>
  const items = Array.from(xml.querySelectorAll("channel > item")).map((n) => nodeToItem(n));
  if (items.length) return items;

  const entries = Array.from(xml.querySelectorAll("feed > entry")).map((n) => nodeToAtomItem(n));
  return entries;
}

/**
 * Convert RSS <item> node to plain object.
 */
function nodeToItem(n) {
  const get = (sel) => n.querySelector(sel)?.textContent || "";
  const mediaContent = n.querySelector("enclosure")?.getAttribute("url") ||
                       n.querySelector("media\\:content")?.getAttribute("url") ||
                       n.querySelector("media\\:thumbnail")?.getAttribute("url");
  const link = n.querySelector("link")?.textContent || n.querySelector("guid")?.textContent || "";
  return {
    title: get("title"),
    link,
    guid: get("guid"),
    description: get("description"),
    pubDate: get("pubDate"),
    image: mediaContent || null,
  };
}

/**
 * Convert Atom <entry> node to plain object.
 */
function nodeToAtomItem(n) {
  const get = (sel) => n.querySelector(sel)?.textContent || "";
  const linkEl = n.querySelector("link[rel='alternate']") || n.querySelector("link");
  const link = linkEl?.getAttribute("href") || "";
  return {
    title: get("title"),
    link,
    guid: get("id"),
    summary: get("summary"),
    content: get("content"),
    updated: get("updated") || get("published"),
    image: null,
  };
}

/**
 * PUBLIC_INTERFACE
 * Fetch latest India headlines in English from open/public RSS.
 * Primary: Times of India Top Stories (English).
 * Fallbacks: BBC India, The Hindu (if primary blocked).
 */
export async function fetchDefaultIndiaHeadlines() {
  /** Fetch latest India headlines in English (RSS-based, no API key). */
  const rssCandidates = [
    // Times of India - Top Stories (English)
    "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    // BBC News - Asia (includes India coverage)
    "http://feeds.bbci.co.uk/news/world/asia/india/rss.xml",
    // The Hindu - National
    "https://www.thehindu.com/news/national/feeder/default.rss",
  ];

  for (const url of rssCandidates) {
    try {
      const raw = await fetchRssFeedItems({ rssUrl: url });
      const normalized = normalizeArticles(raw, { category: "General" });
      if (normalized?.length) return normalized.slice(0, 24);
    } catch (e) {
      // continue to next candidate
      // eslint-disable-next-line no-console
      console.warn("RSS fetch failed for", url, e?.message);
    }
  }
  return [];
}

/**
 * PUBLIC_INTERFACE
 * Search India news by keyword via RSS: naive approach filters fetched feed items.
 * Since RSS is not a search API, we perform client-side match on title/summary.
 */
export async function searchIndiaNewsByKeyword(keyword) {
  /** Fetch India news in English filtered by keyword (client-side match). */
  const q = (keyword || "").trim().toLowerCase();
  const all = await fetchDefaultIndiaHeadlines();
  if (!q) return all;
  return all.filter((a) => {
    const t = (a.title || "").toLowerCase();
    const e = (a.excerpt || "").toLowerCase();
    return t.includes(q) || e.includes(q);
  });
}

/**
 * PUBLIC_INTERFACE
 * Creates a succinct location string from coordinates.
 */
export function getReadableLocationString(coords) {
  /** Creates a succinct location string from coordinates. */
  if (!coords) return "Locating…";
  const { latitude, longitude } = coords;
  return `Your location: ${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;
}
