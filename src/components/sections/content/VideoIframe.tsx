import { useState } from "react";

export default function VideoIframe({ videoId }: { videoId: string }) {
  const [isInteracting, setIsInteracting] = useState(false);
  const src = `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${videoId}%2F&show_text=false&width=267&t=0`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onClick={() => setIsInteracting(true)}
    >
      <iframe
        src={src}
        width="267"
        height="476"
        style={{
          border: "none",
          overflow: "hidden",
          pointerEvents: isInteracting ? "auto" : "none",
        }}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        loading="lazy"
        title={`Facebook video ${videoId}`}
      />
      {/* Invisible overlay to capture initial click and enable iframe interaction */}
      {!isInteracting && (
        <div className="absolute inset-0 cursor-pointer" aria-hidden="true" />
      )}
    </div>
  );
}
