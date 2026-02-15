import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import FormModal from "../FormModal";
import { SportProps } from "@/lib/types";

export default function AddModal({ sportId }: { sportId: number }) {
  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const { data } = await api.get(`/game`);
      return data.data as SportProps[];
    },
  });

  return (
    <FormModal
      mode="add"
      endpoint="/package"
      queryKey="memberships"
      title="إضافة اشتراك جديد"
      triggerLabel="إضافة اشتراك"
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
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
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
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
          value={sportId}
          onChange={() => {}}
        >
          <option value="">اختر الرياضة</option>
          {sports?.map((sport) => (
            <option key={sport.id} value={sport.id}>
              {sport.name}
            </option>
          ))}
        </select>
      </div>
    </FormModal>
  );
}
