import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import axios from "axios";
import { motion } from "framer-motion";

export const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get("https://portfolio-backend-cyan-nine.vercel.app/api/project")
            .then((response) => {
                if (response.data.success) {
                    setProjects(response.data.data);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the project data!",
                    error
                );
            });
    }, []);

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8, // Increased duration for smoother effect
                delay: i * 0.2, // Slightly larger delay for each item
                ease: "linear", // Smooth easing
            },
        }),
    };

    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Project | {meta.title} </title>{" "}
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-3 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mt-3"> Project </h1>{" "}
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <div className="po-grid">
                    {projects.map((project, i) => (
                        <motion.div
                            key={i}
                            className="po_item"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i} // Pass the index as a custom prop
                        >
                            <img
                                className=""
                                src={project.image}
                                alt={project.title}
                            />
                            <div className="content">
                                <h3>{project.title}</h3>

                                <div className="d-flex justify-content-center gap-1 align-items-center flex-wrap">
                                    <a href={project.liveLink}>View Project</a>
                                    <a href={project.githubLinkFrontend}>
                                        Frontend Code
                                    </a>
                                    <a href={project.githubLinkBackend}>
                                        Backend Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </HelmetProvider>
    );
};
