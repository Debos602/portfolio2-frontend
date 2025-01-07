import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { useEffect, useState } from "react";
import axios from "axios";

export const Project = () => {
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
                    <title> Project | {meta.title} </title>{" "}
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mb-4"> Project </h1>{" "}
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <div className="">
                    {projects.map((project, i) => (
                        <div key={i} className="po_item">
                            <img
                                className="pro-img"
                                src={project.image}
                                alt={project.title}
                            />
                            <div className="content">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
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
