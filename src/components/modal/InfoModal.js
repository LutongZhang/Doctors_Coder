import React from "react";
import { Button, Modal } from "react-bootstrap";

const InfoModal = props => {
  console.log(props.keywords);
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Keywords</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.keywords.map(val => {
            return <p>{val}</p>;
          })}
        </Modal.Body>
        <Modal.Footer>
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

export default InfoModal;
