"use client";

import AdminPageShell from "@/components/admin/AdminPageShell";
import AddModal from "@/components/admin/coaches/AddModal";
import CoachCard from "@/components/admin/coaches/CoachCard";
import api from "@/lib/axios";
import { CoachProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["coaches"],
    queryFn: async () => {
      const { data } = await api.get(`/coach`);
      return data.data as CoachProps[];
    },
  });

  return (
    <>
      <AdminPageShell title="إدارة المدربين" action={<AddModal />}>
        {isPending ? (
          <Loader2 className="animate-spin size-8" />
        ) : data && data.length > 0 ? (
          data.map((coach) => <CoachCard key={coach.id} coach={coach} />)
        ) : (
          <p className="text-white/70">لا يوجد مدربين.</p>
        )}
      </AdminPageShell>
    </>
  );
}
