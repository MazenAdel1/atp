import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { PartnerProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function PartnerCard({ partner }: { partner: PartnerProps }) {
  return partner ? (
    <div className="bg-gray hover:border-yellow/50 flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-white/25 transition">
      <Image
        src={partner.image}
        alt={partner.name}
        width={500}
        height={500}
        className="max-h-60 w-full object-cover object-[0%_20%]"
      />
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{partner.name}</h3>
          <p className="text-sm text-white/70">{partner.description}</p>
          <Link
            href={partner.links[0]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {partner.links[0]}
          </Link>
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal partner={partner} />
          <DeleteModal partner={partner} />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
