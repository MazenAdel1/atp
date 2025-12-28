import { motion } from "motion/react";

export type CoachType = {
  img: string;
  name: string;
  title: string;
};

export default function CoachCard({ img, name, title }: CoachType) {
  return (
    <motion.div className="relative overflow-hidden shadow-lg aspect-3/4 cursor-pointer group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(/imgs/coaches/${img})` }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute w-full bg-linear-to-t from-black via-black/10 to-transparent h-1/2 bottom-0" />

      {/* Text Content */}
      <div className="absolute bottom-0 p-5 backdrop-blur-md bg-black/5 w-full text-center">
        <h3 className="text-2xl font-bold text-yellow">{name}</h3>
        <p className="text-white/80 text-lg">{title}</p>
      </div>
    </motion.div>
  );
}
