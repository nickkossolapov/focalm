import React, {Component} from "react";
import {Field, FieldArray, reduxForm, startSubmit, stopSubmit, setSubmitFailed} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createMeal} from "../../store/meals/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {MEAL_UNIT} from "../../store/constants/meals"
import "./meal_form.css"

class MealForm extends Component {
  constructor(){
    super();

    this.state = {
      promiseFailed: false
    }
  }
  componentWillMount () {
    this.props.initialize({servings: '1'});
  }

  static renderField({input, label, type, className, meta: {touched, error}}) {
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          type={type}
          className={touched && error ? "input-danger" : undefined}
          placeholder={touched && error ? `${error}` : undefined}
          {...input}
        />
      </div>
    );
  }

  renderSteps({fields, meta: {error}}) {
    return (
      <ol className="">
        <div>
          <h3>Steps</h3>
          <button type="button" className="increment-button" onClick={() => fields.push({})}>
            <FontAwesomeIcon icon="plus-circle" />
          </button>
        </div>
        {fields.map((step, index) => {
          return (
          <li key={index}>
            <Field
              name={`${step}.step`}
              type="text"
              className="list-field"
              component={MealForm.renderField}
            />
            <button
              type="button"
              title="Remove Step"
              onClick={() => fields.remove(index)}
              label="Delete"
              className="increment-button"
            >
              <FontAwesomeIcon icon="times-circle" />
            </button>
          </li>
        )})}
      </ol>
    )
  };

  renderIngredients(props) {
    let {fields, meta: {error}} = props;
    return (
      <ul className="general-list">
        <div>
          <h3>Ingredients</h3>
          <button type="button" className="increment-button" onClick={() => fields.push({unit: "GRAM"})}>
            <FontAwesomeIcon icon="plus-circle" />
          </button>
        </div>
        {fields.map((ingredient, index) => {
          return (
            <li key={index}>
              <Field
                label="Ingredient"
                name={`${ingredient}.ingredient`}
                type="text"
                component={MealForm.renderField}
              />
              <Field
                label="Qty"
                name={`${ingredient}.qty`}
                type="text"
                normalize={value => value < 0 ? 0 : value.replace(/[^\d.]/g, '', '')}
                component={MealForm.renderField}
              />
              <Field
                name={`${ingredient}.unit`}
                type="text"
                component="select"
              >
                {/*TODO: add a default and validation? Maybe try again to creat field element*/}
                {/*<option value="" disabled="disabled">Select a unit</option>*/}
                {MealForm.renderIngredientDropdown()}
              </Field>
              <button
                type="button"
                title="Remove Ingredient"
                onClick={() => fields.remove(index)}
                label="Delete"
                className="increment-button"
              >
                <FontAwesomeIcon icon="times-circle" />
              </button>
            </li>
          )})}
      </ul>
    )
  };

  static renderIngredientDropdown() {
    return Object.keys(MEAL_UNIT).map(key => {
      return <option value={key} key={key}>{MEAL_UNIT[key].name}</option>
    });
  };

  async onSubmit(values) {
    if (values.steps) {
      for (let i = 0; i < values.steps.length; i++) {
        values.steps[i].order = i;
      }
    }

    startSubmit();
    try{
      await this.props.createMeal(values, (id) => {
        stopSubmit();
        this.props.history.push('/meal/' + id);
      });
    } catch (err) {
      this.setState({
        promiseFailed: true
      })
    }
  }

  render() {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form className="meal-form" onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <div>
          <Field
            label="Name"
            name="name"
            type="text"
            component={MealForm.renderField}
          />
          <Field
            label="Description"
            name="description"
            type="text"
            component={MealForm.renderField}
          />
          <Field
            label="Servings"
            name="servings"
            type="number"
            defaultValue="1"
            normalize={value => value < 1 ? 1 : Number.parseInt(value)}
            component={MealForm.renderField}
          />
        </div>
        <div>
          <FieldArray name="steps" component={this.renderSteps} />
          <FieldArray name="ingredients" component={this.renderIngredients} />
        </div>
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          <Link to="/">Cancel</Link>
        </div>
        {submitting && <div>Loading...</div>}
        {this.state.promiseFailed && !submitting && <div>Submit failed, please try again</div>}
      </form>
    );
  }
}

function validate(values) {
  const errors = {steps: [], ingredients: []};

  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  if (!values.servings) {
    errors.servings = "Required";
  } else if (values.serving <= 0 || Number.isInteger(values.serving)) {
    errors.servings = "Must be positive whole number"
  }

  if (values.ingredients) {
    values.ingredients.forEach((ingredient, i) => {
      let ingredientError = {};
      if (!ingredient.ingredient){
        ingredientError.ingredient = "Required";
      }
      if (!ingredient.qty){
        ingredientError.qty = "Required";
      } else if (ingredient.qty <= 0){
        ingredientError.qty = "Must be positive";
      }
      errors.ingredients[i] = ingredientError;
    });
  }

  if (values.steps) {
    values.steps.forEach((step, i) => {
      let stepError = {};
      if (!step.step){
        stepError.step = "Required";
      }
      errors.steps[i] = stepError;
    });
  }
  return errors;
}

export default reduxForm({
  validate,
  form: "mealForm"
})(connect(null, {createMeal})(MealForm));
