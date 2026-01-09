"use client";

import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

function getAuthToken(): string | null {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "auth_token") {
      return value;
    }
  }
  return null;
}

function clearAuthToken() {
  document.cookie =
    "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export default function LogoutButton() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const token = getAuthToken();
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );
    },
    onSettled: () => {
      clearAuthToken();
      router.push("/admin/login");
      router.refresh();
    },
  });

  return (
    <button
      onClick={() => mutateAsync()}
      disabled={isPending}
      className="flex items-center gap-2 rounded-md border border-red-500/20 bg-red-500/10 px-2 py-1 text-sm text-red-500 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50 md:px-4 md:py-2 md:text-base"
    >
      {isPending ? (
        <Loader2 className="w-4 animate-spin md:w-5" />
      ) : (
        <LogOut className="w-4 md:w-5" />
      )}
      تسجيل الخروج
    </button>
  );
}
