import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Card, CardColumns, Button } from "react-bootstrap";
import AddModal from "../modal/addModal";
import InfoModal from "../modal/InfoModal";

const Search = props => {
  const [keyWords, setKeyWords] = useState("");
  const [devices, setDevices] = useState([
    { name: "a", keywords: ["doctor", "surgeon"] }
  ]);
  const [show, setShow] = useState({ InfoModal: false, addModal: false });

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
      <CardColumns>
        {devices.map(val => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{val.name}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant="outline-info"
                  onClick={() => {
                    setShow({ ...show, InfoModal: true });
                  }}
                >
                  Info
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setShow({ ...show, addModal: true });
                    console.log(show);
                  }}
                >
                  Add
                </Button>
                <InfoModal
                  show={show.InfoModal}
                  handleClose={() => {
                    setShow({ ...show, InfoModal: false });
                  }}
                  keywords={val.keywords}
                ></InfoModal>
                <AddModal
                  show={show.addModal}
                  handleClose={() => {
                    setShow({ ...show, addModal: false });
                  }}
                ></AddModal>
              </Card.Footer>
            </Card>
          );
        })}
      </CardColumns>
    </div>
  );
};

export default Search;
