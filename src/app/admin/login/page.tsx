import { Lock } from "lucide-react";
import LoginForm from "@/components/admin/auth/LoginForm";

export default function page() {
  return (
    <main className="flex h-[calc(100dvh-74px)] items-center justify-center bg-black">
      <div className="rounded-lg border border-gray-600 bg-white/5 p-10">
        <div className="bg-yellow mx-auto flex size-16 items-center justify-center rounded-full">
          <Lock className="size-8 text-black" />
        </div>
        <h1 className="py-5 text-center text-xl text-white">لوحة التحكم</h1>
        <LoginForm />
      </div>
    </main>
  );
}
