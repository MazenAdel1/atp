import { headers } from "next/headers";
import Image from "next/image";
import LogoutButton from "@/components/admin/auth/LogoutButton";
import Link from "next/link";

export default async function AdminHeader() {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "/";

  return (
    <header className="border-b border-white/25">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-4">
          <Link href={"/"}>
            <Image
              src={"/imgs/logo/atp-gym-logo-no-bg.png"}
              width={500}
              height={500}
              alt="atp gym logo"
              className="w-18 md:w-22"
            />
          </Link>
          <h1 className="-mt-1 text-base md:text-2xl">لوحة التحكم</h1>
        </div>
        {pathname !== "/admin/login" && <LogoutButton />}
      </div>
    </header>
  );
}
