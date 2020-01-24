import React, { Component } from "react";
require("dotenv").config();

export class GoogleAuth extends Component {
  state = { isSignedIn: null };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.toggleSignIn} className="ui red google button">
          <i className="google icon"></i> Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.toggleSignIn} className="ui red google button">
          <i className="google icon"></i> Sign In With Google
        </button>
      );
    }
  }

  onAuthChange = isSignedIn => {
    this.setState({ isSignedIn });
  };

  toggleSignIn = () => {
    if (this.state.isSignedIn) {
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
          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;
