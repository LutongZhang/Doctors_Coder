import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const list = this.props.navList.filter(element => element.hide === false)
        return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <Link class="navbar-brand" to='/'>{list[0].name}</Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            {
                                list.filter(element => element.type === "main")
                                    .map(element => {
                                        return <li key={element.name} class="nav-item">
                                            <Link class="nav-link" to={element.path}>{element.name}</Link>
                                        </li>
                                    })

                            }
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            {
                                list.filter(element => element.type === "user")
                                    .map(element => {
                                        if (element.name !== "userProfile") {
                                            return <li key={element.name} class="nav-item">
                                                <Link class="nav-link" to={element.path}>{element.name}</Link>
                                            </li>
                                        }
                                        else {
                                            return <div></div>
                                        }
                                    })
                            }
                        </ul>
                    </div>
                </nav>
            </div >
        )
    }
}

export default Navbar;