import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Card,
  CardColumns,
  CardDeck,
  CardGroup,
  Button,
  InputGroup,
  Container,
  Col,
  Dropdown,
  Table
} from "react-bootstrap";

const Profile = props => {
  const [checkedOut, setCheckedOut] = useState([]);
  const [checkedOutAdmin, setCheckedOutAdmin] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userData, setUserData] = useState({});
  const [table, setTable] = useState(0);
  const user = useSelector(state => state.user);
  const { isAuth, role } = user;

  const getUserCheckout = () => {
    axios
      .post("/api/checkout/getUserCheckout", { userName: user.userName })
      .then(res => {
        setCheckedOut(res.data);
      })
      .catch(err => {});
  };

  const getUserCheckoutAdmin = (user) => {
    axios
      .post("/api/checkout/getUserCheckout", { userName: user.userName })
      .then(res => {
        setCheckedOutAdmin(res.data);
        console.log(res.data);
      })
      .catch(err => {});
  };

  const getUserList = () => {
    axios
      .get("/api/user/userList")
      .then(res => {
        setUserList(res.data);
      })
      .catch(err => {});
  }

  const getDeleteUser = (usert) => {
    axios
      .post("/api/user/deleteUser", { userName: usert.userName })
      .then(res => {
        getUserList();
        setTable(0);
      })
      .catch(err => {});
  }

  useEffect(() => {
    getUserCheckout();
    getUserList();
  }, []);


  const showUserData = (user) => {
    setUserData(user);
    getUserCheckoutAdmin(user);
    setTable(1);
  }


  const list = checkedOut.map(checkedOut => {
    return (
      <tr>
        <td>
          {" "}
          <b>{checkedOut.userName} </b>
        </td>
        <td>
          {" "}
          <i>{checkedOut.device}</i>{" "}
        </td>
        <td> {checkedOut.checkoutTime} </td>
      </tr>
    );
  });

  const adminList = checkedOutAdmin.map(checkedOut => {
    return (
      <tr>
        <td>
          {" "}
          <b>{checkedOut.userName} </b>
        </td>
        <td>
          {" "}
          <i>{checkedOut.device}</i>{" "}
        </td>
        <td> {checkedOut.checkoutTime} </td>
      </tr>
    );
  });

  const userListing = userList.map(users => {
    return(
      <Dropdown.Item onClick={() =>{showUserData(users); getUserCheckoutAdmin(users)}}>{users.userName}</Dropdown.Item>
    )
  });

  const divStyle = {
    marginTop: '26px',
    align: 'center',
  };

  const tableStyle ={
    marginTop: '26px',
    width: '1150px',
    
  };


  return (
    <div>
      {role != "admin" ? (
      <Container style={divStyle}>
        <h1>{user.userName}'s Profile Page</h1>
        <Table striped bordered hover variant="dark" style={tableStyle}>
          <thead>
            <tr><h4>User Checkout Times</h4><i>(If none are listed, no checkouts have been made)</i></tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </Table>
      </Container>
      ) : null}
      
      {/*//////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      {role == "admin" ? (
      <Container style={divStyle}>
        <h1 align='center'>Administrator Profile Page</h1>
          <Dropdown align="center" style={divStyle}>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              Select a User
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {userListing}
            </Dropdown.Menu>
          </Dropdown>
      </Container>

      
      ) : null}

      {/*//////////////////////////////////////////////////////////////////////////////////////////////////////// */}
      
      {table == 1 ? (
        <Container>
        <Table striped bordered hover variant="dark" style={tableStyle}>
          <thead>
            <tr>
              <th><h4>User Information</h4></th>
              <th><Container align="right"><Button variant="danger" onClick={() => {getDeleteUser(userData)}}>Delete User</Button></Container></th>
            </tr>
          </thead>
          <tbody>
            <tr><td colSpan="2"><h6><b><i>Username: </i></b></h6>{userData.userName}</td></tr>
            <tr><td colSpan="2"><h6><b><i>First Name: </i></b></h6>{userData.firstName}</td></tr>
            <tr><td colSpan="2"><h6><b><i>Last Name: </i></b></h6>{userData.lastName}</td></tr>
            <tr><td colSpan="2"><h6><b><i>Email: </i></b></h6>{userData.email}</td></tr>
          </tbody>
        </Table>
        <Table striped bordered hover variant="dark" style={tableStyle}> 
          <thead>
            <tr>
              <th><h4>User Checkout Times</h4><i>(If none are listed, no checkouts have been made)</i></th>
              <th><h5>Device</h5></th>
              <th><h5>Time of Checkout</h5></th>
            </tr>
          </thead>
          <tbody>
              {adminList}
          </tbody>
        </Table>
        </Container>
      ) : null}
    </div>
  );
};

export default Profile;
