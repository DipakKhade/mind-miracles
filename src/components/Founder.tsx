"use client";
import { motion } from "framer-motion";
import founder_img from "../../public/founder_jpg.jpg";

const revealVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function Founder() {
  return (
    <>
      <main className="p-4 md:flex">
        <div>
          <h4 className="text-4xl md:text-6xl font-bold text-teal-900">
            Our Founder
          </h4>
          <p className="text-xl font-semibold text-teal-900 pt-6 pb-2">
            Ms. SONALI KHADE
          </p>
          <p className="pb-2">Psychologist and Hypnotherapist.</p>
          <p className="indent-8 text-base/loose mb-24 md:md-4">
            Ms. Sonali Khade is a Psychologist and Hypnotherapist with extensive
            experience supporting the youth. Through personal and group
            counseling, mind power workshops, training programs, and
            psychological testing, she has empowered students and young
            professionals to overcome challenges and achieve their goals with
            compassion and expertise.{" "}
          </p>
        </div>

        <div className="md:w-[40vw] mb-12 md:md-3">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "40vh",
            }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={revealVariants}
              style={{
                width: "400px",
                height: "400px",
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <motion.img
                src={founder_img.src}
                alt="Revealed Photo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
