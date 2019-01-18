import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import MealTile from './meal_tile';
import {fetchMeals} from '../../../store/meals/actions';
import requireAuth from '../../shared/require_auth';

class MealList extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  render() {
    return (
      <section className='home-meals'>
        <h3>Meals</h3>
        <ul>
          <Meals meals={this.props.meals}/>
        </ul>
      </section>
    );
  }
}

function Meals(props){ //todo: rename!
  const {meals} = props;

  if (Object.keys(meals).length === 0) {
    return <div>Loading...</div>
  } else {
    return _.map(meals, meal => {
      return <MealTile {...meal} key={meal.id}/>;
    });
  }
}

function mapStateToProps(state) {
  return { meals: state.meals, token: state.auth.authenticated};
}

export default requireAuth(
  connect(mapStateToProps, {fetchMeals})(MealList)
);