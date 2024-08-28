import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = useSelector((state) => state.music.tabs);
  return (
    <nav>
      {tabs.map((route) => (
        <div
          key={route.path}
          onClick={() => navigate(route.path)}
          className={`navbar ${
            location.pathname === route.path ? "active" : ""
          }`}
        >
          {location.pathname === route.path && (
            <motion.span
              layoutId="bubble"
              className="bubble"
              style={{ borderRadius: 9 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {route.title}
        </div>
      ))}
    </nav>
  );
};

export default Nav;
