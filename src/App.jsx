import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Specifically for the Hero Parallax sliding left effect
  const heroX = useTransform(scrollY, [0, window.innerHeight || 800], ["0%", "-30%"]);
  const heroOpacity = useTransform(scrollY, [0, window.innerHeight || 800], [1, 0.2]);

  // Setup smooth scrolling for anchor links and handle Preloader body lock
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check mobile state for selective animations
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('resize', checkMobile);
    };
  }, [isLoading]);

  return (
    <div className="bg-dark-bg min-h-screen text-white font-[f4]">
      {/* 
        AnimatePresence perfectly handles the out-animation 
        of the Preloader right before revealing the app 
      */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* The new majestic smooth cursor */}
      <CustomCursor />
      
      {/* Top progress bar indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]" 
        style={{ scaleX }} 
      />
      
      <Navbar />
      <main className="relative bg-dark-bg">
        {/* Sticky Hero Container - stays at true 0 while rest of content scrolls over it (DESKTOP ONLY) */}
        <div className="relative md:sticky top-0 h-screen w-full overflow-hidden z-0 bg-white">
          <motion.div 
            style={isMobile ? { opacity: heroOpacity } : { x: heroX, opacity: heroOpacity }} 
            className="h-full w-full"
          >
            <Hero />
          </motion.div>
        </div>
        
        {/* The rest of the page slides exactly OVER the sticky hero above */}
        <div className="relative z-10 w-full bg-dark-bg shadow-[0_-30px_50px_rgba(0,0,0,0.8)] border-t border-white/10">
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default App;
