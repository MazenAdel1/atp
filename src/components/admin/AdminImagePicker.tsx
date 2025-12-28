"use client";

import { Download } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export default function AdminImagePicker({
  id,
  label,
  file,
  initialSrc,
  onChange,
  required,
}: {
  id: string;
  label: string;
  file: File | null;
  initialSrc?: string;
  onChange: (file: File | null) => void;
  required?: boolean;
}) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setObjectUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const previewSrc = useMemo(() => {
    return objectUrl ?? initialSrc ?? null;
  }, [objectUrl, initialSrc]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-white/85">
        {label}
      </label>

      <input
        type="file"
        name="image"
        id={id}
        className="hidden"
        required={required}
        onChange={(e) => {
          const next = e.target.files?.[0] ?? null;
          onChange(next);
        }}
      />

      <label
        htmlFor={id}
        className="bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white/50 text-right cursor-pointer hover:bg-black/40 transition flex items-center justify-between"
      >
        {file ? "تغيير الصورة" : "اختر صورة"}
        <Download className="size-4" />
      </label>

      {previewSrc ? (
        <Image
          className="w-full border-white/25 border rounded-md mt-1 object-top"
          src={previewSrc}
          alt="uploaded image"
          width={500}
          height={500}
        />
      ) : (
        <div className="w-full h-75 rounded-md border border-white/25" />
      )}
    </div>
  );
}
