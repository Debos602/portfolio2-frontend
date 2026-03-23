import "./style.css";
import { useEffect, useRef } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Portfolio } from "../portfolio";
import { Experience } from "../experience";
import { ContactUs } from "../contact";

/* ─── Canvas Starfield ────────────────────── */
function StarCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;

        const NUM_STARS = 200;
        const SPEED = 0.5;
        const FOCAL = 400;

        let W = (canvas.width = window.innerWidth);
        let H = (canvas.height = window.innerHeight);

        const stars = Array.from({ length: NUM_STARS }, () => ({
            x: (Math.random() - 0.5) * W * 3,
            y: (Math.random() - 0.5) * H * 3,
            z: Math.random() * W,
            pz: 0,
            color: randomStarColor(),
        }));

        function randomStarColor() {
            const palette = ["#ff6ec7", "#00f5ff", "#ffe066", "#c77dff", "#ffffff", "#ffffff"];
            return palette[Math.floor(Math.random() * palette.length)];
        }

        function draw() {
            ctx.fillStyle = "rgba(2, 2, 18, 0.3)";
            ctx.fillRect(0, 0, W, H);

            for (let s of stars) {
                s.pz = s.z;
                s.z -= SPEED * (1 + s.z / 1200);
                if (s.z <= 0) {
                    s.x = (Math.random() - 0.5) * W * 3;
                    s.y = (Math.random() - 0.5) * H * 3;
                    s.z = W;
                    s.pz = s.z;
                    s.color = randomStarColor();
                }

                const sx = (s.x / s.z) * FOCAL + W / 2;
                const sy = (s.y / s.z) * FOCAL + H / 2;
                const px = (s.x / s.pz) * FOCAL + W / 2;
                const py = (s.y / s.pz) * FOCAL + H / 2;

                const size = Math.max(0.3, (1 - s.z / W) * 2.5);
                const alpha = Math.min(1, (1 - s.z / W) * 1.4);

                ctx.lineWidth = size;
                ctx.strokeStyle = s.color + Math.floor(alpha * 255).toString(16).padStart(2, "0");
                ctx.beginPath();
                ctx.moveTo(px, py);
                ctx.lineTo(sx, sy);
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(sx, sy, size * 0.8, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = alpha;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            animId = requestAnimationFrame(draw);
        }

        draw();

        const onResize = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="star-canvas" />;
}

/* ─── Orb — slow drift ────────────────────── */
function Orb({ style, color, size = 260, delay = 0 }) {
    return (
        <motion.div
            className="orb"
            style={{ width: size, height: size, background: color, ...style }}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay }}
        />
    );
}

/* ─── Ring — slow spin ────────────────────── */
function Ring({ style, color, size = 200, delay = 0 }) {
    return (
        <motion.div
            className="ring-3d"
            style={{ width: size, height: size, ...style }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear", delay }}
        >
            <div
                className="ring-3d-inner"
                style={{
                    border: `2px solid ${color}`,
                    boxShadow: `0 0 18px ${color}50, inset 0 0 10px ${color}25`,
                }}
            />
        </motion.div>
    );
}

/* ─── Variants — gentle fade up ──────────── */
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeIn = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

/* ─── Home ────────────────────────────────── */
export const Home = () => {
    return (
        <HelmetProvider>
            <section id="home" className="home">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{meta.title}</title>
                    <meta name="description" content={meta.description} />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Outfit:wght@300;400;500;600&display=swap"
                        rel="stylesheet"
                    />
                </Helmet>

                <StarCanvas />

                <div className="scene-3d" aria-hidden="true">
                    <Orb color="radial-gradient(circle at 35% 35%, #ff6ec7, #9b00ff 60%, #000)" size={300} style={{ top: "-60px", right: "8%" }} delay={0} />
                    <Orb color="radial-gradient(circle at 35% 35%, #00f5ff, #006fff 60%, #000)" size={150} style={{ bottom: "20%", left: "6%" }} delay={5} />
                    <Ring color="#00f5ff" size={250} style={{ top: "-50px", right: "7%", zIndex: 2 }} delay={0} />
                    <Ring color="#ff6ec7" size={130} style={{ bottom: "18%", left: "4%", zIndex: 2 }} delay={4} />
                </div>

                <div className="grid-overlay" aria-hidden="true" />

                <div className="hero-wrapper">
                    <motion.div className="hero-text" variants={stagger} initial="hidden" animate="show">

                        <motion.div className="status-badge" variants={fadeIn}>
                            <span className="badge-pulse" />
                            <span>Open to opportunities</span>
                        </motion.div>

                        <motion.p className="hero-greeting" variants={fadeIn}>
                            {introdata.title}
                        </motion.p>

                        <motion.div className="hero-role" variants={fadeIn}>
                            <span className="role-prefix">{"// "}</span>
                            <span className="role-text">
                                <Typewriter
                                    options={{
                                        strings: [
                                            introdata.animated.first,
                                            introdata.animated.second,
                                            introdata.animated.third,
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 15,
                                        delay: 60,
                                    }}
                                />
                            </span>
                        </motion.div>

                        <motion.p className="hero-desc" variants={fadeIn}>
                            {introdata.description}
                        </motion.p>

                        <motion.div className="hero-cta" variants={fadeIn}>
                            <a
                                href="https://drive.google.com/file/d/1U7iKNv02nK845ATKJeGq6IarzxzxLLKg/view?usp=sharing"
                                className="btn-glow"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="btn-glow-bg" />
                                <span className="btn-glow-label">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    Resume
                                </span>
                            </a>
                            <Link to="/contact" className="btn-outline-neon">
                                <span>Contact Me</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </Link>
                        </motion.div>

                        <motion.div className="hero-stats" variants={fadeIn}>
                            {[
                                { n: "3+", label: "Yrs Exp" },
                                { n: "30+", label: "Projects" },
                                { n: "20+", label: "Clients" },
                            ].map(({ n, label }) => (
                                <div className="stat-item" key={label}>
                                    <span className="stat-num">{n}</span>
                                    <span className="stat-label">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Profile image — simple fade, no scale/rotate jump */}
                    <motion.div
                        className="hero-img-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    >
                        <div className="img-frame">
                            <div className="img-inner" style={{ backgroundImage: `url(${introdata.your_img_url})` }} />
                            <div className="img-glow" />
                            <div className="img-border-spin" />
                        </div>
                    </motion.div>
                </div>

                <div className="scroll-hint">
                    <div className="scroll-line" />
                    <span>scroll</span>
                </div>
            </section>

            <Portfolio />
            <Experience />
            <ContactUs />
        </HelmetProvider>
    );
};