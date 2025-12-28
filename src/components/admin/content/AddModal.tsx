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
          <Plus /> إضافة فيديو
        </>
      }
      content={(setIsOpen) => (
        <div>
          <h2 className="text-xl mb-4 text-center">إضافة فيديو جديد</h2>
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
                className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
                required
                autoFocus
              />
            </div>

            <button
              type="submit"
              className={
                "bg-yellow text-black p-2 rounded-md mt-2 hover:bg-orange transition disabled:opacity-50 disabled:cursor-not-allowed"
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
