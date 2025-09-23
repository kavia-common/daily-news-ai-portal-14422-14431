/**
 * App Router configuration
 */
// PUBLIC_INTERFACE
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Navbar from "./components/common/Navbar";
import Ticker from "./components/common/Ticker";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import PhotosPage from "./pages/multimedia/PhotosPage";
import VideosPage from "./pages/multimedia/VideosPage";
import PodcastsPage from "./pages/multimedia/PodcastsPage";
import ProfilePage from "./pages/ProfilePage";
import CategoriesPage from "./pages/CategoriesPage";
import SavedPage from "./pages/SavedPage";

// PUBLIC_INTERFACE
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Ticker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
