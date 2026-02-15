import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const GAP_PX = 16;

const BREAKPOINTS = [
  { min: 1536, count: 5 }, // 2xl
  { min: 1280, count: 4 }, // xl
  { min: 1024, count: 3 }, // lg
  { min: 640, count: 2 }, // sm
] as const;

function getVisibleCount(): number {
  if (typeof window === "undefined") return 1;
  const width = window.innerWidth;
  return BREAKPOINTS.find((bp) => width >= bp.min)?.count ?? 1;
}

export function useContentSlider() {
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

  // Handle resize with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const updateVisibleCount = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      setStep((prev) => Math.min(prev, Math.max(0, videoCount - newCount)));
    };

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
  //

  // navigate between steps
  const goLeft = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goRight = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, maxSteps));
  }, [maxSteps]);

  const goToStep = useCallback((idx: number) => {
    setStep(idx);
  }, []);
  //

  const translateX = useMemo(() => {
    const totalGaps = (visibleCount - 1) * GAP_PX;
    const itemWidthCalc = `(100% - ${totalGaps}px) / ${visibleCount}`;
    return `calc((${itemWidthCalc} + ${GAP_PX}px) * ${step})`;
  }, [step, visibleCount]);

  const itemWidth = useMemo(
    () => `calc((100% - ${(visibleCount - 1) * GAP_PX}px) / ${visibleCount})`,
    [visibleCount],
  );

  return {
    videos,
    isLoading,
    step,
    maxSteps,
    translateX,
    itemWidth,
    isAtStart: step === 0,
    isAtEnd: step >= maxSteps,
    goLeft,
    goRight,
    goToStep,
  };
}
