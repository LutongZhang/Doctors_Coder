import axios from "axios";
import msg from "../message";

//action
const AUTH_SUCCESS = "AUTH_SUCCESS";

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
    default:
      return state;
  }
}

//action creation

const authSuccess = userInfo => {
  const action = { type: AUTH_SUCCESS, info: userInfo };
  return action;
};

//open function

const login = input => {};

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
        console.log(res.data);
        dispatch(authSuccess(res.data.data));
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
