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
      <AdminPageShell wideGrid title="إدارة الاشتراكات" action={<AddModal />}>
        {isPending ? (
          <Loader2 className="size-8 animate-spin" />
        ) : data && data.length > 0 ? (
          data.map((sport) => (
            <div
              key={sport.id}
              className="border-yellow/20 hover:border-yellow/50 bg-gray rounded-lg border p-2 transition"
            >
              <h2 className="text-lg font-semibold">{sport.name}</h2>
              {sport.packages?.map((membership) => (
                <MembershipCard key={membership.id} membership={membership} />
              ))}
            </div>
          ))
        ) : (
          <p className="text-white/70">لا يوجد اشتراكات.</p>
        )}
      </AdminPageShell>
    </>
  );
}
