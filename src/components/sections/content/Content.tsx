"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import SectionTitle from "../SectionTitle";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import VideoIframe from "./VideoIframe";
import { getReelId } from "@/utils/utils";
import { BottomLeftGlow } from "@/components/layout/Glow";
import { ContentSkeleton } from "@/components/ui/Loader";

const GAP_PX = 16;

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

  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data: videos } = (await api.get("/content")).data;
      return videos as { id: string; url: string }[];
    },
  });

  const videoCount = videos?.length || 0;
  const maxSteps = useMemo(
    () => Math.max(0, videoCount - visibleCount),
    [videoCount, visibleCount],
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
    [visibleCount],
  );

  const isAtStart = step === 0;
  const isAtEnd = step >= maxSteps;

  if (isLoading) {
    return <ContentSkeleton />;
  }

  return (
    <section id="content" className="section">
      <BottomLeftGlow />
      <SectionTitle title="المحتوى" />

      <div className="flex w-full flex-col gap-5">
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
            {videos?.map((video) => (
              <div
                key={video.id}
                className="shrink-0 overflow-hidden"
                style={{ width: itemWidth }}
              >
                <div className="mx-auto flex w-fit items-center justify-center overflow-hidden">
                  <VideoIframe videoId={getReelId(video.url)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons below slider */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
              !isAtStart
                ? "bg-yellow hover:bg-yellow/90 text-black shadow-md"
                : "cursor-not-allowed bg-white/10 text-white/40"
            }`}
            onClick={goLeft}
            disabled={isAtStart}
            aria-label="السابق"
          >
            <ArrowRight className="h-5 w-5" />
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
                className={`h-2 transition-all ${
                  step === idx
                    ? "bg-yellow w-8"
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => goToStep(idx)}
                aria-label={`اذهب إلى مجموعة الفيديو رقم ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
              !isAtEnd
                ? "bg-yellow hover:bg-yellow/90 text-black shadow-md"
                : "cursor-not-allowed bg-white/10 text-white/40"
            }`}
            onClick={goRight}
            disabled={isAtEnd}
            aria-label="التالي"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
