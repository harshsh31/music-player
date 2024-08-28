import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { musicActions } from "../slices/rootReducer";
import { changeTheme } from "../utils/utils";

const Player = () => {
  const dispatch = useDispatch();
  const { songs, selectedSong } = useSelector((state) => state.music);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(selectedSong.url));

  const handleNext = useCallback(() => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    dispatch(
      musicActions.setSelectSong(
        currentIndex === songs.length - 1
          ? songs[0]
          : songs[(currentIndex + 1) % songs.length]
      )
    );
    setIsPlaying(true);
  }, [dispatch, selectedSong, songs]);

  const handlePrevious = useCallback(() => {
    const currentIndex = songs.findIndex((song) => song.id === selectedSong.id);
    dispatch(
      musicActions.setSelectSong(
        currentIndex === 0
          ? songs[songs.length - 1]
          : songs[(currentIndex - 1) % songs.length]
      )
    );
    setIsPlaying(true);
  }, [dispatch, selectedSong, songs]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeek = useCallback((e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  }, []);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const updProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(updProgress) ? 0 : updProgress);
    };
    audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);

    audioRef.current.pause();
    audioRef.current = new Audio(selectedSong.url);
    setProgress(0); 

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("ended", handleNext);

    setTimeout(function () {
      audioRef.current.play();
      setIsPlaying(true);
    }, 150);

    changeTheme(selectedSong.accent);

    // Cleanup event listener on component unmount or when the song changes
    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener("ended", handleNext);
    };
  }, [handleNext, selectedSong]);

  return (
    <motion.div
      className="player"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="songDetails">
        <h3 className="playerSongName">{selectedSong.name}</h3>
        <p className="playerSongArtist">{selectedSong.artist}</p>
      </div>
      <div
        style={{
          backgroundImage: `url(https://cms.samespace.com/assets/${selectedSong.cover})`,
        }}
        alt={selectedSong.title}
        className="cover"
      />
      <div className="controls">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="seeker"
        />
        <div className="buttons">
          <button className="audioControlButton" onClick={handlePrevious}>
            <i className="fa-solid fa-backward"></i>
          </button>
          <button
            className="audioControlButton playButton"
            onClick={togglePlayPause}
          >
            <i className={`fa-solid ${!isPlaying ? "fa-play" : "fa-pause"}`} />
          </button>
          <button className="audioControlButton" onClick={handleNext}>
            <i className="fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Player;
