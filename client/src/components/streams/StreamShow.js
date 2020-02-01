import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading...</div>
        </div>
      );
    }
    return (
      <div>
        <h1>{this.props.stream.title}</h1>
        <p>{this.props.stream.description}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return { stream: state.streams[id] };
};
export default connect(mapStateToProps, {
  fetchStream
})(StreamShow);
