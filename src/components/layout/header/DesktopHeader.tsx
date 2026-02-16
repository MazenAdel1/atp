import { LINKS_LIST } from "@/lib/consts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeaderProps } from "./types";

export default function DesktopHeader({
  isScrolled,
}: Pick<HeaderProps, "isScrolled">) {
  return (
    <motion.header
      animate={{
        y: isScrolled ? "0.75rem" : "0rem",
        backgroundColor: isScrolled ? "transparent" : "#000000",
        borderColor: isScrolled ? "transparent" : "rgb(75 85 99)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed right-0 left-0 z-50 hidden h-19 items-center border-b md:flex"
    >
      <motion.div
        animate={{
          borderRadius: isScrolled ? "9999px" : "0px",
          backgroundColor: isScrolled
            ? "rgba(255, 193, 7, 0.2)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
          borderWidth: isScrolled ? "0px" : "0px",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative container flex h-full w-full items-center justify-between gap-10 px-6 py-3"
      >
        <Link href="/" className="absolute">
          <Image
            src={"/imgs/logo/atp-gym-logo-no-bg.png"}
            width={500}
            height={500}
            alt="atp gym logo"
            className="w-22"
          />
        </Link>
        <ul className="flex flex-1 items-center justify-center gap-5">
          {LINKS_LIST.map((item) => (
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
      </motion.div>
    </motion.header>
  );
}
