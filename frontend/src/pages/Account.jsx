
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const pillars = [
  {
    id: 1,
    title: "Clean Water",
    metric: "42M",
    desc: "Liters of potable water provided to sub-Saharan communities this year.",
    iconColor: "text-[#3EE59D]",
    glow: "from-[#3EE59D]/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M12 21a7.5 7.5 0 007.5-7.5c0-4.5-7.5-12-7.5-12S4.5 9 4.5 13.5A7.5 7.5 0 0012 21z"
        />
      </svg>
    ),
  },

  {
    id: 2,
    title: "Education",
    metric: "12k",
    desc: "Digital learning devices deployed to rural schools across South East Asia.",
    iconColor: "text-[#6366F1]",
    glow: "from-[#6366F1]/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),
  },

  {
    id: 3,
    title: "Reforestation",
    metric: "850k",
    desc: "Trees planted in biodiverse hotspots to restore lost carbon sinks.",
    iconColor: "text-[#F4BF4F]",
    glow: "from-[#F4BF4F]/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 11l7-7 7 7M7 16l5-5 5 5M12 16v5"
        />
      </svg>
    ),
  },

  {
    id: 4,
    title: "Medical Aid",
    metric: "$1.2M",
    desc: "Direct funding for critical surgeries and medical supplies in conflict zones.",
    iconColor: "text-[#ED6A5E]",
    glow: "from-[#ED6A5E]/20",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

/* WORD ANIMATION */

const titleWords = ["Global", "Accountability"];

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
    y: 30,
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

const Account = () => {
  return (
    <div className="bg-[#090F0C] text-white py-24 px-6 relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-40 left-20 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">

          <div className="max-w-xl space-y-4">

            {/* WORD BY WORD TITLE */}
            <motion.h2
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-white flex gap-4 flex-wrap"
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordAnimation}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>

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
                delay: 0.2,
              }}
              className="text-gray-400 text-sm md:text-base font-normal leading-relaxed"
            >
              We track the kinetic energy of your game and transform it into measurable
              outcomes across four primary pillars.
            </motion.p>
          </div>

          {/* LINK */}
          <motion.a
            href="#report"
            initial={{
              opacity: 0,
              x: 30,
              filter: "blur(10px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: false }}
            transition={{
              duration: 0.8,
            }}
            whileHover={{
              x: 6,
            }}
            className="text-xs font-bold text-[#3EE59D] tracking-wider uppercase inline-flex items-center gap-1.5 hover:underline whitespace-nowrap self-start md:self-auto"
          >
            Explore Full Report <span className="text-sm">→</span>
          </motion.a>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {pillars.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 40,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              className=" border border-[#1E2521] rounded-2xl p-7 flex flex-col items-start justify-between min-h-[260px] shadow-lg hover:border-sky-400/20 transition-all relative overflow-hidden backdrop-blur-xl"
            >

              {/* CARD GLOW */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute inset-0 bg-gradient-to-br ${item.glow} via-transparent to-transparent`}
              />

              {/* FLOATING LIGHT */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-sky-400/10 rounded-full blur-3xl"
              />

              {/* ICON */}
              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`${item.iconColor} mb-6 relative z-10`}
              >
                {item.icon}
              </motion.div>

              {/* CONTENT */}
              <div className="w-full space-y-2 mt-auto relative z-10">

                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                  }}
                  className="text-gray-400 font-bold text-base block tracking-wide"
                >
                  {item.title}
                </motion.span>

                <motion.span
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    filter: "blur(10px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                  }}
                  className="text-3xl font-black text-white block tracking-tight"
                >
                  {item.metric}
                </motion.span>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                    filter: "blur(8px)",
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
                  className="text-gray-500 text-xs leading-relaxed font-normal pt-2"
                >
                  {item.desc}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;