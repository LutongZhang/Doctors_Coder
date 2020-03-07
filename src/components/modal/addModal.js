import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddModal = props => {
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const saveChanges = () => {
    console.log(inputs);

    setInputs([""]);
    props.handleClose();
  };

  const handleClose = () => {
    setInputs([""]);
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Keywords</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {inputs.map((val, index) => {
            return (
              <div key={index}>
                <Form.Control
                  placeholder="plase input keyword"
                  value={val}
                  onChange={e => {
                    const newList = inputs.map((val, i) => {
                      if (i === index) {
                        return e.target.value;
                      } else {
                        return val;
                      }
                    });
                    setInputs(newList);
                  }}
                ></Form.Control>
                <br />
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addInput} variant="warning">
            enter more keyword
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddModal;
