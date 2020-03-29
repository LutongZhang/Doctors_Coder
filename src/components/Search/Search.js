import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NewDevModal from "../modal/NewDevModal";
import Timer from "../Timer/Timer.js"
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
  const user = useSelector(state => state.user);
  const { isAuth, role } = user;
  const [keyWords, setKeyWords] = useState("");
  const [show, setShow] = useState({
    InfoModal: false,
    addModal: false,
    NewDevModal: false
  });
  const [chosen, setChosen] = useState({ keywords: [] });
  const [devices, setDevices] = useState([]);

  function arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach(b => (binary += String.fromCharCode(b)));

    return window.btoa(binary);
  }

  useEffect(() => {
    getDevices();
  }, []);

  const getDevices = () => {
    console.log("devices");
    axios
      .get("/api/devices/getDevices")
      .then(res => {
        //console.log("data:", res.data);
        const array = res.data.map(val => {
          const base64Flag = "data:image/jpeg;base64,";
          const imageStr = arrayBufferToBase64(val.buffer.data);
          const filePath = base64Flag + imageStr;
          val.filePath = filePath;
          const obj = {
            _id: val._id,
            name: val.name,
            keywords: val.keywords,
            filePath: filePath
          };
          return obj;
        });
        console.log(array);
        setDevices(array);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDevice = deviceId => {
    console.log(deviceId);

    axios
      .post("/api/devices/deleteDevice", { deviceId: deviceId })
      .then(res => {
        console.log(res.data);
        getDevices();
      })
      .catch(err => {
        console.log(err.response.message);
      });
  };

  const handleChange = e => {
    setKeyWords(e.target.value);
  };

  // filters total device list to only include items searched for
  const filtered = devices.filter(device => {
    let found = false;
    device.keywords.forEach(word => {
      if (word.toLowerCase().includes(keyWords.toLocaleLowerCase())) {
        found = true;
      }
    });
    return found;
  });

  ////////////
  //file upload

  return (
    <div>
      {!isAuth ? <Redirect to="/login"></Redirect> : null}

      {/* {adminshow} */}
      {role == "admin" ? (
        <Button
          variant="success"
          onClick={() => {
            setShow({ ...show, NewDevModal: true });
            console.log(show);
          }}
        >
          Add New Device
        </Button>
      ) : null}

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
                <Card.Img variant="top" src={val.filePath} />
                <Card.Body>
                  <Card.Title>{val.name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="outline-info"
                    onClick={() => {
					Timer(val.name,user)
                      setChosen(val);
                      setShow({ ...show, InfoModal: true });
                    }}
                  >
                    Info
                  </Button>
                  {role == "admin" ? (
                    <>
                      <Button
                        variant="outline-dark"
                        onClick={() => {
                          setChosen(val);
                          setShow({ ...show, addModal: true });
                          console.log(show);
                        }}
                      >
                        Add Key
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          setChosen(val);
                          deleteDevice(val._id);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  ) : null}
                  {/* <Button
                    variant="outline-dark"
                    onClick={() => {
                      setChosen(val);
                      setShow({ ...show, addModal: true });
                      console.log(show);
                    }}
                  >
                    Add
                  </Button> */}
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
      {role == "admin" ? (
        <>
          <AddModal
            show={show.addModal}
            device={chosen}
            addKeywords={() => {
              getDevices();
            }}
            handleClose={() => {
              setShow({ ...show, addModal: false });
            }}
          ></AddModal>
          <NewDevModal
            show={show.NewDevModal}
            handleClose={() => {
              setShow({ ...show, NewDevModal: false });
            }}
          ></NewDevModal>
        </>
      ) : null}
    </div>
  );
};

export default Search;
