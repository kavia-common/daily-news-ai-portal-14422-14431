import React from "react";
import "./styles/global.css";
import "./i18n";
import AppRouter from "./Router";
import { LanguageProvider } from "./context/LanguageContext";
import OnboardingModal from "./components/common/OnboardingModal";
import BottomTabs from "./components/common/BottomTabs";

/**
 * App shell mounts the Router and global styles for GLOBAL EXPRESS
 */
// PUBLIC_INTERFACE
export default function App() {
  return (
    <LanguageProvider>
      <AppRouter />
      <OnboardingModal />
      <BottomTabs />
    </LanguageProvider>
  );
}
