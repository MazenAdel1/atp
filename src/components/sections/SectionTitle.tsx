export default function SectionTitle({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) {
  return (
    <section className="flex flex-col gap-1 items-center">
      <div className="flex items-center gap-3 justify-start">
        <div className="h-1 w-20 bg-yellow" />
        <h2 className="w-fit text-4xl font-semibold">{title}</h2>
        <div className="h-1 w-20 bg-yellow" />
      </div>
      {subTitle && <p className="opacity-60 text-sm">{subTitle}</p>}
    </section>
  );
}
