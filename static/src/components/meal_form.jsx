import React, {Component} from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createMeal} from "../store/meals/actions";

import {MEAL_METRIC} from "../store/constants/meals"

class MealForm extends Component {
  static renderField({input, label, type, meta: {touched, error}}) {
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
        {fields.map((step, index) => {
          return (
          <li key={index}>
            <Field
              name={`${step}.step`}
              type="text"
              component={MealForm.renderField}
            />
            <button
              type="button"
              title="Remove Step"
              onClick={() => fields.remove(index)}
              label="Delete">
              Delete
            </button>
          </li>
        )})}
      </ul>
    )
  };

  renderIngredients({fields, meta: {error}}) {
    return (
      <ul>
        <li>
          <button type="button" onClick={() => fields.push({})}>
            Add Ingredient
          </button>
        </li>
        {fields.map((ingredient, index) => {
          return (
            <li key={index}>
              <p>Ingredient</p>
              <Field
                name={`${ingredient}.ingredient`}
                type="text"
                component={MealForm.renderField}
              />
              <p>Amount</p>
              <Field
                name={`${ingredient}.qty`}
                type="number"
                component={MealForm.renderField}
              />
              <Field
                name={`${ingredient}.metric`}
                type="text"
                component="select"
                default="">
                <option value="" disabled="disabled">Select a unit</option>
                {this.renderIngredientDropdown()}
              </Field>
              <button
                type="button"
                title="Remove Ingredient"
                onClick={() => fields.remove(index)}
                label="Delete">
                Delete
              </button>
            </li>
          )})}
      </ul>
    )
  };

  renderIngredientDropdown() {
    return Object.keys(MEAL_METRIC).map(key => {
      return <option value={key} key={key}>{MEAL_METRIC[key].name}</option>
    });
  };




  onSubmit(values) {
    if (values.steps) {
      for (let i = 0; i < values.steps.length; i++) {
        values.steps[i].order = i;
      }
    }
    console.log(values);
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
          component={MealForm.renderField}
        />
        <Field
          label="Description"
          name="description"
          component={MealForm.renderField}
        />
        <Field
          label="Servings"
          name="servings"
          component={MealForm.renderField}
        />
        <FieldArray name="steps" component={this.renderSteps.bind(this)} />
        <FieldArray name="ingredients" component={this.renderIngredients.bind(this)} />
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
  //
  // if (!values.name) {
  //   errors.title = "Enter a name";
  // }
  // if (!values.description) {
  //   errors.description = "Enter a description";
  // }
  // if (!values.servings) {
  //   errors.servings = "Enter the number of servings";
  // }

  return errors;
}

// export default compose(
//   connect(null, {createMeal}),
//   reduxForm(validate, {form: 'MealForm'})
// )(MealForm);


export default reduxForm({
  validate,
  form: "MealForm"
})(connect(null, {createMeal})(MealForm));
