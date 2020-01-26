import React, { Component } from "react";
import { Field, reduxForm, clearSubmitErrors } from "redux-form";

export class StreamCreate extends Component {
  renderField({ input, label, type }) {
    return (
      <div className="row">
        <div className="field ten column wide">
          <label>{label}</label>
          <div>
            <input {...input} placeholder={label} type={type} />
          </div>
        </div>
      </div>
    );
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form centered grid column"
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
    errors.title = "Must enter a title";
  }

  if (!values.description) {
    errors.description = "Must enter a description";
  }
};

export default reduxForm({
  form: "streamCreate"
})(StreamCreate);
