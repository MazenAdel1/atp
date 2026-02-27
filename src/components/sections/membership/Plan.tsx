import { MembershipProps } from "@/lib/types";

export default function Plan(plan: MembershipProps) {
  return (
    <div className="flex flex-col gap-4 border border-gray-600 bg-white/5 p-4">
      <div>
        <h3 className="text-yellow ml-2 inline-block text-xl font-semibold">
          {plan.price} جنيه
        </h3>
        <span className="text-sm text-white/60">شهريا</span> -{" "}
        <h4 className="text-orange inline-block">
          {plan.sessions_count}{" "}
          {plan.sessions_count > 10 ? "تمرينة" : "تمرينات"}
        </h4>
      </div>
      <p className="text-base text-white/90">{plan.description}</p>
    </div>
  );
}
