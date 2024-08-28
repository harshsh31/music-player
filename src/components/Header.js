import React from "react";
import { motion } from "framer-motion";
import logo from "../logo.svg";

const Header = () => {
  return (
    <motion.header
      className="logo"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img src={logo} alt="Spotify" />
    </motion.header>
  );
};

export default Header;
