import { useState } from "react";
import AdminImagePicker from "../AdminImagePicker";
import FormModal from "../FormModal";
import { PartnerModalProps } from "@/lib/types";

export default function EditModal({ partner }: PartnerModalProps) {
  const [editImage, setEditImage] = useState<File | null>(null);

  return (
    <FormModal
      mode="edit"
      endpoint={`/partner/${partner.id}`}
      queryKey="partners"
      title="تعديل الشريك"
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
          اسم الشريك
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اسم الشريك"
          defaultValue={partner.name}
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
          defaultValue={partner.description}
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
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
          defaultValue={partner.links}
          placeholder="رابط الشريك"
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
        />
      </div>

      <AdminImagePicker
        id="editPartnerImg"
        label="صورة الشريك"
        file={editImage}
        initialSrc={partner.image}
        onChange={setEditImage}
      />
    </FormModal>
  );
}
