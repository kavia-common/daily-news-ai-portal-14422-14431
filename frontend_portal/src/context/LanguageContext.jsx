import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import i18n from "../i18n";

/**
 * LanguageContext provides current language and setter across the app.
 * Persists preference to localStorage as mock of user profile.
 */
export const LanguageContext = createContext({
  lang: "en",
  setLang: (_l) => {},
  showOnboarding: false,
  setShowOnboarding: (_b) => {},
});

// PUBLIC_INTERFACE
export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("gx_lang");
    if (saved) {
      setLangState(saved);
      i18n.changeLanguage(saved);
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("gx_lang", l);
    i18n.changeLanguage(l);
  }, []);

  const value = useMemo(
    () => ({ lang, setLang, showOnboarding, setShowOnboarding }),
    [lang, setLang, showOnboarding]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
