import EditModal from "./EditModal";
import IframePreview from "./IFramePreivew";
import DeleteModal from "./DeleteModal";
import { VideoProps } from "@/lib/types";

export default function ContentCard({ video }: { video: VideoProps }) {
  return video ? (
    <div className="bg-gray hover:border-yellow/50 flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-white/25 transition">
      <div className="p-2">
        <IframePreview reelUrl={video.reelUrl} />
      </div>
      <div className="flex flex-col gap-3 p-2 pt-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Reel URL</h3>
          <p className="text-sm break-all text-white/70">{video.reelUrl}</p>
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal video={video} />
          <DeleteModal video={video} />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
