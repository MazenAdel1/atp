"use client";

import AdminPageShell from "@/components/admin/AdminPageShell";
import AddModal from "@/components/admin/content/AddModal";
import ContentCard from "@/components/admin/content/ContentCard";
import api from "@/lib/axios";
import { VideoProps } from "@/lib/types";
import { getReelId } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { data, isPending } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data } = await api.get(`/content`);

      const dataObj: VideoProps[] = data.data.map(
        ({ id, url }: { id: string; url: string }) => ({
          id: id,
          reelId: getReelId(url),
          reelUrl: url,
        })
      );
      return dataObj;
    },
  });

  return (
    <>
      <AdminPageShell title="إدارة المحتوى" action={<AddModal />}>
        {isPending ? (
          <Loader2 className="animate-spin size-8" />
        ) : data && data.length > 0 ? (
          data.map((video) => <ContentCard key={video.id} video={video} />)
        ) : (
          <p className="text-white/70">لا يوجد محتوى.</p>
        )}
      </AdminPageShell>
    </>
  );
}
