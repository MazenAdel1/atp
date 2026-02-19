import EditModal from "./EditModal";
import IframePreview from "./IFramePreivew";
import DeleteModal from "../DeleteModal";
import { VideoProps } from "@/lib/types";
import Link from "next/link";

export default function ContentCard({ video }: { video: VideoProps }) {
  return video ? (
    <div className="admin-entity-card">
      <div className="p-2">
        <IframePreview reelUrl={video.reelUrl} />
      </div>
      <div className="flex flex-col gap-3 p-2 pt-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Reel URL</h3>
          <Link
            href={video.reelUrl}
            target="_blank"
            className="text-sm break-all text-blue-500 hover:underline"
          >
            {video.reelUrl}
          </Link>
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal {...video} />
          <DeleteModal
            endpoint={`/content/${video.id}`}
            queryKey="videos"
            title="حذف الفيديو"
          />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
