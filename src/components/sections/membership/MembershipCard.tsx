"use client";

import Link from "next/link";

interface FlipCardProps {
  image: string;
  sportName: string;
  href: number;
}

export default function FlipCard({ image, sportName, href }: FlipCardProps) {
  return (
    <Link href={`/membership/${href}`} className="h-125 w-full">
      <div className="group size-full overflow-hidden backface-hidden">
        <div
          className="relative size-full bg-size-[150%] bg-center transition-all duration-300 hover:bg-size-[160%]"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 p-6 text-right">
            <div className="bg-yellow mb-3 inline-block px-6 py-3">
              <p className="text-center text-[24px] font-medium tracking-[1px] text-black uppercase">
                {sportName}
              </p>
            </div>
            <p className="text-[14px] text-white/60">اضغط لمعرفة المزيد</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
