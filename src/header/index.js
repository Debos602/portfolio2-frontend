import React, { useState, useEffect } from "react";
import "./style.css";
import { VscGrabber, VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import logo from "../assets/images/1-removebg-preview.png";

const Headermain = () => {
    const [isActive, setActive] = useState(false);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const handleToggle = () => {
        setActive(!isActive);
        document.body.classList.toggle("ovhidden");
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <>
            <header className="fixed-top site__header">
                <div className="d-flex align-items-center justify-content-between">
                    <Link className="navbar-brand nav_ac" to="/">
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                    <div className="d-flex align-items-center">
                        <h4 onClick={handleToggle} className="mb-0 pe-2">
                            Menu
                        </h4>
                        <button
                            className="menu__button nav_ac"
                            onClick={handleToggle}
                        >
                            {isActive ? <VscClose /> : <VscGrabber />}
                        </button>
                    </div>
                </div>

                <div
                    className={`site__navigation ${
                        isActive ? "menu__opend" : ""
                    }`}
                >
                    <div className="bg__menu h-100">
                        <div className="menu__wrapper">
                            <div className="menu__container p-3">
                                <ul className="the_menu">
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/"
                                            className="my-2"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/project"
                                            className="my-2"
                                        >
                                            Project
                                        </Link>
                                    </li>
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/skills"
                                            className="my-2"
                                        >
                                            Skills
                                        </Link>
                                    </li>
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/blog"
                                            className="my-2"
                                        >
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/about"
                                            className="my-2"
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li className="menu_item">
                                        <Link
                                            onClick={handleToggle}
                                            to="/contact"
                                            className="my-2"
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="menu_footer d-flex flex-column flex-md-row justify-content-between align-items-md-center position-absolute w-100 p-3">
                        <div className="d-flex">
                            <a href={socialprofils.facebook}>Facebook</a>
                            <a href={socialprofils.github}>Github</a>
                            <a href={socialprofils.twitter}>Twitter</a>
                        </div>
                        <p className="copyright m-0">copyright __ {logotext}</p>
                    </div>
                </div>
            </header>
            <div className="br-top"></div>
            <div className="br-bottom"></div>
            <div className="br-left"></div>
            <div className="br-right"></div>
        </>
    );
};

export default Headermain;
