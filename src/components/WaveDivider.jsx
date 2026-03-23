export default function WaveDivider({ flip = false, fillColor = "var(--color-surface)" }) {
  return (
    <div
      className="w-full overflow-hidden leading-none relative -mt-px"
      style={{ transform: flip ? "rotate(180deg)" : undefined }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "clamp(40px, 6vw, 80px)", display: "block" }}
      >
        <path
          d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
