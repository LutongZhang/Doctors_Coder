import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddModal = props => {
  const [inputs, setInputs] = useState([
    <Form.Control key={0} placeholder="plase input keyword"></Form.Control>
  ]);

  const addInput = () => {
    setInputs([
      ...inputs,
      <Form.Control
        key={inputs.length}
        placeholder="plase input keyword"
      ></Form.Control>
    ]);
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Keywords</Modal.Title>
        </Modal.Header>
        <Modal.Body>{inputs}</Modal.Body>
        <Modal.Footer>
          <Button onClick={addInput} variant="warning">
            enter more keyword
          </Button>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
