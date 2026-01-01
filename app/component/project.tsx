// components/ProjectsSection.tsx
"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaArrowRight,
  FaDownload,
  FaStar,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFirebase,
  SiFramer,
} from "react-icons/si";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  // FIX APPLIED HERE:
  technologies: { name: string; icon: React.ReactElement }[]; // Use React.ReactElement
  image: string;
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress";
}

export default function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const [activeFilter, setActiveFilter] = useState("all");

  const projects: Project[] = [
    {
      id: 1,
      title: "Easy Buy Silk",
      description:
        "A modern e-commerce platform built with Next.js, offering a seamless shopping experience for silk fabric enthusiasts with responsive design and intuitive user interface.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" /> },
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      ],
      image: "/project1.png",
      liveUrl: "https://easy-buy-silk.vercel.app/",
      featured: false,
      status: "completed",
    },
    {
      id: 2,
      title: "Bloggy - Modern Blog Platform",
      description:
        "A sleek blog platform built with Next.js and Firebase, featuring real-time content updates, user authentication, and a clean, modern writing interface.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" /> },
        { name: "Firebase", icon: <SiFirebase className="w-5 h-5" /> },
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      ],
      image: "/project2.png",
      liveUrl: "https://bloggy-ebon.vercel.app/",
      featured: false,
      status: "completed",
    },
    {
      id: 3,
      title: "StudyHelp Platform",
      description:
        "Built the entire frontend of the StudyHelp platform. Worked closely with a backend developer to connect UI to server functionality. Implemented dashboards, features, and interactions for both students and teachers.",
      technologies: [
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
        { name: "Framer", icon: <SiFramer className="w-5 h-5" /> },
      ],
      image: "/project3.png",
      liveUrl: "https://studyhub-seven-eta.vercel.app/",
      featured: true,
      status: "completed",
    },
    {
      id: 4,
      title: "ScoreUpRiseUp Funnel Site",
      description:
        "Designed the web flow and complete visual structure of the funnel site for an educational platform, focusing on conversion optimization and user journey.",
      technologies: [
        { name: "Next.js", icon: <SiNextdotjs className="w-5 h-5" /> },
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      ],
      image: "/project4.png",
      liveUrl: "https://apply.scoreupriseup.com/",
      featured: false,
      status: "completed",
    },
    {
      id: 5,
      title: "ashly Nicole Productions",
      description:
        "Designed and implemented the landing page for a movie production company with cinematic visuals, smooth animations, and responsive design.",
      technologies: [
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "Framer", icon: <SiFramer className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      ],
      image: "/project5.png",
      liveUrl: "https://ashly-production-5dh9.vercel.app/",
      featured: false,
      status: "completed",
    },
    {
      id: 6,
      title: "Body of Christ Ministry",
      description:
        "Beautiful responsive website for a Christian ministry focused on teaching, apologetics, and outreach. Implemented smooth animations and accessible design.",
      technologies: [
        { name: "React", icon: <SiReact className="w-5 h-5" /> },
        { name: "Framer", icon: <SiFramer className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" /> },
      ],
      image: "/project6.png",
      liveUrl: "https://body-of-christ.vercel.app/",
      featured: false,
      status: "completed",
    },
    
  ];

  const filters = [
    { id: "all", name: "All Projects", count: projects.length },
    {
      id: "featured",
      name: "Featured",
      count: projects.filter((p) => p.featured).length,
    },
    {
      id: "completed",
      name: "Completed",
      count: projects.filter((p) => p.status === "completed").length,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "featured") return project.featured;
    if (activeFilter === "completed") return project.status === "completed";
    return true;
  });

  // FIX: Applied 'as const' to resolve Framer Motion Variants type mismatch (Error 2322)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  } as const;

  // FIX: Applied 'as const' to resolve Framer Motion Variants type mismatch (Error 2322)
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      // The inner transition object within the variant is the root cause
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  } as const;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-40 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 -right-40 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(90deg,#fff_1px,transparent_1px),linear-gradient(180deg,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 tracking-wide">
              MY WORK
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Featured </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-[length:200%_auto] animate-gradient">
              Projects
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            A collection of modern web applications built with cutting-edge
            frontend technologies
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`relative px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-2xl shadow-purple-500/30"
                  : "bg-white/5 border border-white/10 text-gray-300 hover:border-white/20 hover:text-white"
              }`}
            >
              <span>{filter.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  activeFilter === filter.id ? "bg-white/20" : "bg-white/10"
                }`}
              >
                {filter.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`group relative rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10 ${
                  project.featured
                    ? "bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
                    : "bg-gradient-to-b from-white/5 to-white/0"
                }`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-xs font-semibold">
                      <FaStar className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full h-64">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Add this for better performance and to suppress Next.js warnings
                    priority={project.featured} 
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3"
                    >
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-black font-semibold text-sm"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </motion.a>

                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white font-semibold text-sm"
                        >
                          <FaGithub />
                          Code
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => ( // Removed unused 'idx'
                      <div
                        key={tech.name}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
                      >
                        {tech.icon}
                        <span className="text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    View Project Details
                    <FaArrowRight className="w-3 h-3" />
                  </motion.a>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 via-transparent to-cyan-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-12"
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-white">Ready to bring your </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                ideas to life?
              </span>
            </h3>

            <p className="text-gray-400 text-lg mb-10">
              Let's collaborate on your next project and create something amazing
              together.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start a Project
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1UGutRaop1QsSejHBbkGF_l4ykm7LlkAO/view?usp=sharing"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-white rounded-full font-semibold border-2 border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Download CV
                  <FaDownload className="w-5 h-5" />
                </span>
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/10"
            >
              {[
                { value: projects.length, label: "Projects" },
                { value: projects.filter((p) => p.featured).length, label: "Featured" },
                { value: "100%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}