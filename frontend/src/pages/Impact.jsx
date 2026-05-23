
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Impact = () => {
  return (
    <div className="bg-[#090F0C] text-white py-16 px-4 md:px-8 relative overflow-hidden">

      {/* SKY BLUE GLOW BACKGROUND */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/20 rounded-full blur-[180px] pointer-events-none"
      />

      {/* SECONDARY GLOW */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* MAIN CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            filter: "blur(15px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            duration: 1,
          }}
          animate={{
            y: [0, -8, 0],
          }}
          className="w-full bg-[#131815]/90 border border-[#1C221E] rounded-[32px] px-6 py-16 md:py-20 text-center flex flex-col items-center justify-center shadow-[0_0_80px_rgba(56,189,248,0.12)] backdrop-blur-xl relative overflow-hidden"
        >

          {/* INNER SKY LIGHT */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-cyan-400/5 pointer-events-none" />

          {/* Animated Border Glow */}
          <motion.div
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-[32px] border border-sky-400/20"
          />

          {/* TOP LABEL */}
          <motion.span
            initial={{
              opacity: 0,
              y: 15,
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: false }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="text-[10px] md:text-xs font-bold text-sky-200 tracking-[0.2em] uppercase mb-4 relative z-10"
          >
            Total Impact Jackpot
          </motion.span>

          {/* AMOUNT */}
          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(15px)",
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            viewport={{ once: false }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            animate={{
              textShadow: [
                "0 0 20px rgba(125,211,252,0.2)",
                "0 0 45px rgba(125,211,252,0.6)",
                "0 0 20px rgba(125,211,252,0.2)",
              ],
            }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-sky-300 select-none mb-6 relative z-10"
          >
            $2,458,920
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: false }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
            className="text-gray-400 text-sm md:text-base font-normal max-w-xl mx-auto leading-relaxed mb-12 px-2 relative z-10"
          >
            Accumulated wealth ready for distribution to our global charity
            partners in the current cycle.
          </motion.p>

          {/* STATS */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: false }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="flex items-center justify-center gap-10 md:gap-14 w-full max-w-md border-t border-gray-800/40 pt-8 relative z-10"
          >

            {/* LEFT */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className="text-left md:text-center space-y-1"
            >
              <span className="text-[9px] md:text-[10px] font-bold text-gray-500 tracking-wider uppercase block">
                Current Participants
              </span>

              <span className="text-xl md:text-2xl font-bold text-white tracking-wide">
                14,204
              </span>
            </motion.div>

            {/* DIVIDER */}
            <div className="h-10 w-[1px] bg-gray-800" />

            {/* RIGHT */}
            <motion.div
              whileHover={{
                y: -5,
              }}
              className="text-left md:text-center space-y-1"
            >
              <span className="text-[9px] md:text-[10px] font-bold text-gray-500 tracking-wider uppercase block">
                Time to Distribution
              </span>

              <motion.span
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="text-xl md:text-2xl font-bold text-white tracking-wider font-mono block"
              >
                12:04:55
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Impact;