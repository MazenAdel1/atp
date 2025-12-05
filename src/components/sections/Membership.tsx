"use client";

import { useState } from "react";
import MembershipCard from "../MembershipCard";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import { MEMBERSHIP } from "@/lib/mockData";

export default function Membership({ limit }: { limit?: number }) {
  const [selectedSport, setSelectedSport] = useState<number | null>(null);

  return (
    <section id="membership" className="section">
      <SectionTitle title="الاشتراك" subTitle="اضغط لمعرفة المزيد" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
        {Array.from({ length: limit ?? MEMBERSHIP.length })
          .fill(null)
          .map((_, index) => (
            <MembershipCard
              key={MEMBERSHIP[index].label}
              description={MEMBERSHIP[index].description}
              frontImage={MEMBERSHIP[index].img}
              onViewPlans={() => setSelectedSport(index)}
              planCount={
                MEMBERSHIP[index].info[0].plan.length +
                MEMBERSHIP[index].info[1].plan.length
              }
              sportName={MEMBERSHIP[index].label}
            />
          ))}
      </div>
      {limit && (
        <Link
          href="/membership"
          className="hover:bg-yellow bg-transparent border border-yellow transition py-2 px-5 text-white hover:text-black font-medium text-xl"
        >
          رؤية المزيد
        </Link>
      )}
    </section>
  );
}
