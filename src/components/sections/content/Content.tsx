"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionTitle from "../SectionTitle";
import VideoIframe from "./VideoIframe";
import { getReelId } from "@/utils/utils";
import { BottomLeftGlow } from "@/components/layout/Glow";
import { ContentSkeleton } from "@/components/ui/Loader";
import { useContentSlider } from "./useContentSlider";

export default function Content() {
  const {
    videos,
    isLoading,
    step,
    maxSteps,
    translateX,
    itemWidth,
    isAtStart,
    isAtEnd,
    goLeft,
    goRight,
    goToStep,
  } = useContentSlider();

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
