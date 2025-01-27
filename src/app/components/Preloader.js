"use client";
import { motion } from "framer-motion";
import { RiCodeLine } from 'react-icons/ri';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 0.8, 1]
            }}
            transition={{
              rotate: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            <RiCodeLine className="text-2xl text-white/40" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 0.5, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-16 h-16 rounded-full border border-white/10"
        />
      </motion.div>
    </div>
  );
};

export default Preloader; 