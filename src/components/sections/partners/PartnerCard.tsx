import { PartnerProps } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

type PartnerCardProps = {
  partner: PartnerProps;
};

export default function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <div className="group relative h-full w-96 flex-1 shrink-0 overflow-hidden">
      <Link
        href={partner.links[0]}
        target="_blank"
        className="bg-yellow/25 drop-shadow-back text-yellow absolute flex size-full items-center justify-center text-xl font-medium opacity-0 drop-shadow-black backdrop-blur-lg transition-opacity group-hover:opacity-100"
      >
        {partner.description}
      </Link>
      <Image
        src={partner.image}
        alt={partner.name}
        width={500}
        height={500}
        className="size-full object-cover"
      />
    </div>
  );
}
