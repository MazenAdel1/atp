import { IMAGE_QUALITY } from "@/lib/consts";
import { PartnerProps } from "@/lib/types";
import { setImageQuality } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function PartnerCard({
  links,
  description,
  image,
  name,
}: PartnerProps) {
  const lowQualityImage = setImageQuality(image, IMAGE_QUALITY);

  return (
    <div className="group relative h-full w-96 flex-1 shrink-0 overflow-hidden">
      <Link
        href={links[0]}
        target="_blank"
        className="bg-yellow/25 drop-shadow-back text-yellow absolute flex size-full items-center justify-center text-xl font-medium opacity-0 drop-shadow-black backdrop-blur-lg transition-opacity group-hover:opacity-100"
      >
        {description}
      </Link>
      <Image
        src={lowQualityImage}
        alt={name}
        width={400}
        height={400}
        className="size-full object-cover"
      />
    </div>
  );
}
