import Modal from "../Modal";
import { getReelId } from "@/utils/utils";
import { VideoModalProps } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Edit } from "lucide-react";

export default function EditModal({ video }: VideoModalProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.patch(`/content/${video.id}`, formData);

      return {
        id: data.data.id,
        reelId: getReelId(data.data.url),
        reelUrl: data.data.url,
      };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
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
          <h2 className="mb-4 text-center text-xl">تعديل الفيديو</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();

              const formData = new FormData(e.currentTarget);
              if (!getReelId(formData.get("url") as string)) return;

              await mutation.mutateAsync(formData);
              setIsOpen(false);
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
                defaultValue={video.reelUrl}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="bg-yellow hover:bg-orange mt-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
              disabled={mutation.isPending}
            >
              حفظ التعديل
            </button>
          </form>
        </div>
      )}
    />
  );
}
