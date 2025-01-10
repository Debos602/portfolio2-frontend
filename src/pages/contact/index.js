import React, { useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../../content_option";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export const ContactUs = () => {
    const [formData, setFormdata] = useState({
        email: "",
        name: "",
        message: "",
        loading: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!formData.email || !formData.name || !formData.message) {
            toast.error("All fields are required.");
            return;
        }

        setFormdata({ ...formData, loading: true });

        const templateParams = {
            from_name: formData.email,
            user_name: formData.name,
            to_name: contactConfig.YOUR_EMAIL,
            message: formData.message,
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
                    toast.success("SUCCESS! Thank you for your message.");
                },
                (error) => {
                    console.error(error.text);
                    setFormdata({
                        ...formData,
                        loading: false,
                    });
                    toast.error(`Failed to send! ${error.text}`);
                }
            );
    };

    const handleChange = (e) => {
        setFormdata({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <HelmetProvider>
            <Container>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title} | Contact</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <Row className="mb-5 mt-3 pt-md-3">
                    <Col lg="8">
                        <h1 className="display-4 mt-3">Contact Me</h1>
                        <hr className="t_border my-4 ml-0 text-left" />
                    </Col>
                </Row>
                <Row className="sec_sp">
                    <Col lg="5" className="mb-5">
                        <h3 className="color_sec py-4">Get in touch</h3>
                        <address>
                            <strong>Email:</strong>{" "}
                            <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                                {contactConfig.YOUR_EMAIL}
                            </a>
                            <br />
                            <br />
                            {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                                <p>
                                    <strong>Phone:</strong>{" "}
                                    {contactConfig.YOUR_FONE}
                                </p>
                            ) : (
                                ""
                            )}
                        </address>
                        <p>{contactConfig.description}</p>
                    </Col>
                    <Col lg="7" className="d-flex align-items-center">
                        <form
                            onSubmit={handleSubmit}
                            className="contact__form w-100"
                        >
                            <Row>
                                <Col lg="6" className="form-group">
                                    <input
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        value={formData.name || ""}
                                        type="text"
                                        required
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col lg="6" className="form-group">
                                    <input
                                        className="form-control rounded-0"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        value={formData.email || ""}
                                        required
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <textarea
                                className="form-control rounded-0"
                                id="message"
                                name="message"
                                placeholder="Message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                            <br />
                            <Row>
                                <Col lg="12" className="form-group">
                                    <button
                                        className="btn ac_btn"
                                        type="submit"
                                    >
                                        {formData.loading
                                            ? "Sending..."
                                            : "Send"}
                                    </button>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};
