import Link from "next/link";
import * as motion from "motion/react-client";
import { setImageQuality } from "@/utils/utils";
import { IMAGE_QUALITY } from "@/lib/consts";
import { MembershipCardProps } from "@/lib/types";
import Image from "next/image";

export default function MembershipCard({
  image,
  sportName,
  href,
}: MembershipCardProps) {
  const lowQualityImage = setImageQuality(image, IMAGE_QUALITY);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="w-full"
    >
      <Link href={`/membership/${href}`}>
        <div className="group overflow-hidden backface-hidden">
          <div className="group relative">
            <Image
              src={lowQualityImage}
              alt={`Membership for ${sportName}`}
              className="h-100 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={400}
              height={400}
            />
            <div className="absolute inset-0 top-0 right-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6 text-right">
              <div className="bg-yellow mb-3 inline-block px-6 py-3">
                <p className="text-center text-[24px] font-medium tracking-[1px] text-black uppercase">
                  {sportName}
                </p>
              </div>
              <p className="text-[14px] text-white/60">اضغط لمعرفة المزيد</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
