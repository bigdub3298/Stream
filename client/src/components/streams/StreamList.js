import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllStreams } from "../../actions";

class StreamList extends Component {
  renderStreamList() {
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id} className="item">
          <i className="large middle aligned icon camera" />
          <div className="content">
            <div className="header">{stream.title}</div>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  componentDidMount() {
    this.props.fetchAllStreams();
  }

  render() {
    return (
      <div>
        <h1>Streams</h1>
        <div className="ui celled list">{this.renderStreamList()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, {
  fetchAllStreams
})(StreamList);
