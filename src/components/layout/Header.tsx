"use client";

import { LINKS_LIST } from "@/lib/consts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerBackUpRef = useRef<HTMLDivElement>(null);
  const mobileHeaderRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const headerStyles = [
      "backdrop-blur-lg",
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

    const mobileHeaderStyles = [
      "backdrop-blur-lg",
      "bg-yellow/20",
      "rounded-full",
      "border-none",
      "mx-4",
      "top-3",
    ];

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
        headerRef.current?.classList.remove("-top-full");
        headerRef.current?.classList.add(...headerStyles);
        headerBackUpRef.current?.classList.replace("hidden", "block");

        // Apply styles to mobile header
        mobileHeaderRef.current?.classList.add(...mobileHeaderStyles);
        mobileHeaderRef.current?.classList.remove("top-0");
      } else {
        setIsScrolled(false);
        headerRef.current?.classList.remove(...headerStyles);
        headerRef.current?.classList.add("-top-full");
        headerBackUpRef.current?.classList.replace("block", "hidden");

        // Remove styles from mobile header
        mobileHeaderRef.current?.classList.remove(...mobileHeaderStyles);
        mobileHeaderRef.current?.classList.add("top-0");
      }
    };

    handleScroll();
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div ref={headerBackUpRef} className="hidden h-19 w-full" />

      {/* Desktop Header */}
      <header
        ref={headerRef}
        className="-top-full hidden h-19 items-center border-b border-white/15 bg-black py-3 transition-all duration-500 ease-out md:flex"
      >
        <div className="relative container flex items-center justify-between gap-10">
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
        </div>
      </header>

      {/* Mobile Header */}
      <header
        ref={mobileHeaderRef}
        className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center border-b border-white/15 bg-black px-4 transition-all duration-500 ease-out md:hidden"
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
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 right-0 left-0 z-40 border-b border-white/15 bg-black md:hidden"
          >
            <nav className="container px-4 py-4">
              <ul className="flex flex-col items-center gap-4">
                {LINKS_LIST.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
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
    </>
  );
}
