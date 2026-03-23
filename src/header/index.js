import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import { logotext, socialprofils } from "../content_option";
import logo from "../assets/images/1-removebg-preview.png";
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { to: "/",           label: "Home" },
    { to: "/project",    label: "Project" },
    { to: "/experience", label: "Experience" },
    { to: "/skills",     label: "Skills" },
    { to: "/blog",       label: "Blog" },
    { to: "/about",      label: "About" },
    { to: "/contact",    label: "Contact" },
];

const menuVariants = {
    closed: {
        clipPath: "circle(0% at calc(100% - 48px) 40px)",
        transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
        clipPath: "circle(170% at calc(100% - 48px) 40px)",
        transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
    },
};

const listVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open:   { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};

const itemVariants = {
    closed: { opacity: 0, x: 60 },
    open:   { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const Headermain = () => {
    const [isOpen, setOpen]       = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location                = useLocation();
    const headerRef               = useRef(null);

    /* close on route change */
    useEffect(() => {
        setOpen(false);
        document.body.classList.remove("ovhidden");
    }, [location]);

    /* body scroll lock */
    useEffect(() => {
        document.body.classList.toggle("ovhidden", isOpen);
    }, [isOpen]);

    /* cleanup */
    useEffect(() => () => document.body.classList.remove("ovhidden"), []);

    /* header blur on scroll */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const toggle = () => setOpen((p) => !p);

    return (
        <>
            <header ref={headerRef} className={`site__header ${scrolled ? "scrolled" : ""}`}>
                <div className="header__inner">
                    {/* ── Logo ── */}
                    <Link to="/" className="header__logo" onClick={() => setOpen(false)}>
                        <img src={logo} alt="logo" className="logo-img" />
                        {/* <span className="logo-name">{logotext}</span> */}
                    </Link>

                    {/* ── Desktop Nav ── */}
                    <nav className="desktop-nav">
                        {NAV_LINKS.map(({ to, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`dnav__link ${location.pathname === to ? "active" : ""}`}
                            >
                                {label}
                                <span className="dnav__underline" />
                            </Link>
                        ))}
                    </nav>

                    {/* ── Hamburger ── */}
                    <button
                        className={`burger ${isOpen ? "open" : ""}`}
                        onClick={toggle}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        <span className="burger__line" />
                        <span className="burger__line" />
                        <span className="burger__line" />
                    </button>
                </div>
            </header>

            {/* ── Full-screen overlay menu ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="nav__overlay"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={menuVariants}
                    >
                        {/* Noise texture */}
                        <div className="overlay__noise" aria-hidden />

                        {/* Decorative orbs */}
                        <div className="overlay__orb orb--a" aria-hidden />
                        <div className="overlay__orb orb--b" aria-hidden />

                        {/* Grid lines */}
                        <div className="overlay__grid" aria-hidden />

                        <div className="overlay__inner">
                            {/* Nav links */}
                            <motion.ul
                                className="overlay__nav"
                                variants={listVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                {NAV_LINKS.map(({ to, label }, i) => (
                                    <motion.li key={to} variants={itemVariants}>
                                        <Link
                                            to={to}
                                            className={`overlay__link ${location.pathname === to ? "active" : ""}`}
                                            onClick={toggle}
                                        >
                                            <span className="link__num">0{i + 1}</span>
                                            <span className="link__label">{label}</span>
                                            <span className="link__arrow">→</span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>

                            {/* Footer row */}
                            <motion.div
                                className="overlay__footer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <div className="socials">
                                    <a href={socialprofils.facebook} target="_blank" rel="noreferrer" className="social__icon">
                                        <FaFacebook />
                                    </a>
                                    <a href={socialprofils.github} target="_blank" rel="noreferrer" className="social__icon">
                                        <FaGithub />
                                    </a>
                                    <a href={socialprofils.twitter} target="_blank" rel="noreferrer" className="social__icon">
                                        <FaTwitter />
                                    </a>
                                </div>
                                <p className="overlay__copy">© {new Date().getFullYear()} {logotext}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Headermain;