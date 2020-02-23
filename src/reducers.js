import { user } from "./redux/user.redux";
import { device } from "./redux/device.redux";
import { combineReducers } from "redux";

export default combineReducers({
  user: user,
  device: device
});
