import React, { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroImage from '../assets/compGlass.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4 md:px-12 bg-white text-white">
      
      {/* Large rounded Image Container with Lightning Border */}
      <div className="relative w-full max-w-8xl h-[85vh] min-h-[600px] rounded-[3rem] overflow-hidden flex items-center shadow-2xl lightning-border">
        
        {/* The Image itself - placed to prioritize the face on the right, dark area on left */}
        {/* The Image itself - placed to prioritize the face on the right, dark area on left */}
        <img 
          src={heroImage} 
          alt="Yash Raj Singh" 
          className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-[50%_50%] lg:object-center contrast-125 brightness-75 md:brightness-110 saturate-105 [image-rendering:high-quality]"
        />

        {/* Content overlaid on the left darker side */}
        <div className="relative z-10 w-full max-w-3xl px-8 md:px-20 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs text-white border border-white/40 rounded-full uppercase tracking-widest font-[f1] bg-black/20 backdrop-blur-sm"
          >
            Available for work
          </motion.div>
          
          {/* User Name added here */}
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xl md:text-3xl text-gray-300 font-[f1] mb-2 tracking-wide uppercase"
          >
            I am Yash Raj Singh.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-[f6] leading-[1.05] mb-8 flex flex-col items-start select-none cursor-default"
          >
            {/* Interactive animated heading words */}
            <div className="inline-flex pb-2">
              <motion.span whileHover={{ y: -10, color: "#60a5fa", scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="inline-block transition-colors duration-300 mr-4">Building</motion.span>
            </div>
            <div className="inline-flex pb-2">
              <motion.span whileHover={{ y: -10, color: "#facc15", scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="inline-block transition-colors duration-300 text-gray-300 mr-4">digital</motion.span>
            </div>
            <div className="inline-flex pb-2">
              <motion.span whileHover={{ y: -10, color: "#34d399", scale: 1 }} transition={{ type: "spring", stiffness: 300 }} className="inline-block transition-colors duration-300 mr-4">experiences.</motion.span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <a href="#projects" className="group flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-[f4] hover:bg-gray-200 transition-transform hover:scale-105 duration-300">
              View Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-6 py-3 text-white font-[f4] hover:text-gray-300 transition-colors uppercase tracking-wider text-sm">
              Contact Me
            </a>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
