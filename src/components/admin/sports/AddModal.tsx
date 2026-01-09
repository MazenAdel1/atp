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
          <Plus className="w-4 md:w-5" /> إضافة رياضة
        </>
      }
      content={(setIsOpen) => (
        <div>
          <h2 className="mb-4 text-center text-xl">إضافة رياضة جديدة</h2>
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

            <button
              type="submit"
              className="bg-yellow hover:bg-orange mt-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
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
