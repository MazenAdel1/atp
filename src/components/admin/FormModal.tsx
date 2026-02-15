"use client";

import { ReactNode } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { Edit, Loader2, Plus } from "lucide-react";

type FormModalProps = {
  mode: "add" | "edit";
  endpoint: string;
  queryKey: string;
  title: string;
  triggerLabel: string;
  submitLabel?: string;
  children: ReactNode;
  disabled?: boolean;
  onTransformFormData?: (formData: FormData) => false | void;
  onSuccess?: () => void;
};

export default function FormModal({
  mode,
  endpoint,
  queryKey,
  title,
  triggerLabel,
  submitLabel,
  children,
  disabled,
  onTransformFormData,
  onSuccess,
}: FormModalProps) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } =
        mode === "add"
          ? await api.post(endpoint, formData)
          : await api.patch(endpoint, formData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  const isAdd = mode === "add";

  return (
    <Modal
      trigger={
        <>
          {isAdd ? (
            <Plus className="w-4 md:w-5" />
          ) : (
            <Edit className="w-4 md:w-5" />
          )}
          {triggerLabel}
        </>
      }
      triggerClassName={
        isAdd
          ? undefined
          : "bg-blue-500/25 border-blue-500/35 text-blue-400 hover:bg-blue-500/35 transition"
      }
      content={(setIsOpen) => (
        <div>
          <h2 className="mb-4 text-center text-xl">{title}</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              if (onTransformFormData) {
                const result = onTransformFormData(formData);
                if (result === false) return;
              }

              await mutateAsync(formData);
              onSuccess?.();
              setIsOpen(false);
            }}
          >
            {children}

            <button
              type="submit"
              className="bg-yellow hover:bg-orange mt-2 flex items-center justify-center gap-1 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending || disabled}
            >
              {submitLabel ?? (isAdd ? "حفظ" : "حفظ التعديل")}
              {isPending && <Loader2 className="size-4 animate-spin" />}
            </button>
          </form>
        </div>
      )}
    />
  );
}
