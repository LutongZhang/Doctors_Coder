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
    { name: "Syringe", keywords: ["syringe", "needle", "sharp"], source: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Syringe2.jpg"},
	{ name: "Thermometer", keywords: ["thermometer", "temperature", "fever"], source: "https://upload.wikimedia.org/wikipedia/commons/1/17/Kwikthermometers.jpg"},
	{ name: "Stethoscope", keywords: ["stethoscope", "ears", "listen", "chest"], source: "https://upload.wikimedia.org/wikipedia/commons/7/75/Stethoscope_1.jpg"},
    { name: "Syringe", keywords: ["syringe", "needle", "sharp"], source: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Syringe2.jpg"},
	{ name: "Thermometer", keywords: ["thermometer", "temperature", "fever"], source: "https://upload.wikimedia.org/wikipedia/commons/1/17/Kwikthermometers.jpg"},
	{ name: "Stethoscope", keywords: ["stethoscope", "ears", "listen", "chest"], source: "https://upload.wikimedia.org/wikipedia/commons/7/75/Stethoscope_1.jpg"}
  ]);


  const handleChange = e => {
    setKeyWords(e.target.value);
  };

// filters total device list to only include items searched for
  const filtered = devices.filter(device => {
	  var found = false;
	  device.keywords.forEach(word => {
		  if (word.toLowerCase().includes(keyWords)) {
			  found = true;
		  }
	  });
	  return found;
  });
// sorts the filtered list in alphabetical order based on name
  filtered.sort(function(device1, device2) {
	  if (device1.name.toLowerCase() < device2.name.toLowerCase()) {return -1;}
	  if (device1.name.toLowerCase() > device2.name.toLowerCase()) {return 1;}
	  return 0;
  });

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
          {filtered.map((val, index) => {
            return (
              <Card
                style={{ width: "80%" }}
                key={index}
                className="text-center"
              >
                <Card.Img variant="top" src={val.source} />
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
