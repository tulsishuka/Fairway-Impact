import React from "react";
import { motion } from "framer-motion";
const cards = [
  {
    id: 1,
    title: "Monthly Draw 🎲",
    desc: "Participate in monthly draws by submitting your numbers (1–45).",
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    title: "Prize Pool 💰",
    desc: "Win rewards based on matches. Jackpot winners earn the highest prize.",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Winning System 🏆",
    desc: "Match 3, 4, or 5 numbers to win rewards.",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    title: "Charity Impact ❤️",
    desc: "A portion of every entry goes directly to real-world charities.",
    color: "from-emerald-400 to-teal-500",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-[#050B3E]  bg-gradient-to-r from-white to-gray-400"
          >
            How It Works 🚀
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto"
          >
            A simple, transparent, and impactful way to play and give back.
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              {/* Animated Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 rounded-3xl`}></div>

              {/* Card Body */}
              <div className="h-full relative z-10 bg-[#050B3E] backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors shadow-2xl flex flex-col">
                
                {/* Step Badge */}
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-sm font-bold mb-6 shadow-lg`}>
                  {card.id}
                </div>

                <h2 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {card.title}
                </h2>

                <p className="text-gray-400 text-base leading-relaxed">
                  {card.desc}
                </p>

                {/* Decorative bottom line */}
                <div className={`mt-auto pt-6`}>
                    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${card.color} opacity-50`}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action or Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            Join thousands of players today
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;