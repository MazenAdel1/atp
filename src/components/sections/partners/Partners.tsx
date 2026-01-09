import Image from "next/image";
import Link from "next/link";
import { TopGlow } from "../../layout/Glow";
import SectionTitle from "../SectionTitle";
import api from "@/lib/axios";
import { PartnerProps } from "@/lib/types";

export default async function Partners() {
  let partners: PartnerProps[] = [];

  try {
    const response = await api.get("/partner");
    partners = response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch partners:", error);
  }

  return (
    <section id="partners" className="section">
      <TopGlow />
      <SectionTitle title="شركاءنا" />
      <div className="max-w-full overflow-hidden">
        <ul className="flex h-64 items-center gap-10">
          {partners.map((partner, index) => {
            return (
              <li
                key={index}
                className="group relative h-full w-96 flex-1 shrink-0 overflow-hidden"
              >
                <Link
                  href={partner.links[0]}
                  className="bg-yellow/25 text-yellow absolute flex size-full items-center justify-center text-xl font-medium opacity-0 backdrop-blur-lg transition-opacity group-hover:opacity-100"
                >
                  <p className="drop-shadow-back drop-shadow-black">
                    {partner.description}
                  </p>
                </Link>
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={500}
                  height={500}
                  className="size-full object-cover"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
