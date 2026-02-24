import { IMAGE_QUALITY } from "@/lib/consts";
import { CoachProps } from "@/lib/types";
import { setImageQuality } from "@/utils/utils";
import Image from "next/image";

export default function CoachCard({ image, name, game }: CoachProps) {
  const lowQualityImage = setImageQuality(image, IMAGE_QUALITY);

  return (
    <div className="group relative aspect-3/4 overflow-hidden shadow-lg">
      <Image
        src={lowQualityImage}
        alt={`Coach ${name}'s picture`}
        className="absolute w-full transition-all duration-300 group-hover:scale-105"
        width={200}
        height={200}
      />

      <div className="absolute bottom-0 h-1/2 w-full bg-linear-to-t from-black via-black/10 to-transparent" />

      <div className="absolute bottom-0 w-full bg-black/5 p-5 text-center backdrop-blur-md">
        <h3 className="text-yellow text-2xl font-bold">{name}</h3>
        <p className="text-lg text-white/80">
          {game?.map((g) => g.name).join(" - ")}
        </p>
      </div>
    </div>
  );
}
