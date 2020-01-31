import React from "react";
import ReactDOM from "react-dom";

export default function Modal(props) {
  return ReactDOM.createPortal(
    <div className="ui dimmer modals visible active">
      <div className="ui standard modal visible active">
        Hello from the modal!
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
