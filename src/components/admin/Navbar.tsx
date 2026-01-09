"use client";

import { cn } from "@/utils/cn";
import { Award, Coins, Dumbbell, Users, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const URLs = [
    { href: "/admin/content", label: "المحتوى", icon: Video },
    { href: "/admin/partners", label: "الشركاء", icon: Users },
    { href: "/admin/coaches", label: "المدربين", icon: Award },
    { href: "/admin/sports", label: "الرياضات", icon: Dumbbell },
    { href: "/admin/memberships", label: "الاشتراكات", icon: Coins },
  ];

  const pathname = usePathname();
  return (
    <nav className="border-b border-white/25">
      <ul className="container flex items-center gap-8 overflow-x-auto">
        {URLs.map((url) => (
          <li key={url.href}>
            <Link
              href={url.href}
              className={cn(
                "flex items-center gap-1 py-5 md:gap-2",
                pathname === url.href && "text-yellow border-yellow border-b-2",
              )}
            >
              <url.icon className="w-4 md:w-5" />
              {url.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
