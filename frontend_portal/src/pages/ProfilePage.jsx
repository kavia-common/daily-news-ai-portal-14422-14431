import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";

/**
 * Profile/Settings page with language selector and scaffolds
 */
export default function ProfilePage() {
  const { lang, setLang } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [notifEnabled, setNotifEnabled] = useState(false);

  return (
    <main className="page-offset">
      <div className="container card" style={{ padding: 16 }}>
        <h2 className="section-title">{t("profile")}</h2>

        <section>
          <h3>{t("settings_language")}</h3>
          <div className="grid grid-3">
            {[
              { code: "en", label: "English" },
              { code: "ta", label: "தமிழ்" },
              { code: "te", label: "తెలుగు" },
              { code: "kn", label: "ಕನ್ನಡ" },
              { code: "hi", label: "हिन्दी" }
            ].map((l) => (
              <button
                key={l.code}
                className={`btn ${lang === l.code ? "btn-primary" : ""}`}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </section>

        <div className="divider" style={{ margin: "16px 0" }} />

        <section>
          <h3>{t("tts")} <small style={{ color: "var(--c-gray-600)" }}>({t("coming_soon")})</small></h3>
          <label className="btn">
            <input
              type="checkbox"
              checked={ttsEnabled}
              onChange={(e) => setTtsEnabled(e.target.checked)}
            />
            <span style={{ marginLeft: 8 }}>{ttsEnabled ? "On" : "Off"}</span>
          </label>
        </section>

        <section style={{ marginTop: 12 }}>
          <h3>{t("notifications")} <small style={{ color: "var(--c-gray-600)" }}>({t("coming_soon")})</small></h3>
          <label className="btn">
            <input
              type="checkbox"
              checked={notifEnabled}
              onChange={(e) => setNotifEnabled(e.target.checked)}
            />
            <span style={{ marginLeft: 8 }}>{notifEnabled ? "On" : "Off"}</span>
          </label>
        </section>
      </div>
    </main>
  );
}
