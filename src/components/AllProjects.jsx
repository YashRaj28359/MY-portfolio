import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projectsData";
import { ChevronLeft } from "lucide-react";

const AllProjects = () => {
  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-20">
      {/* Ambient Background Glow (Center) */}
      <div className="absolute top-1/2 left-1/2 w-[70vw] h-[50vh] bg-gray-500/30 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="max-w-7xl mx-auto relative z-10 px-6 md:px-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24"
        >
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-5xl md:text-6xl font-[f6] mb-4">All Projects.</h1>
          <p className="text-gray-400 font-[f3] text-lg max-w-2xl">
            A complete collection of all my projects showcasing my focus on aesthetic,
            performance, and clean code.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Reusable Project Card Component
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
    <Link to={`/project/${project.id}`} className="block text-inherit no-underline">
      <motion.div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
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

          {/* HOVER OVERLAY */}
          <motion.div
            style={{ translateZ: 70 }}
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-6 backdrop-blur-[2px]"
          >
            <div className="flex gap-6">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"
              >
                <Code2 className="w-6 h-6" />
              </a>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
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

export default AllProjects;
