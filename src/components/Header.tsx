"use client";

import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const LIST = [
    { href: "#membership", label: "الاشتراك" },
    { href: "#partners", label: "شركاءنا" },
    { href: "#content", label: "المحتوى" },
    { href: "#coaches", label: "المدربين" },
    { href: "#address", label: "العنوان" },
  ];

  const headerRef = useRef<HTMLDivElement>(null);
  const headerBackUpRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const headerStyles = [
      "backdrop-blur-md",
      "bg-yellow/20",
      "rounded-full",
      "border-none",
      "fixed",
      "left-0",
      "right-0",
      "container",
      "z-50",
      "top-3",
      "transition-all",
      "duration-500",
      "ease-out",
    ];

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        headerRef.current?.classList.remove("-top-full");
        headerRef.current?.classList.add(...headerStyles);
        headerBackUpRef.current?.classList.replace("hidden", "block");
      } else {
        setIsScrolled(false);
        headerRef.current?.classList.remove(...headerStyles);
        headerRef.current?.classList.add("-top-full");
        headerBackUpRef.current?.classList.replace("block", "hidden");
      }
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={headerBackUpRef} className="hidden h-[76px] w-full" />
      <header
        ref={headerRef}
        className="py-3 border-b border-white/15 bg-black transition-all ease-out -top-full"
      >
        <div className="flex items-center justify-between container">
          <Image
            src={"/imgs/logo/atp-gym-logo-no-bg.png"}
            width={500}
            height={500}
            alt="atp gym logo"
            className="w-22"
          />
          <ul className="flex items-center gap-3">
            {LIST.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${
                    isScrolled
                      ? "text-white hover:text-white/70"
                      : "text-white/70 hover:text-white"
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className="flex items-center gap-2">
            عربي
            <Globe className="self-end" size={18} />
          </button>
        </div>
      </header>
    </>
  );
}
