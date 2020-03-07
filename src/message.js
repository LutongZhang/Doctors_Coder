import { Alert, Spinner } from "react-bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class msg {
  constructor() {}

  loadingDiv = document.createElement("div");

  alert(status, msg) {
    console.log("msg");
    let div = document.createElement("div");
    const view = (
      <Alert
        variant={status}
        style={{
          position: "fixed",
          top: 0,
          width: "100%"
        }}
      >
        <Alert.Heading>{msg}</Alert.Heading>
      </Alert>
    );

    ReactDOM.render(view, div);
    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, 3000);
  }

  createLoading = () => {
    const loading = (
      <Spinner
        animation="border"
        role="status"
        style={{
          position: "fixed",
          left: "47%",
          top: "20%"
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
    ReactDOM.render(loading, this.loadingDiv);
    document.body.appendChild(this.loadingDiv);
  };

  killLoading = () => {
    this.loadingDiv.removeChild();
  };
}

const message = new msg();

axios.interceptors.request.use(() => {
  message.createLoading();
});

axios.interceptors.response.use(() => {
  message.killLoading();
});

export default message;
