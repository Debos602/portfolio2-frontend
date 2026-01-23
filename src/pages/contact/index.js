import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../../content_option";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
  FiUser, 
  FiMessageSquare,
  FiCheckCircle,
  FiLinkedin,
  FiGithub,
  FiTwitter
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export const ContactUs = () => {
    const [formData, setFormdata] = useState({
        email: "",
        name: "",
        message: "",
        loading: false,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        // Add form validation styles
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (e.target.value) {
                    e.target.classList.add('has-value');
                } else {
                    e.target.classList.remove('has-value');
                }
            });
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Enhanced validation
        if (!formData.email || !formData.name || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        setFormdata({ ...formData, loading: true });

        const templateParams = {
            from_name: formData.email,
            user_name: formData.name,
            to_name: contactConfig.YOUR_EMAIL,
            message: formData.message,
            timestamp: new Date().toISOString(),
        };

        emailjs
            .send(
                contactConfig.YOUR_SERVICE_ID,
                contactConfig.YOUR_TEMPLATE_ID,
                templateParams,
                contactConfig.YOUR_USER_ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    setFormdata({
                        email: "",
                        name: "",
                        message: "",
                        loading: false,
                    });
                    setIsSubmitted(true);
                    toast.success("Message sent successfully! I'll get back to you soon.");
                    
                    // Reset success state after 3 seconds
                    setTimeout(() => setIsSubmitted(false), 3000);
                },
                (error) => {
                    console.error(error.text);
                    setFormdata({
                        ...formData,
                        loading: false,
                    });
                    toast.error(`Failed to send message. Please try again.`);
                }
            );
    };

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFocus = (fieldName) => {
        setActiveField(fieldName);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const formVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const infoVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const socialLinks = [
        { icon: <FiLinkedin />, label: "LinkedIn", url: "https://linkedin.com" },
        { icon: <FiGithub />, label: "GitHub", url: "https://github.com" },
        { icon: <FiTwitter />, label: "Twitter", url: "https://twitter.com" },
        { icon: <FaWhatsapp />, label: "WhatsApp", url: "https://wa.me" },
    ];

    return (
        <HelmetProvider>
            <Container className="contact-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title} | Contact</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                
                {/* Animated Background Elements */}
                <div className="background-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                </div>

                <Row className="mb-5">
                    <Col lg={12}>
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="display-4 mb-3 text-center contact-title">
                                Get In <span className="gradient-text">Touch</span>
                            </h1>
                            <p className="lead text-center contact-subtitle">
                                Have a project in mind? Let's create something amazing together.
                            </p>
                        </motion.div>
                    </Col>
                </Row>

                <Row className="sec_sp">
                    <Col lg={6} className="mb-5">
                        <motion.div
                            variants={infoVariants}
                            initial="hidden"
                            animate="visible"
                            className="contact-info-card"
                        >
                            <h3 className="info-title">
                                <span className="title-decoration">Contact Information</span>
                            </h3>
                            <p className="info-description">
                                Feel free to reach out for collaborations or just a friendly hello
                            </p>
                            
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="contact-details"
                            >
                                <motion.div variants={itemVariants} className="contact-item">
                                    <div className="contact-icon email">
                                        <FiMail />
                                    </div>
                                    <div>
                                        <h5>Email</h5>
                                        <a href={`mailto:${contactConfig.YOUR_EMAIL}`} className="contact-link">
                                            {contactConfig.YOUR_EMAIL}
                                        </a>
                                    </div>
                                </motion.div>

                                {contactConfig.hasOwnProperty("YOUR_FONE") && (
                                    <motion.div variants={itemVariants} className="contact-item">
                                        <div className="contact-icon phone">
                                            <FiPhone />
                                        </div>
                                        <div>
                                            <h5>Phone</h5>
                                            <a href={`tel:${contactConfig.YOUR_FONE}`} className="contact-link">
                                                {contactConfig.YOUR_FONE}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {contactConfig.hasOwnProperty("YOUR_ADDRESS") && (
                                    <motion.div variants={itemVariants} className="contact-item">
                                        <div className="contact-icon address">
                                            <FiMapPin />
                                        </div>
                                        <div>
                                            <h5>Location</h5>
                                            <p className="contact-text">{contactConfig.YOUR_ADDRESS}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Social Links */}
                            <div className="social-section">
                                <h5 className="social-title">Connect with me</h5>
                                <div className="social-links">
                                    {socialLinks.map((link, index) => (
                                        <motion.a
                                            key={index}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {link.icon}
                                            <span className="tooltip">{link.label}</span>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="contact-stats">
                                <div className="stat-item">
                                    <div className="stat-number">24</div>
                                    <div className="stat-label">Hours Response</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-number">100%</div>
                                    <div className="stat-label">Success Rate</div>
                                </div>
                            </div>
                        </motion.div>
                    </Col>

                    <Col lg={6} className="d-flex align-items-center">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    className="success-message"
                                >
                                    <FiCheckCircle className="success-icon" />
                                    <h3>Message Sent!</h3>
                                    <p>Thank you for your message. I'll get back to you within 24 hours.</p>
                                    <motion.button
                                        className="btn back-btn"
                                        onClick={() => setIsSubmitted(false)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Send Another Message
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    ref={formRef}
                                    onSubmit={handleSubmit}
                                    className="contact__form w-100"
                                    variants={formVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <div className="form-header">
                                        <h3 className="form-title">
                                            <FiSend className="title-icon" />
                                            Send a Message
                                        </h3>
                                        <p className="form-subtitle">
                                            Fill out the form below and I'll respond as soon as possible
                                        </p>
                                    </div>

                                    <div className="form-group floating-label">
                                        <input
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name || ""}
                                            type="text"
                                            required
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={handleBlur}
                                        />
                                        <label htmlFor="name" className={activeField === 'name' || formData.name ? 'active' : ''}>
                                            <FiUser /> Your Name
                                        </label>
                                        <div className="focus-border"></div>
                                    </div>

                                    <div className="form-group floating-label">
                                        <input
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email || ""}
                                            required
                                            onChange={handleChange}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={handleBlur}
                                        />
                                        <label htmlFor="email" className={activeField === 'email' || formData.email ? 'active' : ''}>
                                            <FiMail /> Email Address
                                        </label>
                                        <div className="focus-border"></div>
                                    </div>

                                    <div className="form-group floating-label">
                                        <textarea
                                            className="form-control"
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            onFocus={() => handleFocus('message')}
                                            onBlur={handleBlur}
                                        ></textarea>
                                        <label htmlFor="message" className={activeField === 'message' || formData.message ? 'active' : ''}>
                                            <FiMessageSquare /> Your Message
                                        </label>
                                        <div className="focus-border"></div>
                                    </div>

                                    <motion.button
                                        className="btn submit-btn"
                                        type="submit"
                                        disabled={formData.loading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {formData.loading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <FiSend className="btn-icon" />
                                            </>
                                        )}
                                    </motion.button>

                                    <div className="form-footer">
                                        <p className="privacy-note">
                                            <FiCheckCircle /> Your information is secure and will never be shared.
                                        </p>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </Col>
                </Row>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="cta-section"
                >
                    <h4 className="cta-title">Ready to Start Your Project?</h4>
                    <p className="cta-text">Let's discuss how I can help bring your ideas to life</p>
                    <motion.a
                        href={`mailto:${contactConfig.YOUR_EMAIL}`}
                        className="btn cta-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Schedule a Call
                    </motion.a>
                </motion.div>
            </Container>
        </HelmetProvider>
    );
};