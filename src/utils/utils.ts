import { BREAKPOINTS } from "@/lib/consts";

export const getReelId = (url: string): string => {
  return url?.split("/reel/")[1];
};

export const setImageQuality = (url: string, quality: number) => {
  if (quality < 1 || quality > 100) {
    throw new Error("Quality must be between 1 and 100");
  }

  const [prefix, suffix] = url.split("/upload/");
  return `${prefix}/upload/q_${quality}/${suffix}`;
};

// content section utils
export const getVisibleCount = (width: number) => {
  return BREAKPOINTS.find((bp) => width >= bp.min)?.count ?? 1;
};
