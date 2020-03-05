import React, { Component, useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../../redux/user.redux";

const Register = props => {
  const [userForm, setusreForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(register(userForm));
  };
  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setusreForm({
      ...userForm,
      [name]: value
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Col} controlId="userName">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            name="userName"
            type="text"
            placeholder="Enter UserName"
            value={userForm.userName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={userForm.firstName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={userForm.lastName}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={userForm.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            value={userForm.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Password"
            value={userForm.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
