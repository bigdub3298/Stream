import React from "react";
import Modal from "../Modal";

export default function StreamDelete(props) {
  return (
    <div>
      <Modal id={props.match.params.id} />
    </div>
  );
}
