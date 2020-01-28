import React, { Component } from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions";
import StreamForm from "./StreamForm";

export class StreamCreate extends Component {
  onSubmit = values => {
    this.props.createStream({
      ...values,
      userId: this.props.userId ? this.props.userId : -1
    });
  };

  render() {
    return <StreamForm onSubmit={this.onSubmit} />;
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps, {
  createStream
})(StreamCreate);
