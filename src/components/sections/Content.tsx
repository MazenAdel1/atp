"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback, useMemo, memo } from "react";
import SectionTitle from "../SectionTitle";

// Move videos data outside component to prevent recreation on each render
const VIDEO_IDS = [
  "1691943138859099",
  "1333183554989098",
  "2213783939140199",
  "778758254662129",
  "761261139937750",
  "1449471386300348",
] as const;

const GAP_PX = 16;

// Memoized video iframe component
const VideoIframe = memo(function VideoIframe({
  videoId,
}: {
  videoId: string;
}) {
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
});

// Get visible count based on breakpoints
const getVisibleCount = (): number => {
  if (typeof window === "undefined") return 1;
  const width = window.innerWidth;
  if (width >= 1536) return 5; // 2xl
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 640) return 2; // sm
  return 1; // mobile
};

export default function Content() {
  const [step, setStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const videoCount = VIDEO_IDS.length;
  const maxSteps = useMemo(
    () => Math.max(0, videoCount - visibleCount),
    [videoCount, visibleCount]
  );

  // Handle resize with debounce for better performance
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateVisibleCount = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      setStep((prev) => Math.min(prev, Math.max(0, videoCount - newCount)));
    };

    // Initial set
    updateVisibleCount();

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateVisibleCount, 100);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [videoCount]);

  // Navigation handlers
  const goLeft = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goRight = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, maxSteps));
  }, [maxSteps]);

  const goToStep = useCallback((idx: number) => {
    setStep(idx);
  }, []);

  // Calculate translation based on step - use pixel-based calculation for precision
  const translateX = useMemo(() => {
    // Each item width = (100% - totalGaps) / visibleCount
    // We need to move by: step * (itemWidth + gap)
    // Using CSS calc for accurate calculation
    const totalGaps = (visibleCount - 1) * GAP_PX;
    const itemWidthCalc = `(100% - ${totalGaps}px) / ${visibleCount}`;
    const moveAmount = `calc((${itemWidthCalc} + ${GAP_PX}px) * ${step})`;
    return moveAmount;
  }, [step, visibleCount]);

  // Item width style
  const itemWidth = useMemo(
    () => `calc((100% - ${(visibleCount - 1) * GAP_PX}px) / ${visibleCount})`,
    [visibleCount]
  );

  const isAtStart = step === 0;
  const isAtEnd = step >= maxSteps;

  return (
    <section id="content" className="section">
      <SectionTitle title="المحتوى" />

      <div className="flex flex-col gap-5 w-full">
        {/* Video Slider */}
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: 476 }}
        >
          <div
            className="flex gap-4 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(${translateX})`,
            }}
          >
            {VIDEO_IDS.map((videoId) => (
              <div
                key={videoId}
                className="shrink-0 rounded-lg overflow-hidden"
                style={{ width: itemWidth }}
              >
                <div className="w-fit mx-auto flex items-center justify-center rounded-lg overflow-hidden">
                  <VideoIframe videoId={videoId} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons below slider */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              !isAtStart
                ? "bg-yellow text-black hover:bg-yellow/90 shadow-md"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            onClick={goLeft}
            disabled={isAtStart}
            aria-label="السابق"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <div
            className="flex gap-2"
            role="tablist"
            aria-label="Video navigation"
          >
            {Array.from({ length: maxSteps + 1 }, (_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={step === idx}
                className={`h-2.5 rounded-full transition-all ${
                  step === idx
                    ? "bg-yellow w-8"
                    : "bg-white/30 hover:bg-white/50 w-2.5"
                }`}
                onClick={() => goToStep(idx)}
                aria-label={`اذهب إلى مجموعة الفيديو رقم ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors ${
              !isAtEnd
                ? "bg-yellow text-black hover:bg-yellow/90 shadow-md"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            onClick={goRight}
            disabled={isAtEnd}
            aria-label="التالي"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
