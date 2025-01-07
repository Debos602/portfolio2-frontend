import React, { useState, useEffect } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import Themetoggle from "../components/themetoggle";
import logoLight from "../assets/images/1-removebg-preview.png";
import logoDark from "../assets/images/2__1_-removebg-preview.png";

const Headermain = () => {
    const [isActive, setActive] = useState("false");
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );
    const [animateLogo, setAnimateLogo] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
        document.body.classList.toggle("ovhidden");
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        setAnimateLogo(true);
    };

    useEffect(() => {
        if (animateLogo) {
            const timer = setTimeout(() => setAnimateLogo(false), 500);
            return () => clearTimeout(timer);
        }
    }, [animateLogo]);

    return (
        <>
            <header className="fixed-top site__header ">
                <div className="d-flex justify-content-between align-items-center ">
                    <img
                        src={theme === "light" ? logoDark : logoLight}
                        alt="logo"
                        className={`logo ${animateLogo ? "animate" : ""}`}
                    />
                    <ul className="the_menu d-flex justify-content-between m-0 p-0 gap-4">
                        <li className="menu_item">
                            <Link onClick={handleToggle} to="/" className="">
                                Home
                            </Link>
                        </li>
                        <li className="menu_item">
                            <Link
                                onClick={handleToggle}
                                to="/project"
                                className=""
                            >
                                Project
                            </Link>
                        </li>
                        <li className="menu_item">
                            <Link
                                onClick={handleToggle}
                                to="/skills"
                                className=""
                            >
                                Skills
                            </Link>
                        </li>

                        <li className="menu_item">
                            <Link
                                onClick={handleToggle}
                                to="/about"
                                className=""
                            >
                                About
                            </Link>
                        </li>
                        <li className="menu_item">
                            <Link
                                onClick={handleToggle}
                                to="/contact"
                                className=""
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center bg-white">
                        <Themetoggle onThemeChange={handleThemeChange} />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Headermain;
