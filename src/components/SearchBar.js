import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { musicActions } from "../slices/rootReducer";

const SearchBar = () => {
  const dispatch = useDispatch();

  const onSearch = useCallback(
    (searchTerm) => {
      dispatch(musicActions.setSearchTerm(searchTerm));
    },
    [dispatch]
  );
  return (
    <div className="search">
      <span className="fa fa-search"></span>
      <input
        type="text"
        className="searchInput"
        placeholder="Search for Song, Artist..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
