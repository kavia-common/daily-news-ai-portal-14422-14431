import React from "react";
import "./styles/global.css";
import AppRouter from "./Router";

/**
 * App shell mounts the Router and global styles for GLOBAL EXPRESS
 */
// PUBLIC_INTERFACE
export default function App() {
  return <AppRouter />;
}
