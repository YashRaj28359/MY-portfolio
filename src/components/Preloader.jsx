import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Count up to 100 noticeably slower for dramatic effect
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600); // 0.6s delay at 100% to let users process the completion
          return 100;
        }
        
        // Randomly increment by 1 to 4 to mimic true, slower loading steps
        return Math.min(prev + Math.floor(Math.random() * 4) + 1, 100);
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex flex-col pointer-events-none"
      exit={{ opacity: 0, transition: { duration: 0, delay: 1 } }} // Delays removing wrapper from DOM until doors finish sliding
    >
      
      {/* Top Door */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-50vh" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
        className="w-full h-[50vh] bg-[#050505] flex flex-col items-center justify-end pb-8"
      >
        {/* Minimal aesthetic loader text - much smaller now! */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-[f6] font-bold tracking-widest text-white relative flex items-center justify-center"
        >
          {progress} <span className="text-sm md:text-base text-gray-500 ml-1">%</span>
        </motion.div>
      </motion.div>

      {/* The Central Full-Screen Loading Bar */}
      <motion.div 
        exit={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 origin-center"
      >
        <motion.div 
          className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </motion.div>

      {/* Bottom Door */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "50vh" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} 
        className="w-full h-[50vh] bg-[#050505]"
      />
      
    </motion.div>
  );
};

export default Preloader;
