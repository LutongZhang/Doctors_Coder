import React, { Component, useEffect } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Search from "../Search/Search";
import Profile from "../userCenter/profile";
import ChangePwd from "../userCenter/changepwd";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { withRouter, Redirect } from "react-router";
import { authSuccess } from "../../redux/user.redux";
import axios from "axios";
import HomePage from "../HomePage/Homepage";

const NoMatch = props => {
  useEffect(() => {}, [props.isAuth]);
  console.log(1);
  return props.isAuth ? (
    <Redirect to="/search"></Redirect>
  ) : (
    <Redirect to="/login"></Redirect>
  );
};

const createRoute = (navList, isAuth) => {
  const routers = [];
  navList.forEach(element => {
    if (element.hide !== true) {
      if (element.name === "UserCenter") {
        element.subItem.forEach(subItem => {
          if (subItem.name !== "logOut") {
            routers.push(
              <Route
                path={subItem.path}
                key={subItem.name}
                component={subItem.component}
              ></Route>
            );
          }
        });
      } else if (element.name === "Home") {
        routers.push(
          <Route
            path={element.path}
            exact
            key={element.name}
            component={element.component}
          ></Route>
        );
      } else {
        routers.push(
          <Route
            path={element.path}
            key={element.name}
            component={element.component}
          ></Route>
        );
      }
    }
  });
  routers.push(
    <Route
      path="*"
      component={() => {
        return <NoMatch isAuth={isAuth}></NoMatch>;
      }}
      key={"NoMatch"}
    ></Route>
  );
  //console.log(routers);
  return routers;
};

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    axios
      .get("api/user/info")
      .then(res => {
        this.props.history.push("/search");

        this.props.dispatch(authSuccess(res.data));
      })
      .catch(e => {
        if (this.props.isAuth === false) {
          const limitedPath = ["/login", "/register"];
          if (
            limitedPath.indexOf(this.props.history.location.pathname) === -1
          ) {
            this.props.history.push("/login");
          }
        }
      });
  }
  componentDidMount() {}

  render() {
    const isAuth = this.props.isAuth;
    console.log("user", this.props);
    const navList = [
      {
        name: "Home",
        type: "home",
        path: "/",
        component: HomePage,
        hide: false
      },
      {
        name: "Search",
        path: "/search",
        type: "main",
        component: Search,
        hide: !isAuth
      },
      {
        name: "Login",
        type: "user",
        path: "/login",
        component: Login,
        hide: isAuth
      },
      {
        name: "Register",
        type: "user",
        path: "/register",
        component: Register,
        hide: isAuth
      },
      {
        name: "UserCenter",
        type: "user",
        hide: !isAuth,
        subItem: [
          {
            name: "logOut"
          },
          {
            name: "profile",
            path: "/profile",
            component: Profile
          },
          {
            name: "changePassword",
            path: "/changePassword",
            component: ChangePwd
          }
        ]
      }
    ];
    return (
      <div>
        <Navbar navList={navList}></Navbar>
        <Switch>{createRoute(navList, isAuth)}</Switch>
      </div>
    );
  }
}

const mapStateToProps = state => state.user;

export default withRouter(connect(mapStateToProps)(AuthRoute));
