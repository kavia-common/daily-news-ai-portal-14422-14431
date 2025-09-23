/**
 * Footer: About, Contact, Careers, Privacy, Terms, Social, newsletter signup
 */
// PUBLIC_INTERFACE
import React from "react";
import "./footer.css";

// PUBLIC_INTERFACE
export default function Footer() {
  return (
    <footer className="gx-footer">
      <div className="container footer-top grid grid-3">
        <div>
          <div className="footer-brand">GLOBAL EXPRESS</div>
          <p className="footer-desc">
            Trusted, timely journalism powered by modern storytelling. © {new Date().getFullYear()}
          </p>
          <div className="socials">
            <a href="#" aria-label="Twitter">𝕏</a>
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">◎</a>
            <a href="#" aria-label="YouTube">▶</a>
          </div>
        </div>

        <div className="footer-links">
          <div className="col">
            <a href="#">About</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
          <div className="col">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>

        <div>
          <div className="footer-newsletter">
            <h4>Get the Daily Briefing</h4>
            <p>Stay informed with the top stories delivered to your inbox.</p>
            <div className="newsletter-form">
              <input className="input" placeholder="Your email address" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} GLOBAL EXPRESS</span>
        <span>
          Made with <span role="img" aria-label="heart">❤️</span> for readers
        </span>
      </div>
    </footer>
  );
}
