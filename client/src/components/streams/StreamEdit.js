import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = values => {
    this.props.editStream(this.props.match.params.id, values);
  };

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading...</div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h2>Edit Stream</h2>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchStream,
  editStream
})(StreamEdit);
