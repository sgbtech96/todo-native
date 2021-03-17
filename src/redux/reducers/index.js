import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import spinner from "./spinner";
export default combineReducers({
  auth,
  profile,
  spinning: spinner,
});
