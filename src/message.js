import Alert from "react-bootstrap/Alert";
import React from "react";
import ReactDOM from "react-dom";

class msg {
  constructor() {}
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
}

const message = new msg();
export default message;
