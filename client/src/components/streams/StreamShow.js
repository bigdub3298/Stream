import React, { Component } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends Component {
  videoRef = React.createRef();
  flvPlayer = null;

  setUpVideoPlayer() {
    const { id } = this.props.match.params;

    if (this.flvPlayer || this.props.stream) {
      if (flv.isSupported()) {
        this.flvPlayer = flv.createPlayer({
          type: "flv",
          url: `http://localhost:8000/live/${id}.flv`
        });
      }
      this.flvPlayer.attachMediaElement(this.videoRef.current);
      this.flvPlayer.load();
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    this.setUpVideoPlayer();
  }

  componentDidUpdate() {
    this.setUpVideoPlayer();
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }

  render() {
    if (!this.props.stream) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading...</div>
        </div>
      );
    }

    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <p>{description}</p>
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
