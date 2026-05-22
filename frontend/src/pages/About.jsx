
import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const workflowItems = [
  {
    id: 1,
    title: "Sync Performance",
    desc: "Connect your existing scorecards and wearable tech to our unified impact engine.",
    icon: (
      <svg
        className="w-6 h-6 text-[#3EE59D]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 21V3m0 2h14l-4 4 4 4H5"
        />
      </svg>
    ),
    iconBg: "bg-[#14291D] border-[#224A34]",
  },

  {
    id: 2,
    title: "Earn Impact",
    desc: "Convert birdies, eagles, and participation into proprietary Impact Tokens with real-world value.",
    icon: (
      <svg
        className="w-6 h-6 text-[#6366F1]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    iconBg: "bg-[#1A1C2E] border-[#2E3152]",
  },

  {
    id: 3,
    title: "Drive Change",
    desc: "Direct your earnings to vetted global charities through our transparent distribution network.",
    icon: (
      <svg
        className="w-6 h-6 text-[#F4BF4F]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    iconBg: "bg-[#2B2416] border-[#4A3D22]",
  },
];

/* ---------------- WORD ANIMATION ---------------- */

const headingWords = ["Precision", "Flow"];

const headingContainer = {
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

const About = () => {
  return (
    <div className="bg-[#090F0C] text-white py-24 px-6 relative overflow-hidden ">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20 space-y-4">

          {/* WORD BY WORD HEADING */}
          <motion.h2
            variants={headingContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white flex justify-center gap-4 flex-wrap"
          >
            {headingWords.map((word, index) => (
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
            viewport={{ once: false, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-normal leading-relaxed"
          >
            A seamless integration of sport and philanthropy, powered by cinematic technology.
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 text-center">

          {workflowItems.map((item, index) => (
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
                delay: index * 0.2,
              }}
              whileHover={{
                y: -8,
              }}
              className="flex flex-col items-center group"
            >

              {/* ICON */}
              <motion.div
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 0.3,
                }}
                className={`w-14 h-14 rounded-xl flex items-center justify-center border backdrop-blur-sm mb-6 shadow-md ${item.iconBg}`}
              >
                {item.icon}
              </motion.div>

              {/* TITLE WORD BY WORD */}
              <motion.h3
                variants={headingContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.6 }}
                className="text-xl font-bold tracking-wide text-white mb-3 flex flex-wrap justify-center gap-2"
              >
                {item.title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    variants={wordAnimation}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h3>

              {/* DESCRIPTION */}
              <motion.p
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
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xs font-normal"
              >
                {item.desc}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;