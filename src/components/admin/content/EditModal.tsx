import { VideoProps } from "@/lib/types";
import { getReelId } from "@/utils/utils";
import FormModal from "../FormModal";

export default function EditModal({ id, reelUrl }: VideoProps) {
  return (
    <FormModal
      mode="edit"
      endpoint={`/content/${id}`}
      queryKey="videos"
      title="تعديل الفيديو"
      triggerLabel="تعديل"
      onTransformFormData={(formData) => {
        if (!getReelId(formData.get("url") as string)) return false;
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="editContentReelUrl" className="text-white/85">
          رابط Facebook Reel
        </label>
        <input
          type="url"
          id="url"
          name="url"
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          defaultValue={reelUrl}
          required
          autoFocus
        />
      </div>
    </FormModal>
  );
}
