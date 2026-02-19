import { useState } from "react";
import AdminImagePicker from "../AdminImagePicker";
import FormModal from "../FormModal";
import { SportProps } from "@/lib/types";

export default function EditModal({
  id,
  name,
  image,
  description,
}: SportProps) {
  const [editImage, setEditImage] = useState<File | null>(null);

  return (
    <FormModal
      mode="edit"
      endpoint={`/game/${id}`}
      queryKey="sports"
      title="تعديل الرياضة"
      triggerLabel="تعديل"
      onTransformFormData={(formData) => {
        formData.delete("image");
        if (editImage) {
          formData.append("image", editImage);
        }
      }}
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
          defaultValue={name}
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
          defaultValue={description}
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
        />
      </div>

      <AdminImagePicker
        id="editSportImg"
        label="صورة الرياضة"
        file={editImage}
        initialSrc={image}
        onChange={setEditImage}
      />
    </FormModal>
  );
}
