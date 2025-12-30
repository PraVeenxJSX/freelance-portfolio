import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MessageCircle, Code, Layers, Smartphone, Menu, X, ChevronRight } from 'lucide-react';
import './App.scss';
import archtype from './assets/archetype.png';
import restaurant from './assets/restaurant.png';
import ecommerce from './assets/ecommerce.png';
import gym from './assets/gym.png';
import bakery from './assets/bakery.png';
import realestate from './assets/realestate.png';



// --- CONSTANTS & DATA ---
const WHATSAPP_LINK = "https://wa.me/9063402690"; // Replace with your actual WhatsApp number
const ARCHETYPE_IMAGE_URL = "https://i.imgur.com/8Z0Q1jM.png"; // Placeholder for the Archetype screenshot. Replace with your actual image URL.
const ARCHETYPE_LINK = "https://interior-brand.onrender.com/";

const projects = [
  {
    id: 1,
    title: "archetype designing",
    category: "architechture & INTERIOR DESIGN",
    description: "A sleek, modern website for an interior design firm, showcasing their portfolio with interactive elements and smooth transitions.",
    image: archtype, // Placeholder
    link: "https://interior-brand.onrender.com",
    color: "#0057ff"
  },
  {
    id: 2,
    title: "AURUM&EMBER",
    category: "Restaurant & Branding",
    description: "An immersive e-commerce platform for a luxury skincare brand, featuring fluid animations and a personalized shopping journey.",
    image: restaurant, // Placeholder
    link: "https://restaurant-brand.onrender.com",
    color: "#ff6b6b"
  },
  {
    id: 3,
    title: "ecommerce & BRANDING",
    category: "E-commerce & Branding",
    description: "An immersive e-commerce platform for a luxury skincare brand, featuring fluid animations and a personalized shopping journey.",
    image: ecommerce, // Placeholder
    link: "https://ecommerce-website-final-frontend.onrender.com/",
    color: "#ff6b6b"
  },
  {
    id: 3,
    title: "gym & BRANDING",
    category: "fitness & Branding",
    description: "an immersive gym plaatform for a luxury fitness brand, featuring fluid animations and a personalized shopping journey.",
    image: gym, // Placeholder
    link: "https://gym-brand.onrender.com",
    color: "#ff6b6b"
  },
  {
    id: 4,
    title: "bakery & BRANDING",
    category: "Bakery & Branding",
    description: "A delightful online bakery platform showcasing artisanal products with a warm, inviting design and seamless user experience.",
    image: bakery, // Placeholder
    link: "https://bakery-brand.onrender.com",
    color: "#ff6b6b"
  },
  {
    id: 5,
    title: "real estate & BRANDING",
    category: "Real Estate & Branding",
    description: "A modern real estate website featuring property listings, virtual tours, and an intuitive search experience for prospective buyers.",
    image: realestate, // Placeholder
    link: "https://aesthetic-gingersnap-98f3ff.netlify.app/",
    color: "#ff6b6b"
  }
];

const services = [
  { icon: <Code />, title: "Web Development", desc: "High-performance, scalable websites and web apps built with cutting-edge technologies like React and Next.js." },
  { icon: <Smartphone />, title: "Mobile Solutions", desc: "Native and cross-platform mobile applications that deliver seamless user experiences on iOS and Android." },
  { icon: <Layers />, title: "UI/UX Design", desc: "User-centric design that blends aesthetics with functionality to create intuitive and engaging digital products." }
];

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- CUSTOM CURSOR ---
const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const hoverElements = document.querySelectorAll('a, button, .project-card, .menu-toggle');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  });

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'hovering' : ''}`}
      style={{ x: mouseX, y: mouseY }}
    />
  );
};

// --- COMPONENTS ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container nav-inner">
          <a href="/" className="logo">NEXUS<span className="dot">.</span></a>
          <div className="nav-links desktop">
            <a href="#services">Services</a>
            <a href="#work">Our Work</a>
            <a href="#contact">Contact</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-nav">
              <MessageCircle size={18} /> Let's Talk
            </a>
          </div>
          <div className="menu-toggle mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="menu-header">
              <a href="#" className="logo">NEXUS<span className="dot">.</span></a>
              <X size={24} onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="menu-links">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)}>Our Work</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-menu">
                <MessageCircle size={20} /> Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div className="hero-bg" style={{ y, opacity }}>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="grid-overlay"></div>
      </motion.div>
      <div className="container hero-content">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.h1 variants={fadeInUp} className="hero-title">
            We Build <span className="text-gradient">Digital</span> <br />
            Masterpieces.
          </motion.h1>
          <motion.p variants={fadeInUp} className="hero-subtitle">
            Your premier business platform for crafting world-class websites and applications that elevate brands and drive growth.
          </motion.p>
          <motion.div variants={fadeInUp} className="hero-cta">
            <a href="#work" className="btn-primary">View Our Work <ArrowUpRight size={20} /></a>
            <a href="#contact" className="btn-secondary">Start a Project</a>
          </motion.div>
        </motion.div>
      </div>
      <div className="scroll-down">
        <span>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronRight size={24} transform="rotate(90)" />
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => (
  <section id="services" className="services-section">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="section-header"
      >
        <motion.h2 variants={fadeInUp} className="section-title">What We Do</motion.h2>
        <motion.p variants={fadeInUp} className="section-desc">We translate your business vision into powerful, user-centric digital solutions.</motion.p>
      </motion.div>
      <motion.div
        className="services-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        {services.map((service, index) => (
          <motion.div key={index} className="service-card" variants={fadeInUp}>
            <div className="icon-wrapper">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const ProjectCard = ({ project }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      variants={fadeInUp}
      whileHover={{ y: -10 }}
      style={{ '--accent-color': project.color }}
    >
      <div className="image-container">
        <img src={project.image} alt={project.title} />
        <div className="overlay">
          <span className="view-btn">View Project <ArrowUpRight size={18} /></span>
        </div>
      </div>
      <div className="card-content">
        <span className="category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </motion.a>
  );
};

const Portfolio = () => (
  <section id="work" className="portfolio-section">
    <div className="container">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="section-header"
      >
        <motion.h2 variants={fadeInUp} className="section-title">Featured Work</motion.h2>
        <motion.p variants={fadeInUp} className="section-desc">A curated selection of our most impactful digital products.</motion.p>
      </motion.div>
      <motion.div
        className="projects-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="contact-section">
    <div className="container">
      <motion.div
        className="contact-box"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2>Ready to Build Your Next <span className="text-gradient">Success Story?</span></h2>
        <p>Let's collaborate and bring your ideas to life. We're just a message away.</p>
        <div className="cta-buttons">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary whatsapp-cta">
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
          <a href="mailto:bandelapraveenbandela@gmail.com" className="btn-secondary">
            Send an Email
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-col">
        <a href="#" className="logo">NEXUS<span className="dot">.</span></a>
        <p className="footer-tagline">Your partner in digital innovation.</p>
      </div>
      <div className="footer-col">
        <h4>Links</h4>
        <a href="#services">Services</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="footer-col">
        <h4>Connect</h4>
        <a href={WHATSAPP_LINK}>WhatsApp</a>
        <a href="bandelapraveenbandela@gmail.com">Email</a>
        <a href="#">LinkedIn</a>
      </div>
    </div>
    <div className="container footer-bottom">
      <p>© 2024 NEXUS Digital. All rights reserved.</p>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <motion.a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="floating-whatsapp"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 1, type: 'spring' }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <MessageCircle size={32} />
    <div className="pulse-ring"></div>
  </motion.a>
);

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />  
      <FloatingWhatsApp />
    </div>
  );
}

export default App;