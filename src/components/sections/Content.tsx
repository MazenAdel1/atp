"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Content() {
  const VIDEOS = [
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1691943138859099%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1333183554989098%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2213783939140199%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F778758254662129%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F761261139937750%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
    `<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1449471386300348%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true" loading="lazy"></iframe>`,
  ];

  const [step, setStep] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1536) return 5; // 2xl
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 640) return 2; // sm
    return 1; // mobile
  };

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(getVisibleCount());

    const handleResize = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      setStep((prev) => Math.min(prev, VIDEOS.length - newCount));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [VIDEOS.length]);

  // Calculate and update translation whenever step or visibleCount changes
  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const gapInPx = 16;
      const totalGapWidth = (visibleCount - 1) * gapInPx;
      const itemWidth = (containerWidth - totalGapWidth) / visibleCount;
      setTranslateX(step * (itemWidth + gapInPx));
    }
  }, [step, visibleCount]);

  const goLeft = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const goRight = () => {
    setStep((prev) => Math.min(prev + 1, VIDEOS.length - visibleCount));
  };

  const maxSteps = Math.max(0, VIDEOS.length - visibleCount);
  const gapInPx = 16;

  return (
    <section id="content" className="section">
      <h2 className="title">استمتع بمحتوى مثمر</h2>

      <div className="flex flex-col gap-5 w-full">
        {/* Video Slider */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{ minHeight: 476 }}
        >
          <div
            className="flex gap-4 transition-transform duration-500"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {VIDEOS.map((video, index) => (
              <div
                key={index}
                className="shrink-0 rounded-lg overflow-hidden"
                style={{
                  width: `calc((100% - ${
                    (visibleCount - 1) * gapInPx
                  }px) / ${visibleCount})`,
                }}
              >
                <div
                  className="size-fit mx-auto flex items-center justify-center rounded-lg overflow-hidden"
                  dangerouslySetInnerHTML={{ __html: video }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons below slider */}
        <div className="flex justify-center items-center gap-4">
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              step > 0
                ? "bg-yellow text-black hover:bg-yellow/90 shadow-md"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            onClick={goLeft}
            disabled={step === 0}
            aria-label="السابق"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: maxSteps + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`h-2.5 rounded-full transition-all ${
                  step === idx
                    ? "bg-yellow w-8"
                    : "bg-white/30 hover:bg-white/50 w-2.5"
                }`}
                onClick={() => setStep(idx)}
                aria-label={`اذهب إلى مجموعة الفيديو رقم ${idx + 1}`}
              />
            ))}
          </div>

          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
              step < maxSteps
                ? "bg-yellow text-black hover:bg-yellow/90 shadow-md"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
            onClick={goRight}
            disabled={step >= maxSteps}
            aria-label="التالي"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
