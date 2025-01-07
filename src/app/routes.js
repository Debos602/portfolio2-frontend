import React from "react";
import { Route, Routes } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Skill } from "../pages/skill";

const AnimatedRoutes = withRouter(({ location }) => (
    <TransitionGroup>
        <CSSTransition
            key={location.key}
            timeout={{
                enter: 400,
                exit: 400,
            }}
            classNames="page"
            unmountOnExit
        >
            <Routes location={location}>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Portfolio />} />
                <Route path="/skills" element={<Skill />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </CSSTransition>
    </TransitionGroup>
));

function AppRoutes() {
    return (
        <div className="s_c">
            <AnimatedRoutes />
            <Socialicons />
        </div>
    );
}

export default AppRoutes;
