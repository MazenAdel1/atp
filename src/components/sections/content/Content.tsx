"use client";

import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../SectionTitle";
import VideoIframe from "./VideoIframe";
import { getReelId, getVisibleCount } from "@/utils/utils";
import { BottomLeftGlow } from "@/components/layout/Glow";
import { ContentSkeleton } from "@/components/ui/Loader";
import api from "@/lib/axios";
import NavigationBar from "./NavigationBar";
import { GAP, ITEM_STEP, ITEM_WIDTH } from "@/lib/consts";

export default function Content() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data: videos } = (await api.get("/content")).data;
      return videos as { id: string; url: string }[];
    },
  });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const videoCount = videos?.length ?? 0;
  const maxSteps = Math.max(0, videoCount - visibleCount);

  // measure the full-width wrapper to decide visible count
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const count = getVisibleCount(width);
      setVisibleCount(count);
      setStep((prev) => Math.min(prev, Math.max(0, videoCount - count)));
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [videoCount]);

  if (isLoading) return <ContentSkeleton />;

  return (
    <section id="content" className="section">
      <BottomLeftGlow />
      <SectionTitle title="المحتوى" />

      <div ref={wrapperRef} className="flex w-full flex-col gap-5">
        {/* hidden overflow parent, grid child that slides */}
        <div
          className="mx-auto w-full overflow-hidden"
          style={{
            minHeight: 476,
            maxWidth: visibleCount * ITEM_WIDTH + (visibleCount - 1) * GAP,
          }}
        >
          <div
            className="grid place-content-evenly transition-transform duration-500 ease-out will-change-transform"
            style={{
              gridTemplateColumns: `repeat(${videoCount}, ${ITEM_WIDTH}px)`,
              gap: GAP,
              transform: `translateX(${step * ITEM_STEP}px)`,
            }}
          >
            {videos?.map((video) => (
              <div key={video.id} className="flex justify-center">
                <VideoIframe videoId={getReelId(video.url)} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <NavigationBar step={step} setStep={setStep} maxSteps={maxSteps} />
      </div>
    </section>
  );
}
