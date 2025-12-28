import { VideoModalProps } from "@/lib/types";
import Modal from "../Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function DeleteModal({ video }: VideoModalProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/content/${video.id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });

  return (
    <Modal
      trigger="حذف"
      triggerClassName="bg-red-600/25 border-red-600/35 text-red-600 hover:bg-red-600/35 transition"
      content={(setIsOpen) => (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-center">حذف الفيديو</h2>
          <p className="text-white/70 text-center">
            هل أنت متأكد أنك تريد حذف هذا العنصر؟
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex-1 bg-white/10 border border-white/15 rounded-md py-2 hover:bg-white/15 transition"
              onClick={() => setIsOpen(false)}
            >
              إلغاء
            </button>
            <button
              type="button"
              className="flex-1 bg-red-600/25 border border-red-600/35 text-red-600 rounded-md py-2 hover:bg-red-600/35 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={mutation.isPending}
              onClick={async () => {
                await mutation.mutateAsync();
              }}
            >
              حذف
            </button>
          </div>
        </div>
      )}
    />
  );
}
