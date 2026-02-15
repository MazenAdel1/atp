import { useState } from "react";
import AdminImagePicker from "../AdminImagePicker";
import FormModal from "../FormModal";

export default function AddModal() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  return (
    <FormModal
      mode="add"
      endpoint="/game"
      queryKey="sports"
      title="إضافة رياضة جديدة"
      triggerLabel="إضافة رياضة"
      onSuccess={() => setUploadedImage(null)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-white/85">
          اسم الرياضة
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اسم الرياضة"
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-white/85">
          وصف الرياضة
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="وصف الرياضة"
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
        />
      </div>

      <AdminImagePicker
        id="image"
        label="صورة الرياضة"
        file={uploadedImage}
        onChange={setUploadedImage}
      />
    </FormModal>
  );
}
