import CoachCard from "../coaches/CoachCard";
import * as motion from "motion/react-client";
import SectionTitle from "../SectionTitle";
import api from "@/lib/axios";
import { CoachProps } from "@/lib/types";
import { BottomGlow } from "@/components/layout/Glow";

export default async function Coaches() {
  const { data: coaches }: { data: CoachProps[] } = await (
    await api.get("/coach")
  ).data;

  return (
    <motion.section id="coaches" className="section text-white">
      <BottomGlow />
      <SectionTitle title="المدربين" />

      <motion.div
        className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
        {coaches.map((coach, index) => (
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
