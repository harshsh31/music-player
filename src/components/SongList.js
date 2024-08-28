import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { musicActions } from "../slices/rootReducer";

const LIST_CONTAINER_VARIANTS = {
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
};

const LIST_ITEM_VARIANTS = {
  hidden: {
    y: -10,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const SongList = ({ isTopTrack = false }) => {
  const dispatch = useDispatch();
  const {
    songs: actualSongs,
    topCharts,
    selectedSong,
    searchTerm,
  } = useSelector((state) => state.music);
  const songs = isTopTrack ? topCharts : actualSongs;
  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const setSelectedSong = useCallback(
    (song) => {
      dispatch(musicActions.setSelectSong(song));
    },
    [dispatch]
  );

  return (
    <motion.ul
      variants={LIST_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="songsList"
    >
      {filteredSongs.map((song, i) => (
        <motion.li
          variants={i === 0 ? undefined : LIST_ITEM_VARIANTS}
          className={`songWrapper ${
            selectedSong !== null && selectedSong.id === song.id
              ? "playingSong"
              : ""
          }`}
          key={song.id}
          onClick={() => setSelectedSong(song)}
        >
          <div
            className="songImageContainer"
            style={{
              backgroundImage: `url(https://cms.samespace.com/assets/${song.cover})`,
            }}
          ></div>
          <div className="songNameWrapper">
            <h3 className="songName">{song.name}</h3>
            <p className="songArtist">{song.artist}</p>
          </div>
          <div className="songDuration">{song.duration}</div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default SongList;
