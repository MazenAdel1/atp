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
            "bg-yellow text-black py-2 px-4 flex items-center gap-2 hover:bg-orange transition rounded-sm"
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
            className="p-2 fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 border-none"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gray border border-white/25 rounded-lg p-6 max-w-lg w-full flex flex-col gap-2 max-h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="text-white w-fit bg-white/25 hover:bg-white/30 rounded-full transition p-2 -mt-2 -mr-2"
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
