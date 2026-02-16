import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HeaderProps } from "./types";

export default function MobileHeader({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) {
  return (
    <motion.header
      animate={{
        y: isScrolled ? "0.75rem" : "0rem",
        marginLeft: isScrolled ? "1rem" : "0rem",
        marginRight: isScrolled ? "1rem" : "0rem",
        borderRadius: isScrolled ? "9999px" : "0px",
        backgroundColor: isScrolled
          ? "rgba(255, 193, 7, 0.2)"
          : "rgba(0, 0, 0, 1)",
        backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
        borderWidth: isScrolled ? "0px" : "1px",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed right-0 left-0 z-50 flex h-16 items-center border-b border-white/15 px-4 md:hidden"
    >
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <Image
            src={"/imgs/logo/atp-gym-logo-no-bg.png"}
            width={500}
            height={500}
            alt="atp gym logo"
            className="w-16"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-white hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
}
