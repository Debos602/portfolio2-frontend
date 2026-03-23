import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { meta } from "../../content_option";
import "../Blog/style.css";

// Icons (install react-icons: npm install react-icons)
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowRight,
  FaShareAlt,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

export const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const blogsPerPage = 4;

    useEffect(() => {
        setLoading(true);
        axios
            // .get("https://portfolio-backend-cyan-nine.vercel.app/api/blogs")
            .get("https://portfolio-backend-cyan-nine.vercel.app/api/blogs")
            .then((res) => {
                if (res.data?.success) {
                    setBlogs(res.data.data);
                    setSelectedBlog(res.data.data[0]);
                }
            })
            .catch((err) => {
                console.error("Blog fetch error:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const blogPostVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            },
        },
    };

    const blogListVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { 
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            },
        }),
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    if (loading) {
        return (
            <section className="blog-section">
                <Container>
                    <Row>
                        <Col lg={12} className="text-center py-5">
                            <div className="loading-spinner"></div>
                            <p className="mt-3">Loading articles...</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }

    return (
        <HelmetProvider>
            <section className="blog-section">
                <Helmet>
                    <title>{meta.title} | Blog</title>
                    <meta name="description" content={meta.description} />
                </Helmet>

                {/* Hero Header */}
                <div className="blog-hero">
                    <Container>
                        <Row className="align-items-center">
                            <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h1 className="page-title">
                                        Latest <span className="gradient-text">Articles</span>
                                    </h1>
                                    <p className="hero-subtitle text-center">
                                        Insights, tutorials, and thoughts on web development, 
                                        design, and technology
                                    </p>
                                </motion.div>
                        </Row>
                    </Container>
                </div>

                <Container>
                    <Row className="mt-3">
                        {/* Featured Blog - Large */}
                        <Col lg={8}>
                            <motion.div
                                variants={blogPostVariants}
                                initial="hidden"
                                animate="visible"
                                className="featured-blog"
                            >
                                {selectedBlog && (
                                    <>
                                        <div className="blog-image-container">
                                            <img
                                                src={selectedBlog.image}
                                                alt={selectedBlog.title}
                                                className="featured-image"
                                            />
                                            <div className="blog-badge">
                                                Featured
                                            </div>
                                            <div className="image-overlay"></div>
                                        </div>
                                        <div className="blog-content">
                                            <div className="blog-meta">
                                                <span className="meta-item">
                                                    <FaCalendarAlt /> {selectedBlog.date || "Jan 1, 2024"}
                                                </span>
                                                <span className="meta-item">
                                                    <FaUser /> {selectedBlog.author || "Admin"}
                                                </span>
                                                <span className="meta-item">
                                                    <FaTag /> {selectedBlog.category || "Technology"}
                                                </span>
                                            </div>
                                            <h2 className="featured-title">{selectedBlog.title}</h2>
                                            <p className="featured-excerpt">{selectedBlog.description}</p>
                                            <div className="blog-actions">
                                                <button className="read-more-btn">
                                                    Read Full Article <FaArrowRight />
                                                </button>
                                                <div className="action-icons">
                                                    <button className="icon-btn">
                                                        <FaBookmark />
                                                    </button>
                                                    <button className="icon-btn">
                                                        <FaShareAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </motion.div>

                            {/* Recent Articles Grid */}
                            <div className="recent-articles mt-5">
                                <h3 className="section-title">Recent Articles</h3>
                                <Row>
                                    {currentBlogs.map((blog, index) => (
                                        <Col lg={6} key={blog._id}>
                                            <motion.div
                                                variants={blogListVariants}
                                                custom={index}
                                                initial="hidden"
                                                animate="visible"
                                                className="blog-card"
                                                onClick={() => setSelectedBlog(blog)}
                                            >
                                                <div className="card-image">
                                                    <img src={blog.image} alt={blog.title} />
                                                </div>
                                                <div className="card-content">
                                                    <div className="card-meta">
                                                        <span>{blog.date || "Jan 1, 2024"}</span>
                                                        <span>•</span>
                                                        <span>{blog.readTime || "5 min read"}</span>
                                                    </div>
                                                    <h4>{blog.title}</h4>
                                                    <p>{blog.description.slice(0, 80)}...</p>
                                                    <div className="card-tags">
                                                        {blog.tags?.slice(0, 2).map(tag => (
                                                            <span key={tag} className="tag">{tag}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Col>
                                    ))}
                                </Row>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="pagination mt-4">
                                        <button 
                                            className="page-btn"
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <FaChevronLeft /> Previous
                                        </button>
                                        <div className="page-numbers">
                                            {[...Array(totalPages)].map((_, i) => (
                                                <button
                                                    key={i}
                                                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                                                    onClick={() => setCurrentPage(i + 1)}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <button 
                                            className="page-btn"
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next <FaChevronRight />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </Col>

                        {/* Sidebar - Enhanced */}
                        <Col lg={4}>
                            <div className="sidebar">
                                {/* Categories */}
                                <div className="sidebar-widget">
                                    <h4 className="widget-title">Categories</h4>
                                    <ul className="category-list">
                                        {['Technology', 'Design', 'Development', 'Business', 'Lifestyle'].map(cat => (
                                            <li key={cat}>
                                                <a href="#" className="category-link">
                                                    <span className="category-name">{cat}</span>
                                                    <span className="category-count">12</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Popular Posts */}
                                <div className="sidebar-widget">
                                    <h4 className="widget-title">Popular Posts</h4>
                                    <motion.ul 
                                        variants={staggerContainer}
                                        initial="hidden"
                                        animate="visible"
                                        className="popular-posts"
                                    >
                                        {blogs.slice(0, 3).map((blog, i) => (
                                            <motion.li 
                                                key={blog._id}
                                                variants={blogListVariants}
                                                custom={i}
                                                onClick={() => setSelectedBlog(blog)}
                                                className={`popular-post ${selectedBlog?._id === blog._id ? 'active' : ''}`}
                                            >
                                                <div className="post-image">
                                                    <img src={blog.image} alt={blog.title} />
                                                </div>
                                                <div className="post-info">
                                                    <h5>{blog.title}</h5>
                                                    <span className="post-date">{blog.date || "Jan 1, 2024"}</span>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </div>

                                {/* Newsletter Widget */}
                                <div className="sidebar-widget newsletter-widget">
                                    <h4 className="widget-title">Stay Updated</h4>
                                    <p>Get the latest articles delivered to your inbox</p>
                                    <div className="newsletter-form">
                                        <input type="email" placeholder="Your email address" />
                                        <button className="subscribe-btn-small">Subscribe</button>
                                    </div>
                                </div>

                                {/* Tags Cloud */}
                                <div className="sidebar-widget">
                                    <h4 className="widget-title">Tags</h4>
                                    <div className="tags-cloud">
                                        {['React', 'JavaScript', 'CSS', 'Node.js', 'API', 'Design', 'Web3', 'AI'].map(tag => (
                                            <span key={tag} className="tag-cloud">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </HelmetProvider>
    );
};

export default Blog;