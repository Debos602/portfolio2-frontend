import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = ({ onThemeChange }) => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const themeToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (onThemeChange) {
            onThemeChange(newTheme);
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="nav_ac" onClick={themeToggle}>
            <WiMoonAltWaningCrescent4 />
        </div>
    );
};

export default Themetoggle;
