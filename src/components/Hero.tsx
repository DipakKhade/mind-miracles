"use client";
import Image from "next/image";
import logo from "../../public/mind_miracles_logo.png";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.8, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
      >
        <main className="min-h-[420px] md:flex">
          <div className="flex justify-center ">
            <div>
              <Image
                alt="mindmiracles"
                src={logo}
                className="w-60 h-60 md:w-[700px] md:h-[450px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center align-middle">
            <div className="text-2xl md:text-4xl p-4 md:p-12 font-semibold text-center">
              <p className="font-mono">
                We Are Helping Hands You Have Been Searching For
              </p>
            </div>
            <div className="flex justify-end text-2xl font-bold p-2">
              <p>~Mind Miracles</p>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}
