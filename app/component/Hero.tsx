// components/HeroSection.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FiGithub, 
  FiLinkedin, 
  FiTwitter, 
  FiInstagram,
  FiSun,
  FiMoon,
  FiArrowRight,
} from 'react-icons/fi';
import { 
  FaFacebookF, 
  FaDribbble,
  FaCode,
  FaPaintBrush,
  FaRocket
} from 'react-icons/fa';

export default function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const [starPositions, setStarPositions] = useState<Array<{left: number, top: number, duration: number}>>([]);

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Generate star positions on client side only
    const stars = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 3 + 2
    }));
    setStarPositions(stars);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const socialLinks = [
    { icon: <FiGithub className="w-5 h-5" />, href: "https://github.com/Viktor-Kode", label: "GitHub" },
    { icon: <FiLinkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/dosunmu-victor-57430a380", label: "LinkedIn" },
    { icon: <FiTwitter className="w-5 h-5" />, href: "https://x.com/WEBTOR2?t=bvU4uh4TlGKZSw9h31JSEg&s=09", label: "Twitter" },
    { icon: <FaFacebookF className="w-5 h-5" />, href: "https://www.facebook.com/share/1D7yMopFAu/", label: "Facebook" },
    { icon: <FiInstagram className="w-5 h-5" />, href: "https://www.instagram.com/dosunmuvictor16?utm_source=qr&igsh=cDBscjR0bGU1c2s4", label: "Instagram" },
  ];

  const floatingCards = [
    { icon: <FaCode className="w-8 h-8" />, title: "Front-end Dev", delay: "0s", color: "from-purple-500 to-pink-500" },
    { icon: <FaPaintBrush className="w-8 h-8" />, title: "UI/UX Design", delay: "1s", color: "from-cyan-500 to-blue-500" },
    { icon: <FaRocket className="w-8 h-8" />, title: "Innovation", delay: "2s", color: "from-orange-500 to-red-500" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Client-side only stars to avoid hydration error */}
        {isClient && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {starPositions.map((star, i) => (
              <div
                key={i}
                className="absolute w-px h-px bg-white/10 rounded-full"
                style={{
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  animation: `twinkle ${star.duration}s infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mouse Trail Effect - Client-side only */}
      {isClient && (
        <div 
          className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl pointer-events-none z-0 transition-transform duration-100"
          style={{
            left: `${mousePosition.x - 192}px`,
            top: `${mousePosition.y - 192}px`,
            transform: `scale(${scrolled ? 0.8 : 1})`,
          }}
        />
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-black/80 backdrop-blur-xl shadow-2xl shadow-purple-500/10' 
          : 'py-6'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="relative group"
            >
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative bg-black rounded-lg px-4 py-2">
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                      DV
                    </span>
                  </div>
                </div>
                <span className="text-lg font-semibold hidden sm:block">
                  Dosunmu<span className="text-cyan-400">.</span>
                </span>
              </div>
            </Link>

            {/* Desktop Menu & Social Links */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-8">
                {['Projects', 'About', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="relative text-gray-300 hover:text-white transition-colors duration-300 group"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>

              <div className="h-6 w-px bg-gray-700" />

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
                    aria-label={link.label}
                  >
                    <div className="text-gray-400 group-hover:text-white transition-colors duration-300">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>

             
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-10 h-10  flex flex-col items-center justify-center group"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden bg-black  overflow-hidden transition-all duration-500 ${
            isMenuOpen ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="flex flex-col space-y-4 pb-4  w-100 ">
              {['Work', 'About', 'Services', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white py-2 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:scale-110 transition-transform duration-300"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full px-4 py-2 backdrop-blur-sm border border-white/10">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Available for freelance work</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-300">Creating Digital</span>
              <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Experiences
              </span>
              <span className="block text-gray-300">That Inspire</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              I'm <span className="font-semibold text-cyan-400">Dosunmu Victor</span>, a creative developer & designer focused on building innovative digital solutions with cutting-edge technology and thoughtful design.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href={"#projects"}>
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold overflow-hidden hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>View My Work</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button></Link>
              <Link href={"#contact"}>
              <button className="px-8 py-4 rounded-full font-semibold border-2 border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
                Get In Touch
              </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {[
                { number: "20+", label: "Projects" },
                { number: "2+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Visual Content */}
          <div className="relative lg:min-h-[600px] flex items-center justify-center">
            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <div
                key={index}
                className={`absolute w-32 h-40 rounded-2xl backdrop-blur-sm border border-white/10 p-6 flex flex-col items-center justify-center hover:scale-110 hover:shadow-2xl transition-all duration-500 animate-float ${
                  index === 0 ? 'top-0 left-0 lg:top-10 lg:left-10' :
                  index === 1 ? 'top-0 right-0 lg:top-20 lg:right-10' :
                  'bottom-0 left-1/2 transform -translate-x-1/2 lg:bottom-20 lg:left-auto lg:right-20'
                }`}
                style={{ animationDelay: card.delay }}
              >
                <div className={`mb-4 p-3 rounded-full bg-gradient-to-r ${card.color} shadow-lg`}>
                  {card.icon}
                </div>
                <h3 className="font-semibold text-center">{card.title}</h3>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              </div>
            ))}

            {/* Main Avatar */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse" />
              
              {/* Avatar Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-black" />
              </div>
              
              {/* Avatar Content */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                {/* Animated Grid Pattern - Fixed to avoid hydration errors */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-10 grid-rows-10 w-full h-full">
                    {Array.from({ length: 10 }).map((_, col) => (
                      <div 
                        key={`col-${col}`}
                        className="border-r border-cyan-500/30"
                        style={{ gridColumn: `${col + 1} / span 1` }}
                      />
                    ))}
                    {Array.from({ length: 10 }).map((_, row) => (
                      <div 
                        key={`row-${row}`}
                        className="border-b border-purple-500/30"
                        style={{ gridRow: `${row + 1} / span 1` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Initials */}
                <div className="relative z-10">
                  <div className="text-7xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                    DV
                  </div>
                  <div className="text-center mt-4 text-gray-400 font-semibold">
                    Dosunmu Victor
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Client-side only */}
      {isClient && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-gray-400">Scroll to explore</span>
            <div className="relative">
              <div className="w-px h-12 bg-gradient-to-b from-purple-500 via-transparent to-transparent" />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3">
                <div className="w-full h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-ping opacity-75" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
}