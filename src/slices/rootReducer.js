import { combineReducers } from "@reduxjs/toolkit";
import music from "./music";

export { actions as musicActions } from "./music";

const rootReducer = combineReducers({
  music,
});

export default rootReducer;
