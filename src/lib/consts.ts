export const LINKS_LIST = [
  { href: "/#membership", label: "الاشتراك" },
  { href: "/#partners", label: "شركاءنا" },
  { href: "/#content", label: "المحتوى" },
  { href: "/#coaches", label: "المدربين" },
  { href: "/#address", label: "العنوان" },
];

export const IMAGE_QUALITY = 30;

// content section consts
export const ITEM_WIDTH = 267;
export const GAP = 16;
export const ITEM_STEP = ITEM_WIDTH + GAP;

export const BREAKPOINTS = [
  { min: 1536, count: 6 },
  { min: 1280, count: 5 },
  { min: 1024, count: 4 },
  { min: 768, count: 3 },
  { min: 640, count: 2 },
] as const;
