import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMeals} from '../../store/meals';

import requireAuth from "../shared/require_auth";
import Meal from './meal';
import {deleteMeal} from '../../store/meals';
import {refreshCalendar} from '../../store/calendar';


class MealContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false
    }
  }

  componentDidMount() {
    if (!this.props.meal) {
      this.props.fetchMeals();
    }
    window.scrollTo(0, 0);
  }

  async onDeleteMeal(event) {
    event.preventDefault();
    this.setState({
      submitting: true
    });

    try {
      await this.props.deleteMeal(this.props.meal.id, () => {
        this.props.refreshCalendar();
        this.props.history.push('/');
      });
    } catch(err) {
      console.log(err);
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
  connect(mapStateToProps, {fetchMeals, deleteMeal, refreshCalendar})(MealContainer)
);
