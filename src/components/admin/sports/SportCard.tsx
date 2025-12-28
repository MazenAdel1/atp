import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { SportProps } from "@/lib/types";
import Image from "next/image";

export default function SportCard({ sport }: { sport: SportProps }) {
  return sport ? (
    <div className="bg-gray hover:border-yellow/50 flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-white/25 transition">
      <Image
        src={sport.image}
        alt={sport.name}
        width={500}
        height={500}
        className="max-h-60 w-full object-cover object-[0%_20%]"
      />
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{sport.name}</h3>
          <p className="text-sm text-white/70">{sport.description}</p>
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal sport={sport} />
          <DeleteModal sport={sport} />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
