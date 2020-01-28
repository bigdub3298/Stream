import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends Component {
  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/stream/edit/${stream.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/stream/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderStreamList() {
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id} className="item">
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/stream/show/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateLink() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/stream/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      );
    }
  }
  componentDidMount() {
    this.props.fetchAllStreams();
  }

  render() {
    return (
      <div>
        <h1>Streams</h1>
        <div className="ui celled list">{this.renderStreamList()}</div>
        {this.renderCreateLink()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, {
  fetchAllStreams
})(StreamList);
