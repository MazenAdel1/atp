import { MEMBERSHIP } from "@/lib/mockData";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: sportName } = await params;
  const sport = MEMBERSHIP.find(
    (s) => s.label.toLowerCase() === sportName.toLowerCase()
  );

  return (
    <main className="py-10 container">
      <Image
        src={`/imgs/sports/${sport?.img}`}
        alt={sport?.description as string}
        width={2000}
        height={500}
        className="absolute h-52 w-11/12 object-cover -z-10 left-1/2 -translate-x-1/2 rounded-md"
      />
      <div className="pt-44 flex flex-col gap-10">
        <h1 className="text-3xl font-bold bg-yellow w-fit text-black px-4 py-2">
          {sport?.label}
        </h1>
        <section>
          <section className="flex flex-col gap-6">
            <h2 className="text-2xl flex items-center *:flex-1 gap-4">
              باقات الرجال
              <span className="w-full h-0.5 bg-yellow block" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sport?.info
                .filter((info) => info.gender === "MALE")
                .map((info, idx) =>
                  info.plan.map((plan, pIdx) => (
                    <div
                      key={`${idx}-${pIdx}`}
                      className="border p-4 rounded-md bg-white/5 flex flex-col gap-4"
                    >
                      <div>
                        <h3 className="text-yellow text-xl inline-block ml-2 font-semibold">
                          {plan.price} جنيه
                        </h3>
                        <span className="text-white/60 text-sm">شهريا</span>
                      </div>
                      <h4>{plan.amount} تمرينة في الشهر</h4>
                    </div>
                  ))
                )}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
