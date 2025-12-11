// components/AboutSection.tsx
"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt,
  FaFigma, FaFire
} from 'react-icons/fa';
import {
  SiTypescript, SiNextdotjs, SiTailwindcss,
  SiVercel, SiFramer
} from 'react-icons/si';

// Define the motion component for the anchor tag to suppress prop warnings
const MotionAnchor = motion.a;

export default function AboutSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  // Frontend-focused tech stack
  const techStack = [
    { icon: <FaHtml5 />, name: "HTML5", color: "text-orange-500", shadow: "hover:shadow-orange-500/30" },
    { icon: <FaCss3Alt />, name: "CSS3", color: "text-blue-500", shadow: "hover:shadow-blue-500/30" },
    { icon: <FaJs />, name: "JavaScript", color: "text-yellow-400", shadow: "hover:shadow-yellow-400/30" },
    { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-600", shadow: "hover:shadow-blue-600/30" },
    { icon: <FaReact />, name: "React", color: "text-cyan-400", shadow: "hover:shadow-cyan-400/30" },
    { icon: <SiNextdotjs />, name: "Next.js", color: "text-white", shadow: "hover:shadow-white/30" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "text-teal-400", shadow: "hover:shadow-teal-400/30" },
    { icon: <SiFramer />, name: "Framer", color: "text-pink-500", shadow: "hover:shadow-pink-500/30" },
    { icon: <FaGitAlt />, name: "Git", color: "text-orange-600", shadow: "hover:shadow-orange-600/30" },
    { icon: <FaFigma />, name: "Figma", color: "text-purple-600", shadow: "hover:shadow-purple-600/30" },
    { icon: <FaFire />, name: "Firebase", color: "text-orange-400", shadow: "hover:shadow-orange-400/30" },
    { icon: <SiVercel />, name: "Vercel", color: "text-white", shadow: "hover:shadow-white/30" },
  ];

  // Animation for logo grid
  // FIX: Applied 'as const' to resolve Framer Motion Variants type mismatch (Error 2322)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  } as const; 

  // FIX: Applied 'as const' to resolve Framer Motion Variants type mismatch (Error 2322)
  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  } as const; 

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Modern Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 tracking-wide">
              ABOUT ME
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Crafting Digital </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-text bg-[length:200%_auto]">
              Experiences
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Building the future with clean code, modern design, and innovative solutions
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Dosunmu Victor</span>
              </h3>

              <p className="text-gray-300 text-lg leading-relaxed">
                A passionate <span className="text-cyan-300 font-semibold">Frontend Developer</span> specializing in
                creating exceptional digital experiences. I combine technical expertise with creative
                vision to build solutions that are both beautiful and functional.
              </p>
            </div>

            {/* Description Blocks */}
            <div className="space-y-6">
              {[
                "With expertise in modern technologies like React, Next.js, and TypeScript, I build scalable applications that deliver outstanding user experiences.",
                "My approach combines innovative thinking with attention to detail, ensuring every project meets the highest standards of quality and performance."
              ].map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + idx * 0.2 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-2 h-2 mt-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex-shrink-0 animate-pulse" />
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex-1">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Modern Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 my-12"
            >
              {[
                { value: "20+", label: "Projects" },
                { value: "2+", label: "Years" },
                { value: "15+", label: "Clients" }
              ].map((stat) => ( // Removed unused 'idx' variable here as it's not strictly necessary if stat.label is unique
                <div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-sm border border-white/10 hover:border-purple-500/30 transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <MotionAnchor // This uses the motion.a component, which correctly handles Framer Motion props on an <a> tag.
                href="https://drive.google.com/file/d/1hcNBNDgeAhicBX-4OMGE4L7enP4OoizF/view?usp=sharing"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Download CV
                  <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </MotionAnchor>

            </motion.div>
          </motion.div>

          {/* Right Column - Technical Stack Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-purple-500/10">
              <div className="space-y-3 mb-10">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Technical Stack
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                <p className="text-gray-400 text-sm mt-2">
                  Technologies I use to bring ideas to life
                </p>
              </div>

              {/* Logo Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-5"
              >
                {techStack.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={itemVariants}
                    // Added 'as const' to whileHover transition for completeness, though often optional here
                    whileHover={{ y: -8, scale: 1.1, transition: { type: "spring", stiffness: 400 } as const }} 
                    className={`flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 ${tech.shadow}`}
                  >
                    <div className={`text-4xl mb-3 ${tech.color}`}>
                      {tech.icon}
                    </div>
                    <span className="text-xs font-medium text-gray-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stack Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-gray-400 text-sm text-center">
                  Specializing in modern frontend development with a focus on
                  <span className="text-cyan-300"> performance</span>,
                  <span className="text-purple-300"> accessibility</span>, and
                  <span className="text-pink-300"> user experience</span>.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Custom Animation Styles (Separated and renamed class for clarity) */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-text {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
}