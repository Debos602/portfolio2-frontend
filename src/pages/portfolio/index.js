import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { meta } from "../../content_option";
import axios from "axios";

export const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/project")
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

    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Portfolio | {meta.title} </title>{" "}
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <div className="d-flex gap-4">
                    {projects.map((project, i) => (
                        <div key={i} className="po_item">
                            <img
                                className=""
                                src={project.image}
                                alt={project.title}
                            />
                            <div className="content">
                                <h3>{project.title}</h3>

                                <a href={project.liveLink}>View Project</a>
                                <div>
                                    <a href={project.githubLinkFrontend}>
                                        Frontend Code
                                    </a>
                                    <a href={project.githubLinkBackend}>
                                        Backend Code
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </HelmetProvider>
    );
};
