import MembershipCard from "./MembershipCard";
import SectionTitle from "../SectionTitle";
import Link from "next/link";
import api from "@/lib/axios";
import { MembershipProps } from "@/lib/types";

export default async function Membership({ limit }: { limit?: number }) {
  const { data: memberships }: { data: MembershipProps[] } = (
    await api.get("/game")
  ).data;

  return (
    <section id="membership" className="section">
      <SectionTitle title="الاشتراك" subTitle="اضغط لمعرفة المزيد" />
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      </div>
      {limit && (
        <Link
          href="/membership"
          className="hover:bg-yellow border-yellow border bg-transparent px-5 py-2 text-xl font-medium text-white transition hover:text-black"
        >
          رؤية المزيد
        </Link>
      )}
    </section>
  );
}
