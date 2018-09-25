import _ from "lodash";
import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchMeals} from "../../store/meals/actions";
import requireAuth from '../require_auth';

import './meals.css';

class Meals extends Component {
  componentDidMount() {
    this.props.fetchMeals();
  }

  renderMeals() {
    const {meals} = this.props;
    if (Object.keys(meals).length === 0) {
      return <div>Loading...</div>
    } else {
      return _.map(meals, meal => {
        return (
          <li className="list-group-item" key={meal.id}>
            <Link to={`/meal/${meal.id}`}>
              {meal.name}
            </Link>
          </li>
        );
      });
    }
  }

  render() {
    return (
      <section className="home-meals">
        <h3>Meals</h3>
        <ul>
          {this.renderMeals()}
        </ul>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return { meals: state.meals, token: state.auth.authenticated};
}

export default requireAuth(
  connect(mapStateToProps, {fetchMeals})(Meals)
);