import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ExternalLink, Code2, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { projects } from "../data/projectsData";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const project = projects.find(p => p.id === projectId);

  // Scroll to top when component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-[f6] mb-4 text-white">Project Not Found</h1>
          <Link to="/all-projects" className="text-blue-400 hover:text-blue-300">
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-dark-bg min-h-screen pt-32 pb-20">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 w-[70vw] h-[50vh] bg-gray-500/30 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0" />

      <div className="max-w-6xl mx-auto relative z-10 px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            to="/all-projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-[f6] mb-4 text-white">{project.title}</h1>
              <p className="text-gray-400 font-[f3] text-lg max-w-2xl">{project.description}</p>
            </div>
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
              >
                <Code2 className="w-6 h-6" />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex gap-3 mb-12 flex-wrap"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400 uppercase tracking-wider font-[f1] border border-gray-800 px-4 py-2 rounded-full hover:border-white/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Images Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="mb-6">
            <img
              src={project.images[selectedImageIndex]}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="w-full aspect-video object-cover rounded-2xl border border-border-subtle"
            />
          </div>
          
          {/* Navigation and Image Thumbnails */}
          {project.images.length > 1 && (
            <div className="space-y-4">
              {/* Navigation Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))}
                  className="p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white hover:text-black transition-all"
                  title="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 text-sm">
                  {selectedImageIndex + 1} / {project.images.length}
                </span>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))}
                  className="p-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white hover:text-black transition-all"
                  title="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Image Thumbnails */}
              <div className="flex gap-4 overflow-x-auto">
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-white"
                        : "border-gray-700 hover:border-gray-500"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Detailed Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-400 font-[f3] leading-relaxed whitespace-pre-wrap text-lg">
                {project.detailedContent}
              </div>
            </div>
          </div>

          {/* Quick Links Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Live Preview */}
              {project.livePreview && project.livePreview !== "#" && (
                <a
                  href={project.livePreview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-[f5]">Live Preview</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-500 text-sm">View live project</p>
                </a>
              )}

              {/* Source Code */}
              {project.sourceCode && project.sourceCode !== "#" && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-[f5]">Source Code</h3>
                    <Code2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-gray-500 text-sm">View on GitHub</p>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Challenges & Learnings */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => setExpandedSection(expandedSection === "challenges" ? null : "challenges")}
              className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all mb-4"
            >
              <h3 className="text-2xl font-[f5] text-white">Challenges</h3>
              {expandedSection === "challenges" ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSection === "challenges" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {project.challenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-[f3]"
                  >
                    • {challenge}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* Learnings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={() => setExpandedSection(expandedSection === "learnings" ? null : "learnings")}
              className="w-full flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all mb-4"
            >
              <h3 className="text-2xl font-[f5] text-white">Key Learnings</h3>
              {expandedSection === "learnings" ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedSection === "learnings" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {project.learnings.map((learning, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 border border-white/10 rounded-xl text-gray-300 font-[f3]"
                  >
                    • {learning}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Navigation to other projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-[f5] text-white">Explore More</h3>
            <Link
              to="/all-projects"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              View All Projects
              <ChevronLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
