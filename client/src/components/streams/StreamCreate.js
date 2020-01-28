import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

export class StreamCreate extends Component {
  renderError(error, touched) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => {
    return (
      <div className="row">
        <div className="field ten column wide">
          <label>{label}</label>
          <div>
            <input
              {...input}
              placeholder={label}
              type={type}
              autoComplete="off"
            />
            {this.renderError(error, touched)}
          </div>
        </div>
      </div>
    );
  };

  onSubmit = values => {
    this.props.createStream({
      ...values,
      userId: this.props.userId ? this.props.userId : -1
    });
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form centered grid column error"
      >
        <Field
          name="title"
          type="text"
          component={this.renderField}
          label="Title"
        />
        <Field
          name="description"
          type="text"
          component={this.renderField}
          label="Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = "You must enter a title";
  }

  if (!values.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

const mapStateToProps = state => {
  return { userId: state.auth.userId };
};

export default connect(mapStateToProps, {
  createStream
})(formWrapped);
