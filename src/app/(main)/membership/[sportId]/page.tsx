import api from "@/lib/axios";
import { MembershipProps, SportProps } from "@/lib/types";
import Image from "next/image";

function Plan(plan: MembershipProps) {
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

export default async function page({
  params,
}: {
  params: Promise<{ sportId: string }>;
}) {
  const { sportId } = await params;
  const { data: sport }: { data: SportProps } = await (
    await api.get(`/game/${sportId}`)
  ).data;

  const groupedData = Object.groupBy(sport.packages!, ({ gender }) =>
    gender === "male" ? "male" : "female",
  );

  return (
    <main className="container py-10">
      <Image
        src={sport.image}
        alt={sport?.description as string}
        width={2000}
        height={500}
        className="absolute left-1/2 -z-10 h-52 w-11/12 -translate-x-1/2 object-cover"
      />
      <div className="flex flex-col gap-10 pt-44">
        <h1 className="bg-yellow w-fit px-4 py-2 text-3xl font-bold text-black">
          {sport?.name}
        </h1>
        <section className="flex flex-col gap-20">
          {groupedData.male && (
            <section className="flex flex-col gap-6">
              <h2 className="flex items-center gap-4 text-2xl *:flex-1">
                باقات الرجال
                <span className="bg-yellow block h-0.5 w-full" />
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {groupedData.male.map((plan, index) => (
                  <Plan key={`${plan.name}-${index}`} {...plan} />
                ))}
              </div>
            </section>
          )}
          {groupedData.female && (
            <section className="flex flex-col gap-6">
              <h2 className="flex items-center gap-4 text-2xl *:flex-1">
                باقات النساء
                <span className="bg-yellow block h-0.5 w-full" />
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {groupedData.female?.map((plan, index) => (
                  <Plan key={`${plan.name}-${index}`} {...plan} />
                ))}
              </div>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
