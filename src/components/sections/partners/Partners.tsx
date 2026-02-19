import { TopGlow } from "../../layout/Glow";
import SectionTitle from "../SectionTitle";
import api from "@/lib/axios";
import { PartnerProps } from "@/lib/types";
import { cn } from "@/utils/cn";
import DataWrapper from "@/components/ui/DataWrapper";
import * as motion from "motion/react-client";
import PartnerCard from "./PartnerCard";

export default async function Partners() {
  let partners: PartnerProps[] = [];

  try {
    const response = await api.get("/partner");
    partners = response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch partners:", error);
  }

  return (
    <section
      id="partners"
      className={cn("section", partners.length === 0 && "py-0!")}
    >
      <TopGlow />
      <SectionTitle title="شركاءنا" />
      <DataWrapper data={partners}>
        <div className="max-w-full overflow-hidden">
          <motion.ul
            initial="hidden"
            whileInView="visible"
            transition={{
              ease: "easeInOut",
              staggerChildren: 0.25,
            }}
            viewport={{ once: true, amount: 0.33 }}
            className="flex h-64 items-center gap-10"
          >
            {partners.map((partner, index) => {
              return (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <PartnerCard {...partner} />
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </DataWrapper>
    </section>
  );
}
