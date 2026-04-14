import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  // We use Framer Motion's useSpring to create the beautifully smooth lagging trailer effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(-100, springConfig);
  const cursorYSpring = useSpring(-100, springConfig);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update spring trailers
      cursorXSpring.set(e.clientX);
      cursorYSpring.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements to scale up the cursor
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') !== null ||
        e.target.closest('button') !== null
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorXSpring, cursorYSpring]);

  return (
    <>
      {/* Center solid precision dot (no delay, exact pointer coordination) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference hidden md:block" // mix-blend helps visibility on both white and black sections
        animate={{
          x: mousePosition.x - 4, // 4 = half of 8px width
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1, // Shrink to center when hovering link
          opacity: 1
        }}
        transition={{ type: "tween", duration: 0 }} // Intentionally 0 lag for true pointer mapping
      />

      {/* Original crisp trailing boundary ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white z-[9999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)'
        }}
      />
    </>
  );
};

export default CustomCursor;
