import Modal from "../Modal";
import { MembershipModalProps, SportProps } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Edit } from "lucide-react";

export default function EditModal({ membership }: MembershipModalProps) {
  const queryClient = useQueryClient();

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const { data } = await api.get(`/game`);
      return data.data as SportProps[];
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.patch(`/package/${membership.id}`, formData);

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberships"] });
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
          <h2 className="mb-4 text-center text-xl">تعديل الاشتراك</h2>
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
                اسم الاشتراك
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="اسم الاشتراك"
                defaultValue={membership.name}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-white/85">
                وصف الاشتراك
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                placeholder="وصف الاشتراك"
                defaultValue={membership.description}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="text-white/85">
                السعر
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="السعر"
                defaultValue={membership.price}
                min={0}
                step={0.01}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="sessions_count" className="text-white/85">
                عدد الحصص
              </label>
              <input
                type="number"
                id="sessions_count"
                name="sessions_count"
                placeholder="عدد الحصص"
                defaultValue={membership.sessions_count}
                min={1}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="gender" className="text-white/85">
                الجنس
              </label>
              <select
                id="gender"
                name="gender"
                defaultValue={membership.gender}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              >
                <option value="">اختر الجنس</option>
                <option value="male">رجال</option>
                <option value="female">نساء</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="game_id" className="text-white/85">
                الرياضة
              </label>
              <select
                id="game_id"
                name="game_id"
                defaultValue={membership.game_id}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
                required
              >
                <option value="">اختر الرياضة</option>
                {sports?.map((sport) => (
                  <option key={sport.id} value={sport.id}>
                    {sport.name}
                  </option>
                ))}
              </select>
            </div>

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
