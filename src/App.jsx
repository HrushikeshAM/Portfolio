import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Terminal as TerminalIcon, 
  Cloud, 
  Cpu, 
  Layers, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  ArrowUp, 
  ChevronDown, 
  Check,
  Compass,
  FolderGit2
} from 'lucide-react';

import { Github, Linkedin } from './components/Icons';

// Custom sub-components
import Terminal from './components/Terminal';
import Timeline from './components/Timeline';
import ProjectCard from './components/ProjectCard';
import CodeBackground from './components/CodeBackground';

// External configuration
import { projectsData } from './config/projectsData';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Form submit handler with canvas-confetti trigger
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      
      // Fire confetti fireworks
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Fire confetti from random side edges
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      // Reset form after delay
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  // Scroll tracking effect
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percent
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.pageYOffset / totalScroll) * 100);
      }

      // Show/hide scroll-to-top button
      setShowScrollTop(window.pageYOffset > 500);

      // Scroll spy logic for active section
      const sections = ['home', 'terminal', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.pageYOffset + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const skillCategories = [
    {
      title: "Containerization & Ops",
      icon: <Layers style={{ width: '20px', height: '20px', color: '#6366f1' }} />,
      skills: ["Docker", "Kubernetes", "GitOps / ArgoCD", "CI/CD Pipelines", "Git & GitHub"]
    },
    {
      title: "Cloud Infrastructure",
      icon: <Cloud style={{ width: '20px', height: '20px', color: '#10b981' }} />,
      skills: ["Amazon Web Services (AWS)", "AWS EC2 / S3", "VPC & Security Groups", "Cloud Monitoring"]
    },
    {
      title: "Backend & Systems",
      icon: <Cpu style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />,
      skills: ["Python", "Node.js", "Express.js", "TypeScript", "Linux (Red Hat Academy)"]
    },
    {
      title: "Databases & Design",
      icon: <Layers style={{ width: '20px', height: '20px', color: '#ec4899' }} />,
      skills: ["MongoDB", "MySQL", "Database Normalization", "RESTful API Design", "System Architecture"]
    }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Dynamic Purple Code Background */}
      <CodeBackground />

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Decorative Blur Backgrounds */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: -1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: -1, pointerEvents: 'none' }} />

      {/* Header / Navbar */}
      <header className="navbar-header">
        <div className="navbar-container">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="navbar-logo"
            onClick={() => scrollToId('home')}
          >
            <span style={{ color: '#6366f1' }}>&lt;</span>
            <span className="gradient-text">hrushikesh.menon</span>
            <span style={{ color: '#10b981' }}>/&gt;</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <nav className="navbar-menu">
            {['home', 'terminal', 'about', 'skills', 'projects', 'certifications', 'contact'].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToId(sect)}
                className={`navbar-link ${activeSection === sect ? 'active' : ''}`}
                id={`nav-link-${sect}`}
              >
                {sect}
                {activeSection === sect && (
                  <motion.span 
                    layoutId="activeIndicator"
                    style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '2.5px', backgroundColor: '#6366f1', borderRadius: '9999px' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Resume Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="./Hrushikesh_A_Menon_Resume.pdf" 
              download="Hrushikesh_A_Menon_Resume.pdf"
              className="glow-button"
              id="download-resume-nav"
              style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}
            >
              <Download style={{ width: '14px', height: '14px' }} />
              <span>Resume</span>
            </a>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="hero-sec"
      >
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="section-tag section-tag-indigo"
          >
            <Compass className="animate-spin" style={{ width: '14px', height: '14px', animationDuration: '8s' }} />
            <span>CLOUD & DEVOPS ENGINEER</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hero-title"
            id="hero-main-title"
          >
            Hi, I'm <span className="gradient-text">Hrushikesh</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="hero-desc"
          >
            Designing high-reliability cloud architecture, container orchestration pipelines, and building scalable full-stack web applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-buttons"
          >
            <button 
              onClick={() => scrollToId('terminal')}
              className="glow-button"
              id="cta-terminal-button"
            >
              <TerminalIcon style={{ width: '16px', height: '16px' }} />
              <span>Launch Terminal</span>
            </button>
            <button 
              onClick={() => scrollToId('projects')}
              className="secondary-btn"
              id="cta-work-button"
            >
              View Work
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-cue" onClick={() => scrollToId('terminal')}>
          <span style={{ fontSize: '0.65rem' }}>Terminal Shell</span>
          <motion.div 
            className="animate-bob"
          >
            <ChevronDown style={{ width: '18px', height: '18px' }} />
          </motion.div>
        </div>
      </section>

      {/* Terminal Shell Section */}
      <section id="terminal" className="section-container" style={{ maxWidth: '900px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem', alignItems: 'center' }}>
          <div className="section-tag section-tag-emerald">
            <TerminalIcon style={{ width: '14px', height: '14px' }} />
            <span>INTERACTIVE SHELL</span>
          </div>
          <h2 className="section-title" id="terminal-heading">System Terminal Console</h2>
          <p className="section-desc text-center">
            Query details directly through our sandboxed mock CLI shell. Execute standard terminal requests to fetch bio details, review skills lists, or view repositories.
          </p>
        </div>
        <Terminal />
      </section>

      {/* About Section */}
      <section id="about" className="section-container">
        <div className="about-grid">
          {/* Bio and Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="section-tag section-tag-violet">
              <Award style={{ width: '14px', height: '14px' }} />
              <span>PROFILE SUMMARY</span>
            </div>
            <h2 className="section-title" id="about-heading">About Me</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              I am a Cloud Computing & DevOps postgraduate student at Chandigarh University, passionate about infrastructure performance, automated build pipelines, and deploying highly resilient Docker & Kubernetes topologies.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Leveraging a strong foundation in full-stack web applications (MERN), I engineer applications that map perfectly to container networks, utilizing clean REST API architectures.
            </p>

            {/* Quick Stats Grid */}
            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-val">8.05</span>
                <span className="stat-label">MCA CGPA (CC & DevOps)</span>
              </div>
              <div className="stat-box">
                <span className="stat-val emerald">24</span>
                <span className="stat-label">Public Repositories</span>
              </div>
              <div className="stat-box">
                <span className="stat-val violet">2+</span>
                <span className="stat-label">Years Tech Exploration</span>
              </div>
              <div className="stat-box">
                <span className="stat-val pink" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck style={{ width: '16px', height: '16px', color: '#10b981' }} />
                  <span>RHSA</span>
                </span>
                <span className="stat-label">Red Hat Academy</span>
              </div>
            </div>
          </div>

          {/* Vertical Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', paddingLeft: '1rem', borderLeft: '3px solid #6366f1' }}>Education History</h3>
            <Timeline />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-container" style={{ background: 'rgba(10, 10, 15, 0.2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3.5rem', alignItems: 'center' }}>
          <div className="section-tag section-tag-indigo">
            <Cpu style={{ width: '14px', height: '14px', color: '#6366f1' }} />
            <span>CAPABILITIES</span>
          </div>
          <h2 className="section-title" id="skills-heading">Technical Skills Grid</h2>
          <p className="section-desc text-center">
            Hover over categories to highlight specific DevOps orchestrations, system interfaces, and web stacks.
          </p>
        </div>

        <div className="grid-2">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="glass-panel"
              style={{ padding: '1.5rem' }}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="skill-card-body">
                <div className="skill-card-header">
                  <span className="skill-icon-wrapper">
                    {cat.icon}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{cat.title}</h3>
                </div>
                <div className="skills-badge-list" style={{ marginTop: '0.5rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="section-container">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="section-tag section-tag-emerald">
              <FolderGit2 style={{ width: '14px', height: '14px', color: '#10b981' }} />
              <span>SHOWCASE</span>
            </div>
            <h2 className="section-title" id="projects-heading">Featured Repositories</h2>
            <p className="section-desc">
              Highlights of production setups and repositories compiled directly from my active profile.
            </p>
          </div>
          
          <a 
            href="https://github.com/HrushikeshAM" 
            target="_blank" 
            rel="noopener noreferrer"
            className="glow-button"
            style={{ fontSize: '0.85rem' }}
          >
            <Github style={{ width: '16px', height: '16px' }} />
            <span>More on GitHub</span>
            <ExternalLink style={{ width: '14px', height: '14px' }} />
          </a>
        </div>

        <div className="grid-3">
          {projectsData.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="section-container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3.5rem', alignItems: 'center' }}>
          <div className="section-tag section-tag-violet">
            <ShieldCheck style={{ width: '14px', height: '14px', color: '#8b5cf6' }} />
            <span>CREDENTIALS</span>
          </div>
          <h2 className="section-title" id="certifications-heading">Certifications & Achievements</h2>
          <p className="section-desc text-center">
            Verified qualifications and technical assessments in system engineering, frameworks, and programming interfaces.
          </p>
        </div>

        <div className="grid-3">
          {[
            {
              title: "RHSA (I & II)",
              provider: "Red Hat Academy",
              desc: "Completed core Red Hat System Administration credentials focusing on command line tasks, operations control, and storage management."
            },
            {
              title: "React JS certification",
              provider: "Infosys Springboard",
              desc: "Certified implementation details covering hooks, states, lifecycle elements, rendering pipelines, and modular structures."
            },
            {
              title: "Algorithms & Data Structures",
              provider: "freeCodeCamp",
              desc: "Verified knowledge of algorithmic processing, structure normalization, and complexity calculation metrics."
            },
            {
              title: "Responsive Web Design",
              provider: "freeCodeCamp",
              desc: "Responsive web layouts, flexbox rendering, grids alignment control, and cross-browser formatting styles."
            },
            {
              title: "Software Engineer (Basic)",
              provider: "HackerRank",
              desc: "Assessment testing core logic structures, algorithms processing efficiency, and coding syntax correctness."
            },
            {
              title: "Python (Basic) & CSS (Basic)",
              provider: "HackerRank",
              desc: "Assessments highlighting syntax compilation rules, layout configurations, and basic function structures."
            }
          ].map((cert, idx) => (
            <motion.div
              key={idx}
              className="glass-panel"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span className="project-card-icon" style={{ alignSelf: 'flex-start' }}>
                  <Award style={{ width: '18px', height: '18px' }} />
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>{cert.title}</h3>
                <p style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: '600' }}>{cert.provider}</p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.5' }}>{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-container" style={{ maxWidth: '900px' }}>
        <div className="glass-panel contact-card" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Decorative Spot Glow inside Card */}
          <div style={{ position: 'absolute', right: '-80px', bottom: '-80px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
          
          <div className="contact-layout">
            {/* Channels Info */}
            <div className="contact-channels">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="section-tag section-tag-emerald">
                  <Mail style={{ width: '14px', height: '14px', color: '#10b981' }} />
                  <span>GET IN TOUCH</span>
                </div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Contact Me</h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
                  Have an open role, project discussion, or networking request? Fill out the form and I'll get back to you shortly.
                </p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="contact-item">
                  <span className="contact-item-icon indigo">
                    <Mail style={{ width: '16px', height: '16px' }} />
                  </span>
                  <div>
                    <p className="contact-item-label">Email</p>
                    <a href="mailto:Hrushikesh.amenon@gmail.com" className="contact-item-val">Hrushikesh.amenon@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item-icon emerald">
                    <Phone style={{ width: '16px', height: '16px' }} />
                  </span>
                  <div>
                    <p className="contact-item-label">Phone</p>
                    <a href="tel:+919113237366" className="contact-item-val">+91 9113237366</a>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="contact-item-icon violet">
                    <MapPin style={{ width: '16px', height: '16px' }} />
                  </span>
                  <div>
                    <p className="contact-item-label">Location</p>
                    <p style={{ fontSize: '0.85rem', color: '#f8fafc' }}>Bengaluru, KA, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form Submission */}
            <div className="contact-form-side">
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="form-success-alert"
                  >
                    <div className="success-check-circle">
                      <Check style={{ width: '24px', height: '24px' }} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Message Transmitted!</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '280px', lineHeight: '1.5' }}>
                      Thank you. Your request has been logged and the confetti pipeline triggered. Hrushikesh will respond shortly!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleContactSubmit} 
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="form-input-group">
                      <label htmlFor="form-name" className="form-label">Name</label>
                      <input
                        id="form-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input-box"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="form-input-group">
                      <label htmlFor="form-email" className="form-label">Email Address</label>
                      <input
                        id="form-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input-box"
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="form-input-group">
                      <label htmlFor="form-message" className="form-label">Message</label>
                      <textarea
                        id="form-message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="form-input-box"
                        style={{ resize: 'none' }}
                        placeholder="Type your message here..."
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="glow-button"
                      id="contact-form-submit"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                    >
                      <Send style={{ width: '16px', height: '16px' }} />
                      <span>Send Message</span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', fontWeight: '700' }}>Hrushikesh A Menon</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>&copy; {new Date().getFullYear()} All rights reserved. Created in React.</p>
          </div>

          <div className="footer-social-links">
            <a 
              href="https://github.com/HrushikeshAM" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn"
              title="GitHub Profile"
            >
              <Github style={{ width: '20px', height: '20px' }} />
            </a>
            <a 
              href="https://linkedin.com/in/hrushikesh-a-menon-13569b268/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-btn"
              title="LinkedIn Profile"
            >
              <Linkedin style={{ width: '20px', height: '20px' }} />
            </a>
            <a 
              href="mailto:Hrushikesh.amenon@gmail.com" 
              className="footer-social-btn"
              title="Send Email"
            >
              <Mail style={{ width: '20px', height: '20px' }} />
            </a>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Trigger */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToId('home')}
            className="back-to-top-btn"
            title="Scroll to Top"
            id="scroll-to-top-button"
          >
            <ArrowUp style={{ width: '20px', height: '20px' }} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
