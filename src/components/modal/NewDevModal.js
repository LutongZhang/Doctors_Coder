import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const NewDevModal = props => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState("");
  const [deviceData, setDeviceData] = useState({ name: "", keywords: "" });

  const onChange = e => {
    const file = e.target.files[0];
    setFile(file);
    setFilename(file.name);
    const fileSrc = window.URL.createObjectURL(file);
    setUploadedFile(fileSrc);
  };

  const formChange = e => {
    const target = e.target;
    const value = target.name === "checked" ? target.checked : target.value;
    const name = target.name;

    setDeviceData({
      ...deviceData,
      [name]: value
    });
    console.log(deviceData);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", deviceData.name);
    formData.append("keywords", deviceData.keywords);

    try {
      const res = await axios.post("/api/devices/addDevice", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    } catch (err) {
      console.log(err);
    }
    props.handleClose();
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Device Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <div className="custom-file mb-4">
              <Form.Control
                type="file"
                className="custom-file-input"
                id="customFile"
                onChange={onChange}
              />
              <label className="custom-file-label" htmlFor="customFile">
                file Upload
              </label>
              <br></br>

              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={deviceData.name}
                onChange={formChange}
              ></Form.Control>
              <Form.Label>Keywords:</Form.Label>
              <Form.Control
                type="text"
                name="keywords"
                value={deviceData.keywords}
                onChange={formChange}
              ></Form.Control>
            </div>

            <img style={{ width: "100%" }} alt=" no image" src={uploadedFile} />
            <br></br>

            <Form.Control
              type="submit"
              value="Upload"
              className="btn btn-primary btn-block mt-4"
            />
          </Form>
          {uploadedFile ? (
            <div className="row mt-5">
              <div className="col-md-6 m-auto">
                <h3 className="text-center">{uploadedFile.fileName}</h3>
              </div>
            </div>
          ) : null}
          {/* /////////////// */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewDevModal;
