import { motion } from "motion/react";

export type CoachType = {
  img: string;
  name: string;
  title: string;
};

export default function CoachCard({ img, name, title }: CoachType) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] cursor-pointer group"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(/imgs/coaches/${img})` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute -inset-[1px] bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 p-5">
        <h3 className="text-2xl font-bold text-yellow">{name}</h3>
        <p className="text-white/80 text-lg">{title}</p>
      </div>
    </motion.div>
  );
}
