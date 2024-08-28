import { createSlice } from "@reduxjs/toolkit";

const tabs = [
  { id: 0, title: "For You", path: "/for-you" },
  { id: 1, title: "Top Charts", path: "/top-tracks" },
];

const initialState = {
  songs: [],
  topCharts: [],
  selectedSong: null,
  searchTerm: "",
  selectedTab: tabs[0],
  tabs,
  loading: false,
};
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setSongs(state, action) {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.songs = action.payload;
        state.topCharts = action.payload.filter((song) => song.top_track);
      }
    },
    setSelectSong(state, action) {
      state.selectedSong = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setSelectedTab(state, action) {
      state.selectedTab = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const actions = musicSlice.actions;
export default musicSlice.reducer;
