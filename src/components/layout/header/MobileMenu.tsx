import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import { LINKS_LIST } from "@/lib/consts";
import Link from "next/link";
import { HeaderProps } from "./types";

export default function MobileMenu({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) {
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            backgroundColor: isScrolled
              ? "rgba(255, 193, 7, 0.2)"
              : "rgba(0, 0, 0, 1)",
            backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
            borderRadius: isScrolled ? "20px" : "0px",
            marginLeft: isScrolled ? "1rem" : "0rem",
            marginRight: isScrolled ? "1rem" : "0rem",
            y: isScrolled ? 80 : 64,
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed right-0 left-0 z-40 border-b border-white/15 md:hidden"
        >
          <nav className="container px-4 py-4">
            <ul className="flex flex-col items-center gap-4">
              {LINKS_LIST.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="text-white/70 transition-colors hover:text-white"
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
