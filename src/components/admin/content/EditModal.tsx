import Modal from "../Modal";
import { getReelId } from "@/utils/utils";
import { VideoModalProps } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

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
      trigger={"تعديل"}
      triggerClassName="bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
      content={(setIsOpen) => (
        <div>
          <h2 className="text-xl mb-4 text-center">تعديل الفيديو</h2>
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
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
                defaultValue={video.reelUrl}
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="bg-yellow text-black p-2 rounded-md mt-2 hover:bg-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
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
