// components/ContactSection.tsx
"use client";

import React, { useRef, useState, FormEvent } from 'react'; // <<<--- ADDED React here to scope React.ReactElement
// ADDED Variants to the import from framer-motion
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion'; 
import emailjs from '@emailjs/browser';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, 
  FaLinkedin, FaGithub, FaTwitter, FaInstagram,
  FaCheckCircle, FaExclamationCircle, FaSpinner,
  FaWhatsapp, FaCalendarAlt
} from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

// Initialize EmailJS (add your keys to .env.local)
// NOTE: For client-side key exposure, you must use NEXT_PUBLIC_ prefix.
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '');

interface ContactMethod {
  // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'." (Error 2503)
  icon: React.ReactElement; 
  title: string;
  value: string;
  link: string;
  color: string;
  accentColor: string;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactMethods: ContactMethod[] = [
    // ... (Your contactMethods array is unchanged)
    {
      icon: <SiGmail className="w-5 h-5" />,
      title: 'Email',
      value: 'dosunmuvictor16@gmail.com',
      link: 'mailto:dosunmuvictor16@gmail.com',
      color: 'from-red-500/20 to-red-500/5',
      accentColor: 'text-red-400'
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: 'Phone',
      value: '+234 911 543 8720',
      link: 'tel:+2349115438720',
      color: 'from-green-500/20 to-green-500/5',
      accentColor: 'text-green-400'
    },
    {
      icon: <FaWhatsapp className="w-5 h-5" />,
      title: 'WhatsApp',
      value: 'Chat with me',
      link: 'https://wa.me/2349115438720',
      color: 'from-green-600/20 to-green-600/5',
      accentColor: 'text-green-500'
    },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      title: 'LinkedIn',
      value: 'Dosunmu Victor',
      link: 'https://www.linkedin.com/in/dosunmu-victor-57430a380',
      color: 'from-blue-700/20 to-blue-700/5',
      accentColor: 'text-blue-500'
    },
    {
      icon: <FaGithub className="w-5 h-5" />,
      title: 'GitHub',
      value: '@Viktor-Kode',
      link: 'https://github.com/Viktor-Kode',
      color: 'from-gray-800/20 to-gray-800/5',
      accentColor: 'text-gray-300'
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      title: 'Twitter',
      value: '@WEBTOR2',
      link: 'https://x.com/WEBTOR2',
      color: 'from-blue-400/20 to-blue-400/5',
      accentColor: 'text-blue-400'
    },
    {
      icon: <FaMapMarkerAlt className="w-5 h-5" />,
      title: 'Location',
      value: 'Ogun, Nigeria',
      link: '#',
      color: 'from-pink-500/20 to-pink-500/5',
      accentColor: 'text-pink-400'
    },
    {
      icon: <FaCalendarAlt className="w-5 h-5" />,
      title: 'Availability',
      value: 'Open for opportunities',
      link: '#contact',
      color: 'from-purple-500/20 to-purple-500/5',
      accentColor: 'text-purple-400'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // NOTE: You must ensure your environment variables are correctly set.
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_nwn8itj';
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_t7v1p78';
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '7vyRc9YT7OttdbuIW';

    try {
      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Dosunmu Victor',
          reply_to: formData.email
        },
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  // FIX: Explicitly type as Variants to resolve type incompatibility (Error 2322)
  const containerVariants: Variants = { 
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // FIX: Explicitly type as Variants to resolve type incompatibility (Error 2322)
  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-950 via-black to-gray-950 pt-20 pb-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.05),transparent_50%)]" />
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm mb-8">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 tracking-wide">
              GET IN TOUCH
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Let's Create </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-[length:200%_auto] animate-gradient">
              Together
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to bring your ideas to life? Let's discuss your next project and create something amazing.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white">
                Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">With Me</span>
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm always excited to hear about new projects, collaborations, or opportunities. 
                Whether you have a specific project in mind or just want to chat about possibilities, 
                I'd love to connect.
              </p>
            </div>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                </div>
                <span className="font-semibold text-green-400">Available for new projects</span>
              </div>
              <p className="text-gray-400 text-sm">
                Currently accepting freelance projects and open to full-time opportunities. 
                Response time: Within 24 hours.
              </p>
            </motion.div>

            {/* Contact Methods Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className={`group relative p-5 rounded-2xl bg-gradient-to-br ${method.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${method.color.replace('/20', '/30').replace('/5', '/10')} border border-white/10`}>
                      <div className={method.accentColor}>
                        {method.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-medium ${method.accentColor} mb-1`}>
                        {method.title}
                      </div>
                      <div className="text-white font-semibold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                        {method.value}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FaPaperPlane className="w-4 h-4 text-gray-400" />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl shadow-purple-500/10">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Send a Message
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
                <p className="text-gray-400 text-sm mt-2">
                  Fill out the form and I'll get back to you within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all duration-300"
                    placeholder="What is this regarding?"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 resize-none transition-all duration-300"
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:shadow-2xl hover:shadow-purple-500/30'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Status Messages */}
                {/* Framer Motion's AnimatePresence is used here for exit animations */}
                <AnimatePresence> 
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-500" />
                        <div>
                          <p className="font-semibold text-green-400">Message Sent Successfully!</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Thank you for reaching out. I'll get back to you within 24 hours.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <FaExclamationCircle className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="font-semibold text-red-400">Something went wrong</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Please try again or contact me directly via email.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="pt-12 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Dosunmu Victor. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Built with <span className="text-red-400">♥</span> using Next.js & TypeScript
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: <FaLinkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/dosunmu-victor-57430a380', color: 'hover:text-blue-500' },
                { icon: <FaGithub className="w-5 h-5" />, href: 'https://github.com/Viktor-Kode', color: 'hover:text-gray-300' },
                { icon: <FaTwitter className="w-5 h-5" />, href: 'https://x.com/WEBTOR2', color: 'hover:text-blue-400' },
                { icon: <FaInstagram className="w-5 h-5" />, href: '#', color: 'hover:text-pink-500' },
                { icon: <SiGmail className="w-5 h-5" />, href: 'mailto:dosunmuvictor16@gmail.com', color: 'hover:text-red-400' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all duration-300 ${social.color}`}
                  aria-label={social.href.includes('linkedin') ? 'LinkedIn' : 
                               social.href.includes('github') ? 'GitHub' : 
                               social.href.includes('twitter') ? 'Twitter' : 
                               social.href.includes('mailto') ? 'Email' : 'Instagram'}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
}