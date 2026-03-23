import { memo } from "react";

const NoiseOverlay = memo(function NoiseOverlay() {
  return (
    <div className="grain-overlay pointer-events-none fixed inset-0 z-40">
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" style={{ animation: "grain-shift 4s steps(6) infinite" }} />
      </svg>
    </div>
  );
});

export default NoiseOverlay;
