import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#090F0C] text-white pt-16 pb-12 px-6 relative overflow-hidden ">
      <div className="max-w-7xl mx-auto">
        
        {/* Upper Call To Action Card Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full border-t border-[#161C19] bg-[#161D19] rounded-[32px] p-8 md:p-16 text-center flex flex-col items-center justify-center shadow-2xl mb-24"
        >
          {/* Main Title */}
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Ready to Elevate Your Impact?
          </h2>

          {/* Subtext description */}
          <p className="text-[#A0D1B8] text-xs md:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            Join the private beta of Fairway Impact and start competing in exclusive 
            premium tournaments with 10x impact multipliers.
          </p>

          {/* Button & Counter Line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            <button className="px-6 py-3 bg-[#3EE59D] text-[#050E0A] rounded-xl font-bold hover:bg-[#32c988] transition-colors text-sm md:text-base whitespace-nowrap">
              Join the Elite
            </button>
            <span className="text-xs text-[#A0D1B8] font-medium tracking-wide">
              Limit 500 spots remaining.
            </span>
          </div>
        </motion.div>

        {/* Lower Navigation Links Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 pb-12 ">
          
          {/* Brand Info Column */}
          <div className="md:col-span-6 space-y-4 max-w-sm">
            <h3 className="text-lg font-bold tracking-wide text-[#3EE59D]">
              Fairway Impact
            </h3>
            <p className="text-[#A0D1B8] text-xs leading-relaxed font-normal">
              Cinematic Precision in Charity. We are transforming the world's most exclusive 
              sport into its most powerful tool for social good.
            </p>
          </div>

          {/* Right Links Grid Block */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:justify-items-end w-full">
            
            {/* Platform links */}
            <div className="space-y-3.5">
              <span className="text-[10px] font-bold text-white tracking-widest uppercase block mb-1">
                Platform
              </span>
              <ul className="space-y-2 text-xs font-medium text-[#A0D1B8]">
                <li><a href="#how-it-works" className="hover:text-[#3EE59D] transition-colors">How It Works</a></li>
                <li><a href="#partners" className="hover:text-[#3EE59D] transition-colors">Impact Partners</a></li>
                <li><a href="#leaderboards" className="hover:text-[#3EE59D] transition-colors">Leaderboards</a></li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="space-y-3.5 md:pr-12">
              <span className="text-[10px] font-bold text-white tracking-widest uppercase block mb-1">
                Company
              </span>
              <ul className="space-y-2 text-xs font-medium text-[#A0D1B8]">
                <li><a href="#privacy" className="hover:text-[#3EE59D] transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-[#3EE59D] transition-colors">Terms of Service</a></li>
                <li><a href="#contact" className="hover:text-[#3EE59D] transition-colors">Contact</a></li>
              </ul>
            </div>

          </div>
        </div>

      
          
         

      </div>
    </footer>
  );
};

export default Footer;