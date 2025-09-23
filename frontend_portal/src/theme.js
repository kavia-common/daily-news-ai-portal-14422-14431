/**
 * Theme configuration for GLOBAL EXPRESS portal.
 * Applies bold, minimal black/white/red palette with modern subtle shadows and rounded corners.
 */
export const colors = {
  // Core palette for the portal
  black: "#0B0C0E",
  white: "#FFFFFF",
  red: "#D21F3C", // accent for highlights, badges, breaking news
  gray100: "#F7F7F8",
  gray200: "#EDEEF0",
  gray300: "#D9DADF",
  gray400: "#A1A5AD",
  gray500: "#707580",
  gray600: "#4B4F58",
  gray700: "#32353C",

  // Ocean Professional accents (light touch for micro-interactions)
  oceanPrimary: "#2563EB",
  oceanAmber: "#F59E0B",
  oceanError: "#EF4444",
};

export const fonts = {
  // serif for headlines, sans-serif for body
  headline: "'Merriweather', Georgia, 'Times New Roman', serif",
  body: "'Inter', system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
};

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.06)",
  md: "0 4px 10px rgba(0,0,0,0.08)",
  lg: "0 10px 20px rgba(0,0,0,0.10)",
};

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
};

export const layout = {
  maxWidth: "1200px",
  gutter: "20px",
  headerHeight: "72px",
  navbarHeight: "48px",
};

export const zIndex = {
  header: 1000,
  navbar: 900,
  ticker: 1100,
  modal: 2000,
};

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
};
