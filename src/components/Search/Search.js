import React, { Component, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
  const isAuth = useSelector(state => state.user.isAuth);
  const [keyWords, setKeyWords] = useState("");
  const [show, setShow] = useState({ InfoModal: false, addModal: false });
  const [chosen, setChosen] = useState({ keywords: [] });
  const [devices, setDevices] = useState([]);

  const getDevices = () => {
    axios
      .get("/api/devices/getDevices")
      .then(res => {
        setDevices(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDevices();
  }, []);

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
  //sorts the filtered list in alphabetical order based on name
  // filtered.sort(function(device1, device2) {
  //   if (device1.name.toLowerCase() < device2.name.toLowerCase()) {
  //     return -1;
  //   }
  //   if (device1.name.toLowerCase() > device2.name.toLowerCase()) {
  //     return 1;
  //   }
  //   return 0;
  // });

  ////////////
  //file upload
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/devices/addFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const { fileName, filePath } = res.data;
      console.log(filePath);
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {!isAuth ? <Redirect to="/login"></Redirect> : null}
      {/* // try file upload */}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            file Upload
          </label>
        </div>

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
      {/* /////////////// */}
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
                      setChosen(val);
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
        device={chosen}
        addKeywords={() => {
          getDevices();
        }}
        handleClose={() => {
          setShow({ ...show, addModal: false });
        }}
      ></AddModal>
    </div>
  );
};

export default Search;
