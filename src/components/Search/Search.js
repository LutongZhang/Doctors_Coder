import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const Search = props => {
  const [keyWords, setKeyWords] = useState("");
  const [devices, setDevices] = useState([]);

  const handleChange = e => {
    setKeyWords(e.target.value);
  };

  return (
    <div>
      <h2>Search for devices</h2>
      <Form.Control
        type=" text"
        placeholder="Search"
        value={keyWords}
        onChange={handleChange}
      ></Form.Control>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {devices.map(val => {})}
    </div>
  );
};

export default Search;
