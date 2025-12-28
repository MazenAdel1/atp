import { Lock, User } from "lucide-react";

export default function page() {
  return (
    <main className="h-[calc(100dvh-74px)] bg-black flex items-center justify-center">
      <div className="rounded-lg border border-gray-600 p-10 bg-white/5">
        <div className="bg-yellow size-16 rounded-full mx-auto flex justify-center items-center">
          <Lock className="size-8 text-black" />
        </div>
        <h1 className="text-white text-xl py-5 text-center">لوحة التحكم</h1>
        <form className="flex flex-col gap-5 sm:min-w-sm w-full">
          <div className="relative">
            <input
              type="text"
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
              placeholder="أدخل اسم المستخدم"
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40" />
          </div>
          <div className="relative">
            <input
              type="text"
              required
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-right focus:border-yellow focus:outline-none"
              placeholder="أدخل كلمة المرور"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-white/40" />
          </div>

          <button
            type="submit"
            className="bg-yellow text-black p-2 rounded-md mt-2 hover:bg-orange transition"
          >
            التسجيل
          </button>
        </form>
      </div>
    </main>
  );
}
