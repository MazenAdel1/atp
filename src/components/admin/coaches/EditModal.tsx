import { useState } from "react";
import Modal from "../Modal";
import { CoachModalProps, SportProps } from "@/lib/types";
import AdminImagePicker from "../AdminImagePicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function EditModal({ coach }: CoachModalProps) {
  const [editImage, setEditImage] = useState<File | null>(null);
  const [selectedGames, setSelectedGames] = useState<number[]>(
    coach.game?.map((g) => g.id) ?? [],
  );

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
      formData.delete("image");

      if (editImage) {
        formData.append("image", editImage);
      }

      selectedGames.forEach((gameId) => {
        formData.append("games[]", gameId.toString());
      });

      const { data } = await api.patch(`/coach/${coach.id}`, formData);

      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["coaches"] });
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
    <Modal
      trigger={"تعديل"}
      triggerClassName="bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
      content={(setIsOpen) => (
        <div>
          <h2 className="mb-4 text-center text-xl">تعديل المدرب</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              await mutateAsync(formData);
              setIsOpen(false);
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
                defaultValue={coach.name}
                className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
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
              id="editCoachImg"
              label="صورة المدرب"
              file={editImage}
              initialSrc={coach.image}
              onChange={setEditImage}
            />

            <button
              type="submit"
              className="bg-yellow hover:bg-orange mt-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending || selectedGames.length === 0}
            >
              حفظ التعديل
            </button>
          </form>
        </div>
      )}
    />
  );
}
