import React, { useContext, useState } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { useTranslation } from "../../react-i18next-shim.js";
import "./onboarding.css";

/**
 * First-time onboarding: choose language
 */
export default function OnboardingModal() {
  const { showOnboarding, setShowOnboarding, setLang } = useContext(LanguageContext);
  const { t } = useTranslation();
  const [selected, setSelected] = useState("en");

  if (!showOnboarding) return null;

  const confirm = () => {
    setLang(selected);
    setShowOnboarding(false);
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3 className="title">{t("onboard_choose_language")}</h3>
        <div className="languages">
          {[
            { code: "en", label: "English" },
            { code: "ta", label: "தமிழ்" },
            { code: "te", label: "తెలుగు" },
            { code: "kn", label: "ಕನ್ನಡ" },
            { code: "hi", label: "हिन्दी" }
          ].map((l) => (
            <button
              key={l.code}
              className={`btn ${selected === l.code ? "btn-primary" : ""}`}
              onClick={() => setSelected(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="actions">
          <button className="btn btn-primary" onClick={confirm}>{t("continue")}</button>
        </div>
      </div>
    </div>
  );
}
