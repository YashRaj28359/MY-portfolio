import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ExternalLink, Code2, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'Minimalist CMS',
    description: 'A headless CMS focused on providing the cleanest writing experience without distracting UI elements.',
    tags: ['React', 'Node.js'],
    link: '#',
    github: '#'
  },
  {
    title: 'Dark Mode Dashboard',
    description: 'Analytics dashboard tailored for developers, featuring high contrast data visualization and deep black themes.',
    tags: ['Next.js', 'Tailwind', 'Recharts'],
    link: '#',
    github: '#'
  },
  {
    title: 'Terminal Portfolio',
    description: 'A retro-inspired, fully functional mock terminal portfolio crafted exclusively with CSS and Vanilla JS.',
    tags: ['JavaScript', 'CSS', 'HTML'],
    link: '#',
    github: '#'
  },
  {
    title: 'Typeface Gallery',
    description: 'Curated collection of minimal typefaces for modern web design, built with a heavy horizontal scrolling layout.',
    tags: ['Framer Motion', 'React'],
    link: '#',
    github: '#'
  }
];

const Projects = () => {
  const scrollContainerRef = useRef(null);
  const isHoveredRef = useRef(false);

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

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: window.innerWidth < 768 ? 320 : 600, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -(window.innerWidth < 768 ? 320 : 600), behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-32 bg-dark-bg relative overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl font-[f6] mb-4">Selected Work.</h2>
            <p className="text-gray-400 font-[f3] text-lg max-w-md">
              A collection of projects showcasing my focus on aesthetic, performance, and clean code.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:block text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-colors border-b border-gray-800 hover:border-white pb-1 ml-4">
              View Archive
            </a>
          </div>
        </motion.div>

        {/* Native Infinite Smooth JS Scroll Wrapper */}
        <div 
          className="relative group"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 md:gap-12 px-6 md:px-12 py-8 no-scrollbar"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {loopingProjects.map((project, index) => (
              <ProjectCard key={project.title + index} project={project} index={index} />
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
  
  // Motion values for capturing mouse locally to the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation angles (subtle 3D tilt)
  const rotateX = useTransform(y, [-300, 300], [8, -8]);
  const rotateY = useTransform(x, [-300, 300], [-8, 8]);

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
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
      className="shrink-0 snap-center w-[85vw] md:w-[600px] lg:w-[700px] group relative perspective-1000"
    >
      <div className="w-full aspect-[16/10] md:aspect-[16/9] bg-[#0c0c0c] border border-border-subtle rounded-2xl overflow-hidden mb-8 relative flex items-center justify-center transition-all duration-500 ease-out group-hover:border-white/30 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CiAgPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPgogIDxwYXRoIGQ9Ik0wIDEwaDQwdjFINHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikiLz4KICA8cGF0aCBkPSJNMTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIi8+Cjwvc3ZnPg==')]">
        
        {/* Placeholder dramatic text */}
        <motion.span 
          style={{ translateZ: 50 }}
          className="text-gray-800 font-[f6] text-5xl md:text-7xl group-hover:text-gray-600 transition-colors uppercase tracking-widest opacity-30 select-none drop-shadow-xl"
        >
          {project.title.split(' ')[0]}
        </motion.span>
        
        {/* Overlay on hover */}
        <motion.div 
          style={{ translateZ: 70 }}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-6 backdrop-blur-[2px]"
        >
          <div className="flex gap-6">
            <a href={project.github} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform hover:shadow-lg hover:shadow-white/20">
              <Code2 className="w-6 h-6" />
            </a>
            <a href={project.link} className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform hover:shadow-lg hover:shadow-white/20">
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ translateZ: 30 }} className="px-2">
        <div className="flex gap-3 mb-4 flex-wrap">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs text-gray-400 uppercase tracking-wider font-[f1] border border-gray-800 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-[f5] mb-4 group-hover:text-white text-gray-300 transition-colors duration-300">{project.title}</h3>
        <p className="text-gray-500 font-[f3] text-lg leading-relaxed max-w-xl">
          {project.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
