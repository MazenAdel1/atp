import { getReelId } from "@/utils/utils";
import FormModal from "../FormModal";

export default function AddModal() {
  return (
    <FormModal
      mode="add"
      endpoint="/content"
      queryKey="videos"
      title="إضافة فيديو جديد"
      triggerLabel="إضافة فيديو"
      onTransformFormData={(formData) => {
        if (!getReelId(formData.get("url") as string)) return false;
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="url" className="text-white/85">
          رابط Facebook Reel
        </label>
        <input
          type="url"
          id="url"
          name="url"
          placeholder="https://www.facebook.com/reel/..."
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
          autoFocus
        />
      </div>
    </FormModal>
  );
}
