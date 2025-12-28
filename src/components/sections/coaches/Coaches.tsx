"use client";

import CoachCard, { CoachType } from "../coaches/CoachCard";
import { motion } from "motion/react";
import SectionTitle from "../SectionTitle";

export default function Coaches() {
  const COACHES: CoachType[] = [
    { img: "gym-01.jpg", name: "مجدي السيد", title: "جيم" },
    { img: "gym-02.jpg", name: "محمد مراد", title: "جيم" },
    { img: "jiu-jitsu-01.jpg", name: "أيمن علي", title: "جيوجيتسو" },
    { img: "calisthenics-01.jpg", name: "محمد أحمد", title: "كاليسثينكس" },
  ];

  return (
    <motion.section
      id="coaches"
      className="section bg-linear-to-b from-dark-navy to-black text-white"
    >
      <SectionTitle title="المدربين" />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {COACHES.map((coach, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <CoachCard {...coach} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
