import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteMeal, fetchMeal} from '../../store/meals/actions';

import requireAuth from "../shared/require_auth";
import Meal from './meal';


class MealContainer extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchMeal(id);
    window.scrollTo(0, 0);
  }

  async onDeleteMeal(e) {
    e.preventDefault();
    await this.props.deleteMeal(this.props.meal.id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    if (!this.props.meal) {
      return <section className='meal'>Loading...</section>;
    }

    return <Meal deleteMeal={(e) => this.onDeleteMeal(e)} meal={this.props.meal}/>
  }
}

function mapStateToProps(state, ownProps) {
  return {meal: state.meals[ownProps.match.params.id]};
}

export default requireAuth(
  connect(mapStateToProps, {fetchMeal, deleteMeal})(MealContainer)
);
