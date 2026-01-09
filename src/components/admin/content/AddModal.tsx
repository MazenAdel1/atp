import { Plus } from "lucide-react";
import Modal from "../Modal";
import { getReelId } from "@/utils/utils";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function AddModal() {
  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post(`/content`, formData);

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
          <Plus className="w-4 md:w-5" /> إضافة فيديو
        </>
      }
      content={(setIsOpen) => (
        <div>
          <h2 className="mb-4 text-center text-xl">إضافة فيديو جديد</h2>
          <form
            ref={formRef}
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (!getReelId(formData.get("url") as string)) return;

              await mutateAsync(formData);
              setIsOpen(false);
            }}
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="url" className="text-white/85">
                رابط Facebook Reel
              </label>
              <input
                type="url"
                id="url"
                name="url"
                placeholder="https://www.facebook.com/reel/..."
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className={
                "bg-yellow hover:bg-orange mt-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
              }
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
