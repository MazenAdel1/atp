"use client";

import { ArrowDown } from "lucide-react";
import { Fragment } from "react";
import { motion } from "motion/react";
import SectionTitle from "../SectionTitle";

export default function Address() {
  const address = [
    "مصر - دمنهور",
    "آخر شارع بنك أبو ظبي الإسلامي",
    "أرض أدمون",
    "أمام كافيه سيتي ستارز",
  ];

  return (
    <section id="address" className="section py-16">
      <SectionTitle title="العنوان" />

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Address Steps */}
        <div className="flex flex-col gap-4 flex-1 items-center">
          {address.map((item, index) => (
            <Fragment key={index}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="block text-xl text-center font-medium rounded-md border border-yellow bg-yellow/10 p-3 w-full shadow-md hover:bg-yellow/20 transition"
              >
                {item}
              </motion.span>
              {index !== address.length - 1 && (
                <motion.span
                  animate={{ y: [0, 6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="block self-center text-yellow"
                >
                  <ArrowDown />
                </motion.span>
              )}
            </Fragment>
          ))}
        </div>

        {/* Google Map */}
        <motion.iframe
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d325.0372099719006!2d30.45731512329886!3d31.042324593756437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f66b00064f8169%3A0x71dfc612e0b21e86!2sATP%20GYM%20-%20Damanhour!5e0!3m2!1sen!2seg!4v1760218413643!5m2!1sen!2seg"
          className="rounded-md w-full md:w-[600px] h-[400px] border-4 border-yellow shadow-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
