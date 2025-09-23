/**
 * Polls / Interactive widget
 */
// PUBLIC_INTERFACE
import React, { useState } from "react";
import "./widget.css";

// PUBLIC_INTERFACE
export default function EngagementWidget() {
  const [choice, setChoice] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="widget card shadow-card">
      <div className="widget-header">
        <span className="badge">Poll</span>
      </div>
      <div className="widget-body">
        {!submitted ? (
          <>
            <p>Which topic do you want more coverage on?</p>
            {["Technology", "Health", "World", "Business"].map((opt) => (
              <label key={opt} className="poll-option">
                <input
                  type="radio"
                  name="poll"
                  value={opt}
                  onChange={() => setChoice(opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
            <button
              className="btn btn-primary"
              style={{ marginTop: 8 }}
              onClick={() => setSubmitted(true)}
              disabled={!choice}
            >
              Submit
            </button>
          </>
        ) : (
          <p>Thanks for voting! Results coming soon.</p>
        )}
      </div>
    </div>
  );
}
