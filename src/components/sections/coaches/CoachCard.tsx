import { CoachProps } from "@/lib/types";
import * as motion from "motion/react-client";

export default function CoachCard({ image, name, game }: CoachProps) {
  return (
    <motion.div className="group relative aspect-3/4 overflow-hidden shadow-lg">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="absolute bottom-0 h-1/2 w-full bg-linear-to-t from-black via-black/10 to-transparent" />

      <div className="absolute bottom-0 w-full bg-black/5 p-5 text-center backdrop-blur-md">
        <h3 className="text-yellow text-2xl font-bold">{name}</h3>
        <p className="text-lg text-white/80">
          {game?.map((g) => g.name).join(" - ")}
        </p>
      </div>
    </motion.div>
  );
}
