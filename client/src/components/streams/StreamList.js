import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAllStreams } from "../../actions";
import { Link } from "react-router-dom";

class StreamList extends Component {
  renederAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to="/stream/edit" className="ui button primary">
            Edit
          </Link>
          <Link to="/stream/delete" className="ui button negative">
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
          {this.renederAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to="/stream/show" className="header">
              {stream.title}
            </Link>
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
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId
  };
};

export default connect(mapStateToProps, {
  fetchAllStreams
})(StreamList);
