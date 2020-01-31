import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { deleteStream } from "../actions";
import history from "../history";

function Modal(props) {
  return ReactDOM.createPortal(
    <div
      onClick={() => history.push("/")}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">Delete Stream</div>
        <div className="content">
          Are you sure you want to delete this stream?
        </div>
        <div className="actions">
          <button
            onClick={() => props.deleteStream(props.id)}
            className="ui button negative"
          >
            Delete
          </button>
          <button onClick={() => history.push("/")} className="ui button">
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}

export default connect(null, {
  deleteStream
})(Modal);
