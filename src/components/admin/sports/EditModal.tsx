import { useState } from "react";
import Modal from "../Modal";
import { SportModalProps } from "@/lib/types";
import AdminImagePicker from "../AdminImagePicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

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
      trigger={"تعديل"}
      triggerClassName="bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
      content={(setIsOpen) => (
        <div>
          <h2 className="text-xl mb-4 text-center">تعديل الرياضة</h2>
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
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
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
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
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
              className="bg-yellow text-black p-2 rounded-md mt-2 hover:bg-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
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
