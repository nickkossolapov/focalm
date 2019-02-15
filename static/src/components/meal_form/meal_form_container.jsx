import React, {Component} from 'react';
import {reduxForm, startSubmit, stopSubmit} from 'redux-form';
import {connect} from 'react-redux';

import {createMeal, updateMeal} from '../../store/meals';
import MealForm from './meal_form';
import requireAuth from "../shared/require_auth";

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {
      promiseFailed: false,
    }
  }

  componentWillMount () {
    const { location, initialize, history, meal } = this.props;

    if (location.pathname.startsWith('/edit'))
    {
      if (meal){
        initialize(meal);
      } else {
        history.push('/create');
      }

    } else {
      initialize({servings: '1'});
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  async submitForm(values) {
    document.activeElement.blur();

    if (values.steps) {
      for (let i = 0; i < values.steps.length; i++) {
        values.steps[i].order = i;
      }
    }

    startSubmit();
    try{
      const submitFunc = (location.pathname.startsWith('/edit')) ? this.props.updateMeal : this.props.createMeal;

      await submitFunc(values, (id) => {
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
    return (
      <MealForm
        {...this.props}
        promiseFailed={this.state.promiseFailed}
        submitForm={values => this.submitForm(values)}
      />
    );
  }
}

function validate(values) {
  const errors = {steps: [], ingredients: []};

  if (!values.name) {
    errors.name = 'Required';
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

function mapStateToProps(state, ownProps) {
  return { meal: state.meals[ownProps.match.params.id] };
}

export default requireAuth(
  reduxForm({
    validate,
    form: 'mealForm'
  })(connect(mapStateToProps, {createMeal, updateMeal})(Container))
);
