"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FlipCardProps {
  frontImage: string;
  sportName: string;
  description: string;
  planCount: number;
  onViewPlans: () => void;
}

export default function FlipCard({
  frontImage,
  sportName,
  description,
  planCount,
  onViewPlans,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleViewPlans = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewPlans();
  };

  return (
    <div className="h-[500px] w-full">
      <motion.div
        className="relative size-full cursor-pointer transform-3d"
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 70 }}
        onClick={handleCardClick}
      >
        {/* Front */}
        <div className="absolute backface-hidden size-full rounded-lg overflow-hidden group">
          <div className="relative size-full">
            <Image
              alt={sportName}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
              src={`/imgs/sports/${frontImage}`}
              width={500}
              height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-right">
              <div className="bg-yellow px-6 py-3 rounded-sm inline-block mb-3">
                <p className="font-medium text-[24px] text-black text-center tracking-[1px] uppercase">
                  {sportName}
                </p>
              </div>
              <p className="text-white/60 text-[14px]">اضغط لمعرفة المزيد</p>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute backface-hidden size-full rounded-lg overflow-hidden -rotate-y-180">
          <div className="relative size-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] 2xl:p-8 p-5 flex flex-col justify-between border border-[#ffff19]/20 text-right">
            <div>
              <div className="bg-yellow px-4 py-2 rounded-sm inline-block mb-6">
                <p className="text-[16px] text-black tracking-[4px] uppercase">
                  {sportName}
                </p>
              </div>

              <p className="text-[18px] text-white/90 mb-6 leading-relaxed">
                {description}
              </p>

              <div className="bg-white/5 border border-white/10 rounded-md p-4 mb-6">
                <p className="text-[14px] text-white/60 mb-1">
                  الباقات المتاحة
                </p>
                <p className="text-[28px] text-[#ffff19]">{planCount} باقات</p>
              </div>
            </div>

            <div>
              <Link
                href={`/membership/${sportName}`}
                onClick={handleViewPlans}
                className="w-full bg-yellow hover:bg-orange transition-all py-4 rounded-sm text-xl text-black flex items-center justify-center gap-3 group mb-4"
              >
                <span>عرض جميع الباقات</span>
                <ArrowLeft className="size-5 group-hover:-translate-x-[4px] transition-transform" />
              </Link>

              <p className="text-white/40 text-[12px] text-center">
                اضغط للعودة
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
