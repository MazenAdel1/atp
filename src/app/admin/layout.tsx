import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <>
      <header className="border-b-[1px] border-white/25">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={"/imgs/logo/atp-gym-logo-no-bg.png"}
              width={500}
              height={500}
              alt="atp gym logo"
              className="w-22"
            />
            <h1 className="text-2xl -mt-1">لوحة التحكم</h1>
          </div>
          {pathname !== "/admin/login" && (
            <button className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 rounded-md px-4 py-2 hover:bg-red-500/20 transition">
              <LogOut className="size-5" />
              تسجيل الخروج
            </button>
          )}
        </div>
      </header>
      {children}
    </>
  );
}
