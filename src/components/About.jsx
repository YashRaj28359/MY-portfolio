import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [isFrontend, setIsFrontend] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const loopInterval = setInterval(() => {
      // Trigger glitch start
      setIsGlitching(true);
      
      // Swap text purely halfway through the glitch
      setTimeout(() => {
        setIsFrontend(prev => !prev);
      }, 100); 

      // End glitch
      setTimeout(() => {
        setIsGlitching(false);
      }, 300);
      
    }, 3500); // Swap every 3.5 seconds

    return () => clearInterval(loopInterval);
  }, []);

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-dark-bg relative border-b border-border-subtle overflow-hidden">
      {/* Ambient Background Glow (Upper Left) */}
      <div className="absolute top-0 left-0 w-[50vw] h-[50vh] bg-gray-500/30 rounded-full blur-[120px] pointer-events-none -translate-x-1/4 -translate-y-1/4 z-0" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
        
        {/* Left Side: Large Impact Text */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h2 className="text-sm text-gray-500 font-[f1] uppercase tracking-[0.3em] mb-10">Background</h2>
          <p className="text-3xl md:text-5xl font-[f5] leading-snug tracking-tight text-gray-300">
            A <span className="text-white font-[f6]">2025 BCA graduate</span> specializing in highly interactive <br className="hidden md:block" />
            <span className={`inline-block font-[f6] text-white ${isGlitching ? 'glitch-active' : ''}`}>
              {isFrontend ? 'Frontend Development.' : 'UI Design.'}
            </span>
          </p>
        </motion.div>

        {/* Right Side: Professional Summary & Details */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <p className="text-gray-400 font-[f3] text-lg leading-relaxed mb-10">
            Fresh out of my Bachelor of Computer Applications program, my core focus revolves around bridging the gap between design and solid engineering. 
            While I am at the beginning of my professional software career, I bring a highly versatile creative edge. Beyond coding, I have a strong practical foundation in <span className="text-white">photo editing, video editing, UI design, and marketing poster creation</span>. 
            <br /> <br />
            This multi-disciplinary skill set allows me to not only write exceptionally clean code, but to also intuitively understand aesthetics, user flows, and brand marketing. I am actively seeking opportunities where I can leverage both my technical drive and creative background to build premium digital experiences.
          </p>

          <div className="grid grid-cols-2 gap-8 border-t border-gray-800 pt-10">
            <div>
              <div className="text-xs text-gray-500 font-[f1] uppercase tracking-widest mb-2">Degree</div>
              <div className="text-xl text-white font-[f5]">BCA</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-[f1] uppercase tracking-widest mb-2">Class Of</div>
              <div className="text-xl text-white font-[f5]">2025</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-[f1] uppercase tracking-widest mb-2">Availability</div>
              <div className="text-lg text-white font-[f5] flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Open to Work
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 font-[f1] uppercase tracking-widest mb-2">Target Roles</div>
              <div className="text-lg text-white font-[f5]">Frontend Engineer</div>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default About;
