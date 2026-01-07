import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { MembershipProps } from "@/lib/types";

const genderLabels = {
  male: "رجال",
  female: "نساء",
  both: "كلاهما",
};

export default function MembershipCard({
  membership,
}: {
  membership: MembershipProps;
}) {
  return membership ? (
    <div className="bg-gray hover:border-yellow/50 flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-white/25 transition">
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">{membership.name}</h3>
          <p className="text-sm text-white/70">{membership.description}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            <span className="bg-yellow/20 text-yellow rounded px-2 py-1">
              {membership.price} ج
            </span>
            <span className="rounded bg-blue-500/20 px-2 py-1 text-blue-400">
              {membership.sessions_count}{" "}
              {membership.sessions_count > 10 ? "تمرينة" : "تمارين"}
            </span>
            <span className="rounded bg-purple-500/20 px-2 py-1 text-purple-400">
              {genderLabels[membership.gender]}
            </span>
            {membership.game && (
              <span className="rounded bg-green-500/20 px-2 py-1 text-green-400">
                {membership.game.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 *:flex *:w-full *:items-center *:justify-center *:gap-2 *:rounded-sm *:border *:py-1">
          <EditModal membership={membership} />
          <DeleteModal membership={membership} />
        </div>
      </div>
    </div>
  ) : (
    <span>لا يوجد محتوى لعرضه</span>
  );
}
