"use client";

import AdminPageShell from "@/components/admin/AdminPageShell";
import AddModal from "@/components/admin/partners/AddModal";
import PartnerCard from "@/components/admin/partners/PartnerCard";
import api from "@/lib/axios";
import { PartnerProps } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data } = await api.get(`/partner`);
      return data.data as PartnerProps[];
    },
  });

  return (
    <>
      <AdminPageShell title="إدارة الشركاء" action={<AddModal />}>
        {isPending ? (
          <Loader2 className="animate-spin size-8" />
        ) : data && data.length > 0 ? (
          data.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))
        ) : (
          <p className="text-white/70">لا يوجد شركاء.</p>
        )}
      </AdminPageShell>
    </>
  );
}
