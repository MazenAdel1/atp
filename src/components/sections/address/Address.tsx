import { ArrowDown } from "lucide-react";
import { Fragment } from "react";
import * as motion from "motion/react-client";
import SectionTitle from "../SectionTitle";
import { BottomRightGlow } from "@/components/layout/Glow";

export default function Address() {
  const address = [
    "مصر - دمنهور",
    "آخر شارع بنك أبو ظبي الإسلامي",
    "أرض أدمون",
    "أمام كافيه سيتي ستارز",
  ];

  return (
    <section id="address" className="section py-16">
      <BottomRightGlow />
      <SectionTitle title="العنوان" />

      <div className="flex w-full flex-col items-center justify-between gap-10 md:w-auto lg:flex-row">
        {/* Address Steps */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex w-full flex-1 flex-col items-center gap-4"
        >
          {address.map((item, index) => (
            <Fragment key={index}>
              <motion.span
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                  visible: { opacity: 1, filter: "blur(0)", y: 0 },
                }}
                className="border-yellow bg-yellow/10 hover:bg-yellow/20 block w-full border p-3 text-center text-xl font-medium shadow-md transition"
              >
                {item}
              </motion.span>
              {index !== address.length - 1 && (
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="text-yellow block self-center"
                >
                  <ArrowDown className="size-7.5" />
                </motion.span>
              )}
            </Fragment>
          ))}
        </motion.div>

        {/* Google Map */}
        <motion.iframe
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0)" }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325.0372099719006!2d30.45731512329886!3d31.042324593756437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f66b00064f8169%3A0x71dfc612e0b21e86!2sATP%20GYM%20-%20Damanhour!5e0!3m2!1sen!2seg!4v1760218413643!5m2!1sen!2seg"
          className="border-yellow h-100 w-full border-4 shadow-lg md:w-150"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
