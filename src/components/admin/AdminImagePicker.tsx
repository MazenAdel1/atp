"use client";

import { AdminImagePickerProps } from "@/lib/types";
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
}: AdminImagePickerProps) {
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
        className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white/50 transition hover:bg-black/40"
      >
        {file ? "تغيير الصورة" : "اختر صورة"}
        <Download className="size-4" />
      </label>

      {previewSrc ? (
        <Image
          className="mt-1 w-full rounded-md border border-white/25 object-top"
          src={previewSrc}
          alt="uploaded image"
          width={500}
          height={500}
        />
      ) : (
        <div className="h-75 w-full rounded-md border border-white/25" />
      )}
    </div>
  );
}
