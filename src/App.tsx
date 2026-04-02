/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { 
  Terminal, 
  School, 
  Award, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  Brain,
  Cpu,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import smartGlassesImg from './assets/smart_glasses_dark.png';

// --- Lumina Animation Components ---

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-primary/30 bg-primary/5 rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center backdrop-blur-sm shadow-sm"
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        x: "-50%",
        y: "-50%",
      }}
    >
      <div className="w-1.5 h-1.5 bg-primary/80 rounded-full" />
    </motion.div>
  );
};

const Magnetic = ({ children }: { children: React.ReactNode; key?: React.Key }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({ text, className }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={cn("overflow-hidden flex flex-wrap", className)}>
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden mr-[0.2em] mb-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.05, 
              ease: [0.33, 1, 0.68, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </div>
      ))}
    </div>
  );
};

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav border-b border-outline-variant/10">
      <div className="flex items-center justify-between px-6 h-16 w-full max-w-screen-xl mx-auto">
        <Magnetic>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-6 h-6 text-primary-container" />
            <span className="text-xl font-bold tracking-tighter text-on-surface font-display">DEV PATEL</span>
          </motion.div>
        </Magnetic>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <motion.a 
                whileHover={{ y: -2, color: "var(--primary)" }}
                href={link.href} 
                className="text-on-surface-variant transition-colors duration-300 block p-2"
              >
                {link.name}
              </motion.a>
            </Magnetic>
          ))}
          <Magnetic>
            <motion.a 
              whileHover={{ y: -2, color: "var(--primary)" }}
              href="#contact" 
              className="text-primary-container transition-colors duration-300 block p-2"
            >
              Contact
            </motion.a>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-on-surface"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-surface border-b border-outline-variant/10 px-6 py-8 space-y-6 flex flex-col font-sans text-[10px] tracking-[0.3em] uppercase font-bold shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant hover:text-primary transition-colors block"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-primary-container hover:text-primary transition-colors block"
            >
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden bg-surface-container-lowest">
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary-container rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary rounded-full blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center z-10 space-y-8 flex flex-col items-center"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/15 cursor-default mt-16"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-on-surface-variant font-bold">Available for job</span>
        </motion.div>

        <TextReveal 
          text="DEV PATEL" 
          className="text-6xl md:text-[8rem] justify-center font-bold tracking-tighter text-on-surface leading-[0.85] hero-text-glow"
        />

        <p className="text-2xl md:text-3xl font-display text-primary font-light tracking-tight mt-4">
          AI/ML Engineer & Computer Vision Specialist
        </p>

        <p className="max-w-2xl mx-auto text-on-surface-variant font-sans text-lg leading-relaxed">
          Building intelligent systems — from cardiovascular diagnostics to real-time OCR for the visually impaired. Merging mathematical rigor with human-centric design.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <Magnetic>
            <motion.a 
              href="#work" 
              className="px-10 py-4 neural-gradient text-white font-display font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,112,243,0.3)] transition-shadow block"
            >
              View My Work
            </motion.a>
          </Magnetic>
          <Magnetic>
            <motion.a 
              href="#contact" 
              className="px-10 py-4 bg-transparent border border-outline-variant/30 text-on-surface font-display font-bold rounded-full hover:bg-surface-container-high transition-colors block"
            >
              Contact Me
            </motion.a>
          </Magnetic>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 opacity-60">
          <Magnetic>
            <motion.a whileHover={{ color: "var(--primary)" }} href="https://github.com/DevPatelCoder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2">
              <Github className="w-5 h-5 pointer-events-none" />
              <span className="text-[10px] uppercase tracking-widest font-bold pointer-events-none">GitHub</span>
            </motion.a>
          </Magnetic>
          <Magnetic>
            <motion.a whileHover={{ color: "var(--primary)" }} href="https://www.linkedin.com/in/devpatel15" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-2">
              <Linkedin className="w-5 h-5 pointer-events-none" />
              <span className="text-[10px] uppercase tracking-widest font-bold pointer-events-none">LinkedIn</span>
            </motion.a>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const skills = ["Python", "OCR", "YOLO", "Computer Vision", "Machine Learning", "Deep Learning", "Artificial Intelligence"];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-background to-surface overflow-hidden" id="about">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* About Me */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="lg:col-span-7 space-y-8"
        >
          <motion.div variants={slideInLeft} className="space-y-4">
            <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Identity</span>
            <TextReveal text="About Me" className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter" />
          </motion.div>

          <motion.div variants={slideInLeft} className="prose prose-invert max-w-none text-on-surface-variant font-sans leading-relaxed space-y-6">
            <p className="text-xl">
              Currently pursuing a <span className="text-on-surface font-semibold">Master of Computer Science at Concordia University</span> (GPA 3.3). My journey is fueled by a dual passion for technical precision and human-centric assistive technology.
            </p>
            <p>
              With a solid foundation from my B.Tech at Charusat (9.5 CGPA), I specialize in AI/ML, Computer Vision, and Deep Learning. Beyond the code, I am a national-level basketball player, a background that instills discipline, teamwork, and a competitive drive in every research lab and development sprint I lead.
            </p>
          </motion.div>

          {/* Skills Pills */}
          <motion.div variants={fadeInUp} className="pt-8 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Core Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <Magnetic key={skill}>
                  <motion.span 
                    className="px-5 py-2 bg-surface-container-highest rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-primary border border-outline-variant/10 cursor-default block"
                  >
                    {skill}
                  </motion.span>
                </Magnetic>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-[10px] text-on-surface-variant/80 uppercase tracking-widest font-bold">
                Certifications: <span className="text-on-surface">Machine Learning, Artificial Intelligence</span>
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Education Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="lg:col-span-5 space-y-6"
        >
          <motion.div variants={slideInRight} className="space-y-4">
            <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Education</span>
          </motion.div>
          
          <motion.div 
            variants={slideInRight}
            whileHover={{ scale: 1.02, x: -10 }}
            className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <School className="w-8 h-8 text-primary-container" />
              <span className="text-[10px] font-bold bg-primary-container/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Completed</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">Concordia University</h3>
            <p className="text-on-surface-variant font-sans text-sm mb-2">Master of Computer Science</p>
            <p className="text-primary font-bold text-lg">GPA 3.3</p>
          </motion.div>

          <motion.div 
            variants={slideInRight}
            whileHover={{ scale: 1.02, x: -10 }}
            className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <Award className="w-8 h-8 text-primary-container" />
              <span className="text-[10px] font-bold bg-primary-container/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Completed</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">Charusat University</h3>
            <p className="text-on-surface-variant font-sans text-sm mb-2">B.Tech in Computer Science</p>
            <p className="text-primary font-bold text-lg">9.5 CGPA</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      date: "Feb - Mar 2024",
      title: "Research Intern",
      company: "IIT Bhubaneswar",
      description: "Developed Deep Learning architectures for ECG detection, pushing the boundaries of cardiovascular diagnostics through neural signal analysis."
    },
    {
      date: "2023 - 2024",
      title: "UGSF (Undergrad Research Fellow)",
      company: "Charusat University",
      description: "Managed Academic R&D projects and served as Lab Coordinator, facilitating cutting-edge research environments for peer-to-peer technical growth."
    },
    {
      date: "May - July 2022",
      title: "Intern",
      company: "3-Fit",
      description: "Conducted deep app architecture analysis and implemented core API integrations for performance monitoring systems."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-surface to-surface-container-lowest relative overflow-hidden" id="experience">
      <div className="max-w-screen-xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-4 mb-20"
        >
          <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Trajectory</span>
          <TextReveal text="Professional Research & Industry Experience" className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter leading-tight max-w-3xl" />
        </motion.div>

        <div className="relative space-y-12">
          {/* Animated vertical line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/20 hidden md:block origin-top"
          />
          
          {experiences.map((exp, index) => (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              key={index} 
              className={cn(
                "relative flex flex-col md:flex-row md:justify-between items-center group",
                index % 2 !== 0 && "md:flex-row-reverse"
              )}
            >
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-background group-hover:bg-primary transition-colors duration-300 z-10"></div>
              
              <motion.div 
                whileHover={{ scale: 1.02, y: -5 }}
                className="w-full md:w-[45%] bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-all shadow-md hover:shadow-2xl duration-300"
              >
                <span className="text-[10px] font-bold text-primary font-sans tracking-widest uppercase">{exp.date}</span>
                <h3 className="text-2xl font-bold text-on-surface mt-2">{exp.title}</h3>
                <p className="text-on-surface-variant font-medium mb-4">{exp.company}</p>
                <p className="text-sm font-sans leading-relaxed text-on-surface-variant/80">{exp.description}</p>
              </motion.div>
              
              <div className="hidden md:block w-[45%]"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Work = () => {
  const projects = [
    {
      title: "Real Time OCR for Partially Blind",
      description: "A high-impact IoT integration utilizing computer vision for real-time text-to-audio conversion and instant language translation.",
      tags: ["IoT", "OpenCV", "TTS"],
      image: smartGlassesImg,
      link: "https://www.qrcodechimp.com/page/mvp-dkd?v=chk1706635903",
      badges: ["🏆 Funded ₹1L", "i-hub Gujarat"],
      large: true
    },
    {
      title: "Smart Mark Sheet Scanner",
      description: "Automated merit evaluation system using YOLO and custom OCR pipelines to digitize academic records with 99% accuracy.",
      tags: ["YOLO", "OCR", "Python"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT28Oh0wl8ylltAQ-094FeE3XwvN0bL-4dfm0jeXClyv8hPQvfTrO60n1rgK9z9ZqQc-YuD3kgI6n3YH71eKeDNWB2LJwXoqVUZVhrOPsFcR44fzR7LhnrO4ZjOiirQDvMJpTy5SPGnNZCjmimD71H5LykMM6wn3Mo1oL6L5WSj04yc-K91aHmP1uZ4qlb9wqIgvUTMrEjIVXU07Z7VkBX-qBg9OK6kynZkXQNeITlP3M450oDnhGGwuLHFlveo-5A8RnZB3U2JUDI",
      link: "https://github.com/DevPatelCoder/Smart-Marksheet-Scanner",
      badges: ["🥇 Hackathon Winner"]
    },
    {
      title: "Crowd Counting",
      description: "Real-time surveillance solution with YOLO for high-density crowd estimation in urban environments.",
      tags: ["YOLO", "Surveillance", "CV"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH7Ovm7irUeagpDhDmBslWTim8eNfde0OgRfbZz-uBarj6VDuTX4kR6MO4-Uy9n_CnwC39d2bIQ9ZEeW-_XgAilRe70LZfvsANnCpDpL9kXaZK49pFkAExrGZ45HhBwHFeRiPoeH9BV7CJOM79KZxGUbp2HXMzlKqoujBuFExEyiLrpuitaXzH0MzuFzPpJ0vRLR0_9aUqexhUsvKnJNxhtFhSr_DD3le8gzcwCI7PVK7WoRIm4_yisFlS0HzBxEGUy9leGfGp8zyg",
      link: "https://github.com/DevPatelCoder/Crowd_Counting"
    }
  ];

  const achievements = [
    { title: "AZADI KA AMRIT MAHOTSAV", subtitle: "Hackathon Winner", icon: Award },
    { title: "Top 12 Finalist HackX", subtitle: "Innovation Lead", icon: Brain },
    { title: "4th Place Codepie 3.0", subtitle: "Competitive Programming", icon: Cpu },
    { title: "National Basketball Rep", subtitle: "Elite Athletics", icon: Award },
  ];

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-surface-container-lowest to-surface overflow-hidden" id="work">
      <div className="max-w-screen-xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="space-y-4 mb-16"
        >
          <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Selected Work</span>
          <TextReveal text="Impactful Solutions" className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project: any, index) => {
            const isLink = !!project.link;
            const Wrapper: any = isLink ? motion.a : motion.div;
            return (
            <Wrapper 
              {...(isLink ? { href: project.link, target: "_blank", rel: "noopener noreferrer" } : {})}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              key={index} 
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/10 shadow-lg hover:shadow-2xl transition-shadow cursor-none block",
                project.large && "lg:col-span-2"
              )}
            >
              <div className={cn("overflow-hidden relative", project.large ? "h-96" : "h-64")}>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent z-10 pointer-events-none"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                />
                <div className="absolute top-6 left-6 z-20 flex gap-2 pointer-events-none">
                  {project.badges?.map((badge) => (
                    <span key={badge} className="bg-primary-container text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 space-y-4 pointer-events-none">
                <h3 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4 pt-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-outline-variant uppercase tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </Wrapper>
          )})}

          {/* Achievements Grid */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
          >
            {achievements.map((item, index) => (
              <Magnetic key={index}>
                <motion.div 
                  variants={fadeInUp}
                  className="p-8 h-full w-full bg-surface-container-high rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all cursor-default block"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4 pointer-events-none" />
                  <h4 className="text-lg font-bold text-on-surface pointer-events-none">{item.title}</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 font-bold pointer-events-none">{item.subtitle}</p>
                </motion.div>
              </Magnetic>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-surface to-background overflow-hidden" id="contact">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Connect</span>
              <TextReveal text="Let's build the next generation of intelligent systems." className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter leading-tight" />
            </div>

            <div className="space-y-8">
              <Magnetic>
                <motion.a href="mailto:d.patel1502.cse@gmail.com" className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-container-low transition-colors duration-300 block">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10 pointer-events-none">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="pointer-events-none">
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Email</p>
                    <span className="text-lg font-medium text-on-surface hover:text-primary transition-colors">d.patel1502.cse@gmail.com</span>
                  </div>
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a href="tel:+14389932978" className="flex items-center gap-6 p-4 rounded-xl hover:bg-surface-container-low transition-colors duration-300 block">
                  <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10 pointer-events-none">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div className="pointer-events-none">
                    <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Phone</p>
                    <span className="text-lg font-medium text-on-surface hover:text-primary transition-colors">+1 (438)-993-2978</span>
                  </div>
                </motion.a>
              </Magnetic>
            </div>

            <div className="flex items-center gap-4 pt-4 px-4">
              <Magnetic>
                <motion.a 
                  href="https://github.com/DevPatelCoder" 
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all"
                >
                  <Github className="w-5 h-5 pointer-events-none" />
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  href="https://www.linkedin.com/in/devpatel15" 
                  target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all"
                >
                  <Linkedin className="w-5 h-5 pointer-events-none" />
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="bg-surface p-8 rounded-2xl border border-outline-variant/10"
          >
            <form action="https://formsubmit.co/d.patel1502.cse@gmail.com" method="POST" className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 flex flex-col group">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/80 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Dev Patel"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl focus:border-primary focus:bg-primary/5 focus:ring-1 focus:ring-primary/30 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all p-4 outline-none"
                  />
                </div>
                <div className="space-y-2 flex flex-col group">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/80 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="dev@example.com"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl focus:border-primary focus:bg-primary/5 focus:ring-1 focus:ring-primary/30 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all p-4 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2 flex flex-col group">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/80 ml-1">Your Message</label>
                <textarea 
                  name="message"
                  required
                  rows={4}
                  placeholder="Briefly describe your project or inquiry..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl focus:border-primary focus:bg-primary/5 focus:ring-1 focus:ring-primary/30 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all p-4 outline-none resize-none"
                ></textarea>
              </div>
              
              <Magnetic>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-12 py-4 mt-2 neural-gradient text-white font-display font-bold text-lg rounded-xl shadow-[0_4px_14px_0_rgba(0,112,243,0.39)] hover:shadow-[0_6px_20px_rgba(0,112,243,0.23)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 overflow-hidden group"
                >
                  <span className="pointer-events-none drop-shadow-md">Send Message</span>
                  <Mail className="w-5 h-5 drop-shadow-md pointer-events-none" />
                </motion.button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 bg-background">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 text-center w-full max-w-screen-xl mx-auto"
      >
        <div className="text-primary font-bold tracking-tighter text-xl font-display">DEV PATEL</div>
        <div className="flex gap-8 font-sans text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/60 font-bold">
          <Magnetic><motion.a whileHover={{ color: "var(--primary)" }} href="https://github.com/DevPatelCoder" target="_blank" rel="noopener noreferrer" className="transition-colors block p-2">GitHub</motion.a></Magnetic>
          <Magnetic><motion.a whileHover={{ color: "var(--primary)" }} href="https://www.linkedin.com/in/devpatel15" target="_blank" rel="noopener noreferrer" className="transition-colors block p-2">LinkedIn</motion.a></Magnetic>
        </div>
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40 font-bold">
          © {new Date().getFullYear()} DEV PATEL
        </div>
      </motion.div>
    </footer>
  );
};

export default function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-primary-container selection:text-white md:cursor-none">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
