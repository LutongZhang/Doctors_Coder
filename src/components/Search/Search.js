import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NewDevModal from "../modal/NewDevModal";
import Timer from "../Timer/Timer.js";
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
  Form
} from "react-bootstrap";
import AddModal from "../modal/addModal";
// import InfoModal from "../modal/InfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import msg from "../../message";

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
    msg.createLoading();
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
        msg.killLoading();
      })
      .catch(e => {
        console.log(e);
        msg.killLoading();
      });
  };

  const deleteDevice = deviceId => {
    console.log(deviceId);

    axios
      .post("/api/devices/deleteDevice", { deviceId: deviceId })
      .then(res => {
        console.log(res.data);
        window.location.reload();
        //getDevices();
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


      <h2 style={{ textAlign: "center" }}>Search for devices</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
	  <Form style={{ width: "50%" }}>
        <Form.Row>
          <Form.Group as={Col} md="8">
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
		  <Col md="4">
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
			</Col>
        </Form.Row>
		</Form>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container>
        <CardColumns>
          {filtered.map((val, index) => {
            return (
  	  		<div className="cardWrapper">
              <Card
                key={index}
                className="text-center"
              >
                <Card.Img variant="top" src={val.filePath} />
                <Card.Body>
				  <Dropdown drop="up">
					  <Dropdown.Toggle variant="success" id="dropdown-basic">
					    {val.name}
					  </Dropdown.Toggle>
					  <Dropdown.Menu>
					  {val.keywords.map(word => <Dropdown.Item href="#">{word}</Dropdown.Item>)}
                  		</Dropdown.Menu>
				  </Dropdown>
                </Card.Body>
				</Card>
                <div className="buttonOverlay">
                  {/* <Button
                    variant="outline-info"
                    onClick={() => {
                      setChosen(val);
                      setShow({ ...show, InfoModal: true });
                    }}
                  >
                    Info
                  </Button> */}
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      Timer(val.name, user);
                    }}
                  >
                    Checkout
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
                        AddKey
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
              </div>
			  </div>
            );
          })}
        </CardColumns>
      </Container>
      {/* <InfoModal
        show={show.InfoModal}
        handleClose={() => {
          setShow({ ...show, InfoModal: false });
        }}
        keywords={chosen.keywords}
      ></InfoModal> */}
      {role == "admin" ? (
        <>
          <AddModal
            show={show.addModal}
            device={chosen}
            addKeywords={() => {
              //getDevices();
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
