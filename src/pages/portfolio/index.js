import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Card } from "react-bootstrap";
import { meta } from "../../content_option";
import axios from "axios";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiServer } from "react-icons/fi";

export const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    // Technology color mapping
    const techColors = {
        // Frontend
        "React": { bg: "#61DAFB", text: "#000", border: "#4DC0D1" },
        "TypeScript": { bg: "#3178C6", text: "#fff", border: "#235A97" },
        "JavaScript": { bg: "#F7DF1E", text: "#000", border: "#D6BA1C" },
        "HTML": { bg: "#E34F26", text: "#fff", border: "#C03A1E" },
        "CSS": { bg: "#1572B6", text: "#fff", border: "#115C94" },
        "Tailwind CSS": { bg: "#06B6D4", text: "#fff", border: "#0891B2" },
        "Bootstrap": { bg: "#7952B3", text: "#fff", border: "#5E3A9E" },
        "Sass": { bg: "#CC6699", text: "#fff", border: "#B35982" },
        "Redux": { bg: "#764ABC", text: "#fff", border: "#5E3894" },
        "Next.js": { bg: "#000000", text: "#fff", border: "#333" },
        "Vue.js": { bg: "#4FC08D", text: "#fff", border: "#3DA375" },
        "Angular": { bg: "#DD0031", text: "#fff", border: "#B30027" },
        
        // Backend
        "Node.js": { bg: "#339933", text: "#fff", border: "#267326" },
        "Express": { bg: "#000000", text: "#fff", border: "#333" },
        "Python": { bg: "#3776AB", text: "#fff", border: "#2C6095" },
        "Django": { bg: "#092E20", text: "#fff", border: "#061A14" },
        "FastAPI": { bg: "#009688", text: "#fff", border: "#00796B" },
        "Java": { bg: "#007396", text: "#fff", border: "#005A75" },
        "Spring": { bg: "#6DB33F", text: "#fff", border: "#5A9A32" },
        "PHP": { bg: "#777BB4", text: "#fff", border: "#5F6396" },
        "Laravel": { bg: "#FF2D20", text: "#fff", border: "#D7261B" },
        
        // Databases
        "MongoDB": { bg: "#47A248", text: "#fff", border: "#3A823A" },
        "PostgreSQL": { bg: "#336791", text: "#fff", border: "#2A5578" },
        "MySQL": { bg: "#4479A1", text: "#fff", border: "#366287" },
        "Firebase": { bg: "#FFCA28", text: "#000", border: "#F4B400" },
        "Redis": { bg: "#DC382D", text: "#fff", border: "#B82E25" },
        
        // Tools & Others
        "Git": { bg: "#F05032", text: "#fff", border: "#D93F25" },
        "Docker": { bg: "#2496ED", text: "#fff", border: "#1D7BC4" },
        "AWS": { bg: "#FF9900", text: "#000", border: "#E68A00" },
        "GraphQL": { bg: "#E10098", text: "#fff", border: "#C4007F" },
        "REST API": { bg: "#0099CC", text: "#fff", border: "#007AA3" },
        "JWT": { bg: "#000000", text: "#fff", border: "#333" },
        "Framer Motion": { bg: "#0055FF", text: "#fff", border: "#0044CC" },
        "Flowbite": { bg: "#764ABC", text: "#fff", border: "#5E3894" },
    };

    // Get color for a technology (default fallback)
    const getTechColor = (tech) => {
        return techColors[tech] || { 
            bg: "#6c757d", 
            text: "#fff", 
            border: "#545b62" 
        };
    };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("https://portfolio-backend-cyan-nine.vercel.app/api/project");
                // const res = await axios.get("https://portfolio-backend-cyan-nine.vercel.app /api/project");
                if (res.data && res.data.success) {
                    setProjects(res.data.data);
                    console.log(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching project data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        if (filter === "all") return true;
        if (filter === "fullstack") return project.githubLinkBackend;
        if (filter === "frontend") return !project.githubLinkBackend;
        if (filter === "featured") return project.featured || false;
        return true;
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
            }
        }
    };

    return (
        <HelmetProvider>
            <Container className="portfolio-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Projects | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="header-section mb-5"
                >
                    <Row className="">
                        <Col lg="12" className="text-center">
                            <h1 className="display-4  mb-3">My Projects</h1>
                            <p className="lead text-muted mb-2">
                                A collection of my recent work and experiments
                            </p>
                            
                            {/* Filter Buttons */}
                            <div className="filter-buttons mb-2 d-flex justify-content-center flex-wrap">
                                {["all", "frontend", "fullstack", "featured"].map((filterType) => (
                                    <button
                                        key={filterType}
                                        className={`filter-btn ${filter === filterType ? 'active' : ''}`}
                                        onClick={() => setFilter(filterType)}
                                    >
                                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </motion.div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="projects-grid"
                    >
                        <div className="grid-wrapper">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, i) => (
                                    <motion.div
                                        key={i}
                                        variants={cardVariants}
                                        whileHover="hover"
                                        className="project-card-wrapper"
                                        style={{ '--i': i }}
                                    >
                                        <Card className="project-card">
                                            {/* Project Image */}
                                            <div className="card-image-wrapper">
                                                <motion.img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="card-image"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                <div className="card-overlay" />
                                                
                                                {/* Tech Stack Badges (Image Overlay) */}
                                                <div className="tech-badges-overlay">
                                                    {project.technologies?.slice(0, 3).map((tech, idx) => {
                                                        const color = getTechColor(tech);
                                                        return (
                                                            <span
                                                                key={idx}
                                                                className="tech-badge-overlay"
                                                                style={{
                                                                    backgroundColor: color.bg,
                                                                    color: color.text,
                                                                    borderColor: color.border,
                                                                }}
                                                            >
                                                                {tech}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* Card Body */}
                                            <Card.Body className="card-body-custom">
                                                <Card.Title className="project-title">
                                                    {project.title}
                                                </Card.Title>
                                                <Card.Text className="project-description">
                                                    {project.description || "No description available"}
                                                </Card.Text>

                                                {/* Technology Stack Section */}
                                                <div className="technology-stack-section">
                                                    <strong className="tech-label">Technologies Used:</strong>
                                                    <div className="tech-badges-container">
                                                        {project.technologies && project.technologies.length > 0 ? (
                                                            project.technologies.map((tech, idx) => {
                                                                const color = getTechColor(tech);
                                                                return (
                                                                    <motion.span
                                                                        key={idx}
                                                                        className="tech-badge"
                                                                        style={{
                                                                            backgroundColor: color.bg,
                                                                            color: color.text,
                                                                            border: `1px solid ${color.border}`,
                                                                        }}
                                                                        whileHover={{ 
                                                                            scale: 1.1,
                                                                            boxShadow: `0 4px 12px ${color.bg}40`
                                                                        }}
                                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ delay: idx * 0.05 }}
                                                                    >
                                                                        {tech}
                                                                    </motion.span>
                                                                );
                                                            })
                                                        ) : (
                                                            <span className="no-tech-text">No technologies specified</span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                {/* Action Buttons */}
                                                <div className="action-buttons">
                                                    {project.liveLink && (
                                                        <motion.a
                                                            href={project.liveLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-custom btn-primary-custom btn-icon"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <FiExternalLink className="btn-icon" />
                                                            <span>Live Demo</span>
                                                        </motion.a>
                                                    )}
                                                    
                                                    {project.githubLinkFrontend && (
                                                        <motion.a
                                                            href={project.githubLinkFrontend}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-custom btn-outline-custom btn-icon"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <FiGithub className="btn-icon" />
                                                            <span>Frontend</span>
                                                        </motion.a>
                                                    )}
                                                    
                                                    {project.githubLinkBackend && (
                                                        <motion.a
                                                            href={project.githubLinkBackend}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn-custom btn-outline-custom btn-icon"
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <FiServer className="btn-icon" />
                                                            <span>Backend</span>
                                                        </motion.a>
                                                    )}
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <Col lg="12" className="text-center py-5">
                                    <h4 className="text-muted">No projects found for this filter</h4>
                                </Col>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Stats Section */}
                {projects.length > 0 && !loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="stats-section mt-5"
                    >
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <div className="stat-item">
                                    <h3 className="stat-number">{projects.length}</h3>
                                    <p className="stat-label">Total Projects</p>
                                </div>
                            </Col>
                            <Col xs="auto">
                                <div className="stat-item">
                                    <h3 className="stat-number">
                                        {projects.filter(p => p.githubLinkBackend).length}
                                    </h3>
                                    <p className="stat-label">Full Stack</p>
                                </div>
                            </Col>
                        </Row>
                    </motion.div>
                )}
            </Container>
        </HelmetProvider>
    );
};