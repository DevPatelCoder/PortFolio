/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  UserSearch, 
  School, 
  Award, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronRight,
  Brain,
  Cpu,
  Database,
  Eye,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { cn } from './lib/utils';

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
        <div className="flex items-center gap-2">
          <Terminal className="w-6 h-6 text-primary-container" />
          <span className="text-xl font-bold tracking-tighter text-on-surface font-display">DEV PATEL</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-sans text-[10px] tracking-[0.3em] uppercase font-bold">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="text-primary-container hover:text-primary transition-colors duration-300"
          >
            Contact
          </a>
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
            className="md:hidden bg-surface border-b border-outline-variant/10 px-6 py-8 space-y-6 flex flex-col font-sans text-[10px] tracking-[0.3em] uppercase font-bold"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsOpen(false)}
                className="text-on-surface-variant"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="text-primary-container"
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center z-10 space-y-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/15">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-on-surface-variant font-bold">Available for Research Roles</span>
        </div>

        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-on-surface leading-[0.85] hero-text-glow">
          DEV PATEL
        </h1>

        <p className="text-2xl md:text-3xl font-display text-primary font-light tracking-tight">
          AI/ML Engineer & Computer Vision Specialist
        </p>

        <p className="max-w-2xl mx-auto text-on-surface-variant font-sans text-lg leading-relaxed">
          Building intelligent systems — from cardiovascular diagnostics to real-time OCR for the visually impaired. Merging mathematical rigor with human-centric design.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
          <a 
            href="#work" 
            className="px-10 py-4 neural-gradient text-white font-display font-bold rounded-md hover:shadow-[0_0_30px_rgba(0,112,243,0.3)] transition-all duration-300 scale-100 hover:scale-[1.02] active:scale-95"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="px-10 py-4 bg-transparent border border-outline-variant/30 text-on-surface font-display font-bold rounded-md hover:bg-surface-container-high transition-all duration-300"
          >
            Contact Me
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 pt-8 opacity-60">
          <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">GitHub</span>
          </a>
          <a href="#" className="hover:text-primary transition-colors duration-300 flex items-center gap-2">
            <Linkedin className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-widest font-bold">LinkedIn</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const skills = ["Python", "OCR", "YOLO", "Computer Vision", "Machine Learning", "Deep Learning", "Artificial Intelligence"];

  return (
    <section className="py-32 px-6 bg-surface" id="about">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* About Me */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Identity</span>
            <h2 className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter">About Me</h2>
          </div>

          <div className="prose prose-invert max-w-none text-on-surface-variant font-sans leading-relaxed space-y-6">
            <p className="text-xl">
              Currently pursuing a <span className="text-on-surface font-semibold">Master of Computer Science at Concordia University</span> (GPA 3.3). My journey is fueled by a dual passion for technical precision and human-centric assistive technology.
            </p>
            <p>
              With a solid foundation from my B.Tech at Charusat (9.5 CGPA), I specialize in AI/ML, Computer Vision, and Deep Learning. Beyond the code, I am a national-level basketball player, a background that instills discipline, teamwork, and a competitive drive in every research lab and development sprint I lead.
            </p>
          </div>

          {/* Skills Pills */}
          <div className="pt-8 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Core Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-5 py-2 bg-surface-container-highest rounded-full text-[10px] font-sans font-bold uppercase tracking-widest text-primary border border-outline-variant/10"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-[10px] text-on-surface-variant/80 uppercase tracking-widest font-bold">
                Certifications: <span className="text-on-surface">Machine Learning, Artificial Intelligence</span>
              </p>
            </div>
          </div>
        </div>

        {/* Education Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Education</span>
          </div>
          
          <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <School className="w-8 h-8 text-primary-container" />
              <span className="text-[10px] font-bold bg-primary-container/20 text-primary px-3 py-1 rounded-full uppercase tracking-widest">Current</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">Concordia University</h3>
            <p className="text-on-surface-variant font-sans text-sm mb-2">Master of Computer Science</p>
            <p className="text-primary font-bold text-lg">GPA 3.3</p>
          </div>

          <div className="p-8 bg-surface-container-low rounded-xl border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <Award className="w-8 h-8 text-primary-container" />
              <span className="text-[10px] font-bold bg-surface-container-highest text-on-surface-variant px-3 py-1 rounded-full uppercase tracking-widest">Completed</span>
            </div>
            <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors">Charusat University</h3>
            <p className="text-on-surface-variant font-sans text-sm mb-2">B.Tech in Computer Science</p>
            <p className="text-primary font-bold text-lg">9.5 CGPA</p>
          </div>
        </div>
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
    <section className="py-32 bg-surface-container-lowest relative" id="experience">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="space-y-4 mb-20">
          <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Trajectory</span>
          <h2 className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter leading-tight max-w-3xl">Professional Research & Industry Experience</h2>
        </div>

        <div className="relative space-y-12">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-outline-variant/20 hidden md:block"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className={cn(
              "relative flex flex-col md:flex-row md:justify-between items-center group",
              index % 2 !== 0 && "md:flex-row-reverse"
            )}>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-background group-hover:bg-primary transition-colors duration-300 z-10"></div>
              
              <div className="w-full md:w-[45%] bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors duration-300">
                <span className="text-[10px] font-bold text-primary font-sans tracking-widest uppercase">{exp.date}</span>
                <h3 className="text-2xl font-bold text-on-surface mt-2">{exp.title}</h3>
                <p className="text-on-surface-variant font-medium mb-4">{exp.company}</p>
                <p className="text-sm font-sans leading-relaxed text-on-surface-variant/80">{exp.description}</p>
              </div>
              
              <div className="hidden md:block w-[45%]"></div>
            </div>
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
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6bvse94GCDA89BmypUB6WWUcRDLKQDSvESVyujeCd9tUTQHafdK_eDn7lBQwyIgIhXv8hnRvcugeq4isFKMHnQw3ORtKMKl7GpVVVMn-VEqbBRwKdz6nN38DkqBBurvC9Osd13Ghm49L2ec1AIBuRKIyxqHSrucvmcXhw4SavQin-jc4jCW8lB5xMpBY4z-GLxnHrCnoGEY24ItX3esRzqy41QGPoRwYnoRRd5PyevBA5Gk63kafTQ00h3l58s0ErTR3AAxNSyk2i",
      badges: ["🏆 Funded ₹1L", "i-hub Gujarat"],
      large: true
    },
    {
      title: "Smart Mark Sheet Scanner",
      description: "Automated merit evaluation system using YOLO and custom OCR pipelines to digitize academic records with 99% accuracy.",
      tags: ["YOLO", "OCR", "Python"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT28Oh0wl8ylltAQ-094FeE3XwvN0bL-4dfm0jeXClyv8hPQvfTrO60n1rgK9z9ZqQc-YuD3kgI6n3YH71eKeDNWB2LJwXoqVUZVhrOPsFcR44fzR7LhnrO4ZjOiirQDvMJpTy5SPGnNZCjmimD71H5LykMM6wn3Mo1oL6L5WSj04yc-K91aHmP1uZ4qlb9wqIgvUTMrEjIVXU07Z7VkBX-qBg9OK6kynZkXQNeITlP3M450oDnhGGwuLHFlveo-5A8RnZB3U2JUDI",
      badges: ["🥇 Hackathon Winner"]
    },
    {
      title: "Crowd Counting",
      description: "Real-time surveillance solution with YOLO for high-density crowd estimation in urban environments.",
      tags: ["YOLO", "Surveillance", "CV"],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH7Ovm7irUeagpDhDmBslWTim8eNfde0OgRfbZz-uBarj6VDuTX4kR6MO4-Uy9n_CnwC39d2bIQ9ZEeW-_XgAilRe70LZfvsANnCpDpL9kXaZK49pFkAExrGZ45HhBwHFeRiPoeH9BV7CJOM79KZxGUbp2HXMzlKqoujBuFExEyiLrpuitaXzH0MzuFzPpJ0vRLR0_9aUqexhUsvKnJNxhtFhSr_DD3le8gzcwCI7PVK7WoRIm4_yisFlS0HzBxEGUy9leGfGp8zyg"
    }
  ];

  const achievements = [
    { title: "AZADI KA AMRIT MAHOTSAV", subtitle: "Hackathon Winner", icon: Award },
    { title: "Top 12 Finalist HackX", subtitle: "Innovation Lead", icon: Brain },
    { title: "4th Place Codepie 3.0", subtitle: "Competitive Programming", icon: Cpu },
    { title: "National Basketball Rep", subtitle: "Elite Athletics", icon: Award },
  ];

  return (
    <section className="py-32 px-6 bg-surface" id="work">
      <div className="max-w-screen-xl mx-auto">
        <div className="space-y-4 mb-16">
          <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter">Impactful Solutions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-surface-container-low border border-outline-variant/10 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl",
                project.large && "lg:col-span-2"
              )}
            >
              <div className={cn("overflow-hidden relative", project.large ? "h-96" : "h-64")}>
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute top-6 left-6 z-20 flex gap-2">
                  {project.badges?.map((badge) => (
                    <span key={badge} className="bg-primary-container text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 space-y-4">
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
            </div>
          ))}

          {/* Achievements Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {achievements.map((item, index) => (
              <div key={index} className="p-8 bg-surface-container-high rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-lg font-bold text-on-surface">{item.title}</h4>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-1 font-bold">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section className="py-32 px-6 bg-surface-container-lowest" id="contact">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.3em]">Connect</span>
              <h2 className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter leading-tight">Let's build the next generation of intelligent systems.</h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Email</p>
                  <a href="mailto:devpateldata@gmail.com" className="text-lg font-medium text-on-surface hover:text-primary transition-colors">devpateldata@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/10">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Phone</p>
                  <a href="tel:+14389932978" className="text-lg font-medium text-on-surface hover:text-primary transition-colors">+1 (438)-993-2978</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container-low border border-outline-variant/10 hover:border-primary/40 hover:bg-surface-container transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="bg-surface p-8 rounded-2xl border border-outline-variant/10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Dev Patel"
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all py-4"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="dev@example.com"
                    className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all py-4"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 ml-1">Your Message</label>
                <textarea 
                  rows={4}
                  placeholder="Briefly describe your project or inquiry..."
                  className="w-full bg-surface-container-low border-0 border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-on-surface font-sans placeholder:text-on-surface-variant/30 transition-all py-4"
                ></textarea>
              </div>
              <button className="w-full py-5 neural-gradient text-white font-display font-bold text-lg rounded-md hover:shadow-[0_10px_30px_rgba(0,112,243,0.3)] transition-all transform active:scale-[0.98]">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="flex flex-col items-center gap-6 text-center w-full max-w-screen-xl mx-auto">
        <div className="text-primary font-bold tracking-tighter text-xl font-display">DEV PATEL // NEURAL EDITORIAL</div>
        <div className="flex gap-8 font-sans text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/60 font-bold">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">ResearchGate</a>
        </div>
        <div className="font-sans text-[10px] tracking-[0.3em] uppercase text-on-surface-variant/40 font-bold">
          © 2024 DEV PATEL // NEURAL EDITORIAL
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary-container selection:text-white">
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
