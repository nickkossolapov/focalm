import React, {Component} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createMeal} from "../store/meals/actions";

class MealForm extends Component {
  renderField({input, label, type, meta: {touched, error}}) {
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" type="text" {...input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  renderSteps({fields, meta: {error}}) {
    return (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add Step
          </button>
        </li>
        {fields.map((step, index) => (
          <li key={index}>
            <h4>Step #{index + 1}</h4>
            <Field
              name={`${step.step}`}
              type="text"
              component={this.renderField}
            />
            <button
              type="button"
              title="Remove Step"
              onClick={() => fields.remove(index)}
              label="Delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  };

  onSubmit(values) {
    console.log('submitted')
    // this.props.createMeal(values, () => {
    //   this.props.history.push("/");
    // });
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Name"
          name="name"
          component={this.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={this.renderField}
        />
        <Field
          label="Servings"
          name="servings"
          component={this.renderField}
        />
        <FieldArray name="steps" component={this.renderSteps.bind(this)} />
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.title = "Enter a name";
  }
  if (!values.description) {
    errors.description = "Enter a description";
  }
  if (!values.servings) {
    errors.servings = "Enter the number of servings";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "MealForm"
})(connect(null, {createMeal})(MealForm));