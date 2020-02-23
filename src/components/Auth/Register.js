import React, { Component, useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

let Register = props => {
  const [userForm, setusreForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  return (
    <div>
      <Form>
        <Form.Group as={Col} controlId="userName">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            placeholder="Enter UserName"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter First Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
