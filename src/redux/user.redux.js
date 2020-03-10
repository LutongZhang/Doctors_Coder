import axios from "axios";
import msg from "../message";

//action
const AUTH_SUCCESS = "AUTH_SUCCESS";
const LOG_OUT = "LOG_OUT";

let initialState = {
  userName: "",
  isAuth: false
};

export function user(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        userName: action.userName,
        isAuth: true,
        ...action.info
      };
    case LOG_OUT:
      return { ...initialState };
    default:
      return state;
  }
}

//action creation

export const authSuccess = userInfo => {
  const action = { type: AUTH_SUCCESS, info: userInfo };
  return action;
};

export const logOut = () => {
  return { type: LOG_OUT };
};

//open function

export const login = input => {
  if (!input) {
    console.log("login input not exist");
    return;
  }
  console.log(input);
  return dispatch => {
    //loading start
    msg.createLoading();
    return axios
      .post("/api/user/login", input)
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
        //loading kill
        msg.killLoading();
      })
      .catch(err => {
        msg.alert("danger", err.response.data);
        console.log(err.response.data);
        //loading kill
        msg.killLoading();
      });
  };
};

export const register = input => {
  if (!input) {
    console.log("register input not exist");
    return;
  }

  return dispatch => {
    //loading start
    msg.createLoading();
    return axios
      .post("api/user/register", input)
      .then(res => {
        dispatch(authSuccess(res.data));
        //loading kill
        msg.killLoading();
      })
      .catch(err => {
        console.log("Registration err:", err);
        msg.alert("danger", err.response.data);
        //loading kill
        msg.killLoading();
      });
  };
};
