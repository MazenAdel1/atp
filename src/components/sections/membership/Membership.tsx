import MembershipCard from "./MembershipCard";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import api from "@/lib/axios";
import { MembershipProps } from "@/lib/types";
import { cn } from "@/utils/cn";
import DataWrapper from "@/components/ui/DataWrapper";
import * as motion from "motion/react-client";

export default async function Membership({ limit }: { limit?: number }) {
  let memberships: MembershipProps[] = [];

  try {
    const response = await api.get("/game");
    memberships = response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch memberships:", error);
  }

  return (
    <section
      id="membership"
      className={cn("section", memberships.length === 0 && "py-0!")}
    >
      <SectionTitle title="الاشتراك" subTitle="اضغط لمعرفة المزيد" />
      <DataWrapper data={memberships}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{
            ease: "easeInOut",
            staggerChildren: 0.25,
          }}
          viewport={{ once: true, amount: 0.33 }}
          className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {memberships?.map((membership, index) =>
            limit && limit > 0 ? (
              index < limit && (
                <MembershipCard
                  key={membership.id}
                  image={membership.image}
                  sportName={membership.name}
                  href={membership.id}
                />
              )
            ) : (
              <MembershipCard
                key={membership.id}
                image={membership.image}
                sportName={membership.name}
                href={membership.id}
              />
            ),
          )}
        </motion.div>
        {limit && (
          <Link
            href="/membership"
            className="hover:bg-yellow border-yellow border bg-transparent px-5 py-2 text-xl font-medium text-white transition hover:text-black"
          >
            رؤية المزيد
          </Link>
        )}
      </DataWrapper>
    </section>
  );
}
