import { useState } from 'react';
import './FixedVideo.css';

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 2.8L13 8L4.5 13.2V2.8Z" fill="currentColor" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export default function FixedVideo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fv-root">
      <div className="fv-card">

        <div className="fv-top">
          <button
            className="fv-close"
            onClick={() => setVisible(false)}
            aria-label="Close video"
            type="button"
          >
            <IconClose />
          </button>
        </div>

        <button className="fv-play" type="button" aria-label="Play video">
          <IconPlay />
        </button>

      </div>
    </div>
  );
}
