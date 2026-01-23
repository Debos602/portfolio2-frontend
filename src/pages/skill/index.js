import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
    frontEnd,
    backEnd,
    tools,
    softSkills,
    meta,
} from "../../content_option";
import "./style.css";

// Icons (install react-icons: npm install react-icons)
import {
    FaReact,
    FaNodeJs,
    FaDatabase,
    FaTools,
    FaUsers,
    FaCode,
    FaServer,
    FaPalette,
    FaChartLine,
    FaLightbulb,
    FaRocket,
    FaChevronRight,
    FaStar,
    FaFire
} from "react-icons/fa";

export const Skill = () => {
    const [activeCategory, setActiveCategory] = useState("frontend");
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const categories = [
        { id: "frontend", name: "Front-End", icon: <FaCode />, skills: frontEnd, color: "#6C63FF" },
        { id: "backend", name: "Back-End", icon: <FaServer />, skills: backEnd, color: "#FF6B8B" },
        { id: "tools", name: "Tools", icon: <FaTools />, skills: tools, color: "#4DC9F0" },
        { id: "soft", name: "Soft Skills", icon: <FaUsers />, skills: softSkills, color: "#FFA36C" },
    ];

    const getActiveSkills = () => {
        return categories.find(cat => cat.id === activeCategory)?.skills || [];
    };

    const getIconForSkill = (skillName) => {
        const icons = {
            // Front-End
            "React": <FaReact className="skill-icon" style={{ color: "#61DAFB" }} />,
            "Vue": <FaPalette className="skill-icon" style={{ color: "#4FC08D" }} />,
            "Angular": <FaCode className="skill-icon" style={{ color: "#DD0031" }} />,
            "JavaScript": <FaCode className="skill-icon" style={{ color: "#F7DF1E" }} />,
            "TypeScript": <FaCode className="skill-icon" style={{ color: "#3178C6" }} />,
            "HTML/CSS": <FaPalette className="skill-icon" style={{ color: "#E34F26" }} />,
            
            // Back-End
            "Node.js": <FaNodeJs className="skill-icon" style={{ color: "#339933" }} />,
            "Python": <FaServer className="skill-icon" style={{ color: "#3776AB" }} />,
            "Java": <FaServer className="skill-icon" style={{ color: "#007396" }} />,
            "PHP": <FaServer className="skill-icon" style={{ color: "#777BB4" }} />,
            "Database": <FaDatabase className="skill-icon" style={{ color: "#4479A1" }} />,
            
            // Tools
            "Git": <FaTools className="skill-icon" style={{ color: "#F05032" }} />,
            "Docker": <FaTools className="skill-icon" style={{ color: "#2496ED" }} />,
            "AWS": <FaTools className="skill-icon" style={{ color: "#FF9900" }} />,
            "CI/CD": <FaTools className="skill-icon" style={{ color: "#4DC9F0" }} />,
            
            // Soft Skills
            "Communication": <FaUsers className="skill-icon" style={{ color: "#FF6B8B" }} />,
            "Problem Solving": <FaLightbulb className="skill-icon" style={{ color: "#FFD700" }} />,
            "Leadership": <FaChartLine className="skill-icon" style={{ color: "#6C63FF" }} />,
            "Teamwork": <FaUsers className="skill-icon" style={{ color: "#4CAF50" }} />,
            "Creativity": <FaPalette className="skill-icon" style={{ color: "#9C27B0" }} />,
        };
        
        return icons[skillName] || <FaStar className="skill-icon" style={{ color: "#FFA36C" }} />;
    };

    const getSkillLevelLabel = (percentage) => {
        if (percentage >= 90) return { label: "Expert", color: "#4ADE80", icon: <FaFire /> };
        if (percentage >= 75) return { label: "Advanced", color: "#60A5FA", icon: <FaRocket /> };
        if (percentage >= 60) return { label: "Intermediate", color: "#FBBF24", icon: <FaStar /> };
        return { label: "Basic", color: "#A78BFA", icon: <FaStar /> };
    };

    return (
        <HelmetProvider>
            <Container className="skills-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Skills | {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>

                {/* Animated Background */}
                <div className="skills-background">
                    <div className="bg-shape shape-1"></div>
                    <div className="bg-shape shape-2"></div>
                    <div className="bg-shape shape-3"></div>
                </div>

                {/* Hero Section */}
                <Row className="">
                    <Col lg={12}>
                        <div className="skills-header">
                            <h1 className="display-3 mb-3 skills-title">
                                My <span className="gradient-text">Technical</span> Arsenal
                            </h1>
                            <p className="skills-subtitle">
                                A comprehensive showcase of my technical expertise and professional capabilities
                            </p>
                            <div className="skills-stats">
                                <div className="stat">
                                    <div className="stat-number">{frontEnd.length + backEnd.length}</div>
                                    <div className="stat-label">Technical Skills</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">{tools.length}</div>
                                    <div className="stat-label">Tools & Technologies</div>
                                </div>
                                <div className="stat">
                                    <div className="stat-number">{softSkills.length}</div>
                                    <div className="stat-label">Soft Skills</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Skills Navigation */}
                <Row className="mb-5">
                    <Col lg={12}>
                        <div className="skills-navigation">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`skill-category-btn ${
                                        activeCategory === category.id ? "active" : ""
                                    }`}
                                    onClick={() => setActiveCategory(category.id)}
                                    style={{
                                        '--category-color': category.color,
                                    }}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    <span className="category-name">{category.name}</span>
                                    <span className="category-count">{category.skills.length}</span>
                                    <span className="active-indicator">
                                        <FaChevronRight />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </Col>
                </Row>

                {/* Main Skills Display */}
                <Row className="skills-display">
                    <Col lg={4}>
                        <div className="skills-sidebar">
                            <div className="sidebar-header">
                                <h3>Skill Overview</h3>
                                <p>Interactive visualization of expertise levels</p>
                            </div>
                            <div className="legend">
                                <div className="legend-item">
                                    <div className="legend-color expert"></div>
                                    <span>Expert (90-100%)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color advanced"></div>
                                    <span>Advanced (75-89%)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color intermediate"></div>
                                    <span>Intermediate (60-74%)</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color basic"></div>
                                    <span>Basic (Below 60%)</span>
                                </div>
                            </div>
                            <div className="sidebar-footer">
                                <h4>Skill Distribution</h4>
                                <div className="distribution-chart">
                                    {categories.map((cat) => {
                                        const category = categories.find(c => c.id === cat.id);
                                        const avgSkill = category.skills.reduce((acc, skill) => acc + skill.value, 0) / category.skills.length;
                                        return (
                                            <div key={cat.id} className="distribution-item">
                                                <div className="dist-label">
                                                    <span className="dist-color" style={{ backgroundColor: cat.color }}></span>
                                                    {cat.name}
                                                </div>
                                                <div className="dist-bar">
                                                    <div 
                                                        className="dist-fill" 
                                                        style={{ 
                                                            width: `${avgSkill}%`,
                                                            backgroundColor: cat.color 
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="dist-percentage">{Math.round(avgSkill)}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col lg={8}>
                        <div className="skills-grid">
                            {getActiveSkills().map((skill, index) => {
                                const levelInfo = getSkillLevelLabel(skill.value);
                                const isHovered = hoveredSkill === skill.name;
                                
                                return (
                                    <div
                                        key={index}
                                        className={`skill-card ${
                                            isHovered ? "hovered" : ""
                                        }`}
                                        onMouseEnter={() => setHoveredSkill(skill.name)}
                                        onMouseLeave={() => setHoveredSkill(null)}
                                        style={{
                                            '--skill-color': categories.find(c => c.id === activeCategory)?.color,
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    >
                                        <div className="skill-card-header">
                                            <div className="skill-icon-container">
                                                {getIconForSkill(skill.name)}
                                            </div>
                                            <div className="skill-info">
                                                <h4 className="skill-name">{skill.name}</h4>
                                                <div className="skill-level">
                                                    <span className="level-icon">{levelInfo.icon}</span>
                                                    <span 
                                                        className="level-label" 
                                                        style={{ color: levelInfo.color }}
                                                    >
                                                        {levelInfo.label}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="skill-progress">
                                            <div className="progress-labels">
                                                <span className="progress-value">{skill.value}%</span>
                                                <span className="progress-text">Proficiency</span>
                                            </div>
                                            <div className="progress-container">
                                                <div 
                                                    className="progress-bar" 
                                                    style={{ width: `${skill.value}%` }}
                                                >
                                                    <div className="progress-glow"></div>
                                                </div>
                                                <div className="progress-ticks">
                                                    {[0, 25, 50, 75, 100].map((tick) => (
                                                        <div 
                                                            key={tick} 
                                                            className="progress-tick"
                                                            style={{ left: `${tick}%` }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {isHovered && (
                                            <div className="skill-hover-details">
                                                <div className="detail-item">
                                                    <span className="detail-label">Experience</span>
                                                    <span className="detail-value">2+ Years</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Projects</span>
                                                    <span className="detail-value">15+</span>
                                                </div>
                                                <div className="detail-item">
                                                    <span className="detail-label">Last Used</span>
                                                    <span className="detail-value">This Month</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Skills Summary */}
                        <div className="skills-summary">
                            <h3 className="summary-title">
                                {categories.find(c => c.id === activeCategory)?.name} Skills Summary
                            </h3>
                            <p className="summary-description">
                                I specialize in building responsive, high-performance applications with a focus on 
                                user experience and clean code architecture.
                            </p>
                            <div className="summary-stats">
                                <div className="summary-stat">
                                    <div className="summary-number">
                                        {Math.round(
                                            getActiveSkills().reduce((acc, skill) => acc + skill.value, 0) / 
                                            getActiveSkills().length
                                        )}%
                                    </div>
                                    <div className="summary-label">Average Proficiency</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="summary-number">
                                        {getActiveSkills().filter(s => s.value >= 80).length}
                                    </div>
                                    <div className="summary-label">Expert Skills</div>
                                </div>
                                <div className="summary-stat">
                                    <div className="summary-number">
                                        {getActiveSkills().length}
                                    </div>
                                    <div className="summary-label">Total Skills</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* All Skills Comparison */}
                <Row className="mt-5">
                    <Col lg={12}>
                        <div className="comparison-section">
                            <h3 className="comparison-title">Skill Matrix Comparison</h3>
                            <div className="comparison-grid">
                                {categories.map((category) => (
                                    <div key={category.id} className="comparison-card">
                                        <div 
                                            className="comparison-header" 
                                            style={{ backgroundColor: `${category.color}20` }}
                                        >
                                            <span className="comparison-icon">{category.icon}</span>
                                            <h4>{category.name}</h4>
                                        </div>
                                        <div className="comparison-body">
                                            <div className="comparison-progress">
                                                <div 
                                                    className="comparison-bar" 
                                                    style={{ 
                                                        width: `${(
                                                            category.skills.reduce((acc, skill) => acc + skill.value, 0) / 
                                                            category.skills.length
                                                        )}%`,
                                                        background: category.color 
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="comparison-stats">
                                                <span className="comparison-avg">
                                                    Avg: {Math.round(
                                                        category.skills.reduce((acc, skill) => acc + skill.value, 0) / 
                                                        category.skills.length
                                                    )}%
                                                </span>
                                                <span className="comparison-count">
                                                    {category.skills.length} skills
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </HelmetProvider>
    );
};

export default Skill;