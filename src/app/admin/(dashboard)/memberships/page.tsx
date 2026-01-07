"use client";

import AdminPageShell from "@/components/admin/AdminPageShell";
import AddModal from "@/components/admin/memberships/AddModal";
import MembershipCard from "@/components/admin/memberships/MembershipCard";
import api from "@/lib/axios";
import { SportProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["memberships"],
    queryFn: async () => {
      const { data } = await api.get(`/game`);
      return data.data as SportProps[];
    },
  });

  return (
    <>
      <AdminPageShell wideGrid title="إدارة الاشتراكات" action={null}>
        {isPending ? (
          <Loader2 className="size-8 animate-spin" />
        ) : data && data.length > 0 ? (
          data.map((sport) => (
            <AdminPageShell
              wideGrid
              title={sport.name}
              key={sport.id}
              action={<AddModal sportId={sport.id} />}
            >
              <div
                key={sport.id}
                className="border-yellow/20 hover:border-yellow/50 bg-gray grid grid-cols-1 gap-2 rounded-lg border p-2 transition lg:grid-cols-2"
              >
                {sport.packages?.map((membership) => (
                  <MembershipCard
                    key={membership.id}
                    membership={{ ...membership, game_id: sport.id }}
                  />
                ))}
              </div>
            </AdminPageShell>
          ))
        ) : (
          <p className="text-white/70">لا يوجد اشتراكات.</p>
        )}
      </AdminPageShell>
    </>
  );
}
