
import React, { Component } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Search from '../Search/Search'
import { Switch, Route } from "react-router-dom";
import Navbar from '../Navbar/Navbar'

const Home = () => {
    return (
        <div>HomePage</div>
    )
}

const noMatch = () => {
    return (
        <div>noMatch</div>
    )
}

const createRoute = (navList) => {
    const routers = [];
    navList.forEach(element => {
        if (element.name === "Home") {
            routers.push(
                < Route path={element.path} exact key={element.name} component={element.component} ></Route >
            )
        }
        else {
            routers.push(
                < Route path={element.path} key={element.name} component={element.component} ></Route >
            )
        }
    })
    routers.push(<Route path="*" component={noMatch} key={noMatch}></Route>);
    console.log(routers)
    return routers;
}

class AuthRoute extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const navList = [
            {
                name: "Home",
                type: "home",
                path: '/',
                component: Home,
                hide: false
            },
            {
                name: "Search",
                path: '/search',
                type: "main",
                component: Search,
                hide: false,
            },
            {
                name: "Login",
                type: "user",
                path: '/login',
                component: Login,
                hide: false,
            },
            {
                name: "Register",
                type: "user",
                path: "/register",
                component: Register,
                hide: false,
            }
        ]
        return (
            <div>
                <Navbar navList={navList}></Navbar>
                <Switch>
                    {createRoute(navList)}
                </Switch>
            </div>
        )
    }

}


export default AuthRoute