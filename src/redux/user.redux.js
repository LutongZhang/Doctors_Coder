const AUTH_SUCCESS = "AUTH_SUCCESS"

let initialState = {
    userName: "",
    isAuth: false,
}

export function user(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, userName: action.userName, isAuth: true, ...action.info };
        default:
            return state;
    }
}

//action creation

const authSucees = userInfo => {
    const action = { type: AUTH_SUCCESS, info: userInfo }
    return action;
}

//open function

const login = (input) => {

}

const register = (input) => {

}



