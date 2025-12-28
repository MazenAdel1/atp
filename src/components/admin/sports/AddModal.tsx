import { Plus } from "lucide-react";
import Modal from "../Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import AdminImagePicker from "../AdminImagePicker";

export default function AddModal() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post(`/game`, formData);
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
          <Plus /> إضافة رياضة
        </>
      }
      content={(setIsOpen) => (
        <div>
          <h2 className="text-xl mb-4 text-center">إضافة رياضة جديدة</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              await mutateAsync(formData);
              setUploadedImage(null);
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
                required
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
              />
            </div>

            <AdminImagePicker
              id="image"
              label="صورة الرياضة"
              file={uploadedImage}
              onChange={setUploadedImage}
            />

            <button
              type="submit"
              className="bg-yellow text-black p-2 rounded-md mt-2 hover:bg-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              حفظ
            </button>
          </form>
        </div>
      )}
    />
  );
}
