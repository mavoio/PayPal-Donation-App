"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { RiUserHeartLine, RiRocketLine, RiStackLine, RiLightbulbLine } from 'react-icons/ri';
import Preloader from './Preloader';
import DonationModal from './DonationModal';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />

      <section className="relative overflow-hidden bg-black">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#ffffff,transparent_70%)] opacity-[0.03]" />

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Left content */}
            <motion.div 
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 2.2 }}
                className="h-px w-24 bg-white mb-8 mx-auto lg:mx-0"
              />
              <h1 className="text-6xl lg:text-8xl font-bold mb-6 text-white tracking-tighter">
                Fund
                <span className="block mt-2">Creation</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl tracking-wide">
                Support independent innovation. Your contribution drives the future of creative development.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsDonationModalOpen(true)}
                className="px-12 py-5 rounded-full font-medium text-lg
                          bg-white text-black
                          flex items-center justify-center gap-3 mx-auto lg:mx-0
                          hover:bg-gray-100 transition-colors group"
              >
                Support Now
                <HiArrowRight className="text-xl transition-transform group-hover:translate-x-1" />
              </motion.button>
            </motion.div>

            {/* Right content - Stats grid */}
            <motion.div
              className="flex-1 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: "150+", label: "Backers", icon: RiUserHeartLine },
                  { number: "95%", label: "Success", icon: RiRocketLine },
                  { number: "10+", label: "Projects", icon: RiStackLine },
                  { number: "$25", label: "Avg Support", icon: RiLightbulbLine }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6 + (i * 0.1) }}
                    className="p-8 rounded-2xl border border-white/10 group hover:border-white/20 transition-colors"
                  >
                    <stat.icon className="text-2xl text-white/30 mb-4 group-hover:text-white/40 transition-colors" />
                    <h3 className="text-4xl font-bold text-white mb-2">{stat.number}</h3>
                    <p className="text-gray-500 font-medium tracking-wide">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
            className="mt-24 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { text: "Minimalist Design", icon: RiLightbulbLine },
                { text: "Rapid Development", icon: RiRocketLine },
                { text: "Modern Stack", icon: RiStackLine },
                { text: "Full Support", icon: RiUserHeartLine }
              ].map((feature, i) => (
                <div key={i} className="text-center group">
                  <feature.icon className="text-xl text-white/20 mb-2 mx-auto group-hover:text-white/30 transition-colors" />
                  <p className="text-sm text-gray-500 font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero; 