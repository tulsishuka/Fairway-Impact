import React from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import About from "../pages/About";
import Impact from "../pages/impact";
import Account from "../pages/Account";
import Footer from "../layouts/Footer";

/* ---------------- HEADING ANIMATION ---------------- */

const sentence = ["Golf", "Rewards."];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",

    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-[#090F0C] relative overflow-hidden text-white font-sans flex items-center">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#123E25] via-[#0B2216] to-transparent opacity-70 blur-[120px] pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto px-6 py-20 md:py-32 w-full">

          {/* LEFT SECTION */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-5 max-w-xl"
          >

            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              viewport={{ once: false }}
              className="flex items-center gap-2 bg-[#161D19] px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#4AE39D] uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-[#4AE39D] animate-pulse"></span>
              Live Tournament Rewards
            </motion.div>

            {/* HEADING */}
            <motion.h1
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] flex flex-wrap gap-x-4"
            >
              {sentence.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}

              <motion.span
                variants={wordAnimation}
                className="block w-full bg-gradient-to-r from-[#39E596] to-[#2B82F6] bg-clip-text text-transparent"
              >
                Redefined.
              </motion.span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                delay: 0.3,
              }}
              viewport={{ once: false }}
              className="text-base md:text-lg text-gray-400 font-normal leading-relaxed mt-2"
            >
              Experience the first high-stakes digital ecosystem where
              performance drives impact. Track every stroke and turn your
              handicap into humanitarian aid.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              viewport={{ once: false }}
              className="flex flex-wrap gap-4 mt-4 w-full sm:w-auto"
            >
              <button
                onClick={() => navigate("/signup")}
                className="px-7 py-3 bg-[#3EE59D] text-[#444746] rounded-xl font-bold hover:bg-[#32c988] transition-colors shadow-[0_4px_20px_rgba(62,229,157,0.2)] text-sm md:text-base"
              >
                Enter the Fairway
              </button>

              <button
                onClick={() => navigate("/live-impact")}
                className="px-7 py-3.5 bg-[#161C19] text-gray-300 rounded-xl font-semibold hover:bg-[#202924] hover:text-white transition-colors text-sm md:text-base"
              >
                View Live Impact
              </button>
            </motion.div>
          </motion.section>

          {/* RIGHT SECTION */}
          <motion.section
            initial={{
              opacity: 0,
              x: 80,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1,
            }}
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center lg:justify-end items-center w-full"
          >

            {/* FLOATING CARD */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-[520px] bg-[#000000] rounded-2xl p-6 shadow-2xl backdrop-blur-md relative"
            >

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ED6A5E]" />
                  <span className="w-3 h-3 rounded-full bg-[#F4BF4F]" />
                  <span className="w-3 h-3 rounded-full bg-[#61C554]" />
                </div>

                <span className="text-xs font-semibold text-gray-400 tracking-wide">
                  Live Scoreboard
                </span>
              </div>

              {/* PROFILE */}
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="border border-[#29352F] rounded-xl p-4 flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#2DD4BF]" />

                  <div>
                    <h3 className="font-bold text-white text-base">
                      Alex Rivera
                    </h3>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Handicap: 4.2
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-bold text-[#3EE59D] block">
                    -2
                  </span>

                  <span className="text-[10px] text-gray-400 tracking-wider uppercase">
                    + $420 Impact
                  </span>
                </div>
              </motion.div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-4 mb-6">

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="border border-[#29352F] rounded-xl p-4"
                >
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1">
                    Impact Tokens
                  </span>

                  <span className="text-2xl font-black text-[#fc8f89] tracking-wide">
                    12,450
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -5,
                  }}
                  className="border border-[#29352F] rounded-xl p-4"
                >
                  <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1">
                    Global Rank
                  </span>

                  <span className="text-2xl font-black text-[#71a999] tracking-wide">
                    #142
                  </span>
                </motion.div>
              </div>

              {/* PROGRESS */}
              <motion.div
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                whileInView={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1,
                }}
                viewport={{ once: false }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">
                    Community Goal
                  </span>

                  <span className="text-gray-400 font-bold">
                    84%
                  </span>
                </div>

                <div className="w-full bg-[#111613] h-2 rounded-full overflow-hidden p-[2px] border border-[#222A26]">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: "84%",
                    }}
                    transition={{
                      duration: 1.5,
                    }}
                    viewport={{ once: false }}
                    className="bg-gradient-to-r from-[#39E596] to-[#2B82F6] h-full rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>
      </div>

      <About />
      <Impact />
      <Account />
      <Footer />
    </>
  );
};

export default Home;