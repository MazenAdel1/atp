import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { CoachProps } from "@/lib/types";
import Image from "next/image";

export default function CoachCard({ coach }: { coach: CoachProps }) {
  return coach ? (
    <div className="bg-gray hover:border-yellow/50 flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-white/25 transition">
      <Image
        src={coach.image}
        alt={coach.name}
        width={500}
        height={500}
        className="max-h-60 w-full object-cover object-[0%_20%]"
      />
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{coach.name}</h3>
          <p className="text-sm text-white/70">{coach.title}</p>
          {coach.game_name && coach.game_name.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              {coach.game_name.map((game) => (
                <span
                  key={game.id}
                  className="rounded bg-green-500/20 px-2 py-1 text-green-400"
                >
                  {game.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal coach={coach} />
          <DeleteModal coach={coach} />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
