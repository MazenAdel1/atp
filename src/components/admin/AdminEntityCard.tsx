import { Edit, Trash } from "lucide-react";
import Image from "next/image";

export default function AdminEntityCard({
  image,
  title,
  description,
  imageAlt,
  onEdit,
  onDelete,
}: {
  image: string;
  title: string;
  description: string;
  imageAlt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="border border-white/25 rounded-lg overflow-hidden flex flex-col gap-3 bg-gray">
      <Image
        src={image}
        alt={imageAlt ?? title}
        width={500}
        height={500}
        className="w-full max-h-60 object-[0%_20%] object-cover"
      />
      <div className="flex flex-col gap-3 p-2">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-white/70">{description}</p>
        </div>
        <div className="flex items-center gap-2 *:rounded-sm *:border *:w-full *:py-1 *:flex *:justify-center *:items-center *:gap-2">
          <button
            type="button"
            onClick={onEdit}
            disabled={!onEdit}
            className="bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
          >
            <Edit className="size-4" />
            تعديل
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={!onDelete}
            className="bg-red-600/25 border-red-600/35 text-red-600 hover:bg-red-600/35 transition"
          >
            <Trash className="size-4" />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
