import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import AdminImagePicker from "../AdminImagePicker";
import FormModal from "../FormModal";
import { SportProps } from "@/lib/types";

export default function AddModal() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedGames, setSelectedGames] = useState<number[]>([]);

  const { data: sports } = useQuery({
    queryKey: ["sports"],
    queryFn: async () => {
      const { data } = await api.get(`/game`);
      return data.data as SportProps[];
    },
  });

  const toggleGame = (gameId: number) => {
    setSelectedGames((prev) =>
      prev.includes(gameId)
        ? prev.filter((id) => id !== gameId)
        : [...prev, gameId],
    );
  };

  return (
    <FormModal
      mode="add"
      endpoint="/coach"
      queryKey="coaches"
      title="إضافة مدرب جديد"
      triggerLabel="إضافة مدرب"
      disabled={selectedGames.length === 0}
      onTransformFormData={(formData) => {
        selectedGames.forEach((gameId) => {
          formData.append("games[]", gameId.toString());
        });
      }}
      onSuccess={() => {
        setUploadedImage(null);
        setSelectedGames([]);
      }}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-white/85">
          اسم المدرب
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="اسم المدرب"
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          required
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-white/85">الرياضات</label>
        <div className="flex min-h-12.5 flex-wrap gap-2 rounded-lg border border-white/10 bg-black/30 p-3">
          {sports && sports.length > 0 ? (
            sports.map((sport) => (
              <button
                key={sport.id}
                type="button"
                onClick={() => toggleGame(sport.id)}
                className={`rounded-md border border-current px-3 py-1.5 text-sm transition ${
                  selectedGames.includes(sport.id)
                    ? "bg-yellow text-black"
                    : "border-white/20 text-white hover:bg-white/20"
                }`}
              >
                {sport.name}
              </button>
            ))
          ) : (
            <span className="text-sm text-white/50">لا يوجد رياضات</span>
          )}
        </div>
        {selectedGames.length === 0 && (
          <span className="text-xs text-white/50">
            اختر رياضة واحدة على الأقل
          </span>
        )}
      </div>

      <AdminImagePicker
        id="coachImg"
        label="صورة المدرب"
        file={uploadedImage}
        onChange={setUploadedImage}
        required
      />
    </FormModal>
  );
}
