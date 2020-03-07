import React from "react";
import { Button, Modal } from "react-bootstrap";

const InfoModal = props => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Keywords</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.keywords.map((val, index) => {
            return <p key={index}>{val}</p>;
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
