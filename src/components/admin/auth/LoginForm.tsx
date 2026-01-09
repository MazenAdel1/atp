"use client";

import { Lock, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

type LoginProps = { username: string; password: string };

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (credentials: LoginProps) => {
      const { data } = await api.post("/login", credentials);
      return data;
    },
    onSuccess: (data) => {
      if (data.success) {
        document.cookie = `auth_token=${data.data.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        router.push("/admin/content");
        router.refresh();
      } else {
        setError(data.message || "فشل تسجيل الدخول");
      }
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      setError(error?.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    await mutateAsync({
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-5 sm:min-w-sm"
    >
      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-500 sm:w-sm">
          {error}
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          name="username"
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          placeholder="أدخل اسم المستخدم"
          disabled={isPending}
        />
        <User className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/40" />
      </div>
      <div className="relative">
        <input
          type="password"
          name="password"
          required
          className="focus:border-yellow w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-right text-white focus:outline-none"
          placeholder="أدخل كلمة المرور"
          disabled={isPending}
        />
        <Lock className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-white/40" />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-yellow hover:bg-orange mt-2 flex items-center justify-center gap-2 rounded-md p-2 text-black transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending && <Loader2 className="size-5 animate-spin" />}
        تسجيل الدخول
      </button>
    </form>
  );
}
