import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
    frontEnd,
    backEnd,
    tools,
    softSkills,
    meta,
} from "../../content_option";

export const Skill = () => {
    return (
        <HelmetProvider>
            <Container className="About-header">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> About | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="my-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mt-3">Skills</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5">
                        <h3 className="color_sec py-4">Front-End</h3>
                    </Col>
                    <Col lg="7">
                        {frontEnd.map((data, i) => (
                            <div key={i}>
                                <h3 className="progress-title">{data.name}</h3>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${data.value}%` }}
                                    >
                                        <div className="progress-value">
                                            {data.value}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5">
                        <h3 className="color_sec py-4">Back-End</h3>
                    </Col>
                    <Col lg="7">
                        {backEnd.map((data, i) => (
                            <div key={i}>
                                <h3 className="progress-title">{data.name}</h3>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${data.value}%` }}
                                    >
                                        <div className="progress-value">
                                            {data.value}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5">
                        <h3 className="color_sec py-4">Tools</h3>
                    </Col>
                    <Col lg="7">
                        {tools.map((data, i) => (
                            <div key={i}>
                                <h3 className="progress-title">{data.name}</h3>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${data.value}%` }}
                                    >
                                        <div className="progress-value">
                                            {data.value}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5">
                        <h3 className="color_sec py-4">Soft Skills</h3>
                    </Col>
                    <Col lg="7">
                        {softSkills.map((data, i) => (
                            <div key={i}>
                                <h3 className="progress-title">{data.name}</h3>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${data.value}%` }}
                                    >
                                        <div className="progress-value">
                                            {data.value}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};
export default Skill;
