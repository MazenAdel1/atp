import { useState } from "react";
import AdminImagePicker from "../AdminImagePicker";
import FormModal from "../FormModal";

export default function AddModal() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  return (
    <FormModal
      mode="add"
      endpoint="/partner"
      queryKey="partners"
      title="إضافة شريك جديد"
      triggerLabel="إضافة الشركاء"
      onSuccess={() => setUploadedImage(null)}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-white/85">
          اسم الشريك
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اسم الشريك"
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-white/85">
          وصف الشريك
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="وصف الشريك"
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="links" className="text-white/85">
          رابط الشريك{" "}
          <span className="text-sm text-white/50">
            (موقع إلكتروني ٫ صفحة تواصل اجتماعي ٫ إلخ... )
          </span>
        </label>
        <input
          type="url"
          id="links"
          name="links[]"
          placeholder="رابط الشريك"
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
        />
      </div>

      <AdminImagePicker
        id="image"
        label="صورة الشريك"
        file={uploadedImage}
        onChange={setUploadedImage}
      />
    </FormModal>
  );
}
