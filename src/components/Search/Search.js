import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import {
  Card,
  CardColumns,
  CardDeck,
  CardGroup,
  Button,
  InputGroup,
  Container,
  Col
} from "react-bootstrap";
import AddModal from "../modal/addModal";
import InfoModal from "../modal/InfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = props => {
  const [keyWords, setKeyWords] = useState("");
  const [show, setShow] = useState({ InfoModal: false, addModal: false });
  const [chosen, setChosen] = useState({ keywords: [] });
  const [devices, setDevices] = useState([
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] },
    { name: "a", keywords: ["doctor", "surgeon"] }
  ]);

  const handleChange = e => {
    setKeyWords(e.target.value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Search for devices</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Form.Row
          style={{
            width: "50%"
          }}
        >
          <Form.Group as={Col}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                value={keyWords}
                onChange={handleChange}
                type="text"
                placeholder="Search here.."
              />
            </InputGroup>
          </Form.Group>
        </Form.Row>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <CardColumns>
          {devices.map((val, index) => {
            return (
              <Card
                style={{ width: "80%" }}
                key={index}
                className="text-center"
              >
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="outline-info"
                    style={{ marginRight: "40%" }}
                    onClick={() => {
                      setChosen(val);
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
                </Card.Footer>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
      <InfoModal
        show={show.InfoModal}
        handleClose={() => {
          setShow({ ...show, InfoModal: false });
        }}
        keywords={chosen.keywords}
      ></InfoModal>
      <AddModal
        show={show.addModal}
        handleClose={() => {
          setShow({ ...show, addModal: false });
        }}
      ></AddModal>
    </div>
  );
};

export default Search;
