"use client";

import AdminPageShell from "@/components/admin/AdminPageShell";
import AddModal from "@/components/admin/sports/AddModal";
import SportCard from "@/components/admin/sports/SportCard";
import api from "@/lib/axios";
import { SportProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const { data } = await api.get(`/game`);
      return data.data as SportProps[];
    },
  });

  return (
    <>
      <AdminPageShell title="إدارة الرياضات" action={<AddModal />}>
        {isPending ? (
          <Loader2 className="animate-spin size-8" />
        ) : data && data.length > 0 ? (
          data.map((sport) => <SportCard key={sport.id} sport={sport} />)
        ) : (
          <p className="text-white/70">لا يوجد رياضات.</p>
        )}
      </AdminPageShell>
    </>
  );
}
