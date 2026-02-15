export default function NoData({ text }: { text?: string }) {
  return (
    <p className="flex h-75 w-full items-center justify-center border border-gray-600 text-lg text-gray-200">
      {text || "لا يوجد بيانات حاليا"}
    </p>
  );
}
