import React, { Component } from "react";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Search from "../Search/Search";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router";
import { getInfo } from "../../redux/user.redux";
import { authSuccess } from "../../redux/user.redux";
import axios from "axios";

const Home = () => {
  return <div>HomePage</div>;
};

const noMatch = () => {
  return <div>noMatch</div>;
};

const createRoute = navList => {
  const routers = [];
  navList.forEach(element => {
    if (element.name === "Home") {
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
  });
  routers.push(<Route path="*" component={noMatch} key={noMatch}></Route>);
  console.log(routers);
  return routers;
};

class AuthRoute extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get("api/user/info")
      .then(res => {
        this.props.history.push("/search");
        console.log(res.data);
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

  render() {
    const isAuth = this.props.isAuth;
    console.log(isAuth);
    const navList = [
      {
        name: "Home",
        type: "home",
        path: "/",
        component: Home,
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
      }
    ];
    return (
      <div>
        <Navbar navList={navList}></Navbar>
        <Switch>{createRoute(navList)}</Switch>
      </div>
    );
  }
}

const mapStateToProps = state => state.user;

export default withRouter(connect(mapStateToProps)(AuthRoute));
