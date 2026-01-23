import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCode,
  FaBuilding,
  FaLaptopCode,
  FaServer,
  FaTools,
  FaUserFriends,
  FaRocket,
  FaStar,
  FaArrowDown,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "./style.css";

// AnimatedWrapper component for scroll animations
const AnimatedWrapper = ({ children, delay = 0, direction = "up" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`animated-element ${direction} ${inView ? 'in-view' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

// AnimatedStat component
const AnimatedStat = ({ icon: Icon, number, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const increment = number / (duration / 20);
      const timer = setInterval(() => {
        setCount(prev => {
          const next = prev + increment;
          if (next >= number) {
            clearInterval(timer);
            return number;
          }
          return next;
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, [inView, number, duration]);

  return (
    <div ref={ref} className="animated-stat">
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-content">
        <span className="stat-number">{Math.floor(count)}</span>
        <span className="stat-label">{label}</span>
      </div>
    </div>
  );
};

// FloatingTechTag component
const FloatingTechTag = ({ tech, index }) => {
  return (
    <div 
      className="floating-tech-tag"
      style={{
        animationDelay: `${index * 0.1}s`,
        '--x-offset': `${Math.sin(index) * 5}px`,
        '--y-offset': `${Math.cos(index) * 5}px`
      }}
    >
      {tech}
    </div>
  );
};

export const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [floatingTechs, setFloatingTechs] = useState([]);
  
  const gridRef = useRef(null);

  // Extract unique categories from experiences
  const categories = ["all", "frontend", "backend", "fullstack"];
  
  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get("https://portfolio-backend-cyan-nine.vercel.app/api/experience");
        // const res = await axios.get("http://localhost:5000/api/experience");
        const data = res.data.data;
        setExperiences(data);
        setFilteredExperiences(data);
        
        // Extract all technologies for floating animation
        const allTechs = data.flatMap(exp => 
          exp.technologies?.split(',').map(t => t.trim()).filter(Boolean) || []
        );
        const uniqueTechs = [...new Set(allTechs)];
        setFloatingTechs(uniqueTechs.slice(0, 10)); // Limit to 10 for performance
      } catch (error) {
        console.error("Failed to fetch experience", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  // Filter experiences by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredExperiences(experiences);
    } else {
      const filtered = experiences.filter(exp => 
        exp.technologies?.toLowerCase().includes(activeCategory) ||
        exp.title?.toLowerCase().includes(activeCategory) ||
        exp.role?.toLowerCase().includes(activeCategory)
      );
      setFilteredExperiences(filtered);
    }
  }, [activeCategory, experiences]);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate) return "";
    
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`;
    return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  };

  // Count technologies
  const countTechnologies = () => {
    const allTechs = experiences.flatMap(exp => 
      exp.technologies?.split(',').map(t => t.trim()).filter(Boolean) || []
    );
    return new Set(allTechs).size;
  };

  // Count tools
  const countTools = () => {
    const toolKeywords = ['git', 'docker', 'aws', 'figma', 'vscode', 'jenkins', 'jira'];
    const allTechs = experiences.flatMap(exp => 
      exp.technologies?.split(',').map(t => t.trim().toLowerCase()) || []
    );
    return allTechs.filter(tech => toolKeywords.some(keyword => tech.includes(keyword))).length;
  };

  // Handle card hover
  const handleCardHover = (index, isHovering) => {
    setHoveredCard(isHovering ? index : null);
  };

  // Handle category change with animation
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    
    // Add visual feedback for category change
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('pulse'));
    
    setTimeout(() => {
      const activeBtn = document.querySelector(`.filter-btn.${category === "all" ? "active" : category}`);
      if (activeBtn) activeBtn.classList.add('pulse');
    }, 10);
  };

  return (
    <HelmetProvider>
      <section className="experience-arsenal">
        <Helmet>
          <title>{meta?.title || "Portfolio"} | Experience</title>
          <meta name="description" content={meta?.description || "Experience"} />
        </Helmet>

        {/* Animated Background Elements */}
        <div className="animated-bg">
          {floatingTechs.map((tech, index) => (
            <FloatingTechTag key={index} tech={tech} index={index} />
          ))}
          <div className="bg-orbit orbit-1"></div>
          <div className="bg-orbit orbit-2"></div>
          <div className="bg-orbit orbit-3"></div>
        </div>

        {/* Header Section with Animations */}
        <AnimatedWrapper direction="down">
          <div className="arsenal-header">
            <div className="header-badge">
              <FaStar className="sparkle-icon" />
              <span className="badge-text">D E S</span>
              <FaStar className="sparkle-icon" />
            </div>
            
            <h1 className="arsenal-title">
              <span className="title-word title-word-1">My</span>
              <span className="title-word title-word-2">Technical</span>
              <span className="title-word title-word-3">Arsenal</span>
            </h1>
            
            <AnimatedWrapper delay={0.3} direction="up">
              <p className="arsenal-subtitle">
                A comprehensive showcase of my technical expertise and professional capabilities
              </p>
            </AnimatedWrapper>
            
            {/* Scroll Indicator */}
            <AnimatedWrapper delay={1} direction="up">
              <div className="scroll-indicator">
                <FaArrowDown className="scroll-arrow" />
                <span className="scroll-text">Scroll to explore</span>
              </div>
            </AnimatedWrapper>
          </div>
        </AnimatedWrapper>

        {/* Stats Counter with Counting Animation */}
        <AnimatedWrapper delay={0.5} direction="up">
          <div className="arsenal-stats">
            <AnimatedStat 
              icon={FaLaptopCode}
              number={countTechnologies()}
              label="TECHNICAL SKILLS"
              duration={1500}
            />
            
            <AnimatedStat 
              icon={FaTools}
              number={countTools()}
              label="TOOLS & TECHNOLOGIES"
              duration={1800}
            />
            
            <AnimatedStat 
              icon={FaUserFriends}
              number={3}
              label="SOFT SKILLS"
              duration={1200}
            />
          </div>
        </AnimatedWrapper>

        {/* Category Filters with Hover Effects */}
        <AnimatedWrapper delay={0.7} direction="up">
          <div className="category-filters">
            <button 
              className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => handleCategoryChange("all")}
            >
              <FaBriefcase />
              <span>All Experience</span>
              <span className="filter-badge">{experiences.length}</span>
            </button>
            
            <button 
              className={`filter-btn ${activeCategory === "frontend" ? "active" : ""}`}
              onClick={() => handleCategoryChange("frontend")}
            >
              <FaLaptopCode />
              <span>Front-End</span>
              <span className="filter-badge">
                {experiences.filter(exp => exp.technologies?.toLowerCase().includes('react')).length}
              </span>
            </button>
            
            <button 
              className={`filter-btn ${activeCategory === "backend" ? "active" : ""}`}
              onClick={() => handleCategoryChange("backend")}
            >
              <FaServer />
              <span>Back-End</span>
              <span className="filter-badge">
                {experiences.filter(exp => exp.technologies?.toLowerCase().includes('node')).length}
              </span>
            </button>
            
            <button 
              className={`filter-btn ${activeCategory === "fullstack" ? "active" : ""}`}
              onClick={() => handleCategoryChange("fullstack")}
            >
              <FaCode />
              <span>Full Stack</span>
              <span className="filter-badge">
                {experiences.filter(exp => 
                  exp.technologies?.toLowerCase().includes('react') && 
                  exp.technologies?.toLowerCase().includes('node')
                ).length}
              </span>
            </button>
          </div>
        </AnimatedWrapper>

        {/* Experience Grid */}
        {loading ? (
          <AnimatedWrapper>
            <div className="arsenal-loading">
              <div className="loading-orb">
                <div className="orb-inner"></div>
                <div className="orb-ring orb-ring-1"></div>
                <div className="orb-ring orb-ring-2"></div>
                <div className="orb-ring orb-ring-3"></div>
              </div>
              <p className="loading-text">Loading experience arsenal...</p>
            </div>
          </AnimatedWrapper>
        ) : filteredExperiences.length === 0 ? (
          <AnimatedWrapper>
            <div className="no-experience">
              <FaBriefcase className="no-exp-icon" />
              <p>No experience data available for this category</p>
            </div>
          </AnimatedWrapper>
        ) : (
          <div className="experience-grid" ref={gridRef}>
            {filteredExperiences.map((exp, index) => (
              <AnimatedWrapper key={exp._id} delay={index * 0.1} direction="up">
                <div 
                  className={`experience-card ${hoveredCard === index ? 'hovered' : ''} ${index % 3 === 0 ? "featured" : ""}`}
                  onMouseEnter={() => handleCardHover(index, true)}
                  onMouseLeave={() => handleCardHover(index, false)}
                  onClick={() => handleCardHover(index, !hoveredCard)}
                >
                  {/* Card Glow Effect */}
                  <div className="card-glow"></div>
                  
                  <div className="card-gradient-border">
                    <div className="card-content">
                      {/* Card Header with Animation */}
                      <div className="card-header">
                        <div className="company-badge">
                          <FaBuilding className="company-icon" />
                          <div className="badge-pulse"></div>
                        </div>
                        <div className="header-text">
                          <h3 className="card-title">
                            <span className="title-highlight">{exp.title}</span>
                          </h3>
                          <p className="card-company">
                            <span className="company-glow">{exp.company}</span>
                          </p>
                          <span className="card-role">{exp.role}</span>
                        </div>
                      </div>

                      {/* Duration & Location */}
                      <div className="card-meta">
                        <div className="meta-item">
                          <FaCalendarAlt className="meta-icon text-white" />
                          <span className="meta-text">
                            {formatDate(exp.startDate)} — {exp.endDate ? formatDate(exp.endDate) : "Present"}
                            <span className="meta-duration">
                              ({calculateDuration(exp.startDate, exp.endDate)})
                            </span>
                          </span>
                        </div>
                        <div className="meta-item">
                          <FaMapMarkerAlt className="meta-icon text-white" />
                          <span className="meta-text">{exp.location}</span>
                        </div>
                      </div>

                      {/* Description with Expand Animation */}
                      <div className={`card-description ${hoveredCard === index ? 'expanded' : ''}`}>
                        <p>{exp.description}</p>
                      </div>

                      {/* Designation with Typewriter Effect */}
                      <div className="card-designation">
                        <span className="designation-label">Designation:</span>
                        <span className="designation-value typewriter">
                          {exp.designation}
                        </span>
                      </div>

                      {/* Responsibilities with Stagger Animation */}
                      <div className="card-responsibilities">
                        <h4 className="section-title">
                          <FaRocket className="section-icon rocket-icon mr-5" />
                          Key Responsibilities
                        </h4>
                        <ul className="responsibilities-list">
                          {exp.responsibilities?.split("\n").filter(Boolean).map((item, idx) => (
                            <li 
                              key={idx} 
                              className="responsibility-item"
                              style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                              <span className="bullet">
                                <span className="bullet-inner"></span>
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies with Float Animation */}
                      <div className="card-technologies">
                        <h4 className="section-title">
                          <FaCode className="section-icon" />
                          Technical Stack
                        </h4>
                        <div className="tech-tags">
                          {exp.technologies?.split(",").map((tech, idx) => (
                            <span 
                              key={idx} 
                              className={`tech-tag ${tech.toLowerCase().includes('react') ? 'frontend' : 
                                                tech.toLowerCase().includes('node') ? 'backend' : 
                                                tech.toLowerCase().includes('aws') ? 'tool' : ''}`}
                              style={{ animationDelay: `${idx * 0.05}s` }}
                            >
                              {tech.trim()}
                              <span className="tech-glow"></span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience Level Indicator with Fill Animation */}
                      <div className="experience-level">
                        <div className="level-bar">
                          <div 
                            className="level-fill"
                            style={{
                              width: `${Math.min((parseInt(calculateDuration(exp.startDate, exp.endDate).split(' ')[0]) || 1) * 20, 100)}%`,
                              transitionDelay: '0.5s'
                            }}
                          ></div>
                        </div>
                        <span className="level-text">
                          {calculateDuration(exp.startDate, exp.endDate)} Experience
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        )}

        {/* Footer Stats with Slide Animation */}
        <AnimatedWrapper delay={0.3} direction="up">
          <div className="arsenal-footer">
            <div className="footer-stat">
              <span className="footer-stat-number">{filteredExperiences.length}</span>
              <span className="footer-stat-label">Professional Experiences</span>
            </div>
            <div className="footer-stat">
              <span className="footer-stat-number">{countTechnologies()}</span>
              <span className="footer-stat-label">Technologies Mastered</span>
            </div>
            <div className="footer-stat">
              <span className="footer-stat-number">
                {filteredExperiences.reduce((acc, exp) => {
                  const years = parseInt(calculateDuration(exp.startDate, exp.endDate).split(' ')[0]) || 0;
                  return acc + years;
                }, 0)}
              </span>
              <span className="footer-stat-label">Years of Expertise</span>
            </div>
          </div>
        </AnimatedWrapper>

        {/* Parallax Elements */}
        <div className="parallax-layer layer-1" data-speed="0.1"></div>
        <div className="parallax-layer layer-2" data-speed="0.3"></div>
        <div className="parallax-layer layer-3" data-speed="0.5"></div>
      </section>
    </HelmetProvider>
  );
};