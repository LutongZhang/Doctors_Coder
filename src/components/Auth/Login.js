import React, { Component, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Col, Modal, Button, Drop } from "react-bootstrap";
import { login } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = props => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispacher = useDispatch();

  const [credentialsForm, setCredentialsForm] = useState({
    userName: "",
    password: ""
  });

  const formUpdate = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setCredentialsForm({
      ...credentialsForm,
      [name]: value
    });
  };

  const handleLogin = e => {
    dispacher(login(credentialsForm));
  };

  return (
    <div>
      {isAuth ? (
        <Redirect
          to={{
            pathname: "/search"
          }}
        ></Redirect>
      ) : null}
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="userName"
                value={credentialsForm.username}
                onChange={formUpdate}
              ></Form.Control>
            </Form.Group>{" "}
            {/* End of username form*/}
            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentialsForm.password}
                onChange={formUpdate}
              ></Form.Control>
            </Form.Group>{" "}
            {/* End of password form*/}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" 
          style={{ 
                 bottom: "20px",
                 background: "#09c",
                 color: "#fff",
                 fontFamily: "tahoma,geneva,algerian",
                 border: "1px solid #999",}} 
          onClick={handleLogin}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default Login;

/* Source https://react-bootstrap.github.io/components/modal/ */
