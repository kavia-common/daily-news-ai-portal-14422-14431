/**
 * Newsletter subscription box
 */
// PUBLIC_INTERFACE
import React from "react";
import "./widget.css";

// PUBLIC_INTERFACE
export default function NewsletterBox() {
  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">Newsletter</span>
      </div>
      <div className="widget-body">
        <p>Get the morning briefing and breaking alerts.</p>
        <div className="newsletter-form">
          <input className="input" placeholder="Your email address" />
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
