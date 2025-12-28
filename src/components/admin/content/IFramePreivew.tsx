import { getReelId } from "@/utils/utils";
import { useState } from "react";

export default function IframePreview({ reelUrl }: { reelUrl: string }) {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div
      className="relative w-fit mx-auto"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onClick={() => setIsInteracting(true)}
    >
      <iframe
        src={`https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F${getReelId(
          reelUrl
        )}%2F&show_text=false&width=267&t=0`}
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
        title={`Facebook reel preview`}
      />
      {!isInteracting && (
        <div className="absolute inset-0 cursor-pointer" aria-hidden="true" />
      )}
    </div>
  );
}
