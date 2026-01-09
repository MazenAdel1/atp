import { CoachModalProps } from "@/lib/types";
import Modal from "../Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Trash } from "lucide-react";

export default function DeleteModal({ coach }: CoachModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(`/coach/${coach.id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coaches"] });
    },
  });

  return (
    <Modal
      trigger={
        <>
          <Trash className="w-4 md:w-5" /> حذف
        </>
      }
      triggerClassName="bg-red-600/25 border-red-600/35 text-red-600 hover:bg-red-600/35 transition"
      content={(setIsOpen) => (
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-xl">حذف المدرب</h2>
          <p className="text-center text-white/70">
            هل أنت متأكد أنك تريد حذف هذا العنصر؟
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex-1 rounded-md border border-white/15 bg-white/10 py-2 transition hover:bg-white/15"
              onClick={() => setIsOpen(false)}
            >
              إلغاء
            </button>
            <button
              type="button"
              className="flex-1 rounded-md border-red-600/35 bg-red-600/25 py-2 text-red-600 transition hover:bg-red-600/35 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
              onClick={async () => {
                await mutateAsync();
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
