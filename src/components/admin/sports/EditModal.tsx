import { useState } from "react";
import Modal from "../Modal";
import { SportModalProps } from "@/lib/types";
import AdminImagePicker from "../AdminImagePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Edit } from "lucide-react";

export default function EditModal({ sport }: SportModalProps) {
  const [editImage, setEditImage] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.delete("image");

      if (editImage) {
        formData.append("image", editImage);
      }
      const { data } = await api.patch(`/game/${sport.id}`, formData);

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sports"] });
    },
  });

  return (
    <Modal
      trigger={
        <>
          <Edit className="w-4 md:w-5" /> تعديل
        </>
      }
      triggerClassName="bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
      content={(setIsOpen) => (
        <div>
          <h2 className="mb-4 text-center text-xl">تعديل الرياضة</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);

              await mutateAsync(data);
              setIsOpen(false);
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
                defaultValue={sport.name}
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
                defaultValue={sport.description}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              />
            </div>

            <AdminImagePicker
              id="editSportImg"
              label="صورة الرياضة"
              file={editImage}
              initialSrc={sport.image}
              onChange={setEditImage}
            />

            <button
              type="submit"
              className="bg-yellow hover:bg-orange mt-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
            >
              حفظ التعديل
            </button>
          </form>
        </div>
      )}
    />
  );
}
