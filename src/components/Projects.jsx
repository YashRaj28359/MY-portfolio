import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";

const Projects = () => {
  const scrollContainerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const touchStartXRef = useRef(0);
  const touchStartTimeRef = useRef(0);

  // We duplicate the project array infinitely so it can scroll forever
  const loopingProjects = [...projects, ...projects, ...projects];

  // Auto-scrolling infinite loop using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const playLoop = () => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer && !isHoveredRef.current) {
        // Slow programmatic scroll
        scrollContainer.scrollLeft += 1;

        // If we reach the end of the seamless first chunk, snap back to 0 completely undectable!
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(playLoop);
    };

    animationFrameId = requestAnimationFrame(playLoop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartTimeRef.current = Date.now();
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTimeRef.current;
    const swipeDistance = touchStartXRef.current - touchEndX;
    const swipeThreshold = 50; // Minimum distance to trigger a swipe
    const swipeVelocity = swipeDistance / touchDuration; // pixels per millisecond

    // Swipe left (next) or Swipe right (prev) with velocity consideration
    if (Math.abs(swipeDistance) > swipeThreshold || Math.abs(swipeVelocity) > 0.5) {
      if (swipeDistance > 0) {
        // Swiped left - show next
        scrollNext();
      } else {
        // Swiped right - show previous
        scrollPrev();
      }
    }
  };

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: window.innerWidth < 768 ? 320 : 600,
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -(window.innerWidth < 768 ? 320 : 600),
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="projects"
      className="py-32 bg-dark-bg relative overflow-hidden"
    >
      {/* Ambient Background Glow (Center) */}
      <div className="absolute top-1/2 left-1/2 w-[70vw] h-[50vh] bg-gray-500/30 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="max-w-[100vw] relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-12 max-w-7xl mx-auto gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-[f6] mb-4">
              Selected Work.
            </h2>
            <p className="text-gray-400 font-[f3] text-lg max-w-md">
              A collection of projects showcasing my focus on aesthetic,
              performance, and clean code.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/all-projects"
              className="hidden md:block text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-gray-800 hover:border-white pb-1 ml-4"
            >
              See All Projects
            </Link>
          </div>
        </motion.div>

        {/* Native Infinite Smooth JS Scroll Wrapper */}
        <div
          className="relative group"
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
        >
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 md:gap-12 px-6 md:px-12 py-8 no-scrollbar"
            style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {loopingProjects.map((project, index) => (
              <ProjectCard
                key={project.title + index}
                project={project}
                index={index}
              />
            ))}
          </div>

          {/* Overlaid Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 md:left-6 top-[40%] -translate-y-1/2 p-4 md:p-5 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 z-50 shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-2 md:right-6 top-[40%] -translate-y-1/2 p-4 md:p-5 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-full hover:bg-white hover:text-black hover:scale-110 transition-all duration-300 z-50 shadow-[0_0_30px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

// Extracted interactive 3D Card Component
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const rectRef = useRef(null);

  // Motion values for capturing mouse locally to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation angles (subtle 3D tilt)
  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (event) => {
    if (!rectRef.current) {
      rectRef.current = cardRef.current ? cardRef.current.getBoundingClientRect() : null;
    }
    if (!rectRef.current) return;
    const rect = rectRef.current;
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <Link to={`/project/${project.id}`} className="shrink-0 snap-center w-[85vw] md:w-[600px] lg:w-[700px] block text-inherit no-underline">
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="group relative perspective-1000 cursor-pointer"
      >
        <div className="w-full aspect-[16/10] md:aspect-[16/9] border border-border-subtle rounded-2xl overflow-hidden mb-8 relative group">

    {/* IMAGE */}
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
    />

    {/* HOVER OVERLAY (your existing UI kept safe) */}
    <motion.div
      style={{ translateZ: 70 }}
      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6"
    >
    </motion.div>

  </div>

        <motion.div style={{ translateZ: 30 }} className="px-2">
          <div className="flex gap-3 mb-4 flex-wrap">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-400 uppercase tracking-wider font-[f1] border border-gray-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-3xl font-[f5] mb-4 group-hover:text-white text-gray-300 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-500 font-[f3] text-lg leading-relaxed max-w-xl">
            {project.description}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default Projects;
