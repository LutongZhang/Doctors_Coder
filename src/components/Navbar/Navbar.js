import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import { logOut } from "../../redux/user.redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }
  logOut = () => {
    console.log(this.props.dispatch(logOut()));
  };
  render() {
    const list = this.props.navList.filter(element => element.hide === false);
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to="/">
            {list[0].name}
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              {list
                .filter(element => element.type === "main")
                .map(element => {
                  return (
                    <li key={element.name} class="nav-item">
                      <Link class="nav-link" to={element.path}>
                        {element.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
            <ul class="navbar-nav ml-auto">
              {list
                .filter(element => element.type === "user")
                .map(element => {
                  if (element.name !== "UserCenter") {
                    return (
                      <li key={element.name} class="nav-item">
                        <Link class="nav-link" to={element.path}>
                          {element.name}
                        </Link>
                      </li>
                    );
                  } else {
                    console.log(element);
                    return (
                      <div key={element.name}>
                        <DropdownButton
                          alignRight
                          title={this.props.user.userName}
                          id="dropdown-menu-align-right"
                        >
                          {element.subItem.map((subItem, key) => {
                            if (subItem.name !== "logOut") {
                              return (
                                <Dropdown.Item
                                  eventKey={key}
                                  key={key}
                                  as={Link}
                                  to={subItem.path}
                                >
                                  {subItem.name}
                                </Dropdown.Item>
                              );
                            } else {
                              return (
                                <div key={key}>
                                  <Dropdown.Divider />
                                  <Dropdown.Item
                                    eventKey={key}
                                    onClick={this.logOut}
                                  >
                                    Log Out
                                  </Dropdown.Item>
                                </div>
                              );
                            }
                          })}
                        </DropdownButton>
                      </div>
                    );
                  }
                })}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(state => state)(Navbar);
