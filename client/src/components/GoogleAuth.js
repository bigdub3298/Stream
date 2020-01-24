import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";
require("dotenv").config();

export class GoogleAuth extends Component {
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          onClick={this.toggleSignInStatus}
          className="ui red google button"
        >
          <i className="google icon"></i> Sign Out
        </button>
      );
    } else {
      return (
        <button
          onClick={this.toggleSignInStatus}
          className="ui red google button"
        >
          <i className="google icon"></i> Sign In With Google
        </button>
      );
    }
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  toggleSignInStatus = () => {
    if (this.props.isSignedIn) {
      this.auth.signOut();
    } else {
      this.auth.signIn();
    }
  };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          client_id: process.env.REACT_APP_CLIENT_ID,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, {
  signIn,
  signOut
})(GoogleAuth);
