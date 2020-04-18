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
  Row,
  Dropdown,
  Form,
  ButtonGroup
} from "react-bootstrap";
import AddModal from "../modal/addModal";
// import InfoModal from "../modal/InfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import msg from "../../message";
const VSR = require('voice-speech-recognition');
const recognizer = VSR.voiceSpeechRecognition();


const Search = props => {
  const [searchPlaceHolser,setSearchPH] = useState("Search here..")
  const [buttonName, setButton] = useState('Start Speech Recognition');
  const [transcript, setTranscript] = useState('');
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
		  className="form-row text-center"
		  style={{ display: "flex", justifyContent: "center" }}
		>
        <Form style={{ width: "50%" }}>
          <Form.Group md="8">
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
                placeholder={searchPlaceHolser}
                
              />
              <br/>
              {/* <i class="fa fa-microphone" style={{fontSize:"36px"}}></i> */}
              <div id="fakebox-microphone" class="microphone-icon mouse-navigation" title="Search by voice"
              onClick={() => {
                if(!recognizer.isRecognizing){
                recognizer.resetRecognition();
                recognizer.startRecognition();
                console.log("voice recognition started");
                setSearchPH("please talk..")
                setButton('Stop Speech Recognition');
                }else if(recognizer.isRecognizing){
                recognizer.stopRecognition();
                console.log("voice recognition stopped");
                console.log(recognizer.lastRecognizing);
                setSearchPH("Search here")
                setButton('Start Speech Recognition');
                setTranscript(recognizer.lastRecognizing);
                setKeyWords(recognizer.lastRecognizing);
                }
              }}
              ></div>
            </InputGroup>
  		  </Form.Group>

  		{/* <Button className="startStopButton"
  		  variant="success"
  		  onClick={() => {
  		  if(!recognizer.isRecognizing){
  			recognizer.resetRecognition();
  			recognizer.startRecognition();
  			console.log("voice recognition started");
  			setButton('Stop Speech Recognition');
  		  }else if(recognizer.isRecognizing){
  			recognizer.stopRecognition();
  			console.log("voice recognition stopped");
  			console.log(recognizer.lastRecognizing);
  			setButton('Start Speech Recognition');
  			setTranscript(recognizer.lastRecognizing);
  			setKeyWords(recognizer.lastRecognizing);
  		  }
  	  }}>{buttonName}</Button> */}
  		{/* {adminshow} */}
  		{role == "admin" ? (
  		  <Button
  			variant="success"
  			onClick={() => {
  			  setShow({ ...show, NewDevModal: true });
  			  console.log(show);
  			}}
  			className="addDeviceButton"
  		  >
  			Add New Device
  		  </Button>
  		) : null}
        </Form>
      </div>
      <br></br>
      <br></br>

      <Container>
        <CardColumns>
          {filtered.map((val, index) => {
            return (
              <Card key={index} className="text-center">
                <Card.Img
                  variant="top"
                  style={{
                    width: "80%",
                    height: "150px",
                    //maxHeight: "auto",
                    //float: "left",
                    margin: "auto",
                    // padding: "3px"
                  }}
                  src={val.filePath}
                />
                <Card.Body>
                  <div
                    className="form-row text-center"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => {
                        Timer(val.name, user);
                      }}
                    >
                      Checkout
                    </Button>

                    <Dropdown drop="up">
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {val.name}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {val.keywords.map((word, i) => (
                          <Dropdown.Item href="#" key={i}>
                            {word}
                          </Dropdown.Item>
                        ))}
                        {role == "admin" ? (
                          <>
                            <Dropdown.Item
                              onClick={() => {
                                setChosen(val);
                                setShow({ ...show, addModal: true });
                                console.log(show);
                              }}
                            >
                              <FontAwesomeIcon icon={faPlus} /> Add Keyword{" "}
                            </Dropdown.Item>
                          </>
                        ) : null}
                      </Dropdown.Menu>
                    </Dropdown>

                    {role == "admin" ? (
                      <Button
                        variant="danger"
                        onClick={() => {
                          setChosen(val);
                          deleteDevice(val._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    ) : null}
                  </div>
                </Card.Body>
              </Card>
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
