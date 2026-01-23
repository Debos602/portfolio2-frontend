import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col, Card } from "react-bootstrap";
import { dataabout, meta, worktimeline, services } from "../../content_option";
import { motion } from "framer-motion";
import { FaBriefcase, FaLightbulb, FaChartLine, FaCode, FaPalette, FaRocket } from "react-icons/fa";

export const About = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const serviceIcons = [FaCode, FaPalette, FaRocket, FaChartLine];

    return (
        <HelmetProvider>
            <Container className="about-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>About | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Row className="mb-5 mt-5">
                        <Col lg="8">
                            <h1 className="display-4 mb-3 gradient-text-main">
                                About <span className="highlight-text">Me</span>
                            </h1>
                            <p className="lead text-light mb-4">
                                Passionate developer creating digital experiences
                            </p>
                            <div className="gradient-line"></div>
                        </Col>
                    </Row>
                </motion.div>

                {/* About Section */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <Row className="about-section mb-5">
                        <Col lg="5">
                            <motion.div variants={fadeInUp}>
                                <h3 className="section-title color-gradient py-4">
                                    {dataabout.title}
                                </h3>
                                <div className="accent-box"></div>
                            </motion.div>
                        </Col>
                        <Col lg="7" className="d-flex align-items-center">
                            <motion.div variants={fadeInUp}>
                                <div className="about-content">
                                    <p className="about-text">{dataabout.aboutme}</p>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Work Timeline */}
                    <Row className="timeline-section mb-5">
                        <Col lg="5">
                            <motion.div variants={fadeInUp}>
                                <h3 className="section-title color-gradient py-4">
                                    <FaBriefcase className="me-3" />
                                    Work Timeline
                                </h3>
                                <div className="accent-box"></div>
                            </motion.div>
                        </Col>
                        <Col lg="7">
                            <motion.div variants={fadeInUp}>
                                <div className="timeline-container">
                                    {worktimeline.map((data, i) => (
                                        <div className="timeline-item" key={i}>
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <div className="timeline-header">
                                                    <h5 className="timeline-title">{data.jobtitle}</h5>
                                                    <span className="timeline-badge">{data.date}</span>
                                                </div>
                                                <p className="timeline-company text-muted">
                                                    <FaBriefcase className="me-2" />
                                                    {data.where}
                                                </p>
                                                {data.description && (
                                                    <p className="timeline-desc">{data.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Services */}
                    <Row className="services-section">
                        <Col lg="5">
                            <motion.div variants={fadeInUp}>
                                <h3 className="section-title color-gradient py-4">
                                    <FaLightbulb className="me-3" />
                                    My Services
                                </h3>
                                <div className="accent-box"></div>
                            </motion.div>
                        </Col>
                        <Col lg="7">
                            <motion.div 
                                variants={staggerContainer}
                                className="services-grid"
                            >
                                {services.map((data, i) => {
                                    const Icon = serviceIcons[i] || FaCode;
                                    return (
                                        <motion.div
                                            key={i}
                                            variants={fadeInUp}
                                            whileHover={{ y: -10, scale: 1.02 }}
                                            className="service-card"
                                        >
                                            <Card className="service-card-inner">
                                                <Card.Body>
                                                    <div className="service-icon-wrapper">
                                                        <Icon className="service-icon" />
                                                    </div>
                                                    <h5 className="service-title">{data.title}</h5>
                                                    <p className="service-desc">{data.description}</p>
                                                </Card.Body>
                                            </Card>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </Col>
                    </Row>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="stats-section mt-5"
                    >
                        <Row className="justify-content-center g-4">
                            <Col xs="6" md="3">
                                <div className="stat-card">
                                    <div className="stat-icon">+</div>
                                    <h3 className="stat-number">50+</h3>
                                    <p className="stat-label">Projects Completed</p>
                                </div>
                            </Col>
                            <Col xs="6" md="3">
                                <div className="stat-card">
                                    <div className="stat-icon">✓</div>
                                    <h3 className="stat-number">100%</h3>
                                    <p className="stat-label">Client Satisfaction</p>
                                </div>
                            </Col>
                            <Col xs="6" md="3">
                                <div className="stat-card">
                                    <div className="stat-icon">⭐</div>
                                    <h3 className="stat-number">5+</h3>
                                    <p className="stat-label">Years Experience</p>
                                </div>
                            </Col>
                            <Col xs="6" md="3">
                                <div className="stat-card">
                                    <div className="stat-icon">🔄</div>
                                    <h3 className="stat-number">24/7</h3>
                                    <p className="stat-label">Support</p>
                                </div>
                            </Col>
                        </Row>
                    </motion.div>
                </motion.div>
            </Container>
        </HelmetProvider>
    );
};