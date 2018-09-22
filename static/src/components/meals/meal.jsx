import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {fetchMeal} from "../../store/meals/actions";

import "./meal.css"

class Meal extends Component {
  componentDidMount() {
    const {id} = this.props.match.params;
    this.props.fetchMeal(id);
  }

  render() {
    const {meal} = this.props;

    if (!this.props.meal) {
      return <section className="meal">Loading...</section>;
    }

    return (
      <section className="meal">
        <h3>{meal.name}</h3>
        <h6>{meal.description}</h6>
        <p>{meal.servings} servings</p>
        <p>Created on {meal.created_at}</p>
      </section>
    );
  }
}

function mapStateToProps({meals}, ownProps) {
  return {meal: meals[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchMeal})(Meal);