import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import {
  FaCalendarAlt, FaMapMarkerAlt, FaBriefcase,
  FaCode, FaBuilding, FaRocket,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import "./style.css";

/* ─── Scroll-reveal wrapper ──────────────── */
const Reveal = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 });
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

export const Experience = () => {
  const [experiences, setExperiences]         = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [activeCategory, setActiveCategory]   = useState("all");
  const [filtered, setFiltered]               = useState([]);
  const [expanded, setExpanded]               = useState(null);

  const categories = [
    { id: "all",       label: "All" },
    { id: "frontend",  label: "Frontend" },
    { id: "backend",   label: "Backend" },
    { id: "fullstack", label: "Full Stack" },
  ];

  useEffect(() => {
    axios.get("https://portfolio-backend-cyan-nine.vercel.app/api/experience")
      .then(res => {
        const data = res.data.data;
        setExperiences(data);
        setFiltered(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "all") return setFiltered(experiences);
    setFiltered(experiences.filter(e =>
      e.technologies?.toLowerCase().includes(activeCategory) ||
      e.title?.toLowerCase().includes(activeCategory) ||
      e.role?.toLowerCase().includes(activeCategory)
    ));
  }, [activeCategory, experiences]);

  const fmt = d => d ? new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

  const duration = (start, end) => {
    if (!start) return "";
    const s = new Date(start), e = end ? new Date(end) : new Date();
    const m = (e.getFullYear() - s.getFullYear()) * 12 + e.getMonth() - s.getMonth();
    const y = Math.floor(m / 12), r = m % 12;
    if (!y) return `${r}mo`;
    if (!r) return `${y}yr`;
    return `${y}yr ${r}mo`;
  };

  const countTech = () => new Set(
    experiences.flatMap(e => e.technologies?.split(",").map(t => t.trim()).filter(Boolean) || [])
  ).size;

  return (
    <HelmetProvider>
      <section className="exp-section">
        <Helmet>
          <title>{meta?.title} | Experience</title>
          <meta name="description" content={meta?.description} />
        </Helmet>

        {/* ── Background ── */}
        <div className="exp-grid-bg" aria-hidden />
        <div className="exp-blob exp-blob-a" aria-hidden />
        <div className="exp-blob exp-blob-b" aria-hidden />

        {/* ── Header ── */}
        <Reveal>
          <div className="exp-header">
            <span className="exp-eyebrow">Work History</span>
            <h1 className="exp-title">
              Experience
              
            </h1>
           
          </div>
        </Reveal>

      
        {/* ── Filters ── */}
        <Reveal delay={0.15}>
          <div className="exp-filters">
            {categories.map(c => (
              <button
                key={c.id}
                className={`exp-filter ${activeCategory === c.id ? "active" : ""}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Timeline ── */}
        {loading ? (
          <div className="exp-loading">
            <div className="exp-spinner" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="exp-timeline">
            {/* vertical rail */}
            <div className="exp-rail" aria-hidden />

            {filtered.map((exp, i) => {
              const isOpen = expanded === i;
              const techs  = exp.technologies?.split(",").map(t => t.trim()).filter(Boolean) || [];

              return (
                <Reveal key={exp._id} delay={i * 0.08}>
                  <div className={`exp-row ${i % 2 === 0 ? "left" : "right"}`}>

                    {/* ── Dot on rail ── */}
                    <div className="exp-dot">
                      <div className="exp-dot-inner" />
                      <div className="exp-dot-ring" />
                    </div>

                    {/* ── Date pill (opposite side) ── */}
                    <div className="exp-date-col">
                      <span className="exp-date-pill">
                        {fmt(exp.startDate)} — {exp.endDate ? fmt(exp.endDate) : "Present"}
                      </span>
                      <span className="exp-dur">{duration(exp.startDate, exp.endDate)}</span>
                    </div>

                    {/* ── Card ── */}
                    <div className={`exp-card ${isOpen ? "open" : ""}`}
                         onClick={() => setExpanded(isOpen ? null : i)}>

                      {/* Top accent line */}
                      <div className="exp-card-accent" />

                      {/* Card header */}
                      <div className="exp-card-head">
                        <div className="exp-icon">
                          <FaBuilding />
                        </div>
                        <div className="exp-card-info">
                          <h3 className="exp-card-title">{exp.title}</h3>
                          <p className="exp-card-company">{exp.company}</p>
                          <span className="exp-card-role">{exp.role}</span>
                        </div>
                        <div className="exp-card-meta-side">
                          {exp.location && (
                            <span className="exp-location">
                              <FaMapMarkerAlt /> {exp.location}
                            </span>
                          )}
                          <span className={`exp-toggle ${isOpen ? "open" : ""}`}>
                            {isOpen ? "−" : "+"}
                          </span>
                        </div>
                      </div>

                      {/* Tech pills always visible */}
                      <div className="exp-tech-row">
                        {techs.slice(0, 5).map((t, idx) => (
                          <span key={idx} className="exp-tech">{t}</span>
                        ))}
                        {techs.length > 5 && (
                          <span className="exp-tech exp-tech-more">+{techs.length - 5}</span>
                        )}
                      </div>

                      {/* Expandable details */}
                      <div className={`exp-details ${isOpen ? "open" : ""}`}>
                        {exp.description && (
                          <p className="exp-desc">{exp.description}</p>
                        )}

                        {exp.designation && (
                          <div className="exp-designation">
                            <span className="exp-designation-label">Designation</span>
                            <span className="exp-designation-value">{exp.designation}</span>
                          </div>
                        )}

                        {exp.responsibilities && (
                          <div className="exp-resp">
                            <h4 className="exp-resp-title">
                              <FaRocket /> Key Responsibilities
                            </h4>
                            <ul>
                              {exp.responsibilities.split("\n").filter(Boolean).map((r, idx) => (
                                <li key={idx}>
                                  <span className="exp-bullet" />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* All techs expanded */}
                        {techs.length > 5 && (
                          <div className="exp-all-tech">
                            <h4 className="exp-resp-title">
                              <FaCode /> Full Tech Stack
                            </h4>
                            <div className="exp-tech-row">
                              {techs.map((t, idx) => (
                                <span key={idx} className="exp-tech">{t}</span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>
    </HelmetProvider>
  );
};