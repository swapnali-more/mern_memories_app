import { combineReducers } from "redux";
import authReducer from "./auth";
import postsReducer from "./posts";

const rootReducer = combineReducers({
  posts: postsReducer,
  user: authReducer,
});

export default rootReducer;