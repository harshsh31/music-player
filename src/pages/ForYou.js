import React, { useEffect } from "react";
import axios from "axios";
import SongList from "../components/SongList";
import { useDispatch, useSelector } from "react-redux";
import { musicActions } from "../slices/rootReducer";
import SearchBar from "../components/SearchBar";
import { addDurationsToSongs } from "../utils/utils";

const ForYou = ({ isTopTrack = false }) => {
  const dispatch = useDispatch();
  const { loading, songs } = useSelector((state) => state.music);

  useEffect(() => {
    const fetchData = async () => {
      if (songs.length > 0) return;
      await dispatch(musicActions.setLoading(true));
      axios
        .get("https://cms.samespace.com/items/songs")
        .then(async (response) => {
          const songs = await addDurationsToSongs(response.data.data);
          dispatch(musicActions.setSongs(songs));
        })
        .catch((error) => {
          console.error("Error fetching songs:", error);
        })
        .finally(() => {
          dispatch(musicActions.setLoading(false));
        });
    };
    fetchData();
  }, [dispatch, songs.length]);

  return loading ? (
    <div className="loaderWrapper">
      <div class="loader"></div>
    </div>
  ) : (
    <>
      <div className="app">
        <SearchBar />
        <SongList isTopTrack={isTopTrack} />
      </div>
    </>
  );
};

export default ForYou;
