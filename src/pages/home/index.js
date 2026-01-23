import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import dot from "../../assets/images/dot.png";

// Inline page sections to show on the home page
import { Portfolio } from "../portfolio";
import { Experience } from "../experience";
import { Blog } from "../Blog";
import { ContactUs } from "../contact";

export const Home = () => {
    return (
        <HelmetProvider>
            <section id="home" className="home">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <div className="intro_sec d-block d-lg-flex align-items-center">
                    <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
                        <div className="align-self-center">
                            <div className="intro mx-auto">
                                <h2 className="mb-1x fade-in">{introdata.title}</h2>
                                <h1 className="fluidz-48 mb-1x fade-in">
                                    <Typewriter
                                        options={{
                                            strings: [
                                                introdata.animated.first,
                                                introdata.animated.second,
                                                introdata.animated.third,
                                            ],
                                            autoStart: true,
                                            loop: true,
                                            deleteSpeed: 10,
                                            delay: 50,
                                        }}
                                    />
                                </h1>
                                <p className="mb-1x fade-in">{introdata.description}</p>
                                <div className="intro_btn-action pb-5 fade-in">
                                    <a
                                        href="https://drive.google.com/file/d/1bFFPCCqDMDH3bvNpgqW-R2cfmWTlrvXo/view"
                                        className="text_2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        <div id="button_p" className="ac_btn btn">
                                            My Resume
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </a>
                                    <Link to="/contact">
                                        <div id="button_h" className="ac_btn btn">
                                            Contact Me
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="h_bg-image order-1 order-lg-2 h-100"
                        style={{
                            backgroundImage: `url(${introdata.your_img_url})`,
                        }}
                    >
                        <div
                            className="dot"
                            style={{
                                backgroundImage: `url(${dot})`,
                            }}
                        ></div>
                    </div>
                </div>
            </section>

            {/* Inline other page sections */}
            
            <Portfolio />
            <Experience />
            <ContactUs />

        </HelmetProvider>
    );
};