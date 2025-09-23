import i18n from "./i18n-shim";
import { initReactI18next } from "./react-i18next-shim";
import en from "./locales/en/translation.json";
import ta from "./locales/ta/translation.json";
import te from "./locales/te/translation.json";
import kn from "./locales/kn/translation.json";
import hi from "./locales/hi/translation.json";

/**
 * i18n initialization for GLOBAL EXPRESS
 * Languages: English (en), Tamil (ta), Telugu (te), Kannada (kn), Hindi (hi)
 */
i18n
  .use?.(initReactI18next)
  ?.init?.({
    resources: {
      en: { translation: en },
      ta: { translation: ta },
      te: { translation: te },
      kn: { translation: kn },
      hi: { translation: hi }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
