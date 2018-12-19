import React, {Component} from 'react';
import {Field, FieldArray, reduxForm, startSubmit, stopSubmit} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createMeal} from '../../../store/meals/actions';
import './meal_form.css'
import {InputField} from './input_field';
import {Ingredients} from './ingredients';
import {Steps} from './steps';

class MealForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      promiseFailed: false
    }
  }
  componentWillMount () {
    this.props.initialize({servings: '1'});
  }

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
      <form className='meal-form' onSubmit={handleSubmit(values => this.onSubmit(values))}>
        <div className='meal-form-title'>
          <Field
            label='Name'
            name='name'
            type='text'
            component={InputField}
          />
          <Field
            label='Servings'
            name='servings'
            type='number'
            defaultValue='1'
            normalize={value => value < 1 ? 1 : Number.parseInt(value)}
            component={InputField}
          />
        </div>
        <div className='meal-form-description'>
          <Field
            label='Description'
            name='description'
            type='text'
            component={InputField}
          />
        </div>
        <FieldArray name='steps' component={Steps} />
        <FieldArray name='ingredients' component={Ingredients} />
        <div>
          <button type='submit' disabled={submitting}>Submit</button>
          <button type='button' disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
          <Link to='/'>Cancel</Link>
        </div>
        {submitting && <div>Loading...</div>}
        {this.state.promiseFailed && !submitting && <div>Submit failed, please try again</div>}
      </form>
    );
  }
};

function validate(values) {
  const errors = {steps: [], ingredients: []};

  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.servings) {
    errors.servings = 'Required';
  } else if (values.serving <= 0 || Number.isInteger(values.serving)) {
    errors.servings = 'Must be positive whole number'
  }

  if (values.ingredients) {
    values.ingredients.forEach((ingredient, i) => {
      let ingredientError = {};
      if (!ingredient.ingredient){
        ingredientError.ingredient = 'Required';
      }
      if (!ingredient.qty){
        ingredientError.qty = 'Required';
      } else if (ingredient.qty <= 0){
        ingredientError.qty = 'Must be positive';
      }
      errors.ingredients[i] = ingredientError;
    });
  }

  if (values.steps) {
    values.steps.forEach((step, i) => {
      let stepError = {};
      if (!step.step){
        stepError.step = 'Required';
      }
      errors.steps[i] = stepError;
    });
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'mealForm'
})(connect(null, {createMeal})(MealForm));
