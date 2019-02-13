import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMeal} from '../../store/meals';

import requireAuth from "../shared/require_auth";
import Meal from './meal';
import {deleteMeal} from '../../store/meals';


class MealContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    }
  }

  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchMeal(id);
    window.scrollTo(0, 0);
  }

  async onDeleteMeal(event) {
    event.preventDefault();
    this.setState({
      submitting: true
    });

    try {
      await this.props.deleteMeal(this.props.meal.id, () => {
        this.props.history.push('/');
      });
    } finally {
      this.setState({
        submitting: false
      })
    }

  }

  render() {
    if (!this.props.meal) {
      return <section className='meal'>Loading...</section>;
    }

    return <Meal
      deleteMeal={(event) => this.onDeleteMeal(event)}
      meal={this.props.meal}
      submitting={this.state.submitting}/>
  }
}

function mapStateToProps(state, ownProps) {
  return {meal: state.meals[ownProps.match.params.id]};
}

export default requireAuth(
  connect(mapStateToProps, {fetchMeal, deleteMeal})(MealContainer)
);
