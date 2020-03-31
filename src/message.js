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
    this.loadingDiv = document.createElement("div");
    const loading = (
      <Spinner
        animation="border"
        role="status"
        style={{
          position: "fixed",
          left: "47%",
          top: "30%"
        }}
      >
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
    ReactDOM.render(loading, this.loadingDiv);
    document.body.appendChild(this.loadingDiv);
  };

  killLoading = () => {
    if (this.loadingDiv.childNodes.length !== 0) {
      this.loadingDiv.removeChild(this.loadingDiv.childNodes[0]);
    }
  };
}

const message = new msg();

// axios.interceptors.request.use(config => {
//   console.log("create");
//   message.createLoading();
//   return config;
// });

// axios.interceptors.response.use(config => {
//   console.log("kill");
//   message.killLoading();
//   return config;
// });

export default message;
