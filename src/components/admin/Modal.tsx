"use client";

import { AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export type ModalProps = {
  trigger?: ReactNode;
  content: ((setIsOpen: (open: boolean) => void) => ReactNode) | ReactNode;
  onOpenChange?: (open: boolean) => void;
  triggerClassName?: string;
};

export default function Modal({
  trigger,
  content,
  onOpenChange,
  triggerClassName,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    if (onOpenChange) onOpenChange(isOpen);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onOpenChange]);

  return (
    <>
      {trigger && (
        <button
          className={
            triggerClassName ??
            "bg-yellow hover:bg-orange flex items-center gap-1 rounded-sm px-2 py-1 text-sm text-black transition md:gap-2 md:px-4 md:py-2 md:text-base"
          }
          onClick={() => setIsOpen(true)}
          type="button"
        >
          {trigger}
        </button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center border-none bg-black/50 p-4 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gray flex max-h-full w-full max-w-lg flex-col gap-2 overflow-y-auto rounded-lg border border-white/25 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="-mt-2 -mr-2 w-fit rounded-full bg-white/25 p-2 text-white transition hover:bg-white/30"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X className="size-4" />
              </button>
              {typeof content === "function" ? content(setIsOpen) : content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
