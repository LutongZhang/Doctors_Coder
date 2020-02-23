import axios from "axios";

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
    return axios
      .post("api/user/Register", input)
      .then(res => {
        if (res.data.code === 1) {
          dispatch(authSuccess(res.data.data));
        }
      })
      .catch(err => {
        console.log("log in err", err);
      });
  };
};
