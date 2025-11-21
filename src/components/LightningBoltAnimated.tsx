import React from "react";

export default function LightningBoltAnimated({
  className = "",
  width = 80,
  height = 80,
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outline path */}
      <path
        d="M40 10 L25 55 H55 L35 90 L85 45 H50 L70 10 Z"
        stroke="#ffff19"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 300,
          strokeDashoffset: 0,
          animation: "bolt-draw 1.2s cubic-bezier(0.4,0,0.2,1) forwards",
        }}
      />
      {/* Fill path, fades in after outline animation */}
      <path
        d="M40 10 L25 55 H55 L35 90 L85 45 H50 L70 10 Z"
        fill="#ffff19"
        style={{
          opacity: 0,
          animation:
            "bolt-fill-fade 0.5s 1.1s cubic-bezier(0.4,0,0.2,1) forwards",
        }}
      />
      <style>{`
        @keyframes bolt-draw {
          from { stroke-dashoffset: 300; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes bolt-fill-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
