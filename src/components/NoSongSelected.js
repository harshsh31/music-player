import React from "react";
import { motion } from "framer-motion";

const NoSongSelected = () => {
  return (
    <div className="noSongSelectedWrapper">
      <motion.div
        className="noSongSelected"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <p>No song selected. Please choose a song from the list.</p>
      </motion.div>
    </div>
  );
};

export default NoSongSelected;
