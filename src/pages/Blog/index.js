import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { meta } from "../../content_option";

export const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        // Fetch blogs data https://portfolio-backend-cyan-nine.vercel.app/ http://localhost:5000
        axios
            .get("https://portfolio-backend-cyan-nine.vercel.app/api/blogs")
            .then((response) => {
                if (response.data.success) {
                    setBlogs(response.data.data);
                    setSelectedBlog(response.data.data[0]); // Set the first blog as the default selected blog
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the blog data!",
                    error
                );
            });
    }, []);

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    // Animation variants
    const blogPostVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
        },
    };

    const blogListVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, delay: i * 0.2, ease: "easeInOut" },
        }),
    };

    return (
        <HelmetProvider>
            <Container className="blog-section">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title} | Blog</title>
                    <meta name="description" content={meta.description} />
                </Helmet>

                <Row className=" pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mt-3">Blog</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>

                <Row className=" mt-3 pt-md-3">
                    <Col lg="9">
                        {selectedBlog && (
                            <motion.div
                                className="blog-post"
                                variants={blogPostVariants}
                                initial="hidden"
                                animate="visible"
                                key={selectedBlog._id} // Key to trigger animation on blog change
                            >
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="blog-image"
                                />
                                <div className="blog-content">
                                    <h2 className="blog-title">
                                        {selectedBlog.title}
                                    </h2>
                                    <p className="blog-description">
                                        {selectedBlog.description}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </Col>
                    <Col lg="3">
                        <div className="sidebar">
                            <ul className="blog-list">
                                {blogs.map((blog, i) => (
                                    <motion.li
                                        key={blog._id}
                                        className={`blog-list-item mb-2 ${
                                            selectedBlog?._id === blog._id
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => handleBlogClick(blog)}
                                        variants={blogListVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={i} // Pass index to control stagger delay
                                    >
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="blog-list-image"
                                        />
                                        <div className="blog-list-content">
                                            <h3 className="blog-list-title">
                                                {blog.title}
                                            </h3>
                                            <p className="blog-list-description">
                                                {blog.description.substring(
                                                    0,
                                                    50
                                                )}
                                                ...
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};
