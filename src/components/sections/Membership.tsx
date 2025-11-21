import MembershipCard, { MembershipType } from "../MembershipCard";

export default function Membership() {
  const MEMBERSHIP: MembershipType[] = [
    {
      label: "GYM",
      img: "gym-01.png",
      info: [
        {
          gender: "MALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 16, price: 650 },
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
        {
          gender: "FEMALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
      ],
    },
    {
      label: "MMA",
      img: "mma-02.png",
      info: [
        {
          gender: "MALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
        {
          gender: "FEMALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
      ],
    },
    {
      label: "BJJ",
      img: "bjj-01.png",
      info: [
        {
          gender: "MALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
        {
          gender: "FEMALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
      ],
    },
    {
      label: "CALISTHENICS",
      img: "calisthenics-01.png",
      info: [
        {
          gender: "MALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
        {
          gender: "FEMALE",
          days: ["السبت", "الأحد", "الثلاثاء", "الخميس"],
          time: [{ from: "6 صباحًا", to: "10 مساءً" }],
          plan: [
            { amount: 12, price: 450 },
            { amount: 8, price: 400 },
          ],
        },
      ],
    },
  ];

  return (
    <section id="membership" className="section">
      <h2 className="title">
        الاشتراك{" "}
        <span className="text-sm block opacity-60 py-0.5">
          اضغط على الرياضة لرؤية الاشتراك
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 w-full">
        {MEMBERSHIP.map((membership) => (
          <MembershipCard key={membership.label} membership={membership} />
        ))}
      </div>
    </section>
  );
}
