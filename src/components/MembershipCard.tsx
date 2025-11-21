"use client";

import { ArrowLeft, BadgeDollarSign } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export type MembershipType = {
  label: string;
  img: string;
  info: {
    gender: "MALE" | "FEMALE";
    days: string[];
    time: {
      from: string;
      to: string;
    }[];
    plan: { amount: number; price: number }[];
  }[];
};

export default function MembershipCard({
  membership,
}: {
  membership: MembershipType;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const flipCard = () => {
    cardRef.current?.classList.toggle("rotate-y-180");
  };

  return (
    <div
      key={membership.label}
      className="perspective-midrange w-full aspect-[3/4] cursor-pointer"
      onClick={flipCard}
    >
      <div
        ref={cardRef}
        className="relative transition-transform ease-out transform-3d size-full"
      >
        {/* front */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center gap-4">
          <Image
            src={`/imgs/sports/${membership.img}`}
            alt={membership.label}
            width={300}
            height={300}
            className="w-full h-[calc(92%-1rem)] object-cover rounded-md"
          />
          <h3 className="text-xl h-[8%] font-semibold tracking-[0.7rem] flex justify-center items-center bg-yellow w-full text-black rounded-md">
            {membership.label}
          </h3>
        </div>
        {/* back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-black size-full rounded-md flex flex-col gap-3 shadow-xl">
          <div className="flex flex-col gap-3 size-full overflow-y-auto">
            {membership.info.map((info, index) => (
              <div
                key={index}
                className="bg-[#1a1a1a] rounded-lg p-3 border border-yellow/20 flex flex-col gap-3"
              >
                <h4
                  className={`text-base font-semibold text-center rounded-md py-1.5 ${
                    info.gender === "MALE"
                      ? "text-blue-900 bg-blue-200"
                      : "text-pink-900 bg-pink-200"
                  }`}
                >
                  {info.gender === "MALE" ? "رجال" : "نساء"}
                </h4>

                <div className="bg-black/40 rounded-md py-2">
                  <div className="flex items-center flex-wrap gap-2">
                    {info.plan.map((plan, planIndex) => (
                      <div
                        key={planIndex}
                        className="flex items-center gap-1.5 text-sm flex-1 justify-center min-w-[calc(50%-0.25rem)] rounded-md py-1.5 bg-yellow/10 border border-yellow/30 flex-wrap"
                      >
                        <span className="text-white font-medium">
                          {plan.amount} تمرينة
                        </span>
                        <BadgeDollarSign className="text-yellow w-4 h-4" />
                        <span className="text-yellow font-semibold">
                          {plan.price} جنيه
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    {info.days.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="text-center flex-1 border border-yellow/40 rounded-md py-1 text-yellow/90 text-sm font-medium bg-yellow/5"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="w-full flex flex-col gap-1.5 bg-black/40 rounded-md py-2">
                    {info.time.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex gap-2 items-center">
                        <div className="bg-yellow text-black px-2 py-1 rounded-md flex-1 text-center font-semibold text-sm">
                          {slot.from}
                        </div>
                        <ArrowLeft className="text-yellow" width={20} />
                        <div className="bg-white text-black px-2 py-1 rounded-md flex-1 text-center font-semibold text-sm">
                          {slot.to}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-center font-bold text-lg bg-yellow text-black py-1 px-3 rounded-md tracking-[0.7rem]">
            {membership.label}
          </h3>
        </div>
      </div>
    </div>
  );
}
